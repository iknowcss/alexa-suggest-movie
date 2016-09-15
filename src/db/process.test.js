var process = require('./process');

describe.only('data processing', function () {
  it('parses movies', function () {
    return process()
      .then(function (result) {
        expect(result[0]).to.eql({
          movieId: 1,
          title: 'Toy Story (1995)',
          genres: ['Adventure', 'Animation', 'Children', 'Comedy', 'Fantasy']
        });
      });
  });
});
