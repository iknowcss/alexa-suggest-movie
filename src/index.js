var http = require('http');
var Alexa = require('alexa-sdk');

var APP_ID = '[your app id]';
var SKILL_NAME = 'Suggest Movie';

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetMovie');
    },

    'SuggestMovie': function () {
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
