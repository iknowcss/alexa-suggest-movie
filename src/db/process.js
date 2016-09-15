var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');
var Papa = require('papaparse');

var readFile = Promise.promisify(fs.readFile);

const DATA_DIR_PATH = path.resolve(__dirname, '../../data');
const MOVIES_CSV_PATH = path.resolve(DATA_DIR_PATH, 'ml-latest-small/movies.csv');

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

/// - Processing flow ----------------------------------------------------------

module.exports = function () {
  return readFile(MOVIES_CSV_PATH, 'utf-8')
    .then(parseMovieDataFromCsv)
    .then(processMovieData);
};
