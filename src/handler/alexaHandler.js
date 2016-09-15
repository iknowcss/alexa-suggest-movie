const Alexa = require('alexa-sdk');
const get = require('lodash/get');
const movieRepository = require('../db/movieRepository');
const random = require('../random');

const APP_ID = '[your app id]';
const SKILL_NAME = 'Suggest Movie';
const MOVIE_RANDOMNESS = 100;

module.exports = function (event, context) {
  movieRepository.init();

  var alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers({
    'LaunchRequest': function () {
      this.emit('GetMovie');
    },

    'SuggestMovie': function () {
      this.emit('GetMovie');
    },

    'GetMovie': function () {
      // Create speech output
      var emotion = get(this.event, 'request.intent.slots.emotion.value');
      var emotion2 = get(this.event, 'request.intent.slots.fred.value');
      var emotion3 = get(this.event, 'request.intent.slots.mary.value');
      var speechOutput = 'You already feel that way';
      var emotions = [];

      if (emotion) emotions.push(emotion);
      if (emotion2) emotions.push(emotion2);
      if (emotion3) emotions.push(emotion3);

      if (emotion) {
        if (emotion2) {
          if (emotion3) {
            speechOutput = 'You will feel ' + emotion + ' ' + emotion2 + ' and '+ emotion3;
          }
          else {
            speechOutput = 'You will feel ' + emotion + ' and ' + emotion2;
          }
        }
        else {
          speechOutput = 'You will feel ' + emotion ;
        }
      }

      var movies = movieRepository
        .searchSync({emotions: emotions});

      if (movies.length === 0) {
        speechOutput = 'I could not find any movies to make you feel all of those emotions';
        this.emit(':tell', speechOutput);
      } else {
        var movie = movies[random(Math.min(MOVIE_RANDOMNESS, movies.length))];
        var speechOutput = speechOutput + ' after watching ' + movie.title;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, movie.title);
      }
    },

    'AMAZON.HelpIntent': function () {
      var speechOutput = 'You can say suggest me a movie  , or, you can say exit... What can I help you with?';
      var reprompt = 'What can I help you with?';
      this.emit(':ask', speechOutput, reprompt);
    }
  });

  alexa.execute();
};
