/* global beforeEach, describe, it */

var JSOTBH = require('..');
require('should');

describe('ctx.mix', function() {
    var bh;

    beforeEach(function() {
        bh = new JSOTBH();
    });

    it('should return mix', function() {
        var mix = [{ block: 'mix' }];
        bh.match('button', function(ctx) {
            ctx.mix().should.equal(mix);
        });
        bh.apply({ block: 'button', mix: mix });
    });
    it('should set mix', function() {
        var mix = [{ block: 'mix' }];
        bh.match('button', function(ctx) {
            ctx.mix(mix);
            ctx.mix().should.eql(mix);
        });
        bh.apply({ block: 'button' });
    });
    it('should set single mix', function() {
        bh.match('button', function(ctx) {
            ctx.mix({ block: 'mix' });
            ctx.mix().should.eql({ block: 'mix' });
        });
        bh.apply({ block: 'button' });
    });
    it('should extend single mix', function() {
        bh.match('button', function(ctx) {
            ctx.mix({ block: 'mix2' });
            ctx.mix().should.eql([{ block: 'mix1' }, { block: 'mix2' }]);
        });
        bh.apply({ block: 'button', mix: { block: 'mix1' } });
    });
    it('should extend user mix', function() {
        bh.match('button', function(ctx) {
            ctx.mix([{ block: 'mix' }]);
            ctx.mix().should.eql([{ block: 'user-mix' }, { block: 'mix' }]);
        });
        bh.apply({ block: 'button', mix: [{ block: 'user-mix' }] });
    });
    it('should override declarations with force flag', function() {
        bh.match('button', function(ctx) {
            ctx.mix([{ block: 'mix2' }], true);
            ctx.mix().should.eql([{ block: 'mix2' }]);
        });
        bh.apply({ block: 'button', mix: [{ block: 'user-mix' }] });
    });
});
