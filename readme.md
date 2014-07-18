# JSOT-BH [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url] [![Coveralls Status][coveralls-image]][coveralls-url]

This is wrapper around [JSOT](https://github.com/floatdrop/jsot) template engine, that provides BH matchers and some other things.

## API

Context methods should correspond to [BH](https://github.com/enb-make/bh#%D0%9A%D0%BB%D0%B0%D1%81%D1%81-ctx) specification:

Current status:

 * [x] apply
 * [ ] applyBase
 * [x] attr
 * [x] attrs
 * [x] bem
 * [x] cls
 * [x] content
 * [ ] extend
 * [ ] generateId
 * [x] position
 * [x] length
 * [x] isFirst
 * [x] isLast
 * [x] js
 * [x] json
 * [ ] mix
 * [x] mod
 * [x] mods
 * [ ] param
 * [ ] stop
 * [ ] tParam
 * [x] tag

## Usage

```js
var JSOTBH = require('jsot-bh');
var jsotbh = new JSOTBH();

jsotbh.match('html', function (context, json) {
    return '<html>' + context.apply(json.content) + '</html>';
});

jsotbh.match('p', function (context, json) {
    return '<p>' + context.apply(json.content) + '</p>';
});

jsotbh.match('p_bold_yes', function (context, json) {
    return '<p><b>' + context.apply(json.content) + '</b></p>';
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

This numbers can be used as "fastest possible" BH performance, but not necessary achivable (`jsot-bh` is lacking some functionality - see API status for details).

```
                      Simple
          39,746 op/s » BH
         131,545 op/s » JSOT-BH

                      Webpage
          14,773 op/s » BH
          63,649 op/s » JSOT-BH
```

[npm-url]: https://npmjs.org/package/jsot-bh
[npm-image]: http://img.shields.io/npm/v/jsot-bh.svg

[travis-url]: https://travis-ci.org/floatdrop/jsot-bh
[travis-image]: http://img.shields.io/travis/floatdrop/jsot-bh.svg

[depstat-url]: https://david-dm.org/floatdrop/jsot-bh
[depstat-image]: https://david-dm.org/floatdrop/jsot-bh.svg?theme=shields.io

[coveralls-url]: https://coveralls.io/r/floatdrop/jsot-bh
[coveralls-image]: http://img.shields.io/coveralls/floatdrop/jsot-bh/master.svg
