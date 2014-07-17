var jsotBh = require('..');

module.exports = function (bemjson) {
    return function (done) {
        var html = jsotBh.apply(bemjson);
        setImmediate(done.bind(null, html));
    };
};
