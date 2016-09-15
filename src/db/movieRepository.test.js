var defer = require('lodash/defer');
var map = require('lodash/map');
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

  it('synchronously gets data on all movies', function () {
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

  describe('searching', function () {
    it('synchronously searches for movies which match the given emotions', function () {
      var result = movieRepository.searchSync({
        emotions: ['exhilarated', 'inspired']
      });

      var movieTitles = map(result, function (movie) {
        return movie.title;
      });

      expect(movieTitles).to.contain('Sleeper (1973)');
    });
  });
});
