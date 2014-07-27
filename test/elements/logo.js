var _ = require('lodash');
module.exports = {
    json: function () {
        return _.cloneDeep({
            block: 'logo'
        });
    },
    matchers: function (bh) {
        bh.match('logo', function (ctx) {
            var lang = 'ru';

            ctx.mod('lang', ~['en', 'tr'].indexOf(lang) ? 'en' : 'ru');

            ctx.attr('role', 'header');
            ctx.content({
                elem: 'link',
                content: [
                    {
                        elem: 'image',
                        alt: ctx.param('alt')
                    }
                ]
            });
        });

        bh.match('logo__link', function (ctx) {
            ctx.tag('a');
            ctx.attr('href', 'url');
        });

        bh.match('logo__image', function (ctx) {
            ctx.tag('img');
            ctx.attr('alt', ctx.param('alt') || 'yandex');
            ctx.attr('src', '//yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif');
        });
    }
};
