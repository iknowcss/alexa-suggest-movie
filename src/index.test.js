const proxyquire = require('proxyquire');

const sandbox = sinon.sandbox.create();

const alexaMock = {};

const index = proxyquire('./index', {
  'alexa-sdk': alexaMock
});

describe('index', function () {
  var mockAlexaObject;

  before(function () {
    alexaMock.handler = function () {
      return mockAlexaObject = {
        registerHandlers: sandbox.spy(),
        execute: sandbox.spy()
      };
    };
  });

  beforeEach(function () {
    sandbox.reset();
    mockAlexaObject = null;
  });

  describe('handler definition', function () {
    var handlers;

    beforeEach(function () {
      index.handler();
      handlers = mockAlexaObject.registerHandlers.firstCall.args[0];
    });

    it('initialises', function () {
      expect(mockAlexaObject.registerHandlers).to.have.been.calledOnce;
      expect(mockAlexaObject.execute).to.have.been.calledOnce;
    });

    it('defines GetMovie', function () {
      handlers['GetMovie']();
    });
  });
});