/* global describe, it, beforeEach */

var JSOTBH = require('..');
require('should');

describe('applyBase', function () {
    var jsotbh;
    beforeEach(function() {
        jsotbh = new JSOTBH();
    });

    it('should apply templates for new mod', function() {
        jsotbh.match('button', function(ctx,json) {
            ctx.mod('type', 'span');
            console.log(json);
        });
        jsotbh.match('button_type_span', function(ctx) {
            ctx.tag('span');
        });
        jsotbh.apply({ block: 'button' }).should.equal(
            '<span class="button button_type_span"></span>'
        );
    });

    it('should apply base matcher for content', function() {
        jsotbh.match('button', function(ctx) {
            ctx.content([
                { elem: 'base-before' },
                ctx.content(),
                { elem: 'base-after' }
            ], true);
        });
        jsotbh.match('button', function(ctx) {
            ctx.applyBase();
            ctx.content([
                { elem: 'before' },
                ctx.content(),
                { elem: 'after' }
            ], true);
        });
        jsotbh.apply({ block: 'button', content: 'Hello' }).should.equal(
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
        jsotbh.match('button', function(ctx) {
            return [
                { elem: 'base-before' },
                ctx.json(),
                { elem: 'base-after' }
            ];
        });
        jsotbh.match('button', function(ctx) {
            ctx.applyBase();
            return [
                { elem: 'before' },
                ctx.json(),
                { elem: 'after' }
            ];
        });
        jsotbh.apply({ block: 'button', content: 'Hello' }).should.equal(
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
