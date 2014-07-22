var JSOTBH = require('..');
var jsotbh = new JSOTBH();

jsotbh.match('button', function(ctx) {
    ctx.content([
        { elem: 'base-before' },
        ctx.content(),
        { elem: 'base-after' }
    ], true);
});

jsotbh.match('button', function(ctx) {
    ctx.applyBase();
    ctx.content([
        { elem: 'before' },
        ctx.content(),
        { elem: 'after' }
    ], true);
});

var r = jsotbh.apply({ block: 'button', content: 'Hello' });
console.log(r);
