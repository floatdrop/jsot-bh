# JSOT-BH [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url] [![Coveralls Status][coveralls-image]][coveralls-url]

This is modification of [JSOT](https://github.com/floatdrop/jsot) template engine, which provides BH matchers and some other things.

## Migration notice

This library is still not compatible with BH, here list of the known differences:

 * `ctx.apply` returning compiled string with HTML. Use `ctx.process` for getting `json`.
 * Last defined matcher is applyed first (this should be fixed in #4)
 * [x] Calling attr (or call to similar set method) with `undefined` argument as a value will erase this attribute from attributes (but `null` is ok). 
 * [x] bemjson-to-html renders undefined attributes (which are in bemjson, but with value `undefined`)
 * BEM identifier should not contain `\\"` parts, but can contain `"`.
 * [x] `false`, `null` and `undefined` are valid elements and will be stringified.
 * [x] ctx.position() returns positions from 0.
 * ctx.position() for element, that not hosted in array returns -1.
 * Wrapping requires explicit specifiying block in elements: `[{ block: 'button', elem: 'before' }, ctx.json(), { block: 'button', elem: 'after' }]`
 * JSOTBH.match does not accept objects as "multiple" matchers definition, use chaining instead. 
 * Loop detection deprecated.

## API

Context methods is similar to [BH](https://github.com/enb-make/bh#%D0%9A%D0%BB%D0%B0%D1%81%D1%81-ctx) specification.

## Usage

```js
var JSOTBH = require('./index.js');
var jsotbh = new JSOTBH();

jsotbh.match('html', function (ctx) {
    ctx.tag('html');
});

jsotbh.match('p', function (ctx) {
    ctx.tag('p');
});

jsotbh.match('p_bold_yes', function (ctx) {
    ctx.cls('boldy');
});

console.log(
    jsotbh.apply({
        block: 'html',
        content: [
            { block: 'p', content: 'You' },
            { block: 'p', mods: { bold: 'yes' }, content: 'Rock!' }
        ]
    })
);

// should output: '<html class="html"><p class="p">You</p><p class="p p_bold_yes boldy">Rock!</p></html>'
```

## Benchmark

This numbers can be used as "fastest possible" BH performance, but not necessary achivable (`jsot-bh` is lacking some functionality - see API status for details).

```
Benchmarking block matching
  jsot#block            x 3,287,577 ops/sec ±0.78% (92 runs sampled)
  jsotbh#block          x   453,884 ops/sec ±1.68% (89 runs sampled)
  bh#block              x    58,888 ops/sec ±2.65% (83 runs sampled)
  bt#block              x    67,704 ops/sec ±2.21% (87 runs sampled)

Benchmarking block_mod matching
  jsot#block_mod        x 4,353,587 ops/sec ±1.04% (95 runs sampled)
  jsotbh#block_mod      x   261,589 ops/sec ±0.94% (89 runs sampled)
  bh#block_mod          x    45,255 ops/sec ±3.76% (82 runs sampled)
  bt#block_mod          x    90,052 ops/sec ±3.43% (76 runs sampled)

Benchmarking element matching
  jsot#block__elem      x 1,778,983 ops/sec ±1.07% (88 runs sampled)
  jsotbh#block__elem    x   125,851 ops/sec ±9.22% (70 runs sampled)
  bh#block__elem        x    36,907 ops/sec ±4.01% (77 runs sampled)
  bt#block__elem        x    63,494 ops/sec ±3.04% (81 runs sampled)
```

[npm-url]: https://npmjs.org/package/jsot-bh
[npm-image]: http://img.shields.io/npm/v/jsot-bh.svg

[travis-url]: https://travis-ci.org/floatdrop/jsot-bh
[travis-image]: http://img.shields.io/travis/floatdrop/jsot-bh.svg

[depstat-url]: https://david-dm.org/floatdrop/jsot-bh
[depstat-image]: https://david-dm.org/floatdrop/jsot-bh.svg?theme=shields.io

[coveralls-url]: https://coveralls.io/r/floatdrop/jsot-bh
[coveralls-image]: http://img.shields.io/coveralls/floatdrop/jsot-bh/master.svg
