/* global describe, it, beforeEach */

var BH = require('../..');
require('should');

describe('Functional tests', function() {
    var bh;
    beforeEach(function() {
        bh = new BH();
    });

    it('returning new object do not causes infinite recursion', function() {
        bh.match('button', function(ctx) {
            ctx.mix([{ block: 'i-global', js: true }]);
        });
        bh.match('button', function(ctx, json) {
            return [{elem: 'html', content: [json]}];
        });
        bh.apply({ block: 'button' }).should.equal('<div class="button i-global i-bem" onclick="return {&quot;i-global&quot;:{}};"></div>');
    });

    it('returning new object do not causes infinite recursion', function() {
        bh.match('button', function(ctx) { return [ ctx.json() ]; });
        bh.apply({ block: 'button' }).should.equal('<div class="button"></div>');
    });
});
