const http = require('http');
const Alexa = require('alexa-sdk');
const get = require('lodash/get');
const movieRepository = require('./src/db/movieRepository');
const random = require('./src/random');

const APP_ID = '[your app id]';
const SKILL_NAME = 'Suggest Movie';
const MOVIE_RANDOMNESS = 100;

movieRepository.init();

const handlers = {
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

    if (emotion) {
      if (emotion2) {
        if (emotion3) {
          speechOutput = 'You will feel ' + emotion + ' ' + emotion2 + ' and '+ emotion3;
          emotions.push(emotion3);
        }
        else {
          speechOutput = 'You will feel ' + emotion + ' and ' + emotion2;
          emotions.push(emotion2);
        }
      }
      else {
        speechOutput = 'You will feel ' + emotion ;
        emotions.push(emotion);
      }
    }

    var movies = movieRepository.searchSync({
      emotions: emotions
    });
    var movie = movies.slice(0, MOVIE_RANDOMNESS)[random(MOVIE_RANDOMNESS)];

    var speechOutput = speechOutput + ' after watching ' + movie.title;

    this.emit(':tellWithCard', speechOutput, SKILL_NAME, movie.title);
  },

  'AMAZON.HelpIntent': function () {
    var speechOutput = 'You can say suggest me a movie  , or, you can say exit... What can I help you with?';
    var reprompt = 'What can I help you with?';
    this.emit(':ask', speechOutput, reprompt);
  }
};

exports.handler = function (event, context) {
  var alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

