/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('bh-match', function () {
    it('should match on block', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('html', function (context, json) {
            return '<html>' + jsotbh.apply(json.content) + '</html>';
        });

        jsotbh.apply({
            block: 'html',
            content: [ 'Wow', ' ', 'Such', ' ', 'BEM' ]
        }).should.equal('<html>Wow Such BEM</html>');
    });

    it('should work', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('html', function (context, json) {
            return '<html>' + jsotbh.apply(json.content) + '</html>';
        });

        jsotbh.match('p', function (context, json) {
            return '<p>' + jsotbh.apply(json.content) + '</p>';
        });

        jsotbh.match('p_bold_yes', function (context, json) {
            return '<p><b>' + jsotbh.apply(json.content) + '</b></p>';
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
