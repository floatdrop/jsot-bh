/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('element matching', function () {
    it.only('should match on block with element in content object', function () {
        var jsotbh = new JSOTBH();
        jsotbh.match('html', function (ctx, json) {
            ctx.tag('html');
        });
        jsotbh.match('html__body', function () { return '<body>'; });

        jsotbh
            .apply({ block: 'html', content: { elem: 'body' } })
            .should.equal('<html><body></html>');
    });

    it('should match on block with element in content array', function () {
        var jsotbh = new JSOTBH();
        jsotbh.match('html', function (ctx) { return '<html>' + this.apply(ctx.content()) + '</html>'; });
        jsotbh.match('html__body', function () { return '<body/>'; });
        jsotbh.match('html__title', function () { return '<title/>'; });

        jsotbh
            .apply({ block: 'html', content: [{ elem: 'body' }, { elem: 'surprise' }] })
            .should.equal('<html><title/><body/></html>');
    });

    it('should match on block with element with mods in content', function () {
        var jsotbh = new JSOTBH();
        jsotbh.match('ul', function (ctx) { return '<ul>' + this.apply(ctx.content()) + '</ul>'; });
        jsotbh.match('ul__li_hot_yes', function () { return '<li hot="yes"/>'; });

        jsotbh
            .apply({ block: 'html', content: { elem: 'li', mods: { hot: 'yes' } } })
            .should.equal('<ul><li hot="yes"></li></ul>');
    });

    it('should match on block with element with mods in content array', function () {
        var jsotbh = new JSOTBH();
        jsotbh.match('ul', function (ctx) { return '<ul>' + this.apply(ctx.content()) + '</ul>'; });
        jsotbh.match('ul__li_hot_yes', function () { return '<li hot="yes"/>'; });

        jsotbh
            .apply({ block: 'html', content: [
                { elem: 'li', mods: { hot: 'yes' } },
                { elem: 'li' }
            ]})
            .should.equal('<ul><li hot></li></ul>');
    });
});
