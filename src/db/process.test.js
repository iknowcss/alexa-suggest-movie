var process = require('./process');

describe('data processing', function () {
  before(function () {
    return process.warmCache();
  });

  it('parses movie data', function () {
    return process.loadMovies()
      .then(function (result) {
        expect(result['1']).to.eql({
          id: '1',
          title: 'Toy Story (1995)',
          genres: ['Adventure', 'Animation', 'Children', 'Comedy', 'Fantasy']
        });
      });
  });

  it('aggregates rating data', function () {
    return process.loadRatings()
      .then(function (result) {
        expect(result['1']).to.eql({
          ratingTotal: 90650,
          ratingCount: 232,
          averageRating: 391
        });
      });
  });

  it('combines all data', function () {
    return process.loadMovieData()
      .then(function (result) {
        expect(result['1']).to.eql({
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
