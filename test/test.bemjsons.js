/* global describe, it, beforeEach */

var _ = require('lodash');
var BH = require('bh').BH;
var JSOTBH = require('..');

describe.only('bemjsons', function () {
    var bh;
    var jsotbh;

    beforeEach(function () {
        bh = new BH();
        jsotbh = new JSOTBH();
    });

    it('popup', function () {
        var bemjson = require('./elements/jsons/popup.json');
        var jsothtml = jsotbh.apply(_.cloneDeep(bemjson));
        var bhhtml = bh.apply(_.cloneDeep(bemjson));
        jsothtml.should.eql(bhhtml);
    });

    it.only('promo-page', function () {
        var bemjson = require('./elements/jsons/promo-page.json');
        var jsothtml = jsotbh.apply(_.cloneDeep(bemjson));
        var bhhtml = bh.apply(_.cloneDeep(bemjson));
        jsothtml.should.eql(bhhtml);
    });
});
