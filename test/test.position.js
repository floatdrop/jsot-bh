/* global describe, it, beforeEach */

var BH = require('..');
require('should');

describe('ctx.position()', function() {
    var bh;
    beforeEach(function() {
        bh = new BH();
    });
    it('should calc position', function() {
        bh.match('button__inner', function(ctx) {
            ctx.mod('pos', ctx.position());
        });
        bh.apply({ block: 'button', content: [
            { elem: 'inner' },
            { elem: 'inner' },
            { elem: 'inner' }
        ]}).should.equal(
            '<div class="button">' +
            '<div class="button__inner button__inner_pos_0"></div>' +
            '<div class="button__inner button__inner_pos_1"></div>' +
            '<div class="button__inner button__inner_pos_2"></div>' +
            '</div>'
        );
    });
    it('should calc position with array mess', function() {
        bh.match('button__inner', function(ctx) {
            ctx.mod('pos', ctx.position());
        });
        bh.apply({ block: 'button', content: [
            [ { elem: 'inner' } ],
            [ { elem: 'inner' }, [ { elem: 'inner' } ] ]
        ]}).should.equal(
            '<div class="button">' +
            '<div class="button__inner button__inner_pos_0"></div>' +
            '<div class="button__inner button__inner_pos_1"></div>' +
            '<div class="button__inner button__inner_pos_2"></div>' +
            '</div>'
        );
    });
    it('should position for single element is -1', function() {
        bh.match('button__inner', function(ctx) {
            ctx.mod('pos', ctx.position());
        });
        bh.apply({ block: 'button', content: { elem: 'inner' } }).should.equal(
            '<div class="button">' +
            '<div class="button__inner button__inner_pos_-1"></div>' +
            '</div>'
        );
    });
});