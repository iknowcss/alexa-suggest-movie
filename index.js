const http = require('http');
const Alexa = require('alexa-sdk');
const get = require('lodash/get');
const movieRepository = require('./src/db/movieRepository');

const APP_ID = '[your app id]';
const SKILL_NAME = 'Suggest Movie';

movieRepository.init();

const handlers = {
  'LaunchRequest': function () {
    this.emit('GetMovie');
  },

  'SuggestMovie': function () {
    this.emit(':tell', 'Let me see what I can find');
    this.emit('GetMovie');
  },

  'GetMovie': function () {
    // Create speech output
    var emotion = get(this.event, 'request.intent.slots.emotion.value');
    var emotion2 = get(this.event, 'request.intent.slots.fred.value');
    var emotion3 = get(this.event, 'request.intent.slots.mary.value');
    var speechOutput = 'You already feel that way';

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

    var movies = movieRepository.getAllMoviesSync();
    var movie = movies[0];
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

