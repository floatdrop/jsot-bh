/* global describe, it, beforeEach */

var BH = require('..');
require('should');

describe('bh', function () {
    var bh;
    beforeEach(function() {
        bh = new BH();
    });

    describe('match', function() {
        it('should match for element in block', function () {
            bh.match('block__elem', function (ctx) { ctx.content('Hello'); });
            bh.apply({block: 'block', content: { elem: 'elem' }}).should.eql('<div class="block"><div class="block__elem">Hello</div></div>');
        });

        it('should continue to apply matchers for returned same block, but wrapped', function () {
            bh.match('block', function (ctx) { ctx.content('Hello'); });
            bh.match('block', function (ctx, json) { return [json]; });
            bh.apply({block: 'block'}).should.eql('<div class="block">Hello</div>');
        });

        it('should continue to apply matchers for returned same block', function () {
            bh.match('block', function (ctx) { ctx.content('Hello'); });
            bh.match('block', function (ctx, json) { return json; });
            bh.apply({block: 'block'}).should.eql('<div class="block">Hello</div>');
        });

        it('should continue to apply matchers for returned different block', function () {
            bh.match('block', function () { return { block: 'body' }; });
            bh.match('body', function (ctx) { ctx.content('Hello'); });
            bh.apply({block: 'block'}).should.eql('<div class="body">Hello</div>');
        });
    });

    describe('apply', function() {
        it('should render simple object', function() {
            bh.apply({block: 'block'}).should.eql('<div class="block"></div>');
        });

        it('should render content in simple object', function() {
            bh.apply({block: 'block', content: 'Hello'}).should.eql('<div class="block">Hello</div>');
        });

        it('should pass block to content element', function() {
            bh.apply({block: 'block', content: { elem: 'html' } }).should.eql('<div class="block"><div class="block__html"></div></div>');
        });

        it('should pass block to content element in array', function() {
            bh.apply({block: 'block', content: [{ block: 'tag', elem: 'html' }, { elem: 'html' }] })
            .should.eql('<div class="block"><div class="tag__html"></div><div class="block__html"></div></div>');
        });

        it('should not override block in content', function() {
            bh.apply({block: 'block', content: { block: 'tag', elem: 'html' } }).should.eql('<div class="block"><div class="tag__html"></div></div>');
        });
    });
});
