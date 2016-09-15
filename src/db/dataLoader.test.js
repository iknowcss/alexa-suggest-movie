var movieRepository = require('./dataLoader');

describe('data processing', function () {
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

  it('aggregates rating data', function () {
    return movieRepository.loadRatings()
      .then(function (result) {
        expect(result['1']).to.eql({
          ratingTotal: 90650,
          ratingCount: 232,
          averageRating: 391
        });
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
});
