var DP1 = 7.853981554508209228515625E-1;
var DP2 = 7.94662735614792836714E-9;
var DP3 = 3.06161699786838294307E-17;
var P = [-13093.6939181,1153516.64839,-17956525.1976];
var Q = [13681.2963471,-1320892.3444,25008380.1823,-53869575.5929];
var lossth = 1.073741824e9;

var ldexp = function(mantissa, exponent) {
    return exponent > 1023 // avoid multiplying by infinity
    ? mantissa * Math.pow(2, 1023) * Math.pow(2, exponent - 1023)
    : exponent < -1074 // avoid multiplying by zero
    ? mantissa * Math.pow(2, -1074) * Math.pow(2, exponent + 1074)
    : mantissa * Math.pow(2, exponent);
}

var polevl = function(x, p) {
    var ans = p[0];
    for (var i = 1; i < p.length; i++) {
        ans = ans * x + p[i];
    }
    return ans;
}
 
var p1evl = function(x, p) {
    var ans = x + p[0];
    for (var i = 1; i < p.length; i++) {
        ans = ans * x + p[i];
    }
    return ans;
}

exports.tan = function(xx) {
    if (xx == 0) {
        return 0;
    }
    var x, y, z, zz, j, sign;
    if( xx < 0 ) {
        x = -xx;
        sign = false;
    } else {
        x = xx;
        sign = true;
    }
    if ((x % (Math.PI/2)) < 1e-18 ) {
        return Number.NaN;
    }
    if( x > lossth ) {
        throw "Holy crap this won't work";
    }
    // compute x modulus PI/4 
    y = Math.floor( x/(Math.PI/4) );
    z = ldexp(y, -3);
    z = Math.floor(z);
    z = y - ldexp( z, 3 );
    /* integer and fractional part modulo one octant */
    j = (z | 0);
    /* map zeros and singularities to origin */
    if( j & 1 ) {
        j += 1;
        y += 1.0;
    }
    z = ((x - y * DP1) - y * DP2) - y * DP3;
    zz = z * z;
    if( zz > 1.0e-14 ) {
        y = z  +  z * (zz * polevl( zz, P, 2 )/p1evl(zz, Q, 4));
    } else {
        y = z;
    }
    if( j & 2 ) {
        y = -1.0/y;
    }
    if (!sign) {
        y = -y;
    }
    return y;   
}
