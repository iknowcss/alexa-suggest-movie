var genre_emotions = require('../data/genre_emotions.json')

module.exports = function (emotions) {

  var matching_genres = [];

  console.log("looking for genres for these emotions:"+emotions);

  emotions.forEach(function(emotion) {

    console.log("matching emotion:"+emotion);
       for(var genreKey in genre_emotions) {

         console.log("key:" + genreKey + ", value:" + genre_emotions[genreKey]);

         if (genre_emotions[genreKey].indexOf(emotion) > -1) {
           console.log("emotion:" + emotion + " matches genre:" + genreKey);
           matching_genres.push(genreKey)
         }
       }


    }, this);

  console.log("emotions:" + emotions + " matches genres:" + matching_genres);
  return matching_genres;
  //return ["Horror"];
};