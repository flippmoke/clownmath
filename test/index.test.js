var clownmath = require('../');
var assert = require('assert');

describe('Tangent tests ', function() {

    it('should work between 0 and PI/2', function() {
        var iter = 0.000001;
        for (var i = -Math.PI/2 + iter; i < Math.PI/2; i += iter) {
            var c = clownmath.tan(i);
            var a = Math.tan(i);
            var diff = Math.abs(a - c);
            assert(diff < 5e-9);
        }
    });
    
    it('should work at PI/2', function() {
        var c = clownmath.tan(Math.PI/2);
        assert.equal(c, Number.POSITIVE_INFINITY);
        c = clownmath.tan(Math.PI/2 + Math.PI);
        assert.equal(c, Number.POSITIVE_INFINITY);
        c = clownmath.tan(Math.PI/2 + 2 * Math.PI);
        assert.equal(c, Number.POSITIVE_INFINITY);
    });
    
    it('should work at -PI/2', function() {
        var c = clownmath.tan(-Math.PI/2);
        assert.equal(c, Number.NEGATIVE_INFINITY);
        c = clownmath.tan(-Math.PI/2 - Math.PI);
        assert.equal(c, Number.NEGATIVE_INFINITY);
        c = clownmath.tan(-Math.PI/2 - 2 * Math.PI);
        assert.equal(c, Number.NEGATIVE_INFINITY);
    });
});
