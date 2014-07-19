/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('element matching', function () {
    it('should match on block with element in content object', function () {
        var jsotbh = new JSOTBH();
        jsotbh.match('html', function (ctx) {
            ctx.tag('html');
        });
        jsotbh.match('html__body', function (ctx) { ctx.tag('body'); });

        jsotbh
            .apply({ block: 'html', content: { elem: 'body' } })
            .should.equal('<html><body></body></html>');
    });

    it('should match on block with element in content array', function () {
        var jsotbh = new JSOTBH();
        jsotbh.match('html', function (ctx) {
            ctx.tag('html');
        });
        jsotbh.match('html__body', function (ctx) {
            ctx.tag('body');
        });
        jsotbh.match('html__title', function () { return '<title/>'; });

        jsotbh
            .apply({ block: 'html', content: [{ elem: 'body' }, { elem: 'surprise' }] })
            .should.equal('<html><body></body><div></div></html>');
    });

    it('should match on block with element with mods in content', function () {
        var jsotbh = new JSOTBH();
        jsotbh.match('ul', function (ctx) { ctx.tag('ul'); });
        jsotbh.match('ul__li_hot_yes', function (ctx) {
            ctx.tag('li');
            ctx.attr('hot', 'yes');
        });

        jsotbh
            .apply({ block: 'ul', content: { elem: 'li', elemMods: { hot: 'yes' } } })
            .should.equal('<ul><li hot="yes"></li></ul>');
    });

    it('should match on block with element with mods in content array', function () {
        var jsotbh = new JSOTBH();
        jsotbh.match('ul', function (ctx, json) {
            ctx.tag('ul');
        });
        jsotbh.match('ul__li_hot_yes', function (ctx, json) {
            ctx.tag('li');
            ctx.attr('hot', 'yes');
        });

        jsotbh
            .apply({ block: 'ul', content: [
                { elem: 'li', elemMods: { hot: 'yes' } },
                { elem: 'li' }
            ]})
            .should.equal('<ul><li hot="yes"></li><div></div></ul>');
    });
});
