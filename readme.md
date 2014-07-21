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
  jsot#block            x 4,654,042 ops/sec ±0.52% (98 runs sampled)
  jsotbh#block          x   179,996 ops/sec ±1.55% (83 runs sampled)
  bh#block              x    59,938 ops/sec ±2.43% (84 runs sampled)

Benchmarking block_mod matching
  jsot#block_mod        x 4,451,779 ops/sec ±1.23% (91 runs sampled)
  jsotbh#block_mod      x   133,541 ops/sec ±1.72% (85 runs sampled)
  bh#block_mod          x    49,407 ops/sec ±2.45% (84 runs sampled)

Benchmarking element matching...
  jsot#block__elem      x 1,853,063 ops/sec ±1.11% (93 runs sampled)
  jsotbh#block__elem    x    66,996 ops/sec ±1.67% (88 runs sampled)
  bh#block__elem        x    42,735 ops/sec ±2.21% (87 runs sampled)  
```

[npm-url]: https://npmjs.org/package/jsot-bh
[npm-image]: http://img.shields.io/npm/v/jsot-bh.svg

[travis-url]: https://travis-ci.org/floatdrop/jsot-bh
[travis-image]: http://img.shields.io/travis/floatdrop/jsot-bh.svg

[depstat-url]: https://david-dm.org/floatdrop/jsot-bh
[depstat-image]: https://david-dm.org/floatdrop/jsot-bh.svg?theme=shields.io

[coveralls-url]: https://coveralls.io/r/floatdrop/jsot-bh
[coveralls-image]: http://img.shields.io/coveralls/floatdrop/jsot-bh/master.svg
