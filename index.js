var JSOT = require('jsot');
var fast = require('fast.js');

var JSOTBH = function JSOTBH () {
    JSOT.call(this);
};

JSOTBH.prototype = Object.create(JSOT.prototype);
JSOTBH.prototype.constructor = JSOTBH;

JSOTBH.prototype.content = function (value, force) {
    if (force) {
        this._current.element.content = value;
        return this;
    }

    if (value) {
        this._current.element.content = this._current.element.content === undefined ? value : this._current.element.content;
        return this;
    }

    return this._current.element.content;
};

JSOTBH.prototype.tag = function (tagName, force) {
    if (force) {
        this._current.element.tag = tagName;
        return this;
    }

    if (tagName !== undefined) {
        this._current.element.tag =
            this._current.element.tag === undefined ? tagName : this._current.element.tag;
        return this;
    }

    return this._current.element.tag;
};

JSOTBH.prototype.position = function () {
    return this._current.position;
};

JSOTBH.prototype.length = function () {
    return this._current.length;
};

JSOTBH.prototype.isFirst = function () {
    return this._current.position === 0;
};

JSOTBH.prototype.isLast = function () {
    return this._current.position === this._current.length - 1;
};

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

JSOTBH.prototype.match = function matchBH(pattern, callback) {
    JSOT.prototype.match.call(this, this.parsePattern(pattern), fast.bind(callback, this, this));
};

module.exports = JSOTBH;
