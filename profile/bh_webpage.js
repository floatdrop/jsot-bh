var BH = require('bh').BH;
var bh = new BH();

bh.match('html_htmlMod', function(ctx) {
  ctx.tag('html');
});

var bemjson = require('../benchmark/bemjsons/webpage.js');
//for (var i = 0; i < 1e5; i++) {
    bh.apply(bemjson);
//}
