/* global describe, it */

var JSOTBH = require('..');
var should = require('should');

describe('context.generateId', function () {
    it('should return unique sequence ids', function () {
        var jsotbh = new JSOTBH();
        var id1 = jsotbh.generateId();
        var id2 = jsotbh.generateId();
        should.exist(id1);
        should.exist(id2);
        id1.should.not.equal(id2);
        id2.slice(4).should.equal((parseInt(id1.slice(4)) + 1).toString());
    });
});
