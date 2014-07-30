var Context = require('snap-context');
var matcher = require('object-match-statement');
var flatten = require('./flatten.js');
var BEMJSON = require('bemjson-to-html');
var Methods = require('./methods.js');

var lastGenId = 0;

function JSOTBH() {
    this._options = {
        jsAttrName: 'onclick',
    };

    this.setOptions(this._options);

    this._matchers = {};
    this._patterns = {};

    this._current = { length: -1, position: -1, matcherIdx: -1 };
    this._context = new Context();

    this._milliseconds = new Date().getTime().toString();

    /**
     * Special field for storing shit. Like global. For fuck sake.
     * ```javascript
     * bh.lib.objects = bh.lib.objects || {};
     * bh.lib.objects.inverse = bh.lib.objects.inverse || function(obj) { ... };
     * ```
     * @type {Object}
     */
    this.lib = {};
}

JSOTBH.prototype.setOptions = function setOptions(_options) {
    this._options = this.extend(this._options, _options);
    this.bemjson = new BEMJSON(this._options);
};

JSOTBH.prototype.getOptions = function getOptions() {
    return this._options;
};

JSOTBH.prototype.match = function match(pattern, callback) {
    if (Array.isArray(pattern)) {
        for (var i = 0; i < pattern.length; i++) {
            this.match(pattern[i], callback);
        }
        return;
    }

    if (typeof pattern === 'object') {
        for (var p in pattern) {
            this.match(p, pattern[p]);
        }
        return;
    }

    if (typeof pattern !== 'string') {
        return console.error('Pattern should be a string, not a ' + pattern +'. Skipping.');
    }

    var parsedPattern = this.parseBhIdentifier(pattern);

    this._matchers[parsedPattern.block] = this._matchers[parsedPattern.block] || [];
    this._matchers[parsedPattern.block].push(callback.bind(this, this));

    this._patterns[parsedPattern.block] = this._patterns[parsedPattern.block] || [];
    this._patterns[parsedPattern.block].push(this.compilePattern(parsedPattern));

    return this;
};

JSOTBH.prototype.toHtml = function toHtml(json) {
    if (typeof json === 'string') { return json; }
    return this._apply(json);
};

JSOTBH.prototype.apply = function apply(json) {
    /* global BEM */
    if (typeof BEM !== 'undefined' && typeof BEM.I18N !== 'undefined') {
        this.lib.i18n = this.lib.i18n || BEM.I18N;
    }

    var result = '';
    if (this.rendering) {
        result = this.process(json);
    } else {
        this.rendering = true;
        result = this.bemjson.toHtml(this.process(json), this._options);
        this.rendering = false;
    }
    return result;
};

JSOTBH.prototype._apply = function _apply(json) {
    return this.bemjson.toHtml(this.process(json), this._options);
};

// function remove(array, idx) {
//     return array.slice(0, idx).concat(array.slice(idx + 1, array.length));
// }

JSOTBH.prototype.applyBase = function applyBase() {
    var block = this._context.get('block');
    var object = this._context.get('object');
    // var matchers = remove(this._matchers[block], object.__matcherIdx);
    // var patterns = remove(this._patterns[block], object.__matcherIdx);
    var result = this.applyMatchers(
        this._matchers[block],
        this._patterns[block],
        object.__matcherIdx - 1
    );
    if (result !== object) {
        this._context.set('object', result);
    }
    this.stop();
};

JSOTBH.prototype.tParam = function tParam(key, value) {
    if (value) {
        this._context.set(key, value);
        return value;
    }
    return this._context.get(key);
};

JSOTBH.prototype.stop = function stop() {
    this._stopFlag = true;
};

JSOTBH.prototype.process = function process(json) {
    if (typeof json === 'string') {
        return json;
    }

    if (Array.isArray(json)) {
        return this.processArray(json);
    }

    if (typeof json === 'object' && json) {
        if (json.__processed) {
            return this.bemjson.toHtml(json);
        }
        if (json.block) { this._context.set('block', json.block); }
        if (json.mods) { this._context.set('blockMods', json.mods); }

        this._context.set('object', json);
        this._context.snapshot();
        var result = this.processObject(json);
        this._context.restore();
        return result;
    }

    return json;
};

JSOTBH.prototype.processBemJson = JSOTBH.prototype.process;

JSOTBH.prototype.processObject = function processObject() {
    var block = this._context.get('block');
    var _object = this._context.get('object');

    if (_object.elem && _object.mods) {
        _object.elemMods = _object.mods;
    }

    if (!_object.block && _object.elem) {
        _object.block = this._context.get('block');
        _object.mods = this._context.get('blockMods');
    }

    var matchersForBlock = this._matchers[block];

    var object = _object;
    if (matchersForBlock) {
        if (!_object.__matcherIdx) { _object.__matcherIdx = matchersForBlock.length; }
        object = this.applyMatchers(
            matchersForBlock,
            this._patterns[block],
            _object.__matcherIdx - 1
        ) || _object;
    }

    if (_object !== object) {
        object = this._apply(object);
    } else {
        if (object.content !== undefined) {
            object.content = this._apply(object.content);
        }
    }

    return object;
};

JSOTBH.prototype.applyMatchers = function applyMatchers(matchers, patterns, startFrom) {
    var object = this._context.get('object');
    if (startFrom === undefined) { startFrom = matchers.length - 1; }
    for (var m = startFrom; !this._stopFlag && m >= 0 ; m--) {
        if (m === 0) { object.__processed = true; }
        if (patterns[m](object)) {
            object.__matcherIdx = m;
            var result = matchers[m](object);
            if (result) { return result; }
        }
    }
    this._stopFlag = false;
};

JSOTBH.prototype.processArray = function processArray(array) {
    var result = '';
    array = flatten(array).filter(Boolean);
    for (var i = array.length - 1; i >= 0; i--) {
        this._current.length = array.length;
        this._current.position = i;
        result = this._apply(array[i]) + result;
    }
    this._current.length = -1;
    this._current.position = 0;
    return result;
};

JSOTBH.prototype.compilePattern = function compilePatern(pattern) {
    var statement = matcher.build('object', pattern);
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
    return this._current.position === 0 || this._current.position === -1;
};

JSOTBH.prototype.isLast = function isLast() {
    return this._current.position === this._current.length - 1 || this._current.position === -1;
};

JSOTBH.prototype.json = function json() {
    return this._context.get('object');
};

JSOTBH.prototype.length = function length() {
    return this._current.length;
};

JSOTBH.prototype.position = function position() {
    return this._current.position === -1 ? 1 : this._current.position + 1;
};

JSOTBH.prototype.isSimple = function isSimple(obj) {
    if (!obj || obj === true) { return true; }
    var t = typeof obj;
    return t === 'string' || t === 'number';
};

JSOTBH.prototype.utils = {
    isSimple: JSOTBH.prototype.isSimple
};

JSOTBH.prototype.parseBhIdentifier = function parseBhIdentifier(pattern) {
    var result = {};

    var blockElement = pattern.split('__');

    var blockArray = blockElement[0].split('_');
    result.block = blockArray[0];
    if (blockArray.length > 1) {
        result.mods = {};
        result.mods[blockArray[1]] = blockArray[2] || true;
    }

    if (blockElement.length > 1) {
        var elementArray = blockElement[1].split('_');
        result.elem = elementArray[0];
        if (elementArray.length > 1) {
            result.elemMods = {};
            result.elemMods[elementArray[1]] = elementArray[2] || true;
        }
    }

    return result;
};

Methods.extend(JSOTBH.prototype, Methods);

module.exports = JSOTBH;
