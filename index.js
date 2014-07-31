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

    var parsedPattern = parseBhId(pattern);

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
        var _ctx = this._object;
        passContext(_ctx, json);
        result = this.process(json);
        this._object = _ctx;
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

function remove(array, idx) {
    return array.slice(0, idx).concat(array.slice(idx + 1, array.length));
}

JSOTBH.prototype.applyBase = function applyBase() {
    var object = this._object;
    var matchers = remove(this._matchers[object.block], object.__matcherIdx);
    var patterns = remove(this._patterns[object.block], object.__matcherIdx);
    var result = this.applyMatchers(
        matchers,
        patterns
    );
    if (result && result !== object) {
        passContext(object, result);
        this._object = result;
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

function fixMods(object) {
    if (object.mods) {
        if (!object.block && object.elem) {
            object.elemMods = object.mods;
        } else {
            object.blockMods = object.mods;
        }
    }
    return object;
}

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
        this._object = fixMods(json);
        return this.processObject();
    }

    return json;
};

JSOTBH.prototype.processBemJson = JSOTBH.prototype.process;

function deepPassContext(host, reciever) {
    if (Array.isArray(reciever)) {
        reciever = flatten(reciever);
    }
    passContext(host, reciever);
    return reciever;
}

function passContext(host, reciever) {
    if (!reciever.block) { reciever.block = host.block; }
    if (!reciever.mods) { reciever.mods = host.mods ;}
    if (!reciever.elem) { reciever.elem = host.elem; }
    if (!reciever.elemMods) { reciever.elemMods = host.elemMods; }
    return reciever;
}

JSOTBH.prototype.processObject = function processObject() {
    var _object = this._object;
    var matchersForBlock = this._matchers[_object.block];

    var object = _object;
    if (matchersForBlock) {
        if (!_object.__matcherIdx) { _object.__matcherIdx = matchersForBlock.length; }
        object = this.applyMatchers(
            matchersForBlock,
            this._patterns[_object.block],
            _object.__matcherIdx - 1
        ) || _object;
    }

    if (_object !== object) {
        return this._apply(deepPassContext(_object, object));
    }

    if (object.content !== undefined) {
        object.content = this._apply(passContext(_object, object.content));
    }

    return object;
};

JSOTBH.prototype.applyMatchers = function applyMatchers(matchers, patterns, startFrom) {
    var object = this._object;
    if (startFrom === undefined) { startFrom = matchers.length - 1; }
    for (var m = startFrom; !this._stopFlag && m >= 0 ; m--) {
        if (m === 0) { object.__processed = true; }
        if (patterns[m](object)) {
            console.log('Applying matcher for ', object.block, object.mods, object.elem, object.elemMods);
            object.__matcherIdx = m;
            var result = matchers[m](object);
            if (result) { return result; }
        }
    }
    this._stopFlag = false;
};

JSOTBH.prototype.processArray = function processArray(_array) {
    var result = '';
    var array = flatten(_array).filter(Boolean);
    for (var i = array.length - 1; i >= 0; i--) {
        this._current.length = array.length;
        this._current.position = i;
        passContext(_array, array[i]);
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

Methods.extend(JSOTBH.prototype, Methods);

module.exports = JSOTBH;
