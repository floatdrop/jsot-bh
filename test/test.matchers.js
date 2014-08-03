/* global describe, it, beforeEach */

var Matchers = require('../matchers.js');
require('should');

describe.only('Matchers', function () {
    var matchers = new Matchers();
    matchers.add('block', 'block');
    matchers.add('block_mod', 'block_mod');
    matchers.add('block_mod1', 'block_mod1');
    matchers.add('block_mod_1', 'block_mod_1');
    matchers.add('block_mod1_1', 'block_mod1_1');
    matchers.add('block__elem', 'block__elem');
    matchers.add('block__elem_emod', 'block__elem_emod');
    matchers.add('block__elem_mod', 'block__elem_mod');
    matchers.add('block_mod__elem_emod', 'block_mod__elem_emod');
    matchers.add('block_mod1__elem_emod', 'block_mod1__elem_emod');

    it('block', function () {
        matchers.get({block: 'block'}).should.eql(['block']);
    });

    it('block_mod', function () {
        matchers.get({block: 'block', mods: {mod: true}})
        .should.eql(['block_mod', 'block']);
    });

    it('block_(mod + mod1)', function () {
        matchers.get({block: 'block', mods: {mod: true, mod1: true}})
        .should.eql(['block_mod1', 'block_mod', 'block']);
    });

    it('block_mod_1', function () {
        matchers.get({block: 'block', mods: {mod: '1'}})
        .should.eql(['block_mod_1', 'block']);
    });

    it('block__elem', function () {
        matchers.get({block: 'block', elem: 'elem'})
        .should.eql(['block_elem']);
    });

    it('block__elem_emod', function () {
        matchers.get({block: 'block', elem: 'elem', mods: {emod:true}})
        .should.eql(['block_elem_emod', 'block_elem']);
    });

    it('block__elem_mod', function () {
        matchers.get({block: 'block', elem: 'elem', mods: {mod:true}})
        .should.eql(['block_elem_mod', 'block_elem']);
    });

    it('block_mod__elem_emod', function () {
        matchers.get({block: 'block', elem: 'elem', mods: {mod:true, emod: true}})
        .should.eql(['block_mod__elem_emod', 'block__elem_mod', 'block__elem_emod', 'block__elem']);
    });

    it('block_mod1__elem_emod', function () {
        matchers.get({block: 'block', elem: 'elem', mods: {mod1:true, emod: true}})
        .should.eql(['block_mod1__elem_emod', 'block__elem_emod', 'block__elem']);
    });

    it('block_(mod + mod1)__elem_emod', function () {
        matchers.get({block: 'block', elem: 'elem', mods: {mod:true, mod1:true, emod: true}})
        .should.eql(['block_mod1__elem_emod', 'block_mod__elem_emod', 'block__elem_mod', 'block__elem_emod', 'block__elem']);
    });

});
