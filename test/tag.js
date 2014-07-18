/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('context.tag', function () {
    it('should set and get tag', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.tag('li');
            return '<' + context.tag() + '></' + context.tag() + '>';
        });

        jsotbh
            .apply({ block: 'li' })
            .should.equal('<li></li>');
    });

    it('should not override tag', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.tag('li');
            return '<' + context.tag() + '></' + context.tag() + '>';
        });

        jsotbh
            .apply({ block: 'li', tag: 'div' })
            .should.equal('<div></div>');
    });

    it('should override tag with force param', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.tag('li', true);
            return '<' + context.tag() + '></' + context.tag() + '>';
        });

        jsotbh
            .apply({ block: 'li', tag: 'div' })
            .should.equal('<li></li>');
    });
});
