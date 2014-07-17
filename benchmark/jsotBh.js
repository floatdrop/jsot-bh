var JSOTBH = require('..');
var jsotbh = new JSOTBH();

function block() {
    return function (context) {
        var attrs = '';
        if (context.attrs) {
            attrs = ' ';
            for (var key in context.attrs) {
                attrs = key + '="' + context.attrs[key] + '"';
            }
        }
        return '<' + context.block + attrs + '>' + jsotbh.apply(context.content) + '</' + context.block + '>';
    };
}

jsotbh.match('html', block('html'));
jsotbh.match('head', block('head'));
jsotbh.match('title', block('title'));
jsotbh.match('body', block('body'));
jsotbh.match('p', block('p'));
jsotbh.match('a', block('a'));

module.exports = function (bemjson) {
    return function (done) {
        var html = jsotbh.apply(bemjson);
        setImmediate(done.bind(null, html));
    };
};
