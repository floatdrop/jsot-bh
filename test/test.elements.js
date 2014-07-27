/* global describe, it, beforeEach */

var elements = require('require-all')(__dirname + '/elements');
var BH = require('bh').BH;
var JSOTBH = require('..');

describe('elements', function () {
    var bh;
    var jsotbh;

    beforeEach(function () {
        bh = new BH();
        jsotbh = new JSOTBH();
    });

    for (var element in elements) {
        describe(element, function() {
            it('should be rendered like BH', function () {
                elements[element].matchers(bh);
                elements[element].matchers(jsotbh);
                jsotbh.apply(elements[element].json()).should.eql(bh.apply(elements[element].json()));
            });
        });
    }
});
