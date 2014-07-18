/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('context.bem', function () {
    it('should set and get bem', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.bem('Such bem');
            return '<Wow>' + context.bem() + '</Wow>';
        });

        jsotbh
            .apply({ block: 'li' })
            .should.equal('<Wow>Such bem</Wow>');
    });

    it('should not override bem', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
                context.bem('Such bem');
                return '<Wow>' + context.bem() + '</Wow>';
            });

            jsotbh
                .apply({ block: 'li', bem: 'Wow' })
                .should.equal('<Wow>Wow</Wow>');
    });

    it('should override tag with force param', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.bem('Such bem', true);
            return '<Wow>' + context.bem() + '</Wow>';
        });

        jsotbh
            .apply({ block: 'li', bem: 'Wow' })
            .should.equal('<Wow>Such bem</Wow>');
    });
});
