var JSOT = require('jsot');
var fast = require('fast.js');

var JSOTBH = function JSOTBH () {
    JSOT.call(this);
};

JSOTBH.prototype = Object.create(JSOT.prototype);
JSOTBH.prototype.constructor = JSOTBH;

JSOTBH.prototype.attr = function (key, value, force) {
    return this.setPropertyKeyValue('attrs', key, value, force);
};

JSOTBH.prototype.attrs = function (values, force) {
    if (values) {
        for (var key in values) {
            this.attr(key, values[key], force);
        }
        return this;
    }

    return this._current.element.attrs;
};

JSOTBH.prototype.cls = function (value, force) {
    return this.setPropertyValue('cls', value, force);
};

JSOTBH.prototype.content = function (value, force) {
    return this.setPropertyValue('content', value, force);
};

JSOTBH.prototype.tag = function (tagName, force) {
    return this.setPropertyValue('tag', tagName, force);
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

JSOTBH.prototype.setPropertyValue = function setPropertyValue(name, value, force) {
    if (force) {
        this._current.element[name] = value;
        return this;
    }

    if (value) {
        this._current.element[name] =
            this._current.element[name] === undefined ?
                value :
                this._current.element[name];
        return this;
    }

    return this._current.element[name];
};

JSOTBH.prototype.setPropertyKeyValue = function setPropertyKeyValue(name, key, value, force) {
    this._current.element[name] = this._current.element[name] || {};

    if (force) {
        this._current.element[name][key] = value;
        return this;
    }

    if (value) {
        this._current.element[name][key] =
            this._current.element[name][key] === undefined ?
                value : this._current.element[name][key];
        return this;
    }

    return this._current.element[name][key];
};

module.exports = JSOTBH;
