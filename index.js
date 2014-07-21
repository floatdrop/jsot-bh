var JSOT = require('jsot');
var Utils = require('./utils.js');
var lastGenId = 0;

var JSOTBH = function JSOTBH () {
    JSOT.call(this);

    this._milliseconds = new Date().getTime().toString();

    this.attr = Utils.setPropertyKeyValue.bind(this)('attrs');
    this.attrs = Utils.setPropertyKeyValueObject.bind(this)('attrs');
    this.bem = Utils.setPropertyValue.bind(this)('bem');
    this.cls = Utils.setPropertyValue.bind(this)('cls');
    this.content = Utils.setPropertyValue.bind(this)('content');
    this.extend = Utils.extend;
    this.js = Utils.setPropertyValue.bind(this)('js');
    this.param = Utils.setPropertyValue.bind(this);
    this.tag = Utils.setPropertyValue.bind(this)('tag');
    this.mix = Utils.setPropertyArray.bind(this)('mix');
    this.mod = Utils.setPropertyKeyValue.bind(this)('mods');
    this.mods = Utils.setPropertyKeyValueObject.bind(this)('mods');

    JSOT.prototype.match.call(this, function () { return true; }, function (json) {
        if (typeof json.content !== 'string') {
            json.content = this.apply(json.content);
        }
        return this.html(json);
    }.bind(this));
};

JSOTBH.prototype = Object.create(JSOT.prototype);
JSOTBH.prototype.constructor = JSOTBH;

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

JSOTBH.prototype.html = Utils.renderHtmlBlock;

JSOTBH.prototype.processObject = function (json) {
    patchContentElements(json);
    return JSOT.prototype.processObject.call(this, json);
};

function renderContent(json) {
    json.content = this.apply(this.content() || '');
}

JSOTBH.prototype.match = function matchBH(pattern, callback) {
    var parsedPattern = Utils.parseBhIdentifier(pattern);
    if (parsedPattern.elem) {
        JSOT.prototype.match.call(this, { block: parsedPattern.block }, renderContent);
    } else {
        parsedPattern.elem = undefined;
    }
    JSOT.prototype.match.call(this, parsedPattern, renderContent);
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
