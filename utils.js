var Utils = {};

Utils.patchContentElements = function patchContentElements(object, block) {
    block = object.block || block;
    if (!block || !object.content) { return object; }

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

    return object;
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
