/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('bh-matchers', function () {
    it.only('should match on block', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('html', function (context) {
            return '<html>' + jsotbh.apply(context.content) + '</html>';
        });

        jsotbh.apply({
            block: 'html',
            content: [ 'Wow', ' ', 'Such', ' ', 'BEM' ]
        }).should.equal('<html>Wow Such BEM</html>');
    });

    it('should work', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('html', function (context) {
            return '<html>' + jsotbh.apply(context.content) + '</html>';
        });

        jsotbh.match('p_bold_yes', function (context) {
            return '<p><b>' + jsotbh.apply(context.content) + '</b></p>';
        })

        jsotbh.match('p', function (context) {
            return '<p>' + jsotbh.apply(context.content) + '</p>';
        });

        jsotbh.apply({
            block: 'html',
            content: [
                { block: 'p', content: 'You' },
                { block: 'p', blockMods: { bold: 'yes' }, content: 'Rock!' }
            ]
        }).should.equal('<html><p>You</p><p><b>Rock!</b></p></html>');
    });
});
