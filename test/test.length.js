/* global describe, it, beforeEach */

var BH = require('..');
require('should');

describe('ctx.length()', function() {
    var bh;
    beforeEach(function() {
        bh = new BH();
    });
    it('should return -1, if not in array', function() {
        bh.match('button', function(ctx) {
            ctx.mod('len', ctx.length());
        });
        bh.apply({ block: 'button' }).should.equal('<div class="button button_len_-1"></div>');
    });
    it('should return length of containing array', function() {
        bh.match('button', function(ctx) {
            ctx.mod('len', ctx.length());
        });
        bh.apply(
            [{ block: 'button' }, { block: 'button' }, { block: 'button' }]
        ).should.equal(
            '<div class="button button_len_3"></div>' +
            '<div class="button button_len_3"></div>' +
            '<div class="button button_len_3"></div>'
        );
    });

});
