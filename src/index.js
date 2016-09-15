const http = require('http');
const Alexa = require('alexa-sdk');
const movieRepository = require('./db/dataLoader');

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
    var emotion = this.event.request.intent.slots.emotion.value;

    var movies = movieRepository.getAllMoviesSync();
    var movie = movies[0];
    var speechOutput = 'You will feel ' + emotion + 'after watching ' + movie.title;

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
