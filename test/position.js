/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('context.position', function () {
    it('should get position', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            return '<li>' + context.position() + '</li>';
        });

        jsotbh
            .apply([ { block: 'li' }, { block: 'li' }, { block: 'li' } ])
            .should.equal('<li>0</li><li>1</li><li>2</li>');
    });
});
