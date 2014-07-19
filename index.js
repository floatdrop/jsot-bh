var JSOT = require('jsot');
var fast = require('fast.js');
var Utils = require('./utils.js');
var lastGenId = 0;

var JSOTBH = function JSOTBH () {
    JSOT.call(this);

    this._milliseconds = new Date().getTime().toString();

    this.attr = Utils.setPropertyKeyValue(this._current, 'element', 'attrs');
    this.attrs = Utils.setPropertyKeyValueObject(this._current, 'element', 'attrs');
    this.bem = Utils.setPropertyValue(this._current, 'element', 'bem');
    this.cls = Utils.setPropertyValue(this._current, 'element', 'cls');
    this.content = Utils.setPropertyValue(this._current, 'element', 'content');
    this.extend = Utils.extend;
    this.js = Utils.setPropertyValue(this._current, 'element', 'js');
    this.param = Utils.setPropertyValue(this._current, 'element');
    this.tag = Utils.setPropertyValue(this._current, 'element', 'tag');
    this.mix = Utils.setPropertyArray(this._current, 'element', 'mix');
    this.mod = Utils.setPropertyKeyValue(this._current, 'element', 'mods');
    this.mods = Utils.setPropertyKeyValueObject(this._current, 'element', 'mods');
};

JSOTBH.prototype = Object.create(JSOT.prototype);
JSOTBH.prototype.constructor = JSOTBH;

JSOTBH.prototype.parseObject = function parseObject(object) {
    return JSOTBH.prototype.parseObject.call(this, object);
};

JSOTBH.prototype.match = function matchBH(pattern, callback) {
    JSOT.prototype.match.call(this, Utils.parseBhIdentifier(pattern), fast.bind(callback, this, this));
};

JSOTBH.prototype.generateId = function generateId() {
    lastGenId += 1;
    return 'uniq' + this._milliseconds + lastGenId;
};

JSOTBH.prototype.isFirst = function isFirts() {
    return this._current.position === 0;
};

JSOTBH.prototype.isLast = function isLast() {
    return this._current.position === this._current.length - 1;
};

JSOTBH.prototype.isSimple = function isSimple(obj) {
    if (!obj || obj === true) { return true; }
    var t = typeof obj;
    return t === 'string' || t === 'number';
};

JSOTBH.prototype.json = function json() {
    return this._current.element;
};

JSOTBH.prototype.length = function length() {
    return this._current.length;
};

JSOTBH.prototype.position = function position() {
    return this._current.position;
};

module.exports = JSOTBH;
