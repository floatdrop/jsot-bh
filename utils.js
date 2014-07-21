var Utils = {};

var _optJsAttrIsJs = 'onclick';
var _defaultTag = 'div';

function unwrapMixedBlocks(json) {
    if (json.mix) {
        var mixes = json.mix;
        for (var i = 0; i < mixes.length; i++) {
            var mix = mixes[i];
            if (mix && mix.js) {
                mix.js = mix.js === true ? {} : mix.js;
                json.jsParams[(mix.block || json.block) + (mix.elem ? '__' + mix.elem : '')] = mix.js;
                json.hasMixJsParams = true;
            }
        }
    }
}

Utils.bemClasses = function(json, block) {
    block = json.block || block;
    if (json.bem === false || !block) { return ''; }

    var base = block + (json.elem ? '__' + json.elem : '');
    var res = base; // (base === json.block) ? '' : base
    var mods = json.mods || json.elem && json.elemMods;

    for (var i in mods) {
        res += (res ? ' ' : '') + base + '_' + i + (mods[i] === true ? '' : '_' + mods[i]);
    }

    if (json.mix) {
        for (var i = 0; i < json.mix.length; i++) {
            res += ' ' + Utils.bemClasses(json.mix[i], json.block);
        }
    }

    return res;
};

function classes(json) {
    var bemClasses = Utils.bemClasses(json, json.block);
    var iBemClass = json.hasJsParams && 'i-bem';
    var res = [bemClasses, json.cls, iBemClass].filter(Boolean).join(' ');
    if (res === '') { return res; }
    return ' class="' + escape(res) + '"';
}

function attributes(json) {
    if (!json.attrs) { return ''; }

    var attrs = '';

    for (var key in json.attrs) {
        var value = json.attrs[key];
        if (value === null) { continue; }
        attrs += ' ' + key + '="' + escape(value) + '"';
    }

    return attrs;
}

Utils.renderHtmlBlock = function (json) {
    if (typeof json !== 'object') { return json; }

    json.tag = json.tag || _defaultTag;
    json.content = json.content || '';
    json.jsParams = {};
    json.js = json.js === true ? {} : json.js;
    json.attrs = json.attrs || {};

    if (json.mix && !Array.isArray(json.mix)) {
        json.mix = [json.mix];
    }

    if (json.js) {
        json.jsParams[json.block + (json.elem ? '__' + json.elem : '')] = json.js;
    }

    unwrapMixedBlocks(json);
    var jsData = JSON.stringify(json.jsParams);
    json.attrs[json.jsAttr || _optJsAttrIsJs] = (this._optJsAttrIsJs ? 'return ' + jsData : jsData);

    var res = '<' + json.tag + classes(json) + attributes(json);
    if (selfCloseHtmlTags[json.tag]) { return res + '/>'; }
    return res + '>' + json.content + '</' + json.tag + '>';
};

var escapeMap = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
var badChars = /[&<>"]/g;
var possible = /[&<>"]/;

var escapeChar = function(chr) {
    return escapeMap[chr] || chr;
};

function escape(string) {
    if (string === null || string === false) {
        return '';
    }

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
}

var selfCloseHtmlTags = {
    area: 1,
    base: 1,
    br: 1,
    col: 1,
    command: 1,
    embed: 1,
    hr: 1,
    img: 1,
    input: 1,
    keygen: 1,
    link: 1,
    menuitem: 1,
    meta: 1,
    param: 1,
    source: 1,
    track: 1,
    wbr: 1
};


Utils.setPropertyKeyValueObject = function (name) {
    return function scopedSPKVO(values, force) {
        if (!values) { return this._current.element[name]; }

        for (var key in values) {
            Utils.setPropertyKeyValue(name)(key, values[key], force);
        }

        return this._current.element;
    };
};

Utils.setPropertyArray = function setPropertyArray(name) {
    return function scopedSPA(value, force) {
        if (force) {
            this._current.element[name] = value;
            return this;
        }

        if (value !== undefined) {
            if (this._current.element[name]) {
                this._current.element[name] = Array.isArray(this._current.element[name]) ?
                    this._current.element[name].concat(value) :
                    [this._current.element[name]].concat(value);
            } else {
                this._current.element[name] = value;
            }

            return this;
        }

        return this._current.element[name];
    };
};

Utils.setPropertyValue = function setPropertyValue(name) {
    return function scopedSPV(value) {
        if (value) {
            this._current.element[name] = value;
            return this;
        }

        return this._current.element[name];
    }.bind(this);
};

Utils.setPropertyKeyValue = function setPropertyKeyValue(name) {
    return function scopedSPKV(key, value, force) {
        this._current.element[name] = this._current.element[name] || {};

        if (force) {
            this._current.element[name][key] = value;
            return this;
        }

        if (value) {
            this._current.element[name][key] =
                this._current.element[name][key] === undefined ?
                    value : this._current.element[name][key];
            return this;
        }

        return this._current.element[name][key];
    };
};

Utils.extend = function extend(target) {
    if (!target || typeof target !== 'object') {
        target = {};
    }

    for (var i = 1, len = arguments.length; i < len; i++) {
        var obj = arguments[i];
        if (typeof obj === 'object') {
            for (var key in obj) {
                target[key] = obj[key];
            }
        }
    }

    return target;
};

Utils.parseBhIdentifier = function parseBhIdentifier(pattern) {
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

module.exports = Utils;
