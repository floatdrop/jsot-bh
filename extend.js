module.exports = function extend(target) {
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
