# JSOT-BH [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url] [![Coveralls Status][coveralls-image]][coveralls-url]

This is wrapper around [JSOT](https://github.com/floatdrop/jsot) template engine, that provides BH matchers and some other things.

## API

Context methods should correspond to [BH](https://github.com/enb-make/bh#%D0%9A%D0%BB%D0%B0%D1%81%D1%81-ctx) specification:

Current status:

 * [ ] apply
 * [ ] applyBase
 * [ ] attr
 * [ ] attrs
 * [ ] bem
 * [ ] cls
 * [ ] content
 * [ ] extend
 * [ ] generateId
 * [ ] isFirst
 * [ ] isLast
 * [ ] js
 * [ ] json
 * [ ] mix
 * [ ] mod
 * [ ] mods
 * [ ] param
 * [ ] stop
 * [ ] tParam
 * [ ] tag

## Usage

```js
var JSOTBH = require('jsot-bh');
var jsotbh = new JSOTBH();

jsotbh.match('html', function (context) {
    return '<html>' + jsotbh.apply(context.content) + '</html>';
});

jsotbh.match('p', function (context) {
    return '<p>' + jsotbh.apply(context.content) + '</p>';
});

jsotbh.match('p_bold_yes', function (context) {
    return '<p><b>' + jsotbh.apply(context.content) + '</b></p>';
});

console.log(
    jsotbh.apply({
        block: 'html',
        content: [
            { block: 'p', content: 'You' },
            { block: 'p', blockMods: { bold: 'yes' }, content: 'Rock!' }
        ]
    })
);

// should output: '<html><p>You</p><p><b>Rock!</b></p></html>'
```

## Benchmark

```
                      Simple
          39,508 op/s » BH
         133,894 op/s » JSOT-BH

                      Webpage
          14,324 op/s » BH
          74,962 op/s » JSOT-BH
```

[npm-url]: https://npmjs.org/package/jsot-bh
[npm-image]: http://img.shields.io/npm/v/jsot-bh.svg

[travis-url]: https://travis-ci.org/floatdrop/jsot-bh
[travis-image]: http://img.shields.io/travis/floatdrop/jsot-bh.svg

[depstat-url]: https://david-dm.org/floatdrop/jsot-bh
[depstat-image]: https://david-dm.org/floatdrop/jsot-bh.svg?theme=shields.io

[coveralls-url]: https://coveralls.io/r/floatdrop/jsot-bh
[coveralls-image]: http://img.shields.io/coveralls/floatdrop/jsot-bh/master.svg
