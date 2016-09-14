var http = require('http')
    , Alexa = require('alexa-sdk')
    , APP_ID = "<your app id>",
    SKILL_NAME = 'Suggest Movie';


var handlers = {
    'LaunchRequest': function () {
        this.emit('GetMovie');
    },
    'SuggestMovie': function () {
        this.emit('GetMovie');
    },
    'GetMovie': function () {

        // Create speech output
        var speechOutput = "You will love to watch DealPool";

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, "DealPool")
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say suggest me a movie  , or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    }
};

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};