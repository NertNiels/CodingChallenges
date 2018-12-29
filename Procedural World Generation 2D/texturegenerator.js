var textureGenerator = function(obj) {
  if (obj instanceof textureGenerator ) return obj;
  if (!(this instanceof textureGenerator )) return new textureGenerator(obj);
};

textureGenerator.textureFromNoiseMap = function(noiseMap, mapWidth, mapHeight) {

  var pixelMap = [mapWidth * mapHeight];
  for (var y = 0; y < mapHeight; y++) {
    for (var x = 0; x < mapWidth; x++) {
      var lerped = lerpColor(color(0), color(255), noiseMap[x][y]);


      pixelMap[y * mapWidth + x] = lerped;

    }
  }
  return textureGenerator.textureFromColorMap(pixelMap, mapWidth,mapHeight);
}

textureGenerator.textureFromIslandMap = function(noiseMap, mapWidth, mapHeight) {
  var water1 = color(0, 0, 163);
  var water2 = color(0, 0, 249);
  var beach = color(224, 220, 181);
  var green1 = color(0, 132, 0);
  var green2 = color(0, 120, 0);
  var green3 = color(0, 100, 0);
  var green4 = color(0, 70, 0);
  var white1 = color(255, 255, 255);

  var pixels = [mapWidth * mapHeight];

  for (var y = 0; y < mapHeight; y++) {
    for (var x = 0; x < mapWidth; x++) {
      var a = noiseMap[x][y];
      var c;

      // var color1 = lerpColor(water1, water2, a);
      // var color2 = lerpColor(beach, green1, a);
      // var color3 = lerpColor(lerpColor(green2, green3, a), lerpColor(green3, green4, a), a);
      // c = lerpColor(lerpColor(color1, color2, a), lerpColor(color2, color3, a), a);
      if(a <= 0.3) c = water1;
      else if(a <= 0.4) c = water2;
      else if(a <= 0.42) c = beach;
      else if(a >= 0.9) c = white1;
      // else if(a <= 0.5) c = green1;
      // else if(a <= 6) c = green2;
      // else if(a <= 0.72) c = green3;
      // else if(a <= 0.9) c = green4;
      else {
        var c = lerpColor(green1, green4, (a-0.42)/0.42);
      }


      pixels[y * mapWidth + x] = c;
    }
  }

  return textureGenerator.textureFromColorMap(pixels, mapWidth, mapHeight);
}

textureGenerator.textureFromTemperatureMap = function(temperatureMap, mapWidth, mapHeight) {
  var pixelMap = [mapWidth * mapHeight];
  for (var y = 0; y < mapHeight; y++) {
    for (var x = 0; x < mapWidth; x++) {
      var tempValue = temperatureMap[x][y];
      var lerped = lerpColor(lerpColor(color(0, 0, 255), color(255, 255, 0), tempValue), lerpColor(color(255, 255, 0), color(255, 0, 0), tempValue), tempValue);
      pixelMap[y * mapWidth + x] = lerped;
    }
  }
  return textureGenerator.textureFromColorMap(pixelMap, mapWidth,mapHeight);
}

textureGenerator.textureFromMoistureMap = function(moistureMap, mapWidth, mapHeight) {
  var pixelMap = [mapWidth * mapHeight];

  var dryest    = color(255, 139, 17);
  var dryer     = color(245, 245, 23);
  var dry       = color(80, 255, 0);
  var wet       = color(85, 255, 255);
  var wetter    = color(20, 70, 255);
  var wettest   = color(0, 100, 100);

  for (var y = 0; y < mapHeight; y++) {
    for (var x = 0; x < mapWidth; x++) {
      var a = moistureMap[x][y];
      var color1 = lerpColor(dryest, dryer, a);
      var color2 = lerpColor(dry, wet, a);
      var color3 = lerpColor(wetter, wettest, a);
      var c = lerpColor(lerpColor(color1, color2, a), lerpColor(color2, color3, a), a);

      // var c;
      //
      // if (a <= 0.27) c = dryest;
      // else if (a <= 0.4) c = dryer;
      // else if (a <= 0.6) c = dry;
      // else if (a <= 0.8) c = wet;
      // else if (a <= 0.9) c = wetter;
      // else c = wettest;

      pixelMap[y * mapWidth + x] = c;
    }
  }

  return textureGenerator.textureFromColorMap(pixelMap, mapWidth,mapHeight);
}

textureGenerator.textureFromBiomeMap = function(biomeMap, mapWidth, mapHeight) {
  var pixels = [];

  var ice = color(255, 255, 255);
  var desert = color(238, 218, 130);
  var savanna = color(177, 209, 110);
  var tropicalRainforest = color(66, 123, 25);
  var tundra = color(96, 131, 112);
  var temperateRainforest = color(29, 73, 40);
  var grassland = color(164, 255, 99);
  var seasonalForest = color(73, 100, 35);
  var borealForest = color(95, 115, 62);
  var woodland = color(139, 175, 90);
  var deepWater = color(0, 0, 221);
  var water = color(0, 0, 249);

  for(var y = 0; y < mapHeight; y++) {
    for(var x = 0; x < mapWidth; x++) {
      var a = biomeMap[x][y];
      var b;
      if(a == -2)       b = deepWater;
      else if(a == -1)  b = water;
      else if(a == 0)   b = ice;
      else if(a == 1)   b = tundra;
      else if(a == 2)   b = grassland;
      else if(a == 3)   b = desert;
      else if(a == 4)   b = woodland;
      else if(a == 5)   b = savanna;
      else if(a == 6)   b = borealForest;
      else if(a == 7)   b = seasonalForest;
      else if(a == 8)   b = tropicalRainforest;
      else              b = temperateRainforest;

      if(!b) console.log(b);
      pixels[y * mapWidth + x] = b;
    }
  }
  return textureGenerator.textureFromColorMap(pixels, mapWidth, mapHeight);
}


textureGenerator.textureFromColorMap = function(pixelMap, width, height) {
  var img = createImage(width, height);
  img.loadPixels();

  var b = 0;
  for(var i = 0; i < pixelMap.length; i++) {
    try {
      img.pixels[b + 0] = red(pixelMap[i]);
      img.pixels[b + 1] = green(pixelMap[i]);
      img.pixels[b + 2] = blue(pixelMap[i]);
      img.pixels[b + 3] = alpha(pixelMap[i]);
    } catch (e) {
      console.log(pixelMap[i]);
      break;
    }


    b += 4;
  }
  img.updatePixels();
  return img;
}
