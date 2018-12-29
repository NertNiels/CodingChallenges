var repeat;

function GenerateNoiseMap(mapWidth, mapHeight, scale, seed, octaves, persistance, lacunarity, offset) {
  repeat = -1;

  randomSeed(seed);

  var noiseMap = [mapWidth];
  for(var i = 0; i < mapWidth; i++) {
    noiseMap[i] = [mapHeight];
  }

  var octaveOffsets = [];
  for(var i = 0; i < octaves; i++) {
    var offsetX = random(0, 200000) + offset.x;
    var offsetY = random(0, 200000) + offset.y;
    octaveOffsets[i] = createVector(offsetX, offsetY);
  }

  if(scale <= 0) scale = 0.0001;

  var maxNoiseHeight = Number.MIN_VALUE;
  var minNoiseHeight = Number.MAX_VALUE;

  for(var y = 0; y < mapHeight; y++) {
    for(var x = 0; x < mapWidth; x++) {
      var amplitude = 1;
      var frequency = 1;
      var noiseHeight = 0;

      for(var i = 0; i < octaves; i++) {
        var sampleX = x / scale * frequency + octaveOffsets[i].x;
        var sampleY = y / scale * frequency + octaveOffsets[i].y;

        var perlinValue = PerlinNoise(sampleX, sampleY, 0) * 2 - 1;

        // console.log(perlinValue);



        noiseHeight += perlinValue * amplitude;
        amplitude *= persistance;
        frequency *= lacunarity;
      }
      if(noiseHeight > maxNoiseHeight) maxNoiseHeight = noiseHeight;
      else if (noiseHeight < minNoiseHeight) minNoiseHeight = noiseHeight;
      noiseMap[x][y] = noiseHeight;
      // console.log(noiseHeight);
    }
  }


  // console.log(noiseMap);

  for(var y = 0; y < mapHeight; y++) {
    for(var x = 0; x < mapWidth; x++) {
      noiseMap[x][y] = mathf.inverseLerp(minNoiseHeight, maxNoiseHeight, noiseMap[x][y]);
    }
  }
  //
  // console.log(noiseMap);

  return noiseMap;
}

function GenerateIslandMap(mapWidth, mapHeight, scale, seed, offset) {
  return GenerateNoiseMap(mapWidth, mapHeight, scale, seed, 1, 0, 0, offset);
}

function GenerateFallOffMap(mapHeight, a, b) {
  var map = [mapHeight];

  for(var j = 0; j < mapHeight; j++) {
    var y = j / mapHeight * 2 - 1;
    var value = abs(y);
    map[j] = Eveluate(value, a, b);
  }

  return map;
}

function GenerateFallOffMap2D(mapWidth, mapHeight, a, b) {
  var fallOff = GenerateFallOffMap(mapHeight, a, b);

  var map = [mapWidth];

  for(var i = 0; i < mapWidth; i++) {
    map[i] = fallOff;
  }

  return map;
}

function adjustToFallOffMap(mapWidth, mapHeight, noiseMap, fallOffMap) {
  var map = [mapWidth];
  for(var x = 0; x < mapWidth; x++) {
    map[x] = [mapHeight];
  }

  for(var y = 0; y < mapHeight; y++) {
    for(var x = 0; x < mapWidth; x++) {
      map[x][y] = noiseMap[x][y] * fallOffMap[y];
    }
  }

  return map;
}

function adjustToFallOffMap2D(mapWidth, mapHeight, noiseMap, fallOffMap) {
  var map = [mapWidth];
  for(var x = 0; x < mapWidth; x++) {
    map[x] = [mapHeight];
  }

  for(var y = 0; y < mapHeight; y++) {
    for(var x = 0; x < mapWidth; x++) {
      map[x][y] = noiseMap[x][y] - fallOffMap[x][y];
    }
  }

  return map;
}

function GenerateTemperatureMap(mapWidth, mapHeight, noiseMap, waterSurface, showHeatMap = false) {
  var map = [mapWidth];
  for(var i = 0; i < mapWidth; i++) {
    map[i] = [mapHeight];
  }

  for(var j = 0; j < mapHeight; j++) {
    var heightTempValue = 1-abs(j / mapHeight * 2 - 1);
    for(var i = 0; i < mapWidth; i++) {

      if(showHeatMap) map[i][j] = heightTempValue;
      else if(!(noiseMap[i][j] <= waterSurface)) {
        var tempValue = heightTempValue * noiseMap[i][j];
        map[i][j] = tempValue;
      }
    }
  }
  return map;
}

function Eveluate(value, a, b) {
  return pow(value, a) / (pow(value, a) + pow(b - b * value, a));
}

var permutation = [ 151,160,137,91,90,15,
  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
  190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
  88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
  102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
  135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
  223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
  129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
  251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
  49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
];

var p;

function CreatePNoise() {
  p = [512];
  for(var x = 0; x < 512; x++) {
    p[x] = permutation[x % 256];
  }
}

function PerlinNoise(x, y, z) {
  if (repeat > 0) {                                   // If we have any repeat on, change the coordinates to their "local" repetitions
    x = x % repeat;
    y = y % repeat;
    z = z % repeat;
  }

  var xi = x & 255;
  var yi = y & 255;
  var zi = z & 255;

  var xf = x - floor(x);
  var yf = y - floor(y);
  var zf = z - floor(z);

  var u = fade(xf);
  var v = fade(yf);
  var w = fade(zf);

  var aaa, aba, aab, abb, baa, bba, bab, bbb;
  aaa = p[p[p[xi] + yi] + zi];
  aba = p[p[p[xi] + inc(yi)] + zi];
  aab = p[p[p[xi] + yi] + inc(zi)];
  abb = p[p[p[xi] + inc(yi)] + inc(zi)];
  baa = p[p[p[inc(xi)] + yi] + zi];
  bba = p[p[p[inc(xi)] + inc(yi)] + zi];
  bab = p[p[p[inc(xi)] + yi] + inc(zi)];
  bbb = p[p[p[inc(xi)] + inc(yi)] + inc(zi)];

  var x1, x2, y1, y2;
  x1 = lerp(grad(aaa, xf, yf, zf),                // The gradient function calculates the dot product between a pseudorandom
              grad(baa, xf - 1, yf, zf),              // gradient vector and the vector from the input coordinate to the 8
              u);                                     // surrounding points in its unit cube.
  x2 = lerp(grad(aba, xf, yf - 1, zf),                // This is all then lerped together as a sort of weighted average based on the faded (u,v,w)
              grad(bba, xf - 1, yf - 1, zf),              // values we made earlier.
              u);
  y1 = lerp(x1, x2, v);

  x1 = lerp(grad(aab, xf, yf, zf - 1),
              grad(bab, xf - 1, yf, zf - 1),
              u);
  x2 = lerp(grad(abb, xf, yf - 1, zf - 1),
              grad(bbb, xf - 1, yf - 1, zf - 1),
              u);
  y2 = lerp(x1, x2, v);

  return ((lerp(y1, y2, w) + 1) / 2);
}

function inc(num) {
  num++;
  if(repeat > 0) num %= repeat;
  return num;
}

function grad(hash, x, y, z) {
  var h = hash % 15;
  var u = h < 8 ? x : y;

  var v;

  if(h < 4) v = y;
  else if(h == 12 || h == 14) v = x;
  else v = z;

  return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
