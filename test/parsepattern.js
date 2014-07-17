/* global describe, it */

var parsePattern = require('..').prototype.parsePattern;
require('should');

describe('Parse pattern', function () {
    it('should support block', function () {
        parsePattern('html').should.eql({
            block: 'html'
        });
    });

    it('should support block_blockMod', function () {
        parsePattern('html_visible').should.eql({
            block: 'html',
            blockMods: {
                visible: true
            }
        });
    });

    it('should support block_blockMod_value', function () {
        parsePattern('html_visible_yes').should.eql({
            block: 'html',
            blockMods: {
                visible: 'yes'
            }
        });
    });

    it('should support block__elem', function () {
        parsePattern('html__head').should.eql({
            block: 'html',
            elem: 'head'
        });
    });

    it('should support block__elem_elemMod', function () {
        parsePattern('html__head_visible').should.eql({
            block: 'html',
            elem: 'head',
            mods: {
                visible: true
            }
        });
    });

    it('should support block__elem_elemMod_value', function () {
        parsePattern('html__head_visible_no').should.eql({
            block: 'html',
            elem: 'head',
            mods: {
                visible: 'no'
            }
        });
    });

    it('should support block_blockMod__elem_elemMod_value', function () {
        parsePattern('html_title__head_visible_no').should.eql({
            block: 'html',
            blockMods: {
                title: true
            },
            elem: 'head',
            mods: {
                visible: 'no'
            }
        });
    });

    it('should support block_blockMod_value__elem_elemMod_value', function () {
        parsePattern('html_title_tits__head_visible_no').should.eql({
            block: 'html',
            blockMods: {
                title: 'tits'
            },
            elem: 'head',
            mods: {
                visible: 'no'
            }
        });
    });

});
