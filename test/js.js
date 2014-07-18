/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('context.js', function () {
    it('should set and get js', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.js('Such js');
            return '<Wow>' + context.js() + '</Wow>';
        });

        jsotbh
            .apply({ block: 'li' })
            .should.equal('<Wow>Such js</Wow>');
    });

    it('should not override js', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
                context.js('Such js');
                return '<Wow>' + context.js() + '</Wow>';
            });

            jsotbh
                .apply({ block: 'li', js: 'Wow' })
                .should.equal('<Wow>Wow</Wow>');
    });

    it('should override tag with force param', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('li', function (context) {
            context.js('Such js', true);
            return '<Wow>' + context.js() + '</Wow>';
        });

        jsotbh
            .apply({ block: 'li', js: 'Wow' })
            .should.equal('<Wow>Such js</Wow>');
    });
});
