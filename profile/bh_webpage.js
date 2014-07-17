var BH = require('bh').BH;
var bh = new BH();

bh.match('html', function(ctx) {
  ctx.tag('html');
});

bh.match('head', function(ctx) {
  ctx.tag('head');
});

bh.match('title', function(ctx) {
  ctx.tag('title');
});

bh.match('body', function(ctx) {
  ctx.tag('body');
});

bh.match('p', function(ctx) {
  ctx.tag('p');
});

bh.match('a', function(ctx) {
  ctx.tag('a');
});

var bemjson = require('../benchmark/bemjsons/webpage.js');
for (var i = 0; i < 1e5; i++) {
    bh.apply(bemjson);
}
