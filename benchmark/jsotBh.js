var JSOTBH = require('..');

module.exports = function (bemjson) {
    var jsotbh = new JSOTBH();
    return function (done) {
        var html = jsotbh.apply(bemjson);
        setImmediate(done.bind(null, html));
    };
};
