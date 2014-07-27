var _ = require('lodash');
module.exports = {
    json: function () {
        return _.cloneDeep({
            block: 'popup',
            mods: {
                type: 'modal',
                position: 'fixed',
                'has-close': 'yes',
                name: 'timer-dialog'
            },
            content: {
                elem: 'content',
                content: 'sup'
            }
        });
    },
    matchers: function () { }
};
