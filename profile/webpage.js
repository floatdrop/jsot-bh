var JSOTBH = require('..');
var jsotbh = new JSOTBH();

function block(tag) {
    return function (context, json) {
        context.tag(tag);
        var attrs = '';
        if (json.attrs) {
            attrs = ' ';
            for (var key in json.attrs) {
                attrs = key + '="' + json.attrs[key] + '"';
            }
        }
        return '<' + context.tag() + attrs + '>' + context.apply(json.content) + '</' + context.tag() + '>';
    };
}

jsotbh.match('html', block('html'));
jsotbh.match('head', block('head'));
jsotbh.match('title', block('title'));
jsotbh.match('body', block('body'));
jsotbh.match('p', block('p'));
jsotbh.match('a', block('a'));

var bemjson = require('../benchmark/bemjsons/webpage.js');

for (var i = 0; i < 100000; i++) {
    jsotbh.apply(bemjson);
}
