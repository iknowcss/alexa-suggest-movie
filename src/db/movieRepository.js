const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');
const Papa = require('papaparse');
const deasync = require('deasync');
const forEach = require('lodash/foreach');
const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');
const map = require('lodash/map');
const filter = require('lodash/filter');
const findIndex = require('lodash/findIndex');

const mapEmotionsToGenres = require('../mapEmotionsToGenres');

const DATA_DIR_PATH = path.resolve(__dirname, '../../data');
const MOVIES_CSV = 'ml-latest-small/movies.csv';
const RATINGS_CSV = 'ml-latest-small/ratings.csv';

/// - Utility functions --------------------------------------------------------

const readFile = Promise.promisify(fs.readFile);

function returnNull() {
  return null;
}

const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
const PENDING = 'PENDING';

function syncify(fn) {
  return function () {
    var resolveState = PENDING;
    var fulfillResult;
    var rejectResult;

    fn.apply(null, arguments)
      .then(function (result) {
        resolveState = FULFILLED;
        fulfillResult = result;
      })
      .catch(function (result) {
        resolveState = REJECTED;
        rejectResult = result;
      });

    deasync.loopWhile(function () {
      return resolveState === PENDING;
    });

    switch (resolveState) {
      case FULFILLED: return fulfillResult;
      case REJECTED: return rejectResult;
      default: throw new Error('Unknown promise state');
    }
  };
}

/// - Core CSV processing ------------------------------------------------------

function parseDataFromCsv(csvData) {
  return new Promise(function (fulfill) {
    Papa.parse(csvData, {
      header: true,
      complete: function (results) {
        fulfill(results.data);
      }
    });
  });
}

function loadDataFromCsv(dataPath) {
  return readFile(path.resolve(DATA_DIR_PATH, dataPath), 'utf-8')
    .then(parseDataFromCsv);
}

/// - Process movies -----------------------------------------------------------

var moviesCache;

function loadMovies(refresh) {
  if (moviesCache && !refresh) {
    return Promise.resolve(moviesCache);
  }

  const indexedData = {};
  return loadDataFromCsv(MOVIES_CSV, 'utf-8')
    .then(function (movies) {
      movies.forEach(function (movie) {
        indexedData[movie.movieId] = {
          id: movie.movieId,
          title: movie.title,
          genres: movie.genres ? movie.genres.split('|') : []
        };
      });

      return moviesCache = indexedData;
    });
}

/// - Process ratings ----------------------------------------------------------

function buildBaseRatingData() {
  return {
    ratingTotal: 0,
    ratingCount: 0,
    averageRating: 0
  };
}

var ratingsCache;

function loadRatings(refresh) {
  if (ratingsCache && !refresh) {
    return Promise.resolve(ratingsCache);
  }

  const indexedData = {};
  return loadDataFromCsv(RATINGS_CSV, 'utf-8')
    .then(function (ratings) {
      forEach(ratings, function (rating) {
        var movie = indexedData[rating.movieId];
        if (!movie) {
          movie = indexedData[rating.movieId] = buildBaseRatingData();
        }

        movie.ratingTotal += Math.round(parseFloat(rating.rating) * 100);
        movie.ratingCount++;
      });

      forEach(indexedData, function (movie) {
        movie.averageRating = Math.round(movie.ratingTotal / movie.ratingCount);
      });

      return ratingsCache = indexedData;
    });
}

/// - Put it all together ------------------------------------------------------

var movieDataCache;

function getAllMovies(refresh) {
  if (movieDataCache && !refresh) {
    return Promise.resolve(movieDataCache);
  }

  return (initPromise || init())
    .then(function () {
      return Promise.join(loadMovies(), loadRatings(), function (movies, ratings) {
        return movieDataCache = map(movies, function (movie) {
          var ratingData = ratings[movie.id] || buildBaseRatingData();
          return merge(cloneDeep(movie), ratingData);
        });
      });
    });
}

/// - Search -------------------------------------------------------------------

var DEFAULT_OPTIONS = {
  emotions: []
};

function search(options) {
  options = merge({}, DEFAULT_OPTIONS, options);

  return getAllMovies()
    .then(filterByEmotions(options.emotions))
}

function filterByEmotions(emotions) {
  const matchingGenres = mapEmotionsToGenres(emotions);

  return function (movies) {
    return filter(movies, function (movie) {
      return 0 <= findIndex(matchingGenres, function (genre) {
        return movie.genres.indexOf(genre) >= 0;
      });
    });
  };
}

/// - Caching features ---------------------------------------------------------

var initPromise;

function init() {
  if (initPromise) return initPromise;

  return initPromise = Promise.all([loadMovies(), loadRatings()])
    .then(returnNull);
}

/// - Processing flow ----------------------------------------------------------

module.exports = {
  loadMovies: loadMovies,
  loadRatings: loadRatings,
  getAllMovies: getAllMovies,
  getAllMoviesSync: syncify(getAllMovies),
  search: search,
  searchSync: syncify(search),
  init: function () {
    return init()
      .then(getAllMovies)
      .then(returnNull);
  }
};
