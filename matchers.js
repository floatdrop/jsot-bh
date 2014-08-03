var parseBhId = require('parse-bem-identifier');

function Matchers() {

}

Matchers.prototype.add = function add(patternString, callback) {
    var pattern = parseBhId(patternString);
};

Matchers.prototype.get = function get(object) {
    var blockMatchers = this._matchers[object.block];
    var matchers = object.elem ? blockMatchers.forElem(object.elem) : blockMatchers;

    var result = [];

    return result;
};

module.exports = Matchers;
