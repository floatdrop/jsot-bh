/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('context.mod', function () {
    it('should set and get mod', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.mod('data', 'wow');
            return '<li data="' + context.mod('data') + '"/>';
        });

        jsotbh
            .apply({ block: 'li' })
            .should.equal('<li data="wow"/>');
    });

    it('should not override mod', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.mod('data', 'wow');
            return '<li data="' + context.mod('data') + '"/>';
        });

        jsotbh
            .apply({ block: 'li', mods: { data: 'such data' } })
            .should.equal('<li data="such data"/>');
    });

    it('should override mod with force flag', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.mod('data', 'wow', true);
            return '<li data="' + context.mod('data') + '"/>';
        });

        jsotbh
            .apply({ block: 'li', mods: { data: 'such data' } })
            .should.equal('<li data="wow"/>');
    });

});
