/* Lodash implementation of flatten */
module.exports = function flatten(array) {
    var index = -1,
        length = array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
        var value = array[index];
        if (Array.isArray(value)) {
            value = flatten(value);

            var valIndex = -1,
            valLength = value.length;

            result.length += valLength;
            while (++valIndex < valLength) {
                result[resIndex++] = value[valIndex];
            }
        } else {
            result[resIndex++] = value;
        }
    }
    return result;
};
