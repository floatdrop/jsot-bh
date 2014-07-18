/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('context.attrs', function () {
    it('should set and get attrs', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('pre', function (context) {
            context.attrs({ data: 'wow' });
            return '<pre>' + JSON.stringify(context.attrs()) + '</pre>';
        });

        jsotbh
            .apply({ block: 'pre' })
            .should.equal('<pre>{"data":"wow"}</pre>');
    });

    it('should extend already defined attrs', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('pre', function (context) {
            context.attrs({ data: 'wow' });
            return '<pre>' + JSON.stringify(context.attrs()) + '</pre>';
        });

        jsotbh
            .apply({ block: 'pre', attrs: { such: 'extend' } })
            .should.equal('<pre>{"such":"extend","data":"wow"}</pre>');
    });

});
