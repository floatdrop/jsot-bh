var JSOT = require('jsot');
var Utils = require('./utils.js');
var lastGenId = 0;

var JSOTBH = function JSOTBH () {
    JSOT.call(this);

    this.attr = Utils.setPropertyKeyValue.bind(this)('attrs');
    this.content = Utils.setPropertyValue.bind(this)('content');
    this.tag = Utils.setPropertyValue.bind(this)('tag');

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

JSOTBH.prototype.html = function (json) {
    var tag = json.tag || 'div';
    var attrs = '';
    if (json.attrs) {
        attrs = ' ';
        for (var key in json.attrs) {
            attrs += key + '="' + json.attrs[key] + '"';
        }
    }
    return '<' + tag + attrs + '>' + (json.content || '') + '</' + tag + '>';
};

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
