var JSOT = require('jsot');
var jsot = new JSOT();

jsot.match('block', function (context, parent) {
    var attrs = '';
    if (parent.attrs) {
        attrs = ' ';
        for (var key in parent.attrs) {
            attrs = key + '="' + parent.attrs[key] + '"';
        }
    }
    return '<' + context + attrs + '>' + jsot.apply(parent.content) + '</' + context + '>';
});

module.exports = jsot;
