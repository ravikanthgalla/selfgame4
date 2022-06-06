var playercar,playercarimg;

var road, roadimg;

var car100;

var coin, coinimg, coinGroup;
var score = 0;
var distance = 0;

var cargroup;

var GAMESTATE = 1;
var PLAY = 1;
var END = 0;
var PAUSESTATE = 2;

var over;

var cursor1;

var resetimg;


var pausereset;

var pausereset;

var boundary3, boundary4;

var startgame, boundary, boundary2, obstaclehit, collect;

function preload(){
  
 roadimg = loadAnimation("carracingimage.jpg");
  
 carimg = loadImage("car.png");
  
 MONSTERTRUCK = loadImage("MONSTERTRUCK.png");

  audio = loadSound("car race.wav")
  
  
 pic = loadImage("police.png");
  
 taxi1 = loadImage("taxi.png");
  
 fire = loadImage("firewicket1.png");
  
resetimg = loadImage("resetbutton.png");
  
  pauseimg = loadImage("pauseimg.png")

  build = loadImage("Picture1.png")
  
  resetpauseimg = loadImage("gamereset.png");
  
  stateimg = loadImage("startracing.jpg");
  
  startimg = loadImage("start.png");
  
  purple1 = loadImage("purplecar.png");
  
  mycursor = loadImage("myawesomecursor.png")
  
  coinimg = loadImage("coin.png");

  collect = loadSound("collect.mp3");
  
  obstaclehit = loadSound("obstaclehit.mp3");
}

function setup(){
  createCanvas(displayWidth,displayHeight);
  
    
  
  road = createSprite(width/2,displayHeight/2,10,10);
  road.addAnimation("roadimg",roadimg);
  road.scale = displayHeight/410;

  boundary = createSprite(0, displayHeight/2, 10, displayHeight);
  boundary.visible = false;
  boundary2 = createSprite(displayWidth, displayHeight/2, 10, displayHeight);
  boundary2.visible = false;
  boundary3 = createSprite(displayWidth/2, 0, displayWidth, 10);
  boundary3.visible = false;
  boundary4 = createSprite(displayWidth/2, displayHeight, displayWidth, 10);
  boundary4.visible = false;
  
  
  
   startgame = createSprite(width/2,displayHeight/2);
   console.log(stateimg.height);
   console.log(displayHeight);
   startgame.addImage(stateimg)
  startgame.visible = false;
  
      start = createSprite(width/2,height/1.15,40,20);
      start.addImage(startimg)
      start.scale = 0.15;
  
  over = createSprite(width/2,height/10,20,20);
  over.visible = false;
  over.addImage(resetimg);
  over.scale = 0.7
  
 
  
  car100 = createSprite(displayWidth/2.1,displayHeight/1.1,10,10);
  car100.addImage(carimg);
  car100.scale = 0.150;

  
  
  
  cargroup = new Group();
  coinGroup = new Group();
  
  GAMESTATE = 3;
    PAUSESTATE = 2;
  PLAY = 1
  END = 0;
  STARTSTATE = 3;


over.depth = car100.depth + 1;
over.depth = cargroup.depth;
over.depth = over.depth + 1;
  
 

}

function draw(){
  background("lightgreen");

  car100.collide(boundary);
  car100.collide(boundary2);
  car100.collide(boundary3);
  car100.collide(boundary4);



   cursor("cursor1")
   

  
if(GAMESTATE === PLAY) {
  distance = distance + Math.round(getFrameRate()/60);
   car100.visible = true;
        
  
if(frameCount%1890 === 0){
  audio.stop();
audio.play();
}

        road.velocityY = (7 + 2*distance/150);
        
  
      spawnTRUCK();
      spawncar();
      taxi();
      fire1();
      purple();
      spawnCoins();
  
  if(car100.isTouching(cargroup)) {
    if(road.velocityY > 0){
      obstaclehit.play();
    }
    road.velocityY =  0;
      cargroup.setVelocityYEach(0);
      coinGroup.setVelocityYEach(0);
      GAMESTATE = END;
      cargroup.setLifetimeEach(-1);
      coinGroup.setLifetimeEach(-1);
}

if(car100.isTouching(coinGroup)) {
  score = score + 1;
  coinGroup.destroyEach();
  collect.play();
}
  

  

        if(cargroup.x < width/5.6) {
          cargroup.destroyEach()
        }
  
     if (road.y > displayHeight/4)  {
    road.y = 0;
  }
  
  if(cargroup.isTouching(cargroup)) {
      cargroup.destroyEach();
  }

  if (keyDown("LEFT_ARROW")) 
  {
      car100.x = car100.x-15;
  }
  
    if (keyDown("RIGHT_ARROW")) 
  {
      car100.x = car100.x+15;
  }

  if (keyDown("UP_ARROW")) 
  {
      car100.y = car100.y-15;
  }

  if (keyDown("DOWN_ARROW")) 
  {
      car100.y = car100.y+15;
  }

 } else if(GAMESTATE === END) {
       // PP = createSprite(200,200,50,50)
       over.visible = true;
       audio.stop();
       if(mousePressedOver(over)) {
           reset();
           audio.play();
       }
   } else if (GAMESTATE === STARTSTATE) {
      startgame.visible = true;
      car100.visible = false;

      

      if (mousePressedOver(start)||mousePressedOver(startgame)) {
            reset();
          start.visible = false;
          startgame.visible = false;
          audio.play();
      }
      
   }

  
  drawSprites();

if(GAMESTATE === PLAY || GAMESTATE === END){
  textSize(25);
  fill("lightgreen");
  strokeWeight(2); 
  stroke("lightblue");
  text("Score: " + score, displayWidth/1.1, displayHeight/18);
  text("Distance: " + distance, displayWidth/30, displayHeight/18);
}
}

function spawnTRUCK() {
  
  if (frameCount % 200 === 0) {
    var car = createSprite(400,0,40,10);
    car.x = Math.round(random(0, displayWidth));
    car.addImage(MONSTERTRUCK);
    car.scale = 0.8;
    car.velocityY = road.velocityY;
    
     //assign lifetime to the variable
    car.lifetime = 500;
    car.depth = over.depth-1;
    
       // car.debug= true;
    car.setCollider("rectangle",10,0,100,180)
    
    
    
    cargroup.add(car);
  }
  
}

function spawncar() {
  
  if (frameCount % 280 === 0) {
    var car = createSprite(400,0,40,10);
    car.x = Math.round(random(0, displayWidth));
    car.addImage(pic);
    car.scale = 0.350
    car.velocityY = road.velocityY;
    
     //assign lifetime to the variable
    car.lifetime = 500;
    car.depth = over.depth-1;

       // car.debug= true;
    car.setCollider("rectangle",10,0,130,400)
    
    //add each cloud to the group
    cargroup.add(car);
  }
  
}

function taxi() {
  
  
    
  if (frameCount % 120 === 0) {
    var car = createSprite(width/2,-30,40,10);
    car.x = Math.round(random(0, displayWidth));
    car.addImage(taxi1);
    car.scale = 0.4;
    car.velocityY = road.velocityY;
    car.depth = over.depth-1;

     //assign lifetime to the variable
    car.lifetime = 500;
   // car.debug= true;
    car.setCollider("rectangle",10,0,100,400)
    
    
    
    cargroup.add(car);
  }
  }

function fire1() {
  if (frameCount % 300 === 0) {
    var car = createSprite(width/2,height-50,40,10);
    car.x = Math.round(random(0, displayWidth));
  
    car.addImage(fire);
    car.scale = 1
    car.velocityY = road.velocityY;
    car.depth = over.depth-1;

     //assign lifetime to the variable
    car.lifetime = 500;
    car.setCollider("rectangle",199,0,-60,230);
  
    cargroup.add(car);
   // car.debug = true;

      }
  }

function purple() {
  if (frameCount % 150 === 0) {
    var car = createSprite(width/2,-20,40,10);
    car.x = Math.round(random(0, displayWidth));
  
    car.addImage(purple1);
    car.scale = 0.375
    car.velocityY = road.velocityY;
    car.depth = over.depth-1;

     //assign lifetime to the variable
    car.lifetime = 500;
    car.setCollider("rectangle",0,0,-140,389);
  
    cargroup.add(car);
  // car.debug = true;

      }
  }

  function spawnCoins(){
    if (frameCount % 150 === 0) {
      var coin = createSprite(0, 0, 0, 0);
      coin.x = Math.round(random(0, displayWidth));
    
      coin.addImage(coinimg);
      coin.scale = 0.05;
      coin.velocityY = road.velocityY+2.5;
      coin.depth = over.depth-1;
  
       //assign lifetime to the variable
      coin.lifetime = 500;
//coin.debug = true;    
      coinGroup.add(coin);
    // car.debug = true;
  
        }
  }

function reset() {
  GAMESTATE = PLAY;
  
  distance = 0;
  score = 0;
  car100.x = width/2.05;
  car100.y = height/1.7;
 // cargroup.setVelocityYEach(Math.round(random(5,20)));

    road.velocityY = 10
  over.visible = false;
  cargroup.destroyEach();
  coinGroup.destroyEach();

}



