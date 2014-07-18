var JSOT = require('jsot');

var JSOTBH = function JSOTBH () {
    JSOT.call(this);

    this._contextObject = {
        apply: JSOT.prototype.apply.bind(this)
    };
};

JSOTBH.prototype = Object.create(JSOT.prototype);
JSOTBH.prototype.constructor = JSOTBH;

JSOTBH.prototype.parsePattern = function parsePattern(pattern) {
    var result = {};

    var blockElement = pattern.split('__');

    var blockArray = blockElement[0].split('_');
    result.block = blockArray[0];
    if (blockArray.length > 1) {
        result.blockMods = {};
        result.blockMods[blockArray[1]] = blockArray[2] || true;
    }

    if (blockElement.length > 1) {
        var elementArray = blockElement[1].split('_');
        result.elem = elementArray[0];
        if (elementArray.length > 1) {
            result.mods = {};
            result.mods[elementArray[1]] = elementArray[2] || true;
        }
    }

    return result;
};

JSOTBH.prototype.context = function context(bemjson) {
    this._current = bemjson;
    return this._contextObject;
};

JSOTBH.prototype.match = function matchBH(pattern, callback) {
    var self = this;
    JSOT.prototype.match.call(this, this.parsePattern(pattern), function (bemjson) {
        return callback(self.context(bemjson), bemjson);
    });
};

module.exports = JSOTBH;
