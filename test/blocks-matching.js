/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('block matching', function () {
    it('should match on block without mods', function () {
        var jsotbh = new JSOTBH();
        jsotbh.match('html', function () { return '<html/>'; });

        jsotbh
            .apply({ block: 'html' })
            .should.equal('<html/>');
    });

    it('should match on block with mods', function () {
        var jsotbh = new JSOTBH();
        jsotbh.match('input', function () { return '<input/>'; });
        jsotbh.match('input_disabled_yes', function () { return '<input disabled />'; });

        jsotbh
            .apply({ block: 'html', mods: { disabled: 'yes' } })
            .should.equal('<input disabled />');
    });
});
