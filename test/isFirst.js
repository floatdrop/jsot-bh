/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('context.isFirst', function () {
    it('should be truthy on first element', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            return '<li>' + context.isFirst() + '</li>';
        });

        jsotbh
            .apply([ { block: 'li' }, { block: 'li' } ])
            .should.equal('<li>true</li><li>false</li>');
    });

    it('should be falsy on not first element', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            return '<li>' + context.isFirst() + '</li>';
        });

        jsotbh
            .apply([ { block: 'lo' }, { block: 'li' } ])
            .should.equal('<li>false</li>');
    });
});
