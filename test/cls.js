/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('context.cls', function () {
    it('should set and get cls', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.cls('Such cls');
            return '<Wow>' + context.cls() + '</Wow>';
        });

        jsotbh
            .apply({ block: 'li' })
            .should.equal('<Wow>Such cls</Wow>');
    });

    it('should not override cls', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
                context.cls('Such cls');
                return '<Wow>' + context.cls() + '</Wow>';
            });

            jsotbh
                .apply({ block: 'li', cls: 'Wow' })
                .should.equal('<Wow>Wow</Wow>');
    });

    it('should override tag with force param', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.cls('Such cls', true);
            return '<Wow>' + context.cls() + '</Wow>';
        });

        jsotbh
            .apply({ block: 'li', cls: 'Wow' })
            .should.equal('<Wow>Such cls</Wow>');
    });
});
