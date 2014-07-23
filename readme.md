# JSOT-BH [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url] [![Coveralls Status][coveralls-image]][coveralls-url]

This is modification of [JSOT](https://github.com/floatdrop/jsot) template engine, which provides BH matchers and some other things.

## TODO:

 * [ ] Backwards compatibility testing
 * [ ] Return object from matcher should be interpreted like new bemjson
 * [ ] 100% coverage

## API

Context methods is similar to [BH](https://github.com/enb-make/bh#%D0%9A%D0%BB%D0%B0%D1%81%D1%81-ctx) specification.

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
Benchmarking block matching
  jsot#block            x 3,168,478 ops/sec ±3.88% (92 runs sampled)
  jsotbh#block          x   912,498 ops/sec ±1.24% (94 runs sampled)
  bh#block              x    60,482 ops/sec ±2.79% (83 runs sampled)
  bt#block              x    70,553 ops/sec ±2.03% (87 runs sampled)

Benchmarking block_mod matching
  jsot#block_mod        x 4,470,705 ops/sec ±0.65% (92 runs sampled)
  jsotbh#block_mod      x   451,037 ops/sec ±0.72% (97 runs sampled)
  bh#block_mod          x    49,071 ops/sec ±2.56% (84 runs sampled)
  bt#block_mod          x    98,175 ops/sec ±2.40% (81 runs sampled)

Benchmarking element matching
  jsot#block__elem      x 1,723,745 ops/sec ±2.59% (92 runs sampled)
  jsotbh#block__elem    x   321,785 ops/sec ±1.28% (86 runs sampled)
  bh#block__elem        x    43,032 ops/sec ±2.89% (83 runs sampled)
  bt#block__elem        x    68,081 ops/sec ±2.48% (81 runs sampled)
```

[npm-url]: https://npmjs.org/package/jsot-bh
[npm-image]: http://img.shields.io/npm/v/jsot-bh.svg

[travis-url]: https://travis-ci.org/floatdrop/jsot-bh
[travis-image]: http://img.shields.io/travis/floatdrop/jsot-bh.svg

[depstat-url]: https://david-dm.org/floatdrop/jsot-bh
[depstat-image]: https://david-dm.org/floatdrop/jsot-bh.svg?theme=shields.io

[coveralls-url]: https://coveralls.io/r/floatdrop/jsot-bh
[coveralls-image]: http://img.shields.io/coveralls/floatdrop/jsot-bh/master.svg
