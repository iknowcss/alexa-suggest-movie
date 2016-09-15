var dataLoader = require('./dataLoader');

describe('data processing', function () {
  before(function () {
    return dataLoader.preloadCsvData();
  });

  it('parses movie data', function () {
    return dataLoader.loadMovies()
      .then(function (result) {
        expect(result['1']).to.eql({
          id: '1',
          title: 'Toy Story (1995)',
          genres: ['Adventure', 'Animation', 'Children', 'Comedy', 'Fantasy']
        });
      });
  });

  it('aggregates rating data', function () {
    return dataLoader.loadRatings()
      .then(function (result) {
        expect(result['1']).to.eql({
          ratingTotal: 90650,
          ratingCount: 232,
          averageRating: 391
        });
      });
  });

  it('combines all data', function () {
    return dataLoader.getAllMovies()
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
