/* global describe, it */

var JSOTBH = require('..');
require('should');

describe('context.mods', function () {
    it('should set and get mods', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('pre', function (context) {
            context.mods({ data: 'wow' });
            return '<pre>' + JSON.stringify(context.mods()) + '</pre>';
        });

        jsotbh
            .apply({ block: 'pre' })
            .should.equal('<pre>{"data":"wow"}</pre>');
    });

    it('should extend already defined mods', function () {
        var jsotbh = new JSOTBH();

        jsotbh.match('pre', function (context) {
            context.mods({ data: 'wow' });
            return '<pre>' + JSON.stringify(context.mods()) + '</pre>';
        });

        jsotbh
            .apply({ block: 'pre', mods: { such: 'extend' } })
            .should.equal('<pre>{"such":"extend","data":"wow"}</pre>');
    });

});
