/* global describe, it, beforeEach */

var _ = require('lodash');
var BH = require('bh').BH;
var JSOTBH = require('../..');

describe.skip('elements', function () {
    var bh;
    var jsotbh;

    beforeEach(function () {
        bh = new BH();
        jsotbh = new JSOTBH();
    });

    it('popup', function () {
        var bemjson = require('./elements/jsons/popup.json');
        require('./elements/popup.js')(jsotbh);
        require('./elements/popup.js')(bh);
        var jsothtml = jsotbh.apply(_.cloneDeep(bemjson));
        var bhhtml = bh.apply(_.cloneDeep(bemjson));
        jsothtml.should.eql(bhhtml);
    });

    it('promo-page', function () {
        var bemjson = require('./elements/jsons/promo-page.json');
        require('./elements/promo-page.js')(jsotbh);
        require('./elements/promo-page.js')(bh);
        var jsothtml = jsotbh.apply(_.cloneDeep(bemjson));
        var bhhtml = bh.apply(_.cloneDeep(bemjson));
        jsothtml.should.eql(bhhtml);
    });
});
