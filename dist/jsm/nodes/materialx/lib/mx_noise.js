import{code}from"../../code/CodeNode.js";import{fn}from"../../code/FunctionNode.js";export const mx_noise=code('float mx_select(bool b, float t, float f)\n{\n    return b ? t : f;\n}\n\nfloat mx_negate_if(float val, bool b)\n{\n    return b ? -val : val;\n}\n\nint mx_floor(float x)\n{\n    return int(floor(x));\n}\n\n// return mx_floor as well as the fractional remainder\nfloat mx_floorfrac(float x, out int i)\n{\n    i = mx_floor(x);\n    return x - float(i);\n}\n\nfloat mx_bilerp(float v0, float v1, float v2, float v3, float s, float t)\n{\n    float s1 = 1.0 - s;\n    return (1.0 - t) * (v0*s1 + v1*s) + t * (v2*s1 + v3*s);\n}\nvec3 mx_bilerp(vec3 v0, vec3 v1, vec3 v2, vec3 v3, float s, float t)\n{\n    float s1 = 1.0 - s;\n    return (1.0 - t) * (v0*s1 + v1*s) + t * (v2*s1 + v3*s);\n}\nfloat mx_trilerp(float v0, float v1, float v2, float v3, float v4, float v5, float v6, float v7, float s, float t, float r)\n{\n    float s1 = 1.0 - s;\n    float t1 = 1.0 - t;\n    float r1 = 1.0 - r;\n    return (r1*(t1*(v0*s1 + v1*s) + t*(v2*s1 + v3*s)) +\n            r*(t1*(v4*s1 + v5*s) + t*(v6*s1 + v7*s)));\n}\nvec3 mx_trilerp(vec3 v0, vec3 v1, vec3 v2, vec3 v3, vec3 v4, vec3 v5, vec3 v6, vec3 v7, float s, float t, float r)\n{\n    float s1 = 1.0 - s;\n    float t1 = 1.0 - t;\n    float r1 = 1.0 - r;\n    return (r1*(t1*(v0*s1 + v1*s) + t*(v2*s1 + v3*s)) +\n            r*(t1*(v4*s1 + v5*s) + t*(v6*s1 + v7*s)));\n}\n\n// 2 and 3 dimensional gradient functions - perform a dot product against a\n// randomly chosen vector. Note that the gradient vector is not normalized, but\n// this only affects the overal "scale" of the result, so we simply account for\n// the scale by multiplying in the corresponding "perlin" function.\nfloat mx_gradient_float(uint hash, float x, float y)\n{\n    // 8 possible directions (+-1,+-2) and (+-2,+-1)\n    uint h = hash & 7u;\n    float u = mx_select(h<4u, x, y);\n    float v = 2.0 * mx_select(h<4u, y, x);\n    // compute the dot product with (x,y).\n    return mx_negate_if(u, bool(h&1u)) + mx_negate_if(v, bool(h&2u));\n}\nfloat mx_gradient_float(uint hash, float x, float y, float z)\n{\n    // use vectors pointing to the edges of the cube\n    uint h = hash & 15u;\n    float u = mx_select(h<8u, x, y);\n    float v = mx_select(h<4u, y, mx_select((h==12u)||(h==14u), x, z));\n    return mx_negate_if(u, bool(h&1u)) + mx_negate_if(v, bool(h&2u));\n}\nvec3 mx_gradient_vec3(uvec3 hash, float x, float y)\n{\n    return vec3(mx_gradient_float(hash.x, x, y), mx_gradient_float(hash.y, x, y), mx_gradient_float(hash.z, x, y));\n}\nvec3 mx_gradient_vec3(uvec3 hash, float x, float y, float z)\n{\n    return vec3(mx_gradient_float(hash.x, x, y, z), mx_gradient_float(hash.y, x, y, z), mx_gradient_float(hash.z, x, y, z));\n}\n// Scaling factors to normalize the result of gradients above.\n// These factors were experimentally calculated to be:\n//    2D:   0.6616\n//    3D:   0.9820\nfloat mx_gradient_scale2d(float v) { return 0.6616 * v; }\nfloat mx_gradient_scale3d(float v) { return 0.9820 * v; }\nvec3 mx_gradient_scale2d(vec3 v) { return 0.6616 * v; }\nvec3 mx_gradient_scale3d(vec3 v) { return 0.9820 * v; }\n\n/// Bitwise circular rotation left by k bits (for 32 bit unsigned integers)\nuint mx_rotl32(uint x, int k)\n{\n    return (x<<k) | (x>>(32-k));\n}\n\nvoid mx_bjmix(inout uint a, inout uint b, inout uint c)\n{\n    a -= c; a ^= mx_rotl32(c, 4); c += b;\n    b -= a; b ^= mx_rotl32(a, 6); a += c;\n    c -= b; c ^= mx_rotl32(b, 8); b += a;\n    a -= c; a ^= mx_rotl32(c,16); c += b;\n    b -= a; b ^= mx_rotl32(a,19); a += c;\n    c -= b; c ^= mx_rotl32(b, 4); b += a;\n}\n\n// Mix up and combine the bits of a, b, and c (doesn\'t change them, but\n// returns a hash of those three original values).\nuint mx_bjfinal(uint a, uint b, uint c)\n{\n    c ^= b; c -= mx_rotl32(b,14);\n    a ^= c; a -= mx_rotl32(c,11);\n    b ^= a; b -= mx_rotl32(a,25);\n    c ^= b; c -= mx_rotl32(b,16);\n    a ^= c; a -= mx_rotl32(c,4);\n    b ^= a; b -= mx_rotl32(a,14);\n    c ^= b; c -= mx_rotl32(b,24);\n    return c;\n}\n\n// Convert a 32 bit integer into a floating point number in [0,1]\nfloat mx_bits_to_01(uint bits)\n{\n    return float(bits) / float(uint(0xffffffff));\n}\n\nfloat mx_fade(float t)\n{\n   return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n\nuint mx_hash_int(int x)\n{\n    uint len = 1u;\n    uint seed = uint(0xdeadbeef) + (len << 2u) + 13u;\n    return mx_bjfinal(seed+uint(x), seed, seed);\n}\n\nuint mx_hash_int(int x, int y)\n{\n    uint len = 2u;\n    uint a, b, c;\n    a = b = c = uint(0xdeadbeef) + (len << 2u) + 13u;\n    a += uint(x);\n    b += uint(y);\n    return mx_bjfinal(a, b, c);\n}\n\nuint mx_hash_int(int x, int y, int z)\n{\n    uint len = 3u;\n    uint a, b, c;\n    a = b = c = uint(0xdeadbeef) + (len << 2u) + 13u;\n    a += uint(x);\n    b += uint(y);\n    c += uint(z);\n    return mx_bjfinal(a, b, c);\n}\n\nuint mx_hash_int(int x, int y, int z, int xx)\n{\n    uint len = 4u;\n    uint a, b, c;\n    a = b = c = uint(0xdeadbeef) + (len << 2u) + 13u;\n    a += uint(x);\n    b += uint(y);\n    c += uint(z);\n    mx_bjmix(a, b, c);\n    a += uint(xx);\n    return mx_bjfinal(a, b, c);\n}\n\nuint mx_hash_int(int x, int y, int z, int xx, int yy)\n{\n    uint len = 5u;\n    uint a, b, c;\n    a = b = c = uint(0xdeadbeef) + (len << 2u) + 13u;\n    a += uint(x);\n    b += uint(y);\n    c += uint(z);\n    mx_bjmix(a, b, c);\n    a += uint(xx);\n    b += uint(yy);\n    return mx_bjfinal(a, b, c);\n}\n\nuvec3 mx_hash_vec3(int x, int y)\n{\n    uint h = mx_hash_int(x, y);\n    // we only need the low-order bits to be random, so split out\n    // the 32 bit result into 3 parts for each channel\n    uvec3 result;\n    result.x = (h      ) & 0xFFu;\n    result.y = (h >> 8 ) & 0xFFu;\n    result.z = (h >> 16) & 0xFFu;\n    return result;\n}\n\nuvec3 mx_hash_vec3(int x, int y, int z)\n{\n    uint h = mx_hash_int(x, y, z);\n    // we only need the low-order bits to be random, so split out\n    // the 32 bit result into 3 parts for each channel\n    uvec3 result;\n    result.x = (h      ) & 0xFFu;\n    result.y = (h >> 8 ) & 0xFFu;\n    result.z = (h >> 16) & 0xFFu;\n    return result;\n}\n\nfloat mx_perlin_noise_float(vec2 p)\n{\n    int X, Y;\n    float fx = mx_floorfrac(p.x, X);\n    float fy = mx_floorfrac(p.y, Y);\n    float u = mx_fade(fx);\n    float v = mx_fade(fy);\n    float result = mx_bilerp(\n        mx_gradient_float(mx_hash_int(X  , Y  ), fx    , fy     ),\n        mx_gradient_float(mx_hash_int(X+1, Y  ), fx-1.0, fy     ),\n        mx_gradient_float(mx_hash_int(X  , Y+1), fx    , fy-1.0),\n        mx_gradient_float(mx_hash_int(X+1, Y+1), fx-1.0, fy-1.0),\n        u, v);\n    return mx_gradient_scale2d(result);\n}\n\nfloat mx_perlin_noise_float(vec3 p)\n{\n    int X, Y, Z;\n    float fx = mx_floorfrac(p.x, X);\n    float fy = mx_floorfrac(p.y, Y);\n    float fz = mx_floorfrac(p.z, Z);\n    float u = mx_fade(fx);\n    float v = mx_fade(fy);\n    float w = mx_fade(fz);\n    float result = mx_trilerp(\n        mx_gradient_float(mx_hash_int(X  , Y  , Z  ), fx    , fy    , fz     ),\n        mx_gradient_float(mx_hash_int(X+1, Y  , Z  ), fx-1.0, fy    , fz     ),\n        mx_gradient_float(mx_hash_int(X  , Y+1, Z  ), fx    , fy-1.0, fz     ),\n        mx_gradient_float(mx_hash_int(X+1, Y+1, Z  ), fx-1.0, fy-1.0, fz     ),\n        mx_gradient_float(mx_hash_int(X  , Y  , Z+1), fx    , fy    , fz-1.0),\n        mx_gradient_float(mx_hash_int(X+1, Y  , Z+1), fx-1.0, fy    , fz-1.0),\n        mx_gradient_float(mx_hash_int(X  , Y+1, Z+1), fx    , fy-1.0, fz-1.0),\n        mx_gradient_float(mx_hash_int(X+1, Y+1, Z+1), fx-1.0, fy-1.0, fz-1.0),\n        u, v, w);\n    return mx_gradient_scale3d(result);\n}\n\nvec3 mx_perlin_noise_vec3(vec2 p)\n{\n    int X, Y;\n    float fx = mx_floorfrac(p.x, X);\n    float fy = mx_floorfrac(p.y, Y);\n    float u = mx_fade(fx);\n    float v = mx_fade(fy);\n    vec3 result = mx_bilerp(\n        mx_gradient_vec3(mx_hash_vec3(X  , Y  ), fx    , fy     ),\n        mx_gradient_vec3(mx_hash_vec3(X+1, Y  ), fx-1.0, fy     ),\n        mx_gradient_vec3(mx_hash_vec3(X  , Y+1), fx    , fy-1.0),\n        mx_gradient_vec3(mx_hash_vec3(X+1, Y+1), fx-1.0, fy-1.0),\n        u, v);\n    return mx_gradient_scale2d(result);\n}\n\nvec3 mx_perlin_noise_vec3(vec3 p)\n{\n    int X, Y, Z;\n    float fx = mx_floorfrac(p.x, X);\n    float fy = mx_floorfrac(p.y, Y);\n    float fz = mx_floorfrac(p.z, Z);\n    float u = mx_fade(fx);\n    float v = mx_fade(fy);\n    float w = mx_fade(fz);\n    vec3 result = mx_trilerp(\n        mx_gradient_vec3(mx_hash_vec3(X  , Y  , Z  ), fx    , fy    , fz     ),\n        mx_gradient_vec3(mx_hash_vec3(X+1, Y  , Z  ), fx-1.0, fy    , fz     ),\n        mx_gradient_vec3(mx_hash_vec3(X  , Y+1, Z  ), fx    , fy-1.0, fz     ),\n        mx_gradient_vec3(mx_hash_vec3(X+1, Y+1, Z  ), fx-1.0, fy-1.0, fz     ),\n        mx_gradient_vec3(mx_hash_vec3(X  , Y  , Z+1), fx    , fy    , fz-1.0),\n        mx_gradient_vec3(mx_hash_vec3(X+1, Y  , Z+1), fx-1.0, fy    , fz-1.0),\n        mx_gradient_vec3(mx_hash_vec3(X  , Y+1, Z+1), fx    , fy-1.0, fz-1.0),\n        mx_gradient_vec3(mx_hash_vec3(X+1, Y+1, Z+1), fx-1.0, fy-1.0, fz-1.0),\n        u, v, w);\n    return mx_gradient_scale3d(result);\n}\n\nfloat mx_cell_noise_float(float p)\n{\n    int ix = mx_floor(p);\n    return mx_bits_to_01(mx_hash_int(ix));\n}\n\nfloat mx_cell_noise_float(vec2 p)\n{\n    int ix = mx_floor(p.x);\n    int iy = mx_floor(p.y);\n    return mx_bits_to_01(mx_hash_int(ix, iy));\n}\n\nfloat mx_cell_noise_float(vec3 p)\n{\n    int ix = mx_floor(p.x);\n    int iy = mx_floor(p.y);\n    int iz = mx_floor(p.z);\n    return mx_bits_to_01(mx_hash_int(ix, iy, iz));\n}\n\nfloat mx_cell_noise_float(vec4 p)\n{\n    int ix = mx_floor(p.x);\n    int iy = mx_floor(p.y);\n    int iz = mx_floor(p.z);\n    int iw = mx_floor(p.w);\n    return mx_bits_to_01(mx_hash_int(ix, iy, iz, iw));\n}\n\nvec3 mx_cell_noise_vec3(float p)\n{\n    int ix = mx_floor(p);\n    return vec3(\n            mx_bits_to_01(mx_hash_int(ix, 0)),\n            mx_bits_to_01(mx_hash_int(ix, 1)),\n            mx_bits_to_01(mx_hash_int(ix, 2))\n    );\n}\n\nvec3 mx_cell_noise_vec3(vec2 p)\n{\n    int ix = mx_floor(p.x);\n    int iy = mx_floor(p.y);\n    return vec3(\n            mx_bits_to_01(mx_hash_int(ix, iy, 0)),\n            mx_bits_to_01(mx_hash_int(ix, iy, 1)),\n            mx_bits_to_01(mx_hash_int(ix, iy, 2))\n    );\n}\n\nvec3 mx_cell_noise_vec3(vec3 p)\n{\n    int ix = mx_floor(p.x);\n    int iy = mx_floor(p.y);\n    int iz = mx_floor(p.z);\n    return vec3(\n            mx_bits_to_01(mx_hash_int(ix, iy, iz, 0)),\n            mx_bits_to_01(mx_hash_int(ix, iy, iz, 1)),\n            mx_bits_to_01(mx_hash_int(ix, iy, iz, 2))\n    );\n}\n\nvec3 mx_cell_noise_vec3(vec4 p)\n{\n    int ix = mx_floor(p.x);\n    int iy = mx_floor(p.y);\n    int iz = mx_floor(p.z);\n    int iw = mx_floor(p.w);\n    return vec3(\n            mx_bits_to_01(mx_hash_int(ix, iy, iz, iw, 0)),\n            mx_bits_to_01(mx_hash_int(ix, iy, iz, iw, 1)),\n            mx_bits_to_01(mx_hash_int(ix, iy, iz, iw, 2))\n    );\n}\n\nfloat mx_fractal_noise_float(vec3 p, int octaves, float lacunarity, float diminish)\n{\n    float result = 0.0;\n    float amplitude = 1.0;\n    for (int i = 0;  i < octaves; ++i)\n    {\n        result += amplitude * mx_perlin_noise_float(p);\n        amplitude *= diminish;\n        p *= lacunarity;\n    }\n    return result;\n}\n\nvec3 mx_fractal_noise_vec3(vec3 p, int octaves, float lacunarity, float diminish)\n{\n    vec3 result = vec3(0.0);\n    float amplitude = 1.0;\n    for (int i = 0;  i < octaves; ++i)\n    {\n        result += amplitude * mx_perlin_noise_vec3(p);\n        amplitude *= diminish;\n        p *= lacunarity;\n    }\n    return result;\n}\n\nvec2 mx_fractal_noise_vec2(vec3 p, int octaves, float lacunarity, float diminish)\n{\n    return vec2(mx_fractal_noise_float(p, octaves, lacunarity, diminish),\n                mx_fractal_noise_float(p+vec3(19, 193, 17), octaves, lacunarity, diminish));\n}\n\nvec4 mx_fractal_noise_vec4(vec3 p, int octaves, float lacunarity, float diminish)\n{\n    vec3  c = mx_fractal_noise_vec3(p, octaves, lacunarity, diminish);\n    float f = mx_fractal_noise_float(p+vec3(19, 193, 17), octaves, lacunarity, diminish);\n    return vec4(c, f);\n}\n\nfloat mx_worley_distance(vec2 p, int x, int y, int xoff, int yoff, float jitter, int metric)\n{\n    vec3  tmp = mx_cell_noise_vec3(vec2(x+xoff, y+yoff));\n    vec2  off = vec2(tmp.x, tmp.y);\n\n    off -= 0.5f;\n    off *= jitter;\n    off += 0.5f;\n\n    vec2 cellpos = vec2(float(x), float(y)) + off;\n    vec2 diff = cellpos - p;\n    if (metric == 2)\n        return abs(diff.x) + abs(diff.y);       // Manhattan distance\n    if (metric == 3)\n        return max(abs(diff.x), abs(diff.y));   // Chebyshev distance\n    // Either Euclidian or Distance^2\n    return dot(diff, diff);\n}\n\nfloat mx_worley_distance(vec3 p, int x, int y, int z, int xoff, int yoff, int zoff, float jitter, int metric)\n{\n    vec3  off = mx_cell_noise_vec3(vec3(x+xoff, y+yoff, z+zoff));\n\n    off -= 0.5f;\n    off *= jitter;\n    off += 0.5f;\n\n    vec3 cellpos = vec3(float(x), float(y), float(z)) + off;\n    vec3 diff = cellpos - p;\n    if (metric == 2)\n        return abs(diff.x) + abs(diff.y) + abs(diff.z); // Manhattan distance\n    if (metric == 3)\n        return max(max(abs(diff.x), abs(diff.y)), abs(diff.z)); // Chebyshev distance\n    // Either Euclidian or Distance^2\n    return dot(diff, diff);\n}\n\nfloat mx_worley_noise_float(vec2 p, float jitter, int metric)\n{\n    int X, Y;\n    vec2 localpos = vec2(mx_floorfrac(p.x, X), mx_floorfrac(p.y, Y));\n    float sqdist = 1e6f;        // Some big number for jitter > 1 (not all GPUs may be IEEE)\n    for (int x = -1; x <= 1; ++x)\n    {\n        for (int y = -1; y <= 1; ++y)\n        {\n            float dist = mx_worley_distance(localpos, x, y, X, Y, jitter, metric);\n            sqdist = min(sqdist, dist);\n        }\n    }\n    if (metric == 0)\n        sqdist = sqrt(sqdist);\n    return sqdist;\n}\n\nvec2 mx_worley_noise_vec2(vec2 p, float jitter, int metric)\n{\n    int X, Y;\n    vec2 localpos = vec2(mx_floorfrac(p.x, X), mx_floorfrac(p.y, Y));\n    vec2 sqdist = vec2(1e6f, 1e6f);\n    for (int x = -1; x <= 1; ++x)\n    {\n        for (int y = -1; y <= 1; ++y)\n        {\n            float dist = mx_worley_distance(localpos, x, y, X, Y, jitter, metric);\n            if (dist < sqdist.x)\n            {\n                sqdist.y = sqdist.x;\n                sqdist.x = dist;\n            }\n            else if (dist < sqdist.y)\n            {\n                sqdist.y = dist;\n            }\n        }\n    }\n    if (metric == 0)\n        sqdist = sqrt(sqdist);\n    return sqdist;\n}\n\nvec3 mx_worley_noise_vec3(vec2 p, float jitter, int metric)\n{\n    int X, Y;\n    vec2 localpos = vec2(mx_floorfrac(p.x, X), mx_floorfrac(p.y, Y));\n    vec3 sqdist = vec3(1e6f, 1e6f, 1e6f);\n    for (int x = -1; x <= 1; ++x)\n    {\n        for (int y = -1; y <= 1; ++y)\n        {\n            float dist = mx_worley_distance(localpos, x, y, X, Y, jitter, metric);\n            if (dist < sqdist.x)\n            {\n                sqdist.z = sqdist.y;\n                sqdist.y = sqdist.x;\n                sqdist.x = dist;\n            }\n            else if (dist < sqdist.y)\n            {\n                sqdist.z = sqdist.y;\n                sqdist.y = dist;\n            }\n            else if (dist < sqdist.z)\n            {\n                sqdist.z = dist;\n            }\n        }\n    }\n    if (metric == 0)\n        sqdist = sqrt(sqdist);\n    return sqdist;\n}\n\nfloat mx_worley_noise_float(vec3 p, float jitter, int metric)\n{\n    int X, Y, Z;\n    vec3 localpos = vec3(mx_floorfrac(p.x, X), mx_floorfrac(p.y, Y), mx_floorfrac(p.z, Z));\n    float sqdist = 1e6f;\n    for (int x = -1; x <= 1; ++x)\n    {\n        for (int y = -1; y <= 1; ++y)\n        {\n            for (int z = -1; z <= 1; ++z)\n            {\n                float dist = mx_worley_distance(localpos, x, y, z, X, Y, Z, jitter, metric);\n                sqdist = min(sqdist, dist);\n            }\n        }\n    }\n    if (metric == 0)\n        sqdist = sqrt(sqdist);\n    return sqdist;\n}\n\nvec2 mx_worley_noise_vec2(vec3 p, float jitter, int metric)\n{\n    int X, Y, Z;\n    vec3 localpos = vec3(mx_floorfrac(p.x, X), mx_floorfrac(p.y, Y), mx_floorfrac(p.z, Z));\n    vec2 sqdist = vec2(1e6f, 1e6f);\n    for (int x = -1; x <= 1; ++x)\n    {\n        for (int y = -1; y <= 1; ++y)\n        {\n            for (int z = -1; z <= 1; ++z)\n            {\n                float dist = mx_worley_distance(localpos, x, y, z, X, Y, Z, jitter, metric);\n                if (dist < sqdist.x)\n                {\n                    sqdist.y = sqdist.x;\n                    sqdist.x = dist;\n                }\n                else if (dist < sqdist.y)\n                {\n                    sqdist.y = dist;\n                }\n            }\n        }\n    }\n    if (metric == 0)\n        sqdist = sqrt(sqdist);\n    return sqdist;\n}\n\nvec3 mx_worley_noise_vec3(vec3 p, float jitter, int metric)\n{\n    int X, Y, Z;\n    vec3 localpos = vec3(mx_floorfrac(p.x, X), mx_floorfrac(p.y, Y), mx_floorfrac(p.z, Z));\n    vec3 sqdist = vec3(1e6f, 1e6f, 1e6f);\n    for (int x = -1; x <= 1; ++x)\n    {\n        for (int y = -1; y <= 1; ++y)\n        {\n            for (int z = -1; z <= 1; ++z)\n            {\n                float dist = mx_worley_distance(localpos, x, y, z, X, Y, Z, jitter, metric);\n                if (dist < sqdist.x)\n                {\n                    sqdist.z = sqdist.y;\n                    sqdist.y = sqdist.x;\n                    sqdist.x = dist;\n                }\n                else if (dist < sqdist.y)\n                {\n                    sqdist.z = sqdist.y;\n                    sqdist.y = dist;\n                }\n                else if (dist < sqdist.z)\n                {\n                    sqdist.z = dist;\n                }\n            }\n        }\n    }\n    if (metric == 0)\n        sqdist = sqrt(sqdist);\n    return sqdist;\n}');const includes=[mx_noise];export const mx_perlin_noise_float=fn("float mx_perlin_noise_float( any p )",includes);export const mx_perlin_noise_vec2=fn("vec2 mx_perlin_noise_vec2( any p )",includes);export const mx_perlin_noise_vec3=fn("vec3 mx_perlin_noise_vec3( any p )",includes);export const mx_cell_noise_float=fn("float mx_cell_noise_float( vec3 p )",includes);export const mx_worley_noise_float=fn("float mx_worley_noise_float( any p, float jitter, int metric )",includes);export const mx_worley_noise_vec2=fn("float mx_worley_noise_vec2( any p, float jitter, int metric )",includes);export const mx_worley_noise_vec3=fn("float mx_worley_noise_vec3( any p, float jitter, int metric )",includes);export const mx_fractal_noise_float=fn("float mx_fractal_noise_float( vec3 p, int octaves, float lacunarity, float diminish )",includes);export const mx_fractal_noise_vec2=fn("float mx_fractal_noise_vec2( vec3 p, int octaves, float lacunarity, float diminish )",includes);export const mx_fractal_noise_vec3=fn("float mx_fractal_noise_vec3( vec3 p, int octaves, float lacunarity, float diminish )",includes);export const mx_fractal_noise_vec4=fn("float mx_fractal_noise_vec4( vec3 p, int octaves, float lacunarity, float diminish )",includes);