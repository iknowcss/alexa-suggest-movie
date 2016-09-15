var defer = require('lodash/defer');
var movieRepository = require('./movieRepository');

describe('Movie repository', function () {
  before(function () {
    return movieRepository.init();
  });

  it('parses movie data', function () {
    return movieRepository.loadMovies()
      .then(function (result) {
        expect(result['1']).to.eql({
          id: '1',
          title: 'Toy Story (1995)',
          genres: ['Adventure', 'Animation', 'Children', 'Comedy', 'Fantasy']
        });
      });
  });

  it('parses rating data synchronously', function () {
    return movieRepository.loadRatings()
      .then(function (result) {
        expect(result['1']).to.eql({
          ratingTotal: 90650,
          ratingCount: 232,
          averageRating: 391
        });
      })
      .then(function () {
        shouldFail = false;
      });
  });

  it('combines all data', function () {
    return movieRepository.getAllMovies()
      .then(function (result) {
        expect(result[0]).to.eql({
          id: '1',
          title: 'Toy Story (1995)',
          genres: ['Adventure', 'Animation', 'Children', 'Comedy', 'Fantasy'],
          ratingTotal: 90650,
          ratingCount: 232,
          averageRating: 391
        });
      });
  });

  it('combines all data synchronously', function () {
    var result = movieRepository.getAllMoviesSync();

    expect(result[0]).to.eql({
      id: '1',
      title: 'Toy Story (1995)',
      genres: ['Adventure', 'Animation', 'Children', 'Comedy', 'Fantasy'],
      ratingTotal: 90650,
      ratingCount: 232,
      averageRating: 391
    });
  });

  xit('searches for movies which match the given emotions', function () {
    return movieRepository.search({
      emotions: ['exhilarated', 'inspired']
    })
      .then(function (movies) {
        console.log('movies.length', movies.length);
      });
  });
});
