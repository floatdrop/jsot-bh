var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var benchmarks = require('beautify-benchmark');

console.log('Benchmarking deep bemjsons...');

function matchers(bh) {
    bh.match('block', function (ctx) {
        ctx.tag('deep');
    });
}

var JSOTBH = require('..');
var jsotbh = new JSOTBH();
matchers(jsotbh);

var BH = require('bh').BH;
var bh = new BH();
matchers(bh);

function construct(obj, depth) {
    if (depth < 100) {
        obj.content = construct({ block: 'block' },  depth + 1);
    }
    return obj;
}

suite
.add('jsotbh#deep', function() {
    jsotbh.apply(
        construct({ block: 'block' }, 0)
    );
})
.add('bh#deep', function() {
    bh.apply(
        construct({ block: 'block' }, 0)
    );
})
.on('cycle', function(event) { benchmarks.add(event.target); })
.on('complete', function() { benchmarks.log(); })
.run({ 'async': true });
