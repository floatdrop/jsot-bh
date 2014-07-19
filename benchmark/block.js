var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var benchmarks = require('beautify-benchmark');

console.log('Benchmarking block matching...');

var JSOT = require('jsot');
var jsot = new JSOT();
jsot.match({ block: 'block' }, function (json) { return this.apply(json.content); });

var JSOTBH = require('..');
var jsotbh = new JSOTBH();
jsotbh.match('block', function () { return this.apply(this.content()); });

suite
.add('jsot#block', function() {
    jsot.apply({ block: 'block' });
})
.add('jsotbh#block', function() {
    jsotbh.apply({ block: 'block' });
})

.on('cycle', function(event) { benchmarks.add(event.target); })
.on('complete', function() { benchmarks.log(); })
.run({ 'async': true });
