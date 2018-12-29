var moistureImg;
var noiseImg;
var temperatureImg;
var islandImg;
var biomeMap;

var offX = 0;
var offY = 0;

var scale;

var seed;

function setup() {
  createCanvas(1200, 800)
  // noLoop();

  CreatePNoise();

  seed = random(0, 200);

  scale = 100

  init();
}

function init() {
  var fallOffMap = GenerateFallOffMap2D(width/3, height/2, 3, 4);
  var noiseMap = GenerateNoiseMap(width/3, height/2, scale, seed, 5, 0.5, 2, createVector(offX, offY));
  noiseMap = adjustToFallOffMap2D(width/3, height/2, noiseMap, fallOffMap);
  var islandMap = GenerateIslandMap(width/3, height/2, scale, seed, createVector(offX, offY));
  islandMap = adjustToFallOffMap2D(width/3, height/2, islandMap, fallOffMap);
  var moistureMap = GenerateMoistureMap(width/3, height/2, noiseMap, seed, scale);
  var temperatureMap = GenerateTemperatureMap(width/3, height/2, noiseMap, 0.3);
  var biomeMap = GenerateBiomeMap(width/3, height/2, noiseMap, temperatureMap, moistureMap);

  noiseImg = textureGenerator.textureFromIslandMap(noiseMap, width/3, height/2);
  moistureImg = textureGenerator.textureFromMoistureMap(moistureMap, width/3, height/2);
  temperatureImg = textureGenerator.textureFromTemperatureMap(temperatureMap, width/3, height/2);
  islandImg = textureGenerator.textureFromIslandMap(islandMap, width/3, height/2);
  fallOffImg = textureGenerator.textureFromNoiseMap(fallOffMap, width/3, height/2);
  biomeImg = textureGenerator.textureFromBiomeMap(biomeMap, width/3, height/2);
}

function draw() {
  background(52);
  image(noiseImg, 0, 0);
  image(moistureImg, width/3, 0);
  image(temperatureImg, (width/3)*2, 0)
  image(islandImg, 0, height/2);
  image(fallOffImg, width/3, height/2);
  image(biomeImg, (width/3)*2, height/2);

}
