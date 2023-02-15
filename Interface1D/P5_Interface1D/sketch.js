/* /////////////////////////////////////

  4.043 / 4.044 Design Studio: Interaction Intelligence
  February  9, 2023
  Marcelo Coelho

  If you come from Processing, there is a Processing version here. 
  Keep in mind that there are some differences between both versions:
  https://github.com/marcelocoelho/Interface1D

*/ /////////////////////////////////////


let displaySize = 10;   // how many pixels are visible in the game
let pixelSize = 80;     // how big should they look on screen

let playerBlack;    // Adding 2 players to the game
let playerWhite;
let targetYellowOne;       // and one target for players to catch.
let targetYellowTwo;

let targetList;
let targetPositionList = [];

let stateList = [];

let display;      // Aggregates our final visual output before showing it on the screen

let controller;   // This is where the state machine and game logic lives

let collisionAnimation;   // Where we store and manage the collision animation

let score;        // Where we keep track of score and winner

let manager;      // Where we record state of every pixel slot

let obstacles = [3, 5, 7];

let level;

function setup() {

  createCanvas((displaySize*pixelSize), pixelSize);     // dynamically sets canvas size

  display = new Display(displaySize, pixelSize);        //Initializing the display

  // manager = new PixelManager(displaySize);
  for (let i = 0; i < displaySize.length; i++) {
      stateList[i] = "EMPTY";
  }
  


  targetList = [targetYellowOne, targetYellowTwo];

  targetYellowOne = new Player(color(255,255,0), obstacles[0], displaySize, true); 
  targetYellowTwo = new Player(color(255,255,0), obstacles[1], displaySize, true);   // Initializing target using the Player class 

  playerBlack = new Player(color(0,0,0), 1, displaySize, true);   // Initializing players
  playerWhite = new Player(color(255,255,255), 8, displaySize, false);
  
  


  

  targetPositionList = [targetYellowOne.position, targetYellowTwo.position];

  collisionAnimation = new Animation();     // Initializing animation

  controller = new Controller();            // Initializing controller

  score = {max:3, winner:color(0,0,0)};     // score stores max number of points, and color 

}

function draw() {

  // start with a blank screen
  background(128, 128, 128);    

  // Runs state machine at determined framerate
  controller.update();

  // After we've updated our states, we show the current one 
  display.show();
  
  

}

// ------------------------------------------------------------




