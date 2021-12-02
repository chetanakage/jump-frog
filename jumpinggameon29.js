var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg,endImg;
var score = 0;
// game states
var PLAY=1;
var END=0;
var gameState="play";

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  endImg =loadAnimation("gameOver.png");
}


function setup(){
  createCanvas(580,600);
  
  ocean = createSprite(300,300);
  ocean.addImage(oceanImg);
  ocean.velocityY = 4;
  
  frog = createSprite(200,200,50,50);
  frog.scale = 0.2;
  frog.addImage(frogImg);  
  
  //create coin group and climber group
  coinGroup=new Group();
  climbersGroup= new Group();
  
}

function draw(){
  background(0);
  drawSprites();
  
  if (gameState === "play") 
      {
      if(keyDown('space')) {
        frog.velocityX=0;
        frog.velocityY=-2;
        }
      frog.velocityY = frog.velocityY + 0.8;   
      }
  if (ocean.y > 400){
      ocean.y = 300;
    }

  spawnCoin();

    if (frog.isTouching(climbersGroup)) {
        climbersGroup.destroyEach();
        score = score - 1;
    }

    if (frog.isTouching(coinGroup)) {
           coinGroup.destroyEach();
      //the score is increasing
      score = score + 1;
    }

  if (gameState === "end"){
    frog.addAnimation("gameOver",endImg);
    frog.x=200;
    frog.y=300;
    frog.scale=0.6;
    frog.velocityY = 0;
    //all groups are getting destroyed
    coinGroup.destroyEach();
    climbersGroup.destroyEach(); 
    }
  textSize(20);
  fill(255);
  text("Score: "+ score,150,30);
  }

// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 280 === 0) {
    //make the x position of the coin and climber the same
    var coin =  createSprite(Math.round(random(50, 350)),40, 10, 10);
    coin.addImage(coinImg);
    coin.scale=0.09;
   //coin.debug = true
    coin.velocityY = 0.4;
    coin.lifetime = 200;
   coinGroup.add(coin);
 
    var climber = createSprite(Math.round(random (50,350)),40,10,10);
    coin.x = climber.x;
    climber.addImage(climberImg);
    climber.scale=0.1;
    climber.velocityY = 0.3;
    climber.lifetime = 600;
    climbersGroup.add(climber);
  }
 }
 
 

 
  