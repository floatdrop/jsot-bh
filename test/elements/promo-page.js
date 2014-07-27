var _ = require('lodash');
module.exports = function (bh) {
    bh.match('promo-page', function(ctx) {
        var isFixed = ctx.mod('position') === 'fixed',
            content = ctx.content() || [];

        if (!Array.isArray(content))
            content = [content];

        if (!isFixed) {
            var padder = { elem: 'padder' };
            content.splice(0, 0, padder);
            content.push(padder);
        }

        var borders = [
            { elem: 'border', mods: { position: 'top' } },
            { elem: 'border', mods: { position: 'bottom' } }
        ];

        if (isFixed) {
            borders = borders.concat([
                { elem: 'border', mods: { position: 'left' } },
                { elem: 'border', mods: { position: 'right' } }
            ]);
        }
        content.push(borders);
    });

    return bh.apply(_.cloneDeep(require('./jsons/promo-page.json')));
};
