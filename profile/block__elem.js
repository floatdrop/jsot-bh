var JSOTBH = require('..');
var jsotbh = new JSOTBH();

jsotbh.match('html', function (ctx) {
    ctx.tag('html');
});
jsotbh.match('html__body', function () { return '<body>'; });

var result = jsotbh
    .apply({ block: 'html', content: { elem: 'body' } });

console.log(result);
