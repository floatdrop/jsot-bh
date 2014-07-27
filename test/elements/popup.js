var _ = require('lodash');
module.exports = function (bh) {
    bh.match('popup', function(ctx) {
        ctx.mods({
            theme: 'ffffff',
            autoclosable: 'yes',
            adaptive: 'yes',
            animate: 'yes'
        });

        var zIndex = ctx.param('zIndex');
        if(zIndex) {
            var style = ctx.attr('style') || '';
            ctx.attr('style', style + ';z-index:' + zIndex + ';', true);
        }

        ctx.content([
            {
                elem: 'under',
                mods: ctx.param('underMods')
            },
            ctx.content()
        ], true);
    });

    bh.match('popup_has-close_yes', function(ctx) {
        ctx.content([
            {elem: 'close'},
            ctx.content()
        ], true);
    });

    bh.match('popup__close', function(ctx) {
        ctx.tag('i');
    });

    bh.match('popup__tail', function(ctx) {
        ctx.tag('i');
    });

    return bh.apply(_.cloneDeep(require('./jsons/popup.json')));
};
