var JSOT = require('jsot');
var fast = require('fast.js');
var Utils = require('./utils.js');
var lastGenId = 0;

var JSOTBH = function JSOTBH () {
    JSOT.call(this);

    this._milliseconds = new Date().getTime().toString();

    // this.attr = Utils.setPropertyKeyValue(this._current, 'element', 'attrs');
    // this.attrs = Utils.setPropertyKeyValueObject(this._current, 'element', 'attrs');
    // this.bem = Utils.setPropertyValue(this._current, 'element', 'bem');
    // this.cls = Utils.setPropertyValue(this._current, 'element', 'cls');
    this.content = Utils.setPropertyValue.bind(this)('content');
    // this.extend = Utils.extend;
    // this.js = Utils.setPropertyValue(this._current, 'element', 'js');
    // this.param = Utils.setPropertyValue(this._current, 'element');
    this.tag = Utils.setPropertyValue.bind(this)('tag');
    // this.mix = Utils.setPropertyArray(this._current, 'element', 'mix');
    // this.mod = Utils.setPropertyKeyValue(this._current, 'element', 'mods');
    // this.mods = Utils.setPropertyKeyValueObject(this._current, 'element', 'mods');

    JSOT.prototype.match.call(this, function () { return true; }, function (json) {
        return this.html(json);
    }.bind(this));
};

JSOTBH.prototype = Object.create(JSOT.prototype);
JSOTBH.prototype.constructor = JSOTBH;

JSOTBH.prototype._parseObject = JSOT.prototype.parseObject;

function patchContentElements(object) {
    if (object.block && object.content) {
        if (typeof object.content === 'object' && object.content.elem) {
            object.content.block = object.block;
            if (object.mods) { object.content.mods = object.mods; }
        }
        if (Array.isArray(object.content)) {
            for (var i = object.content.length - 1; i >= 0; i--) {
                if (object.content[i].elem) {
                    object.content[i].block = object.block;
                    if (object.mods) {
                        object.content[i].mods = object.mods;
                    }
                }
            }
        }
    }
}

JSOTBH.prototype.html = function (json) {
    var tag = json.tag || 'div';
    return '<' + tag + '>' + json.content + '</' + tag + '>';
};

JSOTBH.prototype.processObject = function (json) {
    patchContentElements(json);

    return JSOT.prototype.processObject.call(this, json);
};

JSOTBH.prototype.match = function matchBH(pattern, callback) {
    var parsedPattern = Utils.parseBhIdentifier(pattern);
    if (parsedPattern.elem) {
        JSOT.prototype.match.call(this,
            { block: parsedPattern.block },
            function (json) {
                var _oldCE = this._current.element;
                json.content = this.apply(this.content());
                this._current.element = _oldCE;
            }.bind(this)
        );
    } else {
        parsedPattern.elem = undefined;
    }
    JSOT.prototype.match.call(this, parsedPattern, callback.bind(this, this));
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
