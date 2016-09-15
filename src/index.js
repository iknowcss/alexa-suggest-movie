const http = require('http');
const Alexa = require('alexa-sdk');
const dataLoader = require('./db/dataLoader');

const APP_ID = '[your app id]';
const SKILL_NAME = 'Suggest Movie';

dataLoader.preloadCsvData();

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
        var speechOutput = 'You will feel ' + emotion + 'after watching DeadPool';

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, 'DeadPool');
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
