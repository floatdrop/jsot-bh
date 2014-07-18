/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('context.apply', function () {
    it('should match on block', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('html', function (context, json) {
            return '<html>' + context.apply(json.content) + '</html>';
        });

        jsotbh.apply({
            block: 'html',
            content: [ 'Wow', ' ', 'Such', ' ', 'BEM' ]
        }).should.equal('<html>Wow Such BEM</html>');
    });
});
