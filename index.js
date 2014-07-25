var BEMJSON = require('bemjson-to-html');
var Context = require('snap-context');
var matcher = require('object-match-statement');
var flatten = require('./flatten.js');
var extend = require('./extend.js');
var Method = require('bh-property-helpers');
var method = new Method();

var lastGenId = 0;

function pickModsProperty() {
    return this._context.get('object').elem ? '_object.elemMods' : '_object.mods';
}

function JSOTBH() {
    this._options = {
        jsAttrName: 'onclick',
    };

    this.bemjson = new BEMJSON(this._options);

    this._matchers = {};
    this._patterns = {};

    this._current = { length: -1, position: -1, matcherIdx: -1 };
    this._context = new Context();

    this._milliseconds = new Date().getTime().toString();

    this.applyBase = function () {
        var block = this._context.get('block');
        this.applyMatchers(
            this._matchers[block],
            this._patterns[block],
            this._current.matcherIdx - 1
        );
        this.stop();
    };

    this.tParam = function (key, value) {
        if (value) {
            this._context.set(key, value);
            return value;
        }
        return this._context.get(key);
    };

    this.stop = function () {
        this._stopFlag = true;
    };

    method(this)
        .before(function () {
            this._object = this._context.get('object');
        })
        .named('attr').changes('_object.attrs').property()
        .named('attrs').changes('_object.attrs').property()
        .named('bem').changes('_object.bem').value()
        .named('cls').changes('_object.cls').value()
        .named('content').changes('_object.content').value()
        .named('js').changes('_object.js').value()
        .named('param').changes('_object').property()
        .named('tag').changes('_object.tag').value()
        .named('mix').changes('_object.mix').array()
        .named('mod').changes(pickModsProperty).property()
        .named('mods').changes(pickModsProperty).object();
}

JSOTBH.prototype.match = function match(pattern, callback) {
    if (typeof pattern !== 'string') { throw new Error('Pattern should be a string, not a ' + pattern); }

    var parsedPattern = this.parseBhIdentifier(pattern);

    this._matchers[parsedPattern.block] = this._matchers[parsedPattern.block] || [];
    this._matchers[parsedPattern.block].push(callback.bind(this, this));

    this._patterns[parsedPattern.block] = this._patterns[parsedPattern.block] || [];
    this._patterns[parsedPattern.block].push(this.compilePattern(parsedPattern));

    return this;
};

JSOTBH.prototype.apply = function apply(json) {
    return this.bemjson.toHtml(this.process(json), this._options);
};

JSOTBH.prototype.process = function process(json) {
    if (typeof json === 'string') {
        return json;
    }

    if (Array.isArray(json)) {
        return this.processArray(json);
    }

    if (typeof json === 'object' && json) {
        if (json.block) { this._context.set('block', json.block); }
        if (json.mods) { this._context.set('blockMods', json.mods); }
        this._context.set('object', json);
        this._context.snapshot();
        var result = this.processObject(json);
        this._context.restore();
        return result;
    } else {
        return '' + json;
    }
};

JSOTBH.prototype.processObject = function processObject() {
    var block = this._context.get('block');
    var matchersForBlock = this._matchers[block];
    if (matchersForBlock) {
        this.applyMatchers(matchersForBlock, this._patterns[block]);
    }

    var object = this._context.get('object');

    if (object.content !== undefined) {
        object.content = this.apply(object.content);
    }

    return object;
};

JSOTBH.prototype.applyMatchers = function applyMatchers(matchers, patterns, startFrom) {
    var object = this._context.get('object');
    if (!object.block) {
        object.block = this._context.get('block');
        object.mods = this._context.get('blockMods');
    }

    if (startFrom === undefined) { startFrom = matchers.length - 1; }
    for (var m = startFrom; m >= 0 ; m--) {
        if (patterns[m](object)) {
            this._current.matcherIdx = m;
            var result = matchers[m](this._context.get('object'));
            if (result) { this._context.set('object', result); }
            if (this._stopFlag) { break; }
        }
    }
    this._stopFlag = false;
};

JSOTBH.prototype.processArray = function processArray(array) {
    var result = '';
    array = flatten(array);
    for (var i = array.length - 1; i >= 0; i--) {
        this._current.length = array.length;
        this._current.position = i;
        result = this.apply(array[i]) + result;
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
    return this._current.position === 0;
};

JSOTBH.prototype.isLast = function isLast() {
    return this._current.position === this._current.length - 1;
};

JSOTBH.prototype.json = function json() {
    return this._context.get('object');
};

JSOTBH.prototype.length = function length() {
    return this._current.length;
};

JSOTBH.prototype.position = function position() {
    return this._current.position;
};

JSOTBH.prototype.isSimple = function isSimple(obj) {
    if (!obj || obj === true) { return true; }
    var t = typeof obj;
    return t === 'string' || t === 'number';
};

JSOTBH.prototype.setOptions = function setOptions(_options) {
    this._options = extend(this._options, _options);
    this.bemjson = new BEMJSON(this._options);
};

JSOTBH.prototype.getOptions = function getOptions() {
    return this._options;
};

JSOTBH.prototype.extend = extend;

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


module.exports = JSOTBH;
