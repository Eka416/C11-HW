var track, person, bound_right, bound_left, coin, bomb, energy, track_img, runner_ani, coin_img, bomb_img,energy_img;
var speed = -2
var score = 0
var gameState = "begin"
function preload(){
   track_img = loadImage("path.png")
   runner_ani = loadAnimation("Runner-1.png","Runner-2.png")
   coin_img  =loadImage("coin.png")
   bomb_img = loadImage("bomb.png")
   energy_img = loadImage("energyDrink.png")
}

function setup(){
  createCanvas(400,400);
  track = createSprite(200,200)
  person = createSprite(200,300)
  bound_left = createSprite(25,200,10,400)
  bound_right = createSprite(375,200,10,400)
  coin = createSprite(Math.floor(Math.random() * 301) + 50, 0);
  bomb = createSprite(Math.floor(Math.random() * 301) + 50,0);
  energy = createSprite(Math.floor(Math.random() * 301) + 50,0);

  coin.addImage(coin_img)
  bomb.addImage(bomb_img)
  energy.addImage(energy_img)
  track.addImage("road",track_img)
  person.addAnimation("running", runner_ani)

  person.scale = 0.05
  coin.scale = 0.1
  bomb.scale = 0.1
  energy.scale = 0.1

  bound_right.visible = false
  bound_left.visible = false
}

function draw() {
  background(0);

  if (gameState == "begin") {
    text("Use arrow keys to play",115,125)
    text("Get the Coins and Energy Drinks",90,150)
    text("The bomb makes you lose 5 points",85,175)
    text("To start click on right arrow",100,200)
    text("Space key to pause",125,225)
    text("F key to resume",130,250)
  }
  if (keyWentDown(RIGHT_ARROW) && gameState == "begin") {
     gameState = "play"
  }
  if (keyWentDown("space") && gameState == "play") {
    gameState = "pause"
  }
  if (keyWentDown("f") && gameState == "pause") {
    gameState = "play"
  }
  if (gameState == "pause") {
    textSize(20)
    text("Score: " + score, 300,50)
  }
  if (gameState == "play") {
    coin.velocityY=speed * (-1)
    bomb.velocityY=speed * (-1)
    energy.velocityY=speed * (-1)
    track.velocityY=speed
    console.log(speed)
    drawSprites()
    textSize(20)
    text("Score: " + score, 300,50)
    if (track.y < -70) {
      track.y = 180
    }
    if (coin.y > 500) {
      coin.visible = true
      coin.x = Math.floor(Math.random() * 301) + 50  
      coin.y=-100
      coin.velocityY=speed * (-1)
    } 

    if (energy.y > 500) {
      energy.visible = true
      energy.x = Math.floor(Math.random() * 301) + 50
      energy.y=-100
      energy.velocityY=speed * (-1)
    }

    if (bomb.y > 500) {
      bomb.visible = true
      bomb.x = Math.floor(Math.random() * 301)+ 50
      bomb.y=-100
      bomb.velocityY=speed * (-1)

    }
    if (keyDown(RIGHT_ARROW)) {
      person.x = person.x - speed
    }
    if (keyDown(LEFT_ARROW)) {
      person.x = person.x + speed
    }

    if (person.isTouching(coin)) {
      coin.visible = false
      score++
      coin.x = Math.floor(Math.random() * 301) + 50
      coin.y = -100
      coin.velocityY=speed * (-1)
      coin.visible = true
    }

    if (person.isTouching(bomb)) {
      bomb.visible = false
      score = score - 5
      bomb.x = Math.floor(Math.random() * 301) + 50
      bomb.y = -100
      bomb.velocityY=speed * (-1)
      bomb.visible = true
    }

    if (person.isTouching(energy)) {
      energy.visible = false
      score++
      if (speed > -10) {
        speed = speed - 0.25
        if (speed < -10)
          speed = -10
      }
      energy.x = Math.floor(Math.random() * 301) + 50
      energy.y = -100
      energy.velocityY=speed * (-1)
      energy.visible = true
    }

    person.collide(bound_right)
    person.collide(bound_left)
  }
}