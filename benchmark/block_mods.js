var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var benchmarks = require('beautify-benchmark');

console.log('Benchmarking block_mod matching...');

var JSOTBH = require('..');
var jsotbh = new JSOTBH();
jsotbh.match('block_disabled_yes', function (ctx) { ctx.tag('block'); ctx.attr('disabled', 'yes'); });

var BH = require('bh').BH;
var bh = new BH();
bh.match('block_disabled_yes', function (ctx) { ctx.tag('block'); ctx.attr('disabled', 'yes'); });

suite
.add('jsotbh#block_mod', function() {
    jsotbh.apply({ block: 'block', mods: { disabled: 'yes' } });
})
.add('bh#block_mod', function() {
    bh.apply({ block: 'block', mods: { disabled: 'yes' } });
})

.on('cycle', function(event) { benchmarks.add(event.target); })
.on('complete', function() { benchmarks.log(); })
.run({ 'async': true });
