/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('context.content', function () {
    it('should set and get content', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.content('Such content');
            return '<Wow>' + context.content() + '</Wow>';
        });

        jsotbh
            .apply({ block: 'li' })
            .should.equal('<Wow>Such content</Wow>');
    });

    it('should not override content', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
                context.content('Such content');
                return '<Wow>' + context.content() + '</Wow>';
            });

            jsotbh
                .apply({ block: 'li', content: 'Wow' })
                .should.equal('<Wow>Wow</Wow>');
    });

    it('should override tag with force param', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.content('Such content', true);
            return '<Wow>' + context.content() + '</Wow>';
        });

        jsotbh
            .apply({ block: 'li', content: 'Wow' })
            .should.equal('<Wow>Such content</Wow>');
    });
});
