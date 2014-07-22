/* global describe, it */

var patchObject = require('../utils.js').patchContentElements;
require('should');

describe('Patch content', function () {
    it('should ignore object, if it is not a block', function () {
        patchObject({black: 'wow'})
        .should.eql({black: 'wow'});
    });

    it('should check for content property', function () {
        patchObject({block: 'wow'})
        .should.eql({block: 'wow'});
    });

    it('should ignore element in content, if it is not elem', function () {
        patchObject({block: 'wow', content: { block: 'such'} })
        .should.eql({block: 'wow', content: { block: 'such'} });
    });

    it('should patch elem, if it inside block', function () {
        patchObject({block: 'wow', content: { elem: 'such'} })
        .should.eql({block: 'wow', content: { block: 'wow', elem: 'such'} });
    });

    it('should copy block mods to content element', function () {
        patchObject({block: 'wow', mods: { my: 'mod' }, content: { elem: 'such'} })
        .should.eql({block: 'wow', mods: { my: 'mod' }, content: { block: 'wow', mods: { my: 'mod' }, elem: 'such'} });
    });

    it('should patch every elem in content array', function () {
        patchObject({block: 'wow', content: [{ elem: 'such'}, { elem: 'array'}] })
        .should.eql({block: 'wow', content: [{ block: 'wow', elem: 'such'}, { block: 'wow', elem: 'array'}] });
    });

});
