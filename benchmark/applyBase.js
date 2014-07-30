var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var benchmarks = require('beautify-benchmark');

console.log('Benchmarking applyBase...');

function matchers(bh) {
    bh.match('block', function (ctx) {
        return [
            '<before/>',
            ctx.json(),
            '<after/>'
        ];
    });
    bh.match('block', function (ctx) {
        ctx.applyBase();
        return [
            '<before/>',
            ctx.json(),
            '<after/>'
        ];
    });
}

var JSOTBH = require('..');
var jsotbh = new JSOTBH();
matchers(jsotbh);

var BH = require('bh').BH;
var bh = new BH();
matchers(bh);

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
