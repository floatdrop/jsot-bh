/* global describe, it */

var render = require('../utils').renderHtmlBlock;
var bh = new (require('bh').BH)();
require('should');

describe.only('html from bemjson convertation should render', function () {
    it('empty bemjson', function () {
        var bemjson = {};
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.tag', function () {
        var bemjson = { tag: 'html' };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.content', function () {
        var bemjson = { content: 'string' };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.attrs', function () {
        var bemjson = { attrs: { some: 'attr"ibute' } };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.bem', function () {
        var bemjson = { bem: 'true' };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.cls', function () {
        var bemjson = { cls: 'class' };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.block', function () {
        var bemjson = { block: 'html' };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.block_mod', function () {
       var bemjson = { block: 'html', mods: { mod: true } };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.block_mod_yes', function () {
       var bemjson = { block: 'html', mods: { mod: 'yes' } };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.block__elem', function () {
        var bemjson = { block: 'html', content: { elem: 'body' } };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.block__elem_mod', function () {
        var bemjson = { block: 'html', content: { elem: 'body', elemMods: { mod: true } } };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.block__elem_mod_yes', function () {
        var bemjson = { block: 'html', content: { elem: 'body', elemMods: { mod: 'yes' } } };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.block.content === "string"', function () {
        var bemjson = { block: 'html', content: 'string' };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.block.content === "object" (empty)', function () {
        var bemjson = { block: 'html', content: {} };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.block.content === "object" (elem)', function () {
        var bemjson = { block: 'html', content: { elem: 'body' } };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.block.content === "object" (block)', function () {
        var bemjson = { block: 'html', content: { block: 'body' } };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.block.content === "array" (empty)', function () {
        var bemjson = { block: 'html', content: [] };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.block.content === "array" (elems)', function () {
        var bemjson = { block: 'html', content: [{ elem: 'body' }, { elem: 'body' }] };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.block.content === "array" (blocks)', function () {
        var bemjson = { block: 'html', content: [{ block: 'body' }, { block: 'body' }] };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.mixs === "object" (block)', function () {
        var bemjson = { block: 'html', mix: { block: 'body', mods: { red: true } } };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.mixs === "object" (elem)', function () {
        var bemjson = { block: 'html', mix: { elem: 'body', mods: { red: true } } };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.js === "object"', function () {
        var bemjson = { js: { javascript: 'parameter' } };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.js === "boolean"', function () {
        var bemjson = { js: true };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

});
