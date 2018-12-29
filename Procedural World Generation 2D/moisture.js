function GenerateMoistureMap(mapWidth, mapHeight, noiseMap, seed, scale) {
  var pixels = [mapWidth];
  for(var i = 0; i < mapWidth; i++) {
    pixels[i] = [mapHeight];
  }

  var fractalMoistureMap = GenerateNoiseMap(mapWidth, mapHeight, scale, seed, 4, 0,5, 2, createVector(offX-200, offY-200));

  for(var y = 0; y < mapHeight; y++) {
    for(var x = 0; x < mapWidth; x++) {
      pixels[x][y] = adjustToHeightMap(noiseMap[x][y], fractalMoistureMap[x][y]);
    }
  }

  return pixels;
}

function adjustToHeightMap(height, moistureValue) {
  if (height <= 0.1) return moistureValue + 8;
  else if (height <= 0.36) return moistureValue + (8 * height);
  else if (height <= 0.4) return moistureValue + (3 * height);
  else if (height <= 0.42) return moistureValue + (1 * height);
  else if (height <= 0.5) return moistureValue + (0.25 * height);
  else return moistureValue;
}
