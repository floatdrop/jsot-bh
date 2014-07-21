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

    it('typeof bemjson.js === "object"', function () {
        var bemjson = { js: { javascript: 'parameter' } };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

    it('typeof bemjson.js === "boolean"', function () {
        var bemjson = { js: true };
        render(bemjson).should.equal(bh.apply(bemjson));
    });

});
