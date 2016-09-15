var mapEmotionsToGenres = require('./mapEmotionsToGenres');

describe('mapEmotionsTo', function () {
  it('maps a single emotion to one or more genres', function () {
    expect(mapEmotionsToGenres(['scared'])).to.include.members(['Horror']);
  });
});
