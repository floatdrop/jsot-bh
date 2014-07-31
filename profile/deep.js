var JSOTBH = require('..');
var jsotbh = new JSOTBH();

function construct(obj, depth) {
    if (depth < 5) {
        obj.content = [
            construct({ elem: 'elem' },  depth + 1),
            construct({ elem: 'elem' },  depth + 1),
            construct({ elem: 'elem' },  depth + 1)
        ];
    }
    return obj;
}

jsotbh.match('block__elem', function (ctx) {
    ctx.attr('wow', 'elem');
    return [
        ctx.json()
    ];
});

jsotbh.match('block', function (ctx) {
    ctx.tag('span');
});

var result = jsotbh
    // .apply(construct({ block: 'block' }, 0));
    .apply({ block: 'block' , content: { elem: 'elem' }});

console.log(result);
