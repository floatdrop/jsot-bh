/* global describe, it, beforeEach */

var BH = require('..');
require('should');

describe('ctx.apply()', function() {
    var bh;
    beforeEach(function() {
        bh = new BH();
    });
    it('should apply mixes to right ctx object', function() {
        bh.match('button', function(ctx) {
            ctx.mix({block: 'i-global'});
        });
        bh.match('button', function(ctx) {
            return [
                ctx.json()
            ];
        });
        bh.apply({ block: 'button' }).should.equal(
            '<div class="button i-global"></div>'
        );
    });
    it('should return valid processed element', function() {
        bh.match('button', function(ctx) {
            var inner = ctx.apply({ block: 'button', elem: 'inner' });
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
            var inner = ctx.apply({ elem: 'inner' });
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
