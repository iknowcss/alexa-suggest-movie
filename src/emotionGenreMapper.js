var forEach = require('lodash/forEach');
var intersection = require('lodash/intersection');

var genre_emotions = require('./data/genre_emotions.json')

function genresforEmotions(emotions) {

  var matching_genres = [];

  // console.log("looking for genres for these emotions:"+emotions);

  forEach(genre_emotions, function (genreEmotions, genre) {
    if (intersection(emotions, genreEmotions).length === emotions.length) {
      matching_genres.push(genre);
    }
  });

  // for (var genreKey in genre_emotions) {
  //
  //   //console.log("checking genre:" + genreKey + ", value:" + genre_emotions[genreKey]);
  //
  //   var matches = false;
  //
  //   emotions.forEach(function (emotion) {
  //     matches = false;
  //     if (genre_emotions[genreKey].indexOf(emotion) > -1) {
  //       //console.log("emotion:" + emotion + " matches genre:" + genreKey);
  //       matches = true;
  //     }
  //     else {
  //       //console.log("emotion:" + emotion + " does NOT match genre:" + genreKey);
  //       matches = false;
  //     }
  //   }, this);
  //
  //   if (matches) {
  //     //console.log("emotions:" + emotions + " matches genre:" + genreKey);
  //     matching_genres.push(genreKey)
  //   }
  // }
  //
  // console.log("emotions:" + emotions + " matches genres:" + matching_genres);
  return matching_genres;
};

module.exports = {
  genresforEmotions: genresforEmotions,
};