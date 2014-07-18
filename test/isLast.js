/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('context.isLast', function () {
    it('should be truthy on last element', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            return '<li>' + context.isLast() + '</li>';
        });

        jsotbh
            .apply([ { block: 'li' }, { block: 'li' } ])
            .should.equal('<li>false</li><li>true</li>');
    });

    it('should be falsy on not last element', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            return '<li>' + context.isLast() + '</li>';
        });

        jsotbh
            .apply([ { block: 'li' }, { block: 'lo' } ])
            .should.equal('<li>false</li>');
    });
});
