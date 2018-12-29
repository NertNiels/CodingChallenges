var img;

var offX;
var offY;

var scale;

var seed;

var octaves;

var type;

function setup() {
  var w = getAllUrlParams().width;
  if(!w) w = 200;
  var h = getAllUrlParams().height;
  if(!h) h = 200;
  createCanvas(w, h)
  // noLoop();

  CreatePNoise();

  seed = getAllUrlParams().seed;
  if(!seed) seed = random(0, 200);

  scale = getAllUrlParams().scale;
  if(!scale) scale = 100;

  octaves = getAllUrlParams().octaves;
  if(!octaves) octaves = 5;

  offX = getAllUrlParams().offX;
  if(!offX) offX = 0;

  offY = getAllUrlParams().offY;
  if(!offY) offY = 0;

  type = getAllUrlParams().type;
  if(!type) type = "biome";

  init();
}

function init() {
  var fallOffMap = GenerateFallOffMap2D(width, height, 3, 4);
  var noiseMap = GenerateNoiseMap(width, height, scale, seed, octaves, 0.5, 2, createVector(offX, offY));
  noiseMap = adjustToFallOffMap2D(width, height, noiseMap, fallOffMap);
  var moistureMap = GenerateMoistureMap(width, height, noiseMap, seed, scale);
  var temperatureMap = GenerateTemperatureMap(width, height, noiseMap, 0.3);
  var biomeMap = GenerateBiomeMap(width, height, noiseMap, temperatureMap, moistureMap);
  var islandMap = GenerateIslandMap(width, height, scale, seed, createVector(offX, offY));

  if(type == "biome") img = textureGenerator.textureFromBiomeMap(biomeMap, width, height);
  else if(type == "fallOff") img = textureGenerator.textureFromNoiseMap(fallOffMap, width, height);
  else if(type == "noise") img = textureGenerator.textureFromIslandMap(noiseMap, width, height);
  else if(type == "moisture") img = textureGenerator.textureFromMoistureMap(moistureMap, width, height);
  else if(type == "temperature") img = textureGenerator.textureFromTemperatureMap(temperatureMap, width, height)
  else img = textureGenerator.textureFromIslandMap(islandMap, width, height);
}

function draw() {
  background(52);
  image(img, 0, 0);

}
