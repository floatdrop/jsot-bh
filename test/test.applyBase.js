/* global describe, it, beforeEach */

var BH = require('..');
require('should');

describe('ctx.applyBase()', function() {
    var bh;
    beforeEach(function() {
        bh = new BH();
    });

    it('should apply templates for new mod', function() {
        bh.match('button_type_span', function(ctx) {
            ctx.tag('span');
        });
        bh.match('button', function(ctx) {
            ctx.mod('type', 'span');
            ctx.applyBase();
        });
        bh.apply({ block: 'button' }).should.equal(
            '<span class="button button_type_span"></span>'
        );
    });

    it('should apply base matcher for content', function() {
        bh.match('button', function(ctx) {
            ctx.content([
                { elem: 'base-before' },
                ctx.content(),
                { elem: 'base-after' }
            ], true);
        });
        bh.match('button', function(ctx) {
            ctx.applyBase();
            ctx.content([
                { elem: 'before' },
                ctx.content(),
                { elem: 'after' }
            ], true);
        });
        bh.apply({ block: 'button', content: 'Hello' }).should.equal(
            '<div class="button">' +
                '<div class="button__before"></div>' +
                '<div class="button__base-before"></div>' +
                'Hello' +
                '<div class="button__base-after"></div>' +
                '<div class="button__after"></div>' +
            '</div>'
        );
    });

    it('should apply base matcher while wrapping', function() {
        bh.match('button', function(ctx) {
            return [
                { block: 'button', elem: 'base-before' },
                ctx.json(),
                { block: 'button', elem: 'base-after' }
            ];
        });
        bh.match('button', function(ctx) {
            ctx.applyBase();
            return [
                { block: 'button', elem: 'before' },
                ctx.json(),
                { block: 'button', elem: 'after' }
            ];
        });
        bh.apply({ block: 'button', content: 'Hello' }).should.equal(
            '<div class="button__before"></div>' +
                '<div class="button__base-before"></div>' +
                    '<div class="button">' +
                        'Hello' +
                    '</div>' +
                '<div class="button__base-after"></div>' +
            '<div class="button__after"></div>'
        );
    });
});
