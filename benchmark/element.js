var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var benchmarks = require('beautify-benchmark');

console.log('Benchmarking element matching...');

var JSOT = require('jsot');
var jsot = new JSOT();
jsot.match({ block: 'block' }, function (json) { return '<block>' + this.apply(json.content) + '</block>'; });
jsot.match({ block: 'block', elem: 'elem' }, function () { return '<elem></elem>'; });

var JSOTBH = require('..');
var jsotbh = new JSOTBH();
jsotbh.match('block', function (ctx) { ctx.tag('block'); });
jsotbh.match('block__elem', function (ctx) { ctx.tag('elem'); });

var BH = require('bh').BH;
var bh = new BH();
bh.match('block', function (ctx) { ctx.tag('block'); });
bh.match('block__elem', function (ctx) { ctx.tag('elem'); });

var BT = require('enb-bt').BT;
var bt = new BT();
bt.match('block', function (ctx) { ctx.setTag('block'); });
bt.match('block__elem', function (ctx) { ctx.setTag('elem'); });

suite
// .add('jsot#block__elem', function() {
//     jsot.apply({ block: 'block', content: [{ block: 'block', elem: 'elem' }] });
// })
.add('jsotbh#block__elem', function() {
    jsotbh.apply({ block: 'block', content: [{ elem: 'elem' }] });
})
.add('bh#block__elem', function() {
    bh.apply({ block: 'block', content: [{ elem: 'elem' }] });
})
// .add('bt#block__elem', function() {
//     bt.apply({ block: 'block', content: [{ elem: 'elem' }] });
// })

.on('cycle', function(event) { benchmarks.add(event.target); })
.on('complete', function() { benchmarks.log(); })
.run({ 'async': true });
