/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('context.json', function () {
    it('should get current element', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            return '<Wow>' + context.json().got + '</Wow>';
        });

        jsotbh
            .apply({ block: 'li', got: true })
            .should.equal('<Wow>true</Wow>');
    });
});
