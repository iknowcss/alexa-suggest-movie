var emotionGenreMapper = require('./emotionGenreMapper');

describe('mapEmotionsTo', function () {
  describe('single emotion mapping', function () {
    it('maps "happy" to several genres', function () {
      var result = emotionGenreMapper.genresforEmotions(['happy']);
      expect(result).to.include('Comedy');
      expect(result).to.include('Animation');
      expect(result).not.to.include('Drama');
      expect(result).not.to.include('War');
    });

    it('maps "scared" to several genres', function () {
      var result = emotionGenreMapper.genresforEmotions(['scared']);
      expect(result).not.to.include('Comedy');
      expect(result).not.to.include('Animation');
      expect(result).to.include('Horror');
      expect(result).to.include('War');
    });
  });

  describe('multiple emotion mapping', function () {
    it('maps "scared" and "frightened" to several genres', function () {
      var result = emotionGenreMapper.genresforEmotions(['scared', 'frightened']);
      expect(result).to.include('Horror');
      expect(result).not.to.include('War');
    });

    it('maps "excited" and "exhilarated" to several genres', function () {
      var result = emotionGenreMapper.genresforEmotions(['excited', 'exhilarated']);
      expect(result).to.include('Action');
      expect(result).to.include('Adventure');
      expect(result).not.to.include('Comedy');
    });

    it('maps "excited", "exhilarated", "inspired" to several genres', function () {
      var result = emotionGenreMapper.genresforEmotions(['excited', 'exhilarated', 'inspired']);
      expect(result).not.to.include('Action');
      expect(result).to.include('Adventure');
      expect(result).to.include('Sci-Fi');
    });

    it('maps "excited", "exhilarated", "inspired" to no genres', function () {
      var result = emotionGenreMapper.genresforEmotions(['happy', 'sad']);
      expect(result).to.have.length(0);
    });
  });
});
