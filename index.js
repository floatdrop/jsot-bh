var Utils = require('./utils.js');
var lastGenId = 0;
var BEMJSON = require('bemjson-to-html');
var Context = require('snap-context');
var matcher = require('object-match-statement');
var flatten = require('./flatten.js');

function defineContextMethod(object, method, func) {
    Object.defineProperty(object, method, {
        value: func,
        configurable : false,
        enumerable : false,
        writable : false
    });
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

    defineContextMethod(this, 'attr', Utils.setPropertyKeyValue.bind(this)('attrs'));
    defineContextMethod(this, 'attrs', Utils.setPropertyKeyValueObject.bind(this)('attrs'));
    defineContextMethod(this, 'bem', Utils.setPropertyValue.bind(this)('bem'));
    defineContextMethod(this, 'cls', Utils.setPropertyValue.bind(this)('cls'));
    defineContextMethod(this, 'content', Utils.setPropertyValue.bind(this)('content'));
    defineContextMethod(this, 'extend', Utils.extend);
    defineContextMethod(this, 'js', Utils.setPropertyValue.bind(this).call(this, 'js'));
    defineContextMethod(this, 'param', function () {
        var args = Array.prototype.slice.call(arguments);
        var name = args.shift();
        return Utils.setPropertyValue.bind(this)(name).apply(this, args);
    });
    defineContextMethod(this, 'tag', Utils.setPropertyValue.bind(this)('tag'));
    defineContextMethod(this, 'mix', Utils.setPropertyArray.bind(this)('mix'));
    defineContextMethod(this, 'mod', function () {
        if (this._context.get('object').elem) {
            return Utils.setPropertyKeyValue.bind(this)('elemMods').apply(this, arguments);
        } else {
            return Utils.setPropertyKeyValue.bind(this)('mods').apply(this, arguments);
        }
    });
    defineContextMethod(this, 'mods', function () {
        if (this._context.get('object').elem) {
            return Utils.setPropertyKeyValueObject.bind(this)('elemMods').apply(this, arguments);
        } else {
            return Utils.setPropertyKeyValueObject.bind(this)('mods').apply(this, arguments);
        }
    });
}

JSOTBH.prototype.match = function match(pattern, callback) {
    if (typeof pattern !== 'string') { throw new Error('Pattern should be a string, not a ' + pattern); }

    var parsedPattern = Utils.parseBhIdentifier(pattern);

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
    this._options = Utils.extend(this._options, _options);
    this.bemjson = new BEMJSON(this._options);
};

JSOTBH.prototype.getOptions = function getOptions() {
    return this._options;
};

module.exports = JSOTBH;
