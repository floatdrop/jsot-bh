/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('context.length', function () {
    it('should get length of parent array', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            return '<li>' + context.length() + '</li>';
        });

        jsotbh
            .apply([ { block: 'li' }, { block: 'li' }, { block: 'li' } ])
            .should.equal('<li>3</li><li>3</li><li>3</li>');
    });
});
