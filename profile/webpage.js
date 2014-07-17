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

var bemjson = require('../benchmark/bemjsons/webpage.js');

for (var i = 0; i < 1000; i++) {
    jsotbh.apply(bemjson);
}
