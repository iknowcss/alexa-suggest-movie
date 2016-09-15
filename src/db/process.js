var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');
var Papa = require('papaparse');

var readFile = Promise.promisify(fs.readFile);

const DATA_DIR_PATH = path.resolve(__dirname, '../../data');
const MOVIES_CSV = 'ml-latest-small/movies.csv';
const RATINGS_CSV = 'ml-latest-small/ratings.csv';
const LINKS_CSV = 'ml-latest-small/links.csv';

function readCsv(dataPath) {
  return readFile(path.resolve(DATA_DIR_PATH, dataPath), 'utf-8');
}

/// - Process movies.csv -------------------------------------------------------

function parseMovieDataFromCsv(csvData) {
  return new Promise(function (fulfill) {
    Papa.parse(csvData, {
      header: true,
      complete: function (results) {
        fulfill(results.data);
      }
    });
  });
}

function processMovieData(movies) {
  return movies
    .map(function (movie) {
      return {
        movieId: parseInt(movie.movieId, 10),
        title: movie.title,
        genres: movie.genres ? movie.genres.split('|') : []
      };
    });
}

function loadMovies() {
  return readCsv(MOVIES_CSV, 'utf-8')
    .then(parseMovieDataFromCsv)
    .then(processMovieData);
}

/// - Process ratings ----------------------------------------------------------

function loadRatings() {

}

/// - Process links ------------------------------------------------------------

/// - Processing flow ----------------------------------------------------------

module.exports = function () {
  return loadMovies();
};
