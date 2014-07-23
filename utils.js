var Utils = {};

Utils.setPropertyKeyValueObject = function (name) {
    return function scopedSPKVO(values, force) {
        if (!values) { return this._context.get('object')[name] || {}; }
        var f = Utils.setPropertyKeyValue(name);
        for (var key in values) {
            f.call(this, key, values[key], force);
        }
        return this._context.get('object');
    };
};

Utils.setPropertyArray = function setPropertyArray(name) {
    return function scopedSPA(value, force) {
        if (force) {
            this._context.get('object')[name] = value;
            return this;
        }

        if (value !== undefined) {
            if (this._context.get('object')[name]) {
                this._context.get('object')[name] = Array.isArray(this._context.get('object')[name]) ?
                    this._context.get('object')[name].concat(value) :
                    [this._context.get('object')[name]].concat(value);
            } else {
                this._context.get('object')[name] = value;
            }

            return this;
        }

        return this._context.get('object')[name];
    };
};

Utils.setPropertyValue = function setPropertyValue(name) {
    return function scopedSPV(value, force) {
        var object = this._context.get('object');
        if (arguments.length > 0) {
            if (force || !object.hasOwnProperty(name)) {
                object[name] = value;
            }
            return this;
        }

        return object[name];
    }.bind(this);
};

Utils.setPropertyKeyValue = function setPropertyKeyValue(name) {
    return function scopedSPKV(key, value, force) {
        var object = this._context.get('object');
        var property = (object[name] = object[name] || {});

        if (force) {
            property[key] = value;
            return this;
        }

        if (arguments.length > 1) {
            if (value === undefined) {
                delete property[key];
            } else if (!property.hasOwnProperty(key)) {
                property[key] = value;
            }
            return this;
        }

        return property[key];
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
