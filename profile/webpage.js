var JSOTBH = require('..');
var jsotbh = new JSOTBH();

function block() {
    return function (context, json) {
        var attrs = '';
        if (json.attrs) {
            attrs = ' ';
            for (var key in json.attrs) {
                attrs = key + '="' + json.attrs[key] + '"';
            }
        }
        return '<' + json.block + attrs + '>' + context.apply(json.content) + '</' + json.block + '>';
    };
}

jsotbh.match('html', block('html'));
jsotbh.match('head', block('head'));
jsotbh.match('title', block('title'));
jsotbh.match('body', block('body'));
jsotbh.match('p', block('p'));
jsotbh.match('a', block('a'));

var bemjson = require('../benchmark/bemjsons/webpage.js');

//for (var i = 0; i < 1000; i++) {
    console.log(jsotbh.apply(bemjson));
//}
