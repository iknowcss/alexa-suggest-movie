var defer = require('lodash/defer');
var movieRepository = require('./movieRepository');

describe('Movie repository', function () {
  before(function () {
    movieRepository.init();
  });

  it('parses movie data', function () {
    var result = movieRepository.loadMovies();

    expect(result['1']).to.eql({
      id: '1',
      title: 'Toy Story (1995)',
      genres: ['Adventure', 'Animation', 'Children', 'Comedy', 'Fantasy']
    });
  });

  it('parses rating data synchronously', function () {
    var result = movieRepository.loadRatings();

    expect(result['1']).to.eql({
      ratingTotal: 90650,
      ratingCount: 232,
      averageRating: 391
    });
  });

  it('combines all data', function () {
    var result = movieRepository.getAllMovies();

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
    var result = movieRepository.search({
      emotions: ['exhilarated', 'inspired']
    });

    console.log('result.length', result.length);
  });
});
