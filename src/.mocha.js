var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

global.expect = chai.expect;
global.assert = chai.assert;
global.sinon = sinon;

chai.use(sinonChai);