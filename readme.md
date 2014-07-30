# JSOT-BH [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url] [![Coveralls Status][coveralls-image]][coveralls-url]

This is modification of [JSOT](https://github.com/floatdrop/jsot) template engine, which provides BH matchers and some other things.

## Migration notice

This library is not maintained by BH developers and can't be used as as-is replace for `bh` package. __Use with cautition!__

This library is still not compatible with BH, here list of the known differences:

 * `ctx.apply` returning compiled string with HTML. Use `ctx.process` for getting `json`.
 * BEM identifier should not contain `\\"` parts, but can contain `"`.
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

While single block/element rendering is much faster, than BH, real-life pages is rendered slower, than BH (by 85%).

```
Benchmarking block matching
  jsot#block            x 3,309,461 ops/sec ±1.53% (95 runs sampled)
  jsotbh#block          x   583,786 ops/sec ±0.87% (89 runs sampled)
  bh#block              x    59,013 ops/sec ±2.30% (85 runs sampled)
  bt#block              x    63,434 ops/sec ±2.88% (83 runs sampled)

Benchmarking block_mod matching
  jsot#block_mod        x 4,500,751 ops/sec ±0.72% (95 runs sampled)
  jsotbh#block_mod      x   330,107 ops/sec ±1.35% (90 runs sampled)
  bh#block_mod          x    47,605 ops/sec ±2.64% (79 runs sampled)
  bt#block_mod          x    93,854 ops/sec ±2.92% (87 runs sampled)

Benchmarking element matching
  jsot#block__elem      x 1,837,856 ops/sec ±0.57% (93 runs sampled)
  jsotbh#block__elem    x   212,210 ops/sec ±0.88% (89 runs sampled)
  bh#block__elem        x    43,541 ops/sec ±2.36% (85 runs sampled)
  bt#block__elem        x    65,420 ops/sec ±2.62% (84 runs sampled)

Benchmarking deep bemjsons
  jsotbh#block x 6,143 ops/sec ±2.25% (90 runs sampled)
  bh#block     x 8,271 ops/sec ±1.38% (91 runs sampled)
```

[npm-url]: https://npmjs.org/package/jsot-bh
[npm-image]: http://img.shields.io/npm/v/jsot-bh.svg

[travis-url]: https://travis-ci.org/floatdrop/jsot-bh
[travis-image]: http://img.shields.io/travis/floatdrop/jsot-bh.svg

[depstat-url]: https://david-dm.org/floatdrop/jsot-bh
[depstat-image]: https://david-dm.org/floatdrop/jsot-bh.svg?theme=shields.io

[coveralls-url]: https://coveralls.io/r/floatdrop/jsot-bh
[coveralls-image]: http://img.shields.io/coveralls/floatdrop/jsot-bh/master.svg
