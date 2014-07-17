/* global describe, it */

var JSOT = require('..');
require('should');

describe('benchmark sample', function () {
    it('should generate valid output', function () {
        var jsot = new JSOT();

        jsot.match('html', function(context) {
            return '<html>' + jsot.apply(context) + '</html>';
        });

        jsot.apply({ html: 'content' }).should.equal('<html>content</html>');
    });

    it('should support parent link', function () {
        var jsot = new JSOT();

        jsot.match('block', function(context, parent) {
            return '<' + context + '>' + jsot.apply(parent.content) + '</' + context + '>';
        });

        jsot.apply({ block: 'html', content: [ 'some', 'tags' ] }).should.equal('<html>sometags</html>');
    });
});
