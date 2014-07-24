/* global describe, it, beforeEach */

var BH = require('..');
require('should');

describe('ctx.isSimple()', function() {
    var bh = new BH();
    it('should return true for undefined', function() {
        bh.isSimple().should.equal(true);
    });
    it('should return true for null', function() {
        bh.isSimple(null).should.equal(true);
    });
    it('should return true for number', function() {
        bh.isSimple(1).should.equal(true);
    });
    it('should return true for string', function() {
        bh.isSimple('1').should.equal(true);
    });
    it('should return true for boolean', function() {
        bh.isSimple(false).should.equal(true);
    });
    it('should return false for array', function() {
        bh.isSimple([]).should.equal(false);
    });
    it('should return false for object', function() {
        bh.isSimple({}).should.equal(false);
    });
});
