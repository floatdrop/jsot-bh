var extend = require('./extend.js');
var escape = require('bemjson-to-html/escape.js');


var Methods = {};

Methods.extend = extend;
Methods.xmlEscape = escape;
Methods.attrEscape = escape;

Methods.attr = function (key, value, force) {
    var object = this._context.get('object');
    object.attrs = object.attrs || {};
    var prop = object.attrs;
    if (arguments.length > 1) {
        prop[key] = !prop.hasOwnProperty(key) || force ? value : prop[key];
        return this;
    } else {
        return prop ? prop[key] : undefined;
    }
};

Methods.attrs = function (values, force) {
    var object = this._context.get('object');
    object.attrs = object.attrs || {};
    if (values !== undefined) {
        object.attrs = force ? extend(object.attrs, values) : extend(values, object.attrs);
        return this;
    }

    return object.attrs;
};

Methods.bem = function (value, force) {
    var object = this._context.get('object');
    if (arguments.length > 0) {
        if (force || !object.hasOwnProperty('bem')) {
            object.bem = value;
        }
        return this;
    }

    return object.bem;
};

Methods.cls = function (value, force) {
    var object = this._context.get('object');
    if (arguments.length > 0) {
        if (force || !object.hasOwnProperty('cls')) {
            object.cls = value;
        }
        return this;
    }

    return object.cls;
};

Methods.content = function (value, force) {
    var object = this._context.get('object');
    if (arguments.length > 0) {
        if (force || !object.hasOwnProperty('content')) {
            object.content = value;
        }
        return this;
    }

    return object.content;
};

Methods.js = function (value, force) {
    var object = this._context.get('object');
    if (arguments.length > 0) {
        if (force || !object.hasOwnProperty('js')) {
            object.js = value;
        }
        return this;
    }

    return object.js;
};

Methods.param = function (key, value, force) {
    var object = this._context.get('object');
    if (value !== undefined) {
        object[key] = object[key] === undefined || force ? value : object[key];
        return this;
    } else {
        return object[key];
    }
};

Methods.tag = function (value, force) {
    var object = this._context.get('object');
    if (arguments.length > 0) {
        if (force || !object.hasOwnProperty('tag')) {
            object.tag = value;
        }
        return this;
    }

    return object.tag;
};

function patchMix(mix) {
    if (Array.isArray(mix)) {
        for (var i = 0; i < mix.length; i++) {
            mix[i] = patchMix(mix[i]);
        }
        return mix;
    }
    if (typeof mix === 'object' && mix.elem && mix.mods) {
        if (!mix.elemMods) { mix.elemMods = {}; }
        extend(mix.elemMods, mix.mods);
    }
    return mix;
}

Methods.mix = function (mix, force) {
    var object = this._context.get('object');
    if (mix !== undefined) {
        mix = patchMix(mix);
        if (force) {
            object.mix = mix;
        } else {
            if (object.mix) {
                object.mix = Array.isArray(object.mix) ?
                    object.mix.concat(mix) :
                    [object.mix].concat(mix);
            } else {
                object.mix = Array.isArray(mix) ? mix : [mix];
            }
        }
        return this;
    } else {
        return object.mix;
    }
};

Methods.mod = function (key, value, force) {
    var object = this._context.get('object');
    var property = object.elem ? 'elemMods' : 'mods';
    object[property] = object[property] || {};
    var prop = object[property];
    if (arguments.length > 1) {
        prop[key] = !prop.hasOwnProperty(key) || force ? value : prop[key];
        return this;
    } else {
        return prop ? prop[key] : undefined;
    }
};

Methods.mods = function (values, force) {
    var object = this._context.get('object');
    var property = object.elem ? 'elemMods' : 'mods';
    object[property] = object[property] || {};
    if (values !== undefined) {
        object[property] = force ? extend(object[property], values) : extend(values, object.mods);
        return this;
    }

    return object.mods;
};

module.exports = Methods;
