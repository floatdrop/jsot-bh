var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var benchmarks = require('beautify-benchmark');

console.log('Benchmarking element matching...');

var JSOTBH = require('..');
var jsotbh = new JSOTBH();
jsotbh.match('block', function (ctx) { ctx.tag('block'); });
jsotbh.match('block__elem', function (ctx) { ctx.tag('elem'); });

var BH = require('bh').BH;
var bh = new BH();
bh.match('block', function (ctx) { ctx.tag('block'); });
bh.match('block__elem', function (ctx) { ctx.tag('elem'); });

suite
.add('jsotbh#block__elem', function() {
    jsotbh.apply({ block: 'block', content: [{ elem: 'elem' }] });
})
.add('bh#block__elem', function() {
    bh.apply({ block: 'block', content: [{ elem: 'elem' }] });
})

.on('cycle', function(event) { benchmarks.add(event.target); })
.on('complete', function() { benchmarks.log(); })
.run({ 'async': true });
