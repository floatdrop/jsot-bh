/* global describe, it, beforeEach */

var BH = require('..');
require('should');

describe('ctx.isSimple()', function() {
    it('should return true for undefined', function() {
        BH.prototype.isSimple().should.equal(true);
    });
    it('should return true for null', function() {
        BH.prototype.isSimple(null).should.equal(true);
    });
    it('should return true for number', function() {
        BH.prototype.isSimple(1).should.equal(true);
    });
    it('should return true for string', function() {
        BH.prototype.isSimple('1').should.equal(true);
    });
    it('should return true for boolean', function() {
        BH.prototype.isSimple(false).should.equal(true);
    });
    it('should return false for array', function() {
        BH.prototype.isSimple([]).should.equal(false);
    });
    it('should return false for object', function() {
        BH.prototype.isSimple({}).should.equal(false);
    });
});
