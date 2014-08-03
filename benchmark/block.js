var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var benchmarks = require('beautify-benchmark');

console.log('Benchmarking block matching...');

var JSOTBH = require('..');
var jsotbh = new JSOTBH();
jsotbh.match('block', function (ctx) { ctx.tag('block'); });

var BH = require('bh').BH;
var bh = new BH();
bh.match('block', function (ctx) { ctx.tag('block'); });

suite
.add('jsotbh#block', function() {
    jsotbh.apply({ block: 'block' });
})
.add('bh#block', function() {
    bh.apply({ block: 'block' });
})

.on('cycle', function(event) { benchmarks.add(event.target); })
.on('complete', function() { benchmarks.log(); })
.run({ 'async': true });
