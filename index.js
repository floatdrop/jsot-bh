var JSOT = require('jsot');

var JSOTBH = function JSOTBH () {
    JSOT.call(this);
}

JSOTBH.prototype = Object.create(JSOT.prototype);
JSOTBH.prototype.constructor = JSOTBH;

JSOTBH.prototype.parsePattern = function parsePattern(pattern) {
    var result = {};

    var blockElement = pattern.split('__');

    var array = blockElement[0].split('_');
    result.block = array[0];
    if (array.length > 1) {
        result.blockMods = {};
        result.blockMods[array[1]] = array[2] || true;
    }

    if (blockElement.length > 1) {
        var array = blockElement[1].split('_');
        result.elem = array[0];
        if (array.length > 1) {
            result.mods = {};
            result.mods[array[1]] = array[2] || true;
        }
    }

    return result;
}

JSOTBH.prototype.match = function matchbh(pattern, callback) {
    JSOT.prototype.match.call(this, this.parsePattern(pattern), callback);
};

module.exports = JSOTBH;
