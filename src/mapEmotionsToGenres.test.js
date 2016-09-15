var mapEmotionsToGenres = require('./mapEmotionsToGenres');

describe('mapEmotionsTo', function () {
  it('maps a single emotion (scared) to one or more genres', function () {
    var result = mapEmotionsToGenres(['scared']);
    expect(result).to.include('Horror');
    expect(result).to.include('War');
  });
  it('maps multiple emotion to one or more genres', function () {
    var result = mapEmotionsToGenres(['scared', 'frightened']);
    expect(result).to.include('Horror');
    expect(result).not.to.include('War');
  });
  it('maps happy emotion to one or more genres', function () {
    var result = mapEmotionsToGenres(['happy']);
    expect(result).to.include('Comedy');
    expect(result).to.include('Animation');
    expect(result).not.to.include('Drama');
    expect(result).not.to.include('War');
  });

  it('maps multiple emotion to one or more genres', function () {
      var result = mapEmotionsToGenres(['excited', 'exhilarated']);
      expect(result).to.include('Action');
      expect(result).to.include('Adventure');
      expect(result).not.to.include('Comedy');
  });

    it('maps multiple emotion to one or more genres', function () {
        var result = mapEmotionsToGenres(['excited', 'exhilarated', 'inspired']);
        expect(result).not.to.include('Action');
        expect(result).to.include('Adventure');
        expect(result).to.include('Sci-Fi');
    });
});
