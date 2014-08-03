var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var benchmarks = require('beautify-benchmark');

console.log('Benchmarking multiple matchers...');

function matchers(bh) {
    for (var i = 0; i < 1000; i++) {
        bh.match('block__elem', function () { });
    }
}

var JSOTBH = require('..');
var jsotbh = new JSOTBH();
matchers(jsotbh);

var BH = require('bh').BH;
var bh = new BH();
matchers(bh);

suite
.add('jsotbh#match_elem', function() {
    jsotbh.apply({ block: 'block' });
})
.add('bh#match_elem', function() {
    bh.apply({ block: 'block' });
})

.on('cycle', function(event) { benchmarks.add(event.target); })
.on('complete', function() { benchmarks.log(); })
.run({ 'async': true });
