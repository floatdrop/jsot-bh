/* global describe, it */

var jsotbh = new (require('..'))();
var bh = new (require('bh').BH)();
require('should');

describe('testing rendering vs bh', function () {
    it('empty bemjson', function () {
        var bemjson = {};
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.tag', function () {
        var bemjson = { tag: 'html' };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.content', function () {
        var bemjson = { content: 'string' };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.attrs', function () {
        var bemjson = { attrs: { some: 'attr"ibute' } };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.bem', function () {
        var bemjson = { bem: 'true' };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.cls', function () {
        var bemjson = { cls: 'class' };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.block', function () {
        var bemjson = { block: 'html' };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.block_mod', function () {
       var bemjson = { block: 'html', mods: { mod: true } };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.block_mod_yes', function () {
       var bemjson = { block: 'html', mods: { mod: 'yes' } };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.block__elem', function () {
        var bemjson = { block: 'html', content: { elem: 'body' } };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.block__elem_mod', function () {
        var bemjson = { block: 'html', content: { elem: 'body', elemMods: { mod: true } } };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('bemjson.block__elem_mod_yes', function () {
        var bemjson = { block: 'html', content: { elem: 'body', elemMods: { mod: 'yes' } } };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.block.content === "string"', function () {
        var bemjson = { block: 'html', content: 'string' };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.block.content === "object" (empty)', function () {
        var bemjson = { block: 'html', content: {} };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.block.content === "object" (elem)', function () {
        var bemjson = { block: 'html', content: { elem: 'body' } };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.block.content === "object" (block)', function () {
        var bemjson = { block: 'html', content: { block: 'body' } };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.block.content === "array" (empty)', function () {
        var bemjson = { block: 'html', content: [] };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.block.content === "array" (elems)', function () {
        var bemjson = { block: 'html', content: [{ elem: 'body' }, { elem: 'body' }] };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.block.content === "array" (blocks)', function () {
        var bemjson = { block: 'html', content: [{ block: 'body' }, { block: 'body' }] };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.mix === "object" (block)', function () {
        var bemjson = { block: 'html', mix: { block: 'body', mods: { red: true } } };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.mix === "object" (elem)', function () {
        var bemjson = { block: 'html', mix: { elem: 'body', mods: { red: true } } };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.js === "object"', function () {
        var bemjson = { js: { javascript: 'parameter' } };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.js === "boolean"', function () {
        var bemjson = { js: true };
        jsotbh.apply(bemjson).should.equal(bh.apply(bemjson));
    });

});
