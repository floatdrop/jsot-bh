var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var benchmarks = require('beautify-benchmark');

console.log('Benchmarking element matching...');

var JSOT = require('jsot');
var jsot = new JSOT();
jsot.match({ block: 'block' }, function (json) { return this.apply(json.content); });
jsot.match({ block: 'block', elem: 'elem' }, function (json) { return this.apply(json.content); });

var JSOTBH = require('..');
var jsotbh = new JSOTBH();
jsotbh.match('block__elem', function () { return this.apply(this.content()); });

suite
.add('jsot#block__elem', function() {
    jsotbh.apply({ block: 'block', content: [{ block: 'block', elem: 'elem' }] });
})
.add('jsotbh#block__elem', function() {
    jsotbh.apply({ block: 'block', content: [{ elem: 'elem' }] });
})

.on('cycle', function(event) { benchmarks.add(event.target); })
.on('complete', function() { benchmarks.log(); })
.run({ 'async': true });
