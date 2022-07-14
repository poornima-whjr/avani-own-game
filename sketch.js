var WAIT = 0
var QUESTION = 1
var RESULT = 2
var END = 3
var gameState = WAIT
var rounds = 0
var feedback = ""
var feedbackColor = "green"
var bg, bgImg
var player, player_flying
var carpet, carpetImg
var genie, genieImg
var instruction, instructionImg
var title, titleImg

var ghost, ghostImg
var bat, batImg
var box, boxImg
var aladinImg1, aladinImg2, aladin, yasmine
var questionSound, sound1
//var edges = createEdgeSprites()
var lampImg
var points = 0
var questions = ["Q1.I am the rare case when today comes before yesterday. What am I?", "Q2.I go on red, but stop for green. What am I doing?", "Q3.What goes up but never comes down?", "Q4.How many months of the year have 28 days?", "What can you hold in your left hand but not your right?"]
var options = [["Book", "Encyclopedia", "Dictionary", "Notebook"], ["eating a watermelon", "drinking a red-green juice", "sleeping on a red-green pillow", "colouring a book"], ["Your clothes", "Your face", "Your traits", "Your age"], ["1", "2", "8", "12"], ["Left leg", "left elbow", "right elbow", "right leg"]]
var answers = ["c", "a", "d", "d", "c"]
var startTime = 0
var score = 0



//ghost.velocityY = 1
// createEdgeSprites()

function preload() {
  bgImg = loadImage("assets/bgImg.jpg")
  player_flying = loadImage("assets/player.png")

  titleImg = loadImage("assets/lamp.png")
  instructionImg = loadImage("assets/instruction box.png")
  carpetImg = loadAnimation("assets/1.png", "assets/2.png", "assets/3.png", "assets/4.png", "assets/5.png", "assets/6.png")
  genieImg = loadAnimation("assets/genie1.png", "assets/genie2.png", "assets/genie3.png", "assets/genie4.png", "assets/genie5.png", "assets/genie6.png")
  instructionImg = loadImage("assets/instruction.png")
  questionSound = loadSound("assets/question.mp3")
  boxImg = loadImage("assets/box.png")
  lampImg = loadImage("assets/point.png")
  aladinImg1 = loadImage("assets/AlladinYasmine1.png")
  aladinImg2 = loadImage("assets/AlladinYasmine2.gif")
  batImg = loadAnimation("assets/bat1.png", "assets/bat2.png", "assets/bat3.png")
  ghostImg = loadAnimation("assets/ghost1.png", "assets/ghost2.png", "assets/ghost3.png", "assets/ghost4.png")
  questionSound = loadSound("assets/question.mp3")

}

function setup() {
  createCanvas(windowWidth, windowHeight)
  //background image


  bg = createSprite(1000, 500);
  bg.addImage(bgImg);
  bg.scale = 3

  aladin = createSprite(windowWidth / 2 - 320, windowHeight / 2 - 300, 10, 10)
  aladin.addImage(aladinImg1)
  aladin.scale = 0.45

  yasmine = createSprite(windowWidth / 2 + 300, windowHeight / 2 - 300, 10, 10)
  yasmine.addImage(aladinImg2)
  yasmine.scale = 0.45

  /*point1 = createSprite(windowWidth / 2 - 830, windowHeight / 2 - 450, 40, 40)
  point1.addImage(point)
  point1.scale = 0.5
  //point1.visible=false

  point2 = createSprite(windowWidth / 2 - 730, windowHeight / 2 - 450, 40, 40)
  point2.addImage(point)
  point2.scale = 0.5
  //point1.visible=false

  point3 = createSprite(windowWidth / 2 - 630, windowHeight / 2 - 450, 40, 40)
  point3.addImage(point)
  point3.scale = 0.5
  //point1.visible=false

  point4 = createSprite(windowWidth / 2 - 530, windowHeight / 2 - 450, 40, 40)
  point4.addImage(point)
  point4.scale = 0.5
  //point1.visible=false

  point5 = createSprite(windowWidth / 2 - 430, windowHeight / 2 - 450, 40, 40)
  point5.addImage(point)
  point5.scale = 0.5
  //point1.visible=false
 */
  box = createSprite(windowWidth / 2, windowHeight / 2 + 250, 10, 10)
  box.addImage(boxImg)
  box.scale = 3
  //point1.visible=false

  player = createSprite(150, 500, 10, 10)
  player.addImage(player_flying)
  player.scale = 1.5
  //point2.visible=false

  title = createSprite(windowWidth / 2 + 40, windowHeight / 2 - 350, 10, 10)
  title.addImage(titleImg)
  //point3.visible=false

  instruction = createSprite(windowWidth / 2 + 10, windowHeight / 2 - 100, 10, 10)
  instruction.addImage(instructionImg)
  //point4.visible=false

  carpet = createSprite(150, 650, 10, 10)
  carpet.addAnimation("flying", carpetImg)
  carpet.scale = 1.5
  //point5.visible=false

  genie = createSprite(windowWidth / 2 + 550, windowHeight / 2 + 210, 10, 10)
  genie.addAnimation("genie", genieImg)
  genie.scale = 3

  bat = createSprite(windowWidth - 150, windowHeight - 550, 10, 10)
  bat.addAnimation("bat", batImg)
  bat.scale = 2
  bat.velocityX = -1

  ghost = createSprite(windowWidth / 2 - 800, windowHeight - 130)
  ghost.addAnimation("ghost", ghostImg)
  ghost.scale = 0.8



  //point1.visible=false

  bg.velocityX = -10

  genie.visible = false
  box.visible = false



}

function draw() {
  background("black")

  drawSprites();
  if (bg.x < 800) {
    bg.x = 1000
  }

   //bat.bounceOff(edges)
   //ghost.bounceOff(edges)

  if (keyDown("DOWN_ARROW")) {
    player.y = player.y + 2
    carpet.y = carpet.y + 2
  }
  if (keyDown("UP_ARROW")) {
    player.y = player.y - 2
    carpet.y = carpet.y - 2

  }
  if (keyDown("LEFT_ARROW")) {
    player.x = player.x - 2
    carpet.x = carpet.x - 2
  }
  if (keyDown("RIGHT_ARROW")) {
    player.x = player.x + 2
    carpet.x = carpet.x + 2
  }

  for(var i=1;i<=points;i++){
    image(lampImg,i*100,70,120,100)
  }
  

  startTime++
  if (startTime > 50 && gameState ===0) {
    gameState = 1
    questionSound.play()
  }
  if (gameState === 1 || gameState ===2) {
    genie.visible = true
    box.visible = true
    bg.velocityX = 0
   
    
    textSize(30)
    fill("black")
    textFont("Algeria")
    //console.log(rounds)
    text(questions[rounds], windowWidth / 2 - 450, windowHeight / 2 + 160)

    textSize(25)
    fill("blue")
    textFont("Algeria")
    text("a:" + options[rounds][0], windowWidth / 2 - 450, windowHeight / 2 + 220)
    text("b:" + options[rounds][1], windowWidth / 2 - 450, windowHeight / 2 + 260)
    text("c:" + options[rounds][2], windowWidth / 2 - 450, windowHeight / 2 + 300)
    text("d:" + options[rounds][3], windowWidth / 2 - 450, windowHeight / 2 + 340)
    fill(feedbackColor)
    text(feedback, windowWidth / 2 - 50, windowHeight / 2 + 340)

  }

}
function keyPressed() {
  console.log("gameState:"+gameState)
  console.log(keyCode)
  if(gameState === 1){
  var userAnswer
  switch (keyCode) {
    case 65: userAnswer = "a"
    gameState = 2
      break;
    case 66: userAnswer = "b"
    gameState = 2
      break;
    case 67: userAnswer = "c"
    gameState = 2
      break;
    case 68: userAnswer = "d"
    gameState = 2
      break;
    default: break;
  }

  if (userAnswer === answers[rounds]) {
    feedbackColor = "green"
    feedback = "You got it right!"
    points++
  }
  else if(keyCode === 78){
    feedback = ""
    gameState = 0
  startTime = 0
  rounds++
  feedback = ""
  genie.visible = false
  box.visible = false
  bg.velocityX = -10
  }
  else {
    feedbackColor = "red"
    feedback = "You got it wrong!"

  }
}
else if(keyCode = 78){
  gameState = 0
  startTime = 0
  rounds++
  feedback = ""
  genie.visible = false
  box.visible = false
  bg.velocityX = -10
}
console.log("gameState:"+gameState)
}