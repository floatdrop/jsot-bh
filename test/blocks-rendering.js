/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('block rendering', function () {
    it('should render one block', function () {
        var jsotbh = new JSOTBH();
        jsotbh.match('html', function (ctx) { ctx.tag('html') });

        jsotbh
            .apply({ block: 'html' })
            .should.equal('<html></html>');
    });

    it('should render block with content blocks', function () {
        var jsotbh = new JSOTBH();
        jsotbh.match('p', function (ctx) { ctx.tag('p'); });

        jsotbh
            .apply({ block: 'html', content: [ { block: 'p' }, { block: 'p' } ] })
            .should.equal('<div><p></p><p></p></div>');
    });

    it('should render block with content blocks', function () {
        var jsotbh = new JSOTBH();
        jsotbh.match('html', function (ctx) { ctx.tag('html'); });
        jsotbh.match('p', function (ctx) { ctx.tag('p'); });

        jsotbh
            .apply({ block: 'html', content: [ { block: 'p' }, { block: 'p' } ] })
            .should.equal('<html><p></p><p></p></html>');
    });
});
