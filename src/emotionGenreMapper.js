const forEach = require('lodash/forEach');
const intersection = require('lodash/intersection');

var genreEmotionMap = require('./data/genre_emotions.json');

function genresforEmotions(emotions) {
  var matchingGenres = [];

  forEach(genreEmotionMap, function (genreEmotions, genre) {
    if (intersection(emotions, genreEmotions).length === emotions.length) {
      matchingGenres.push(genre);
    }
  });
  return matchingGenres;
}

module.exports = {
  genresforEmotions: genresforEmotions
};