/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('context.attr', function () {
    it('should set and get attr', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.attr('data', 'wow');
            return '<li data="' + context.attr('data') + '"/>';
        });

        jsotbh
            .apply({ block: 'li' })
            .should.equal('<li data="wow"/>');
    });

    it('should not override attr', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.attr('data', 'wow');
            return '<li data="' + context.attr('data') + '"/>';
        });

        jsotbh
            .apply({ block: 'li', attrs: { data: 'such data' } })
            .should.equal('<li data="such data"/>');
    });

    it('should override attr with force flag', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.attr('data', 'wow', true);
            return '<li data="' + context.attr('data') + '"/>';
        });

        jsotbh
            .apply({ block: 'li', attrs: { data: 'such data' } })
            .should.equal('<li data="wow"/>');
    });

});
