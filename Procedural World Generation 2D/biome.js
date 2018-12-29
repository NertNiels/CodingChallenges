var biomeTable = [
  [0, 1,  2,  3,  3,  3],
  [0, 1,  2,  3,  3,  3],
  [0, 1,  4,  4,  5,  5],
  [0, 1,  6,  4,  5,  5],
  [0, 1,  6,  7,  8,  8],
  [0, 1,  6,  9,  8,  8]
];

function GenerateBiomeMap(mapWidth, mapHeight, noiseMap, tempMap, moistureMap) {
  var biomeMap = [];
  for(var i = 0; i < mapWidth; i++) {
    biomeMap[i] = [];
  }

  for(var y = 0; y < mapHeight; y++) {
    for(var x = 0; x < mapWidth; x++) {
      var b;
      var a = noiseMap[x][y];
      if(a <= 0.3) b = -2;
      else if (a <= 0.4) b = -1;
      else {
        var t = floor(tempMap[x][y] * 6);
        var m = floor(moistureMap[x][y] * 6);

        if(m > 5) m = 5;
        if(t > 5) t = 5;
        b = biomeTable[m][t];
      }

      biomeMap[x][y] = b;
    }
  }

  return biomeMap;
}
