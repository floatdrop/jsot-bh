/* global describe, it */

var JSOT = require('..');
require('should');

describe('apply', function () {
    it('should concatinate output from array', function () {
        var jsot = new JSOT();
        jsot.apply([ 'some', ' ', 'string']).should.equal('some string');
    });

    it('should return string as is', function () {
        var jsot = new JSOT();
        jsot.apply('string').should.equal('string');
    });

    it('should find matcher for object', function () {
        var jsot = new JSOT();

        jsot.match('block', function(context) {
            return context;
        });

        jsot.apply({ block: 'html' }).should.equal('html');
    });

    it('should return empty string, if matcher not found', function () {
        var jsot = new JSOT();

        jsot.match('block', function(context) {
            return context;
        });

        jsot.apply({ flock: 'xml' }).should.equal('');
    });
});
