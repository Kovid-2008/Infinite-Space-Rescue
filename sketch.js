var backgrounds,backgroundImg;
var player,playerImg;
var enemy1,enemy1Img;
var enemy2,enemy2Img;
var enemy3,enemy3Img;
var astronaut,astronautImg;
var astroG,enemy1G,enemy2G,enemy3G;
var backgroundSound,explosion;
var score = 0;
var play;
var end;
var gameState = "play"



function preload(){
  backgroundImg =loadImage("download.png");
  playerImg=loadImage("player.png");
  enemy1Img=loadImage("enemy1.png");
  enemy2Img=loadImage("enemy2.png");
  enemy3Img=loadImage("enemy3.png");
  astronautImg=loadImage("astronaut.png");
  backgroundSound=loadSound("interstellar-space-preview-full.mp3");
  explosion=loadSound("preview.mp3");
  
  

}

function setup() {
  createCanvas(600,600);
 backgrounds=createSprite(250,250,20,20);
 backgrounds.velocityY=2;
 backgrounds.addImage("space",backgroundImg);
 backgrounds.scale=4;
  
  astroG = new Group();
  enemy1G = new Group();
  enemy2G = new Group();
  enemy3G = new Group();

 player=createSprite(300,550,10,10);
 player.addImage("ship",playerImg);

}

function draw() {
  background(0);
  if(gameState === "play"){
    backgroundSound.loop();
  if(backgrounds.y === 400){
    backgrounds.y = 250;
  }
  if(keyDown("left_arrow")){
    player.x=player.x-3.5;
  }
  if(keyDown("right_arrow")){
    player.x=player.x+3.5;
  }
  console.log(frameCount);
  
  enemyships();
  astronauts();
  if(astroG.isTouching(player)){
    astroG.destroyEach();
    score = score + 1;
  }
  
  if(astroG.y>player.y){
    astroG.destroyEach();
  }
  drawSprites();
  text("Score: " + score,490,30);
  
  if(enemy1G.isTouching(player) || enemy2G.isTouching(player) || enemy3G.isTouching(player)){
    explosion.playSound();
    gameState="end";
  }
    createEdgeSprites();
    if(player.x<0 || player.x>600){
      player.x=300;
    }
  }

  if(gameState==="end"){
    fill("yellow");
    textSize(25);
    text("Game Over",250,300);
    fill("white");
    text("Press Space To Start Over!!!",175,350);
    if(score < 25 ){
    fill("red");
    }
    if(score < 50 && score > 25){
    fill("yellow");
    }
    if(score > 50){
    fill("green");
    }
    text("Final Score: " + score,245,400);
    
    if(keyWentDown("space")){
      score = 0;
      astroG.destroyEach();
      enemy1G.destroyEach();
      enemy2G.destroyEach();
      enemy3G.destroyEach();
      gameState = "play";
      backgrounds.y=250;
    }
    
  }




}

function astronauts (){
  if(frameCount % 120=== 0){
    astronaut=createSprite(Math.round(random(30,570)),0,20,20);
    
    astronaut.velocityY=5;
    astronaut.addImage("astro",astronautImg);
    astronaut.scale=0.15;
    astroG.add(astronaut);
    astronaut.lifetime=1000;
  }
  
}
function enemyships(){
  if(frameCount % 200 === 0){
    enemy1=createSprite(600,0,20,20);
    enemy1.x=Math.round(random(30,570));
    enemy1.velocityY=5;
    enemy1.addImage("enemy1",enemy1Img);
    enemy1.scale=0.4;
    enemy1G.add(enemy1);
    enemy1.lifetime=1000;
    enemy1G.depth=astroG.depth+1;
  }
  if(score === 25 || score > 25){
    if(frameCount % 300 === 0){
      enemy2=createSprite(600,0,20,20);
      enemy2.x=Math.round(random(30,570));
      enemy2.velocityY=5;
      enemy2.addImage("enemy2",enemy2Img);
      enemy2.scale=0.4;
      enemy2G.add(enemy2);
      enemy2.lifetime=1000;
      enemy2G.depth=astroG.depth+1;
    }
  }
  if(score === 50 || score > 50){
    if(frameCount % 400 === 0){
      enemy3=createSprite(600,0,20,20);
      enemy3.x=Math.round(random(30,570));
      enemy3.velocityY=5;
      enemy3.scale=0.4;
      enemy3G.add(enemy3);
      enemy3.lifetime=1000;
      enemy3G.depth=astroG.depth+1;
    }
  }
  
}

