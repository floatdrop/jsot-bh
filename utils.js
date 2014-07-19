var Utils = {};

Utils.setPropertyKeyValueObject = function (element, property, name) {
    return function scopedSPKVO(values, force) {
        if (!values) { return element[property][name]; }

        for (var key in values) {
            Utils.setPropertyKeyValue(element, property, name)(key, values[key], force);
        }

        return element;
    };
};

Utils.setPropertyArray = function setPropertyArray(element, property, name) {
    return function scopedSPA(value, force) {
        if (force) {
            element[property][name] = value;
            return this;
        }

        if (value !== undefined) {
            if (element[property][name]) {
                element[property][name] = Array.isArray(element[property][name]) ?
                    element[property][name].concat(value) :
                    [element[property][name]].concat(value);
            } else {
                element[property][name] = value;
            }

            return this;
        }

        return element[property][name];
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

Utils.setPropertyKeyValue = function setPropertyKeyValue(element, property, name) {
    return function scopedSPKV(key, value, force) {
        element[property][name] = element[property][name] || {};

        if (force) {
            element[property][name][key] = value;
            return this;
        }

        if (value) {
            element[property][name][key] =
                element[property][name][key] === undefined ?
                    value : element[property][name][key];
            return this;
        }

        return element[property][name][key];
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
