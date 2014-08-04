var parseBhId = require('parse-bem-identifier');
var statement = require('object-match-statement');

function Matchers() {
    this.matchers = {};
}

function id(object) {
    if (object.elem) {
        return object.block + '__' + object.elem;
    }
    return object.block;
}

Matchers.prototype.add = function add(patternString, callback) {
    var pattern = parseBhId(patternString);
    var _id = id(pattern);

    this.matchers[_id] = this.matchers[_id] || {
        base: [],
        mods: {}
    };

    if (!pattern.mod && !pattern.elemMod) {
        return this.matchers[_id].base.push(callback);
    }

    var mods = {};
    if (pattern.mod) { mods.blockMods =  }
    this.matchers[_id].mods[_modId]
};

Matchers.prototype.get = function get(object) {
    var matchers = [];
    var modsMatchers = this.matchers[id(object)].mods;
    if (object.mods) {
        for (var mod in modsMatchers) {
            if (modsMatchers[mod].pattern(object)) {
                matchers = matchers.concat(modsMatchers[mod].cb);
            }
        }
    }
    if (this.matchers[id(object)]) {
        return matchers.concat(this.matchers[id(object)].base);
    } else {
        return [];
    }
};

module.exports = Matchers;
