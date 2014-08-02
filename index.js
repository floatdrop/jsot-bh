var Context = require('snap-context');
var matcher = require('object-match-statement');
var flatten = require('flatit');
var BEMJSON = require('bemjson-to-html');
var parseBhId = require('parse-bem-identifier');
var Methods = require('./methods.js');

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
    this.lib = {};
}

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

    var parsedPattern = parseBhId(pattern);

    this._matchers[parsedPattern.block] = this._matchers[parsedPattern.block] || [];
    this._matchers[parsedPattern.block].push(callback.bind(this, this));

    this._patterns[parsedPattern.block] = this._patterns[parsedPattern.block] || [];
    this._patterns[parsedPattern.block].push(this.compilePattern(parsedPattern));

    return this;
};

JSOTBH.prototype.apply = function apply(json) {
    return this.bemjson.toHtml(this.process(json), this._options);
};

JSOTBH.prototype.applyBase = function applyBase() {
    var result = this.applyMatchers(
        this._object,
        this._matchers[this._object.block],
        this._patterns[this._object.block],
        this._object.__matcherIdx - 1
    );

    if (result) { this._object = result; }

    this.stop();
};

JSOTBH.prototype.process = function process(json) {
    if (!json) { return json; }

    var _object = this._object;
    if (_object) { passBlock(_object, json); }

    while (typeof json === 'object' && !json.__processed) {
        if (Array.isArray(json)) {
            json = this.processArray(json);
        } else {
            json = this.processObject(json) || json;
        }
    }

    this._object = _object;

    return json;
};

function passBlock(from, to) {
    if (!to.block && from.block) {
        to.block = from.block;
        if (!to.mods && from.mods) {
            to.mods = from.mods; // TODO: should it be deepCopy?
        }
    }
}

JSOTBH.prototype.processObject = function processObject(object) {
    var matchersForBlock = this._matchers[object.block];
    var result = object;
    if (matchersForBlock) {
        result = this.applyMatchers(
            object,
            matchersForBlock,
            this._patterns[object.block],
            object.__matcherIdx ? object.__matcherIdx - 1 : undefined
        );
    }

    passBlock(object, result);

    if (result === object && object.content !== undefined) {
        passBlock(object, object.content);
        object.content = this.apply(object.content);
    }

    if (!matchersForBlock || object.__matcherIdx === 0) {
        object.__processed = true;
    }

    return result;
};

JSOTBH.prototype.applyMatchers = function applyMatchers(object, matchers, patterns, startFrom) {
    var result;

    if (startFrom === undefined) { startFrom = matchers.length - 1; }
    while (!result && !this._stopFlag && startFrom >= 0) {
        object.__matcherIdx = startFrom;

        if (patterns[startFrom](object)) {
            this._object = object;
            result = matchers[startFrom](object);
        }

        startFrom--;
    }
    if (this._stopFlag) {
        this._stopFlag = false;
        this._object.__processed = true;
    }
    return result || object;
};

JSOTBH.prototype.processArray = function processArray(_array) {
    var result = '';
    var array = flatten(_array).filter(Boolean);
    passBlock(_array, array); // flatten returns new array, so pass block to it
    for (var i = 0; i < array.length; i++) {
        this._current.length = array.length;
        this._current.position = i;
        passBlock(_array, array[i]);
        result += this.apply(array[i]);
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

JSOTBH.prototype.setOptions = function setOptions(_options) {
    this._options = this.extend(this._options, _options);
    this.bemjson = new BEMJSON(this._options);
};

JSOTBH.prototype.getOptions = function getOptions() {
    return this._options;
};

JSOTBH.prototype.processBemJson = JSOTBH.prototype.process;

JSOTBH.prototype.toHtml = function toHtml(json) {
    if (typeof json === 'string') { return json; }
    return this._apply(json);
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

Methods.extend(JSOTBH.prototype, Methods);

module.exports = JSOTBH;
