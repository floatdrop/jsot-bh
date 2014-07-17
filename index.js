var JSOT = require('jsot');

var JSOTBH = function JSOTBH () {
    JSOT.call(this);
}

JSOTBH.prototype = Object.create(JSOT.prototype);
JSOTBH.prototype.constructor = JSOTBH;

JSOTBH.prototype.parsePattern = function parsePattern(pattern) {
    return {
        block: pattern
    };
}

JSOTBH.prototype.match = function matchbh(pattern, callback) {
    JSOT.prototype.match.call(this, this.parsePattern(pattern), callback);
};

module.exports = JSOTBH;
