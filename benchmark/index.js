/* global suite, bench, set */

var bh = require('./bh.js');
var jsotBh = require('./jsotBh.js');

suite('Simple', function () {
    set('mintime', 1000);

    bench('BH', bh(require('./bemjsons/simple.js')));
    bench('JSOT-BH', jsotBh(require('./bemjsons/simple.js')));
});

suite('Webpage', function () {
    set('mintime', 1000);

    bench('BH', bh(require('./bemjsons/webpage.js')));
    bench('JSOT-BH', jsotBh(require('./bemjsons/webpage.js')));
});
