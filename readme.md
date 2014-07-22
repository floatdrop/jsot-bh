# JSOT-BH [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url] [![Coveralls Status][coveralls-image]][coveralls-url]

This is wrapper around [JSOT](https://github.com/floatdrop/jsot) template engine, that provides BH matchers and some other things.

## API

Context methods should correspond to [BH](https://github.com/enb-make/bh#%D0%9A%D0%BB%D0%B0%D1%81%D1%81-ctx) specification:

Current status:

 * [x] apply
 * [ ] applyBase
 * [x] Setters/getters (attr, attrs, bem, cls, content, generateId, position, position, length, isFirst, isLast, isSimple, js, json, mix, mod, mods, param, tag)
 * [ ] extend
 * [ ] stop
 * [ ] tParam
 * [x] Simple block html generation (tag, attrs, content)
 * [ ] Full block html generation

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
  jsot#block            x 3,276,978 ops/sec ±1.73% (92 runs sampled)
  jsotbh#block          x 1,050,475 ops/sec ±2.74% (90 runs sampled)
  bh#block              x    60,020 ops/sec ±2.35% (80 runs sampled)

Benchmarking block_mod matching
  jsot#block_mod        x 4,397,479 ops/sec ±0.68% (93 runs sampled)
  jsotbh#block_mod      x   468,487 ops/sec ±3.42% (83 runs sampled)
  bh#block_mod          x    47,983 ops/sec ±2.44% (84 runs sampled)

Benchmarking element matching...
  jsot#block__elem      x 1,853,451 ops/sec ±1.01% (90 runs sampled)
  jsotbh#block__elem    x   371,236 ops/sec ±1.18% (90 runs sampled)
  bh#block__elem        x    44,523 ops/sec ±2.61% (82 runs sampled)  
```

[npm-url]: https://npmjs.org/package/jsot-bh
[npm-image]: http://img.shields.io/npm/v/jsot-bh.svg

[travis-url]: https://travis-ci.org/floatdrop/jsot-bh
[travis-image]: http://img.shields.io/travis/floatdrop/jsot-bh.svg

[depstat-url]: https://david-dm.org/floatdrop/jsot-bh
[depstat-image]: https://david-dm.org/floatdrop/jsot-bh.svg?theme=shields.io

[coveralls-url]: https://coveralls.io/r/floatdrop/jsot-bh
[coveralls-image]: http://img.shields.io/coveralls/floatdrop/jsot-bh/master.svg
