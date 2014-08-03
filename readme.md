# JSOT-BH [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url] [![Coveralls Status][coveralls-image]][coveralls-url]

This is modification of [JSOT](https://github.com/floatdrop/jsot) template engine, which provides BH matchers and some other things.

## Migration notice

This library is not maintained by BH developers and can't be used as as-is replace for `bh` package. __Use with cautition!__

## Matchers

`Matcher` - function passed as second argument to `BH.match`. 

It accepts context object with helper methods (which essential just an instance of JSOT-BH) and current processed object as second argument.

It can call `applyBase` method of context object, which applies all matchers to current processed object.  

It can return new object as replacement of current object (useful for wrapping) - which can contain current object in content property or in an arrary.

JSOT-BH will restart apply procedure for returned object until it will be processed with all matchers, that corresponds to this block.

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

While single block/element rendering is much faster, than BH, real-life pages is rendered slower, than BH (by 7%).

```
Benchmarking applyBase...
  jsotbh#block          x 135,141 ops/sec ±1.17% (90 runs sampled)
  bh#block              x  21,956 ops/sec ±2.35% (86 runs sampled)

Benchmarking block matching...
  jsotbh#block          x 1,059,293 ops/sec ±3.61% (93 runs sampled)
  bh#block              x    62,714 ops/sec ±2.20% (88 runs sampled)

Benchmarking block_mod matching...
  jsotbh#block_mod      x 529,408 ops/sec ±0.91% (94 runs sampled)
  bh#block_mod          x  49,560 ops/sec ±2.65% (80 runs sampled)

Benchmarking element matching...
  jsotbh#block__elem    x 212,603 ops/sec ±1.20% (92 runs sampled)
  bh#block__elem        x  47,530 ops/sec ±2.65% (80 runs sampled)

Benchmarking deep bemjsons...
  jsotbh#deep           x 11,085 ops/sec ±1.12% (92 runs sampled)
  bh#deep               x  8,311 ops/sec ±1.52% (86 runs sampled)

Benchmarking deepArray bemjsons...
  jsotbh#deepArray      x 18,638 ops/sec ±1.90% (88 runs sampled)
  bh#deepArray          x 17,555 ops/sec ±1.34% (84 runs sampled)

Benchmarking block wrapping...
  jsotbh#wrap           x 201,079 ops/sec ±1.54% (78 runs sampled)
  bh#wrap               x  48,531 ops/sec ±3.50% (83 runs sampled)
```

[npm-url]: https://npmjs.org/package/jsot-bh
[npm-image]: http://img.shields.io/npm/v/jsot-bh.svg

[travis-url]: https://travis-ci.org/floatdrop/jsot-bh
[travis-image]: http://img.shields.io/travis/floatdrop/jsot-bh.svg

[depstat-url]: https://david-dm.org/floatdrop/jsot-bh
[depstat-image]: https://david-dm.org/floatdrop/jsot-bh.svg?theme=shields.io

[coveralls-url]: https://coveralls.io/r/floatdrop/jsot-bh
[coveralls-image]: http://img.shields.io/coveralls/floatdrop/jsot-bh/master.svg
