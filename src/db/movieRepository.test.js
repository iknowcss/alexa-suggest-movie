var defer = require('lodash/defer');
var map = require('lodash/map');
var pick = require('lodash/pick');
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
    var results;

    function runSearch(options) {
      results = movieRepository.searchSync(options);
    }

    function resultsWithFields() {
      var fields = [].slice.call(arguments);
      return map(results, function (movie) {
        return pick(movie, fields);
      });
    }

    it('searches for movies which match the given emotions', function () {
      runSearch({
        emotions: ['exhilarated', 'inspired']
      });

      expect(resultsWithFields('title')).to.contain({title: 'Sleeper (1973)'});
    });

    it('searches for movies which match the given emotions', function () {
      runSearch({
        emotions: ['exhilarated', 'inspired']
      });

      results.forEach(function (movie, i) {
        if (i <= 0) return;

        var betterMovie = results[i - 1];
        assert(
          betterMovie.averageRating >= movie.averageRating,
          'Expected "' + betterMovie.title + '" (rated ' + betterMovie.averageRating + ') ' +
          'to be at least as highly rated as  "' + movie.title + '" (rated ' + movie.averageRating + ')'
        );
      });
    });
  });
});
