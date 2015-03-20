var clownmath = require('../');
var assert = require('assert');

describe('Tangent tests ', function() {

    it('should work between 0 and PI/2', function() {
        var iter = 0.00001;
        for (var i = -Math.PI/2 + iter; i < Math.PI/2; i += iter) {
            var c = clownmath.tan(i);
            var a = Math.tan(i);
            var diff = Math.abs(a - c);
            assert(diff < 5e-9);
        }
    });
    
    it('should work at PI/2', function() {
        var c = clownmath.tan(Math.PI/2);
        assert(Number.isNaN(c));
        c = clownmath.tan(Math.PI/2 + Math.PI);
        assert(Number.isNaN(c));
        c = clownmath.tan(Math.PI/2 + 2 * Math.PI);
        assert(Number.isNaN(c));
    });
    
    it('should work at -PI/2', function() {
        var c = clownmath.tan(-Math.PI/2);
        assert(Number.isNaN(c));
        c = clownmath.tan(-Math.PI/2 - Math.PI);
        assert(Number.isNaN(c));
        c = clownmath.tan(-Math.PI/2 - 2 * Math.PI);
        assert(Number.isNaN(c));
    });
    
    it('should work at zero', function() {
        var c = clownmath.tan(0);
        assert.equal(c, 0);
    });

    it('should still work at very small values', function() {
        var c = clownmath.tan(1e-10);
        var a = Math.tan(1e-10);
        assert.equal(c,a);
        // Value passed will be returned here
        assert.equal(c,1e-10);
    });
    
    it('should fail work at very large values', function() {
        assert.throws(function() {
            var c = clownmath.tan(1e10);
        });
        assert.throws(function() {
            var c = clownmath.tan(-1e10);
        });
    });
    
    it('should work at moderately very large values', function() {
        var c = clownmath.tan(1e9);
        var a = Math.tan(1e9);
        var diff = Math.abs(a - c);
        assert(diff < 5e-9);
        var c = clownmath.tan(-1e9);
        var a = Math.tan(-1e9);
        var diff = Math.abs(a - c);
        assert(diff < 5e-9);
    });
});
