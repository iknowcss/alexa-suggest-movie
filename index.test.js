const proxyquire = require('proxyquire');

const sandbox = sinon.sandbox.create();

const alexaMock = {};
const randomMock = sandbox.stub();

const index = proxyquire('./index', {
  'alexa-sdk': alexaMock,
  './src/random': randomMock
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
    randomMock.returns(0);
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
      expect(lastCallArgs[1]).to.match(/^You will feel happy after watching /);
    });

    it('GetMovie yields random movies', function () {
      setup({
        request: {intent: {slots: {
          emotion: {value: 'scared'}
        }}}
      });

      var lastSuggestion;

      randomMock.returns(1);
      handlers['GetMovie'].call(mockAlexaObject);
      lastSuggestion = mockAlexaObject.emit.lastCall.args[1];
      expect(lastSuggestion).to.eql('You will feel scared after watching Heaven & Earth (1993)');

      randomMock.returns(7);
      handlers['GetMovie'].call(mockAlexaObject);
      lastSuggestion = mockAlexaObject.emit.lastCall.args[1];
      expect(lastSuggestion).to.eql('You will feel scared after watching Beast of War, The (Beast, The) (1988)');
    });
  });
});