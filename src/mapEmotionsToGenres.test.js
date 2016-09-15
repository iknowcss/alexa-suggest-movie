var mapEmotionsToGenres = require('./mapEmotionsToGenres');

describe('mapEmotionsTo', function () {
  it('maps a single emotion to one or more genres', function () {
    var result = mapEmotionsToGenres(['scared']);
    expect(result).to.include('Horror');
  });
  it('maps a single emotion to one or more genres', function () {
    var result = mapEmotionsToGenres(['happy']);
    expect(result).to.include('Comedy');
    expect(result).to.include('Animation');
  });
  it('maps a single emotion to one or more genres', function () {
    var result = mapEmotionsToGenres(['delighted']);
    expect(result).not.to.include('Drama');
    expect(result).not.to.include('War');
  });
});
