/* global describe, it */

var isMatching = require('../is_matching.js');
require('should');

describe('isMatching', function () {
    it('should be truthy on matching objects', function () {
        var a = { b: 2 }, b = { a: 1, b: 2 };
        isMatching(a, b).should.be.ok;
    });

    it('should be falsy on not matching objects', function () {
        var a = { a: 1, b: 1 }, b = { a: 1, b: 2 };
        isMatching(a, b).should.not.be.ok;
    });

    it('should be truthy on equal simple objects', function () {
        var a = { a: 1 }, b = { a: 1 };
        isMatching(a, b).should.be.ok;
    });

    it('should be falsy on unequal simple objects', function () {
        var a = { a: 1 }, b = { a: 2 };
        isMatching(a, b).should.not.be.ok;

        a = { a: 1 }, b = { b: 1 };
        isMatching(a, b).should.not.be.ok;
    });

    it('should be truthy on equal simple objects', function () {
        var a = { a: 1 }, b = { a: 1 };
        isMatching(a, b).should.be.ok;
    });

    it('should be falsy on unequal simple objects', function () {
        var a = { a: 1 }, b = { a: 2 };
        isMatching(a, b).should.not.be.ok;
    });

    it('should be truthy on equal simple variables', function () {
        var a = 'a', b = 'a';
        isMatching(a, b).should.be.ok;
    });

    it('should be falsy on unequal simple variables', function () {
        var a = 'a', b = 'b';
        isMatching(a, b).should.not.be.ok;
        a = b;
        isMatching(a, b).should.be.ok;
    });

    it('should be truthy on equal simple primisives', function () {
        isMatching('a', 'a').should.be.ok;
        isMatching(1, 1).should.be.ok;
        isMatching(true, true).should.be.ok;
    });

    it('should be falsy on unequal simple primisives', function () {
        isMatching('a', 'b').should.not.be.ok;
        isMatching('a', 1).should.not.be.ok;
        isMatching('a', true).should.not.be.ok;
        isMatching(1, 2).should.not.be.ok;
        isMatching(1, 'a').should.not.be.ok;
        isMatching(1, true).should.not.be.ok;
        isMatching(true, false).should.not.be.ok;
        isMatching(true, 'a').should.not.be.ok;
        isMatching(true, 1).should.not.be.ok;
    });

});
