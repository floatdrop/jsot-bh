var Utils = require('./utils.js');
var lastGenId = 0;
var serialize = require('bemjson-to-html');

function JSOTBH() {
    this._matchers = {};
    this._patterns = {};

    this._current = { length: -1, position: -1, matcherIdx: -1 };

    this._milliseconds = new Date().getTime().toString();

    this.applyBase = function () {
        this.processObject(this._current.element, this._current.matcherIdx + 1);
        this.stop();
    };

    this.stop = function () {
        this._stopFlag = true;
    };

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
}

JSOTBH.prototype.match = function match(pattern, callback) {
    var parsedPattern = Utils.parseBhIdentifier(pattern);

    this._matchers[parsedPattern.block] = this._matchers[parsedPattern.block] || [];
    this._matchers[parsedPattern.block].push(callback.bind(this, this));

    this._patterns[parsedPattern.block] = this._patterns[parsedPattern.block] || [];
    this._patterns[parsedPattern.block].push(this.compilePattern(parsedPattern));
};

JSOTBH.prototype.process = function process(json) {
    if (typeof json === 'string') {
        return json;
    }

    if (Array.isArray(json)) {
        return this.processArray(json);
    }

    if (typeof json === 'object') {
        Utils.patchContentElements(json, json.block);
        return this.processObject(json, 0);
    }
};

JSOTBH.prototype.apply = function apply(json) {
    return serialize(this.process(json));
};

JSOTBH.prototype.processArray = function processArray(array) {
    var result = '';
    for (var i = array.length - 1; i >= 0; i--) {
        this._current.length = array.length;
        this._current.position = i;
        result = this.apply(array[i]) + result;
    }
    return result;
};

JSOTBH.prototype.processObject = function processObject(object, startFrom) {
    var matchersForBlock = this._matchers[object.block];

    if (matchersForBlock) {
        var patternsForBlock = this._patterns[object.block];
        for (var m = startFrom; m < matchersForBlock.length; m++) {
            if (patternsForBlock[m](object)) {
                this._current.element = object;
                this._current.matcherIdx = m;
                var result = matchersForBlock[m](object);
                if (result) { break; }
                if (this._stopFlag) { this._stopFlag = false; break; }
            }
        }
    }

    if (object.content) {
        object.content = this.apply(object.content);
    }

    return object;
};

function escapeIdentifier (id) {
    if (/^[$A-Z\_a-z][$_0-9A-Za-z]*$/.test(id)) {
        return '.' + id;
    }
    return '["' + id + '"]';
}

function buildCompareStatement (prefix, object) {
    var statement = [];

    for (var key in object) {
        var nextPrefix = prefix + escapeIdentifier(key);
        if (typeof object[key] === 'object') {
            statement.push(nextPrefix);
            statement.push(buildCompareStatement(nextPrefix, object[key]));
        } else if (typeof object[key] === 'string') {
            statement.push(nextPrefix + ' === "' + object[key] + '"');
        } else {
            statement.push(nextPrefix + ' === ' + object[key]);
        }
    }

    return statement.join(' && ');
}

JSOTBH.prototype.compilePattern = function compilePatern(pattern) {
    var statement = typeof pattern !== 'string' ?
        buildCompareStatement('object', pattern) :
        'object' + escapeIdentifier(pattern);

    if (pattern.elem === undefined) {
        statement = 'object.elem === undefined && ' + statement;
    }

    var composedFunction = 'return ' + statement + ';';

    /*jshint -W054*/ /* Yes, this is eval */
    return new Function('object', composedFunction);
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
