var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var benchmarks = require('beautify-benchmark');

console.log('Benchmarking block_mod matching...');

var JSOT = require('jsot');
var jsot = new JSOT();
jsot.match({ block: 'block', mods: { disabled: 'yes' } }, function (json) { return this.apply(json.content); });

var JSOTBH = require('..');
var jsotbh = new JSOTBH();
jsotbh.match('block_disabled_yes', function () { return this.apply(this.content()); });

suite
.add('jsot#block_mod', function() {
    jsot.apply({ block: 'block', mods: { disabled: 'yes' } });
})
.add('jsotbh#block_mod', function() {
    jsotbh.apply({ block: 'block', mods: { disabled: 'yes' } });
})

.on('cycle', function(event) { benchmarks.add(event.target); })
.on('complete', function() { benchmarks.log(); })
.run({ 'async': true });
