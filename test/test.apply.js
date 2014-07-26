/* global describe, it, beforeEach */

var BH = require('..');
require('should');

describe('ctx.apply()', function() {
    var bh;
    beforeEach(function() {
        bh = new BH();
    });
    it('should return valid processed element', function() {
        bh.match('button', function(ctx) {
            var inner = ctx.process({ block: 'button', elem: 'inner' });
            inner.tag.should.equal('span');
            ctx.content(inner);
        });
        bh.match('button__inner', function(ctx) {
            ctx.tag('span');
        });
        bh.apply({ block: 'button' }).should.equal(
            '<div class="button">' +
                '<span class="button__inner"></span>' +
            '</div>'
        );
    });
    it('should return valid processed element with no block name', function() {
        bh.match('button', function(ctx) {
            var inner = ctx.process({ elem: 'inner' });
            inner.tag.should.equal('span');
            ctx.content(inner);
        });
        bh.match('button__inner', function(ctx) {
            ctx.tag('span');
        });
        bh.apply({ block: 'button' }).should.equal(
            '<div class="button">' +
                '<span class="button__inner"></span>' +
            '</div>'
        );
    });
});
