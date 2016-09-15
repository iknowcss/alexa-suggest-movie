const proxyquire = require('proxyquire');

const sandbox = sinon.sandbox.create();

const alexaMock = {};

const index = proxyquire('./index', {
  'alexa-sdk': alexaMock
});

describe('index', function () {
  var mockAlexaObject;

  before(function () {
    alexaMock.handler = function (event, context) {
      return mockAlexaObject = {
        registerHandlers: sandbox.spy(),
        execute: sandbox.spy(),
        emit: sandbox.spy(),
        event: event,
        context: context
      };
    };
  });

  beforeEach(function () {
    sandbox.reset();
    mockAlexaObject = null;
  });

  describe('handler definition', function () {
    var handlers;

    function setup(event, context) {
      index.handler(event, context);
      handlers = mockAlexaObject.registerHandlers.firstCall.args[0];
    }

    it('initialises', function () {
      setup();
      expect(mockAlexaObject.registerHandlers).to.have.been.calledOnce;
      expect(mockAlexaObject.execute).to.have.been.calledOnce;
    });

    it('defines GetMovie', function () {
      setup({
        request: {intent: {slots: {
          emotion: {value: 'happy'}
        }}}
      });

      handlers['GetMovie'].call(mockAlexaObject);

      var lastCallArgs = mockAlexaObject.emit.lastCall.args;
      expect(lastCallArgs[0]).to.eql(':tellWithCard');
      expect(lastCallArgs[1]).to.eql('You will feel happy after watching Toy Story (1995)');
    });
  });
});