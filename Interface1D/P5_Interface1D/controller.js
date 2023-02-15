
// This is where your state machines and game logic lives


// class Controller {

//     // This is the state we start with.
//     constructor() {
//         this.gameState = "PLAY";
       
//     }
    
//     // This is called from draw() in sketch.js with every frame
//     update() {

//         // STATE MACHINE ////////////////////////////////////////////////
//         // This is where your game logic lives
//         /////////////////////////////////////////////////////////////////
//         switch(this.gameState) {

//             // This is the main game state, where the playing actually happens
//             case "PLAY":

//                 // clear screen at frame rate so we always start fresh      
//                 display.clear();
            
//                 // show all players in the right place, by adding them to display buffer
//                 display.setPixel(playerBlack.position, playerBlack.playerColor);
//                 display.setPixel(playerTwo.position, playerTwo.playerColor);
                

//                 // now add the target
//                 display.setPixel(target.position, target.playerColor);

                
//                 // check if player has caught target
//                 if (playerBlack.position == target.position)  {
//                     playerBlack.score++;              // increment score
//                     this.gameState = "COLLISION";   // go to COLLISION state
//                 }
                
//                 // check if other player has caught target        
//                 if (playerTwo.position == target.position)  {
//                     playerTwo.score++;              // increment their score
//                     this.gameState = "COLLISION";   // go to COLLISION state
//                 }

//                 break;

//             // This state is used to play an animation, after a target has been caught by a player 
//             case "COLLISION":
                
//                  // clear screen at frame rate so we always start fresh      
//                  display.clear();

//                 // play explosion animation one frame at a time.
//                 // first figure out what frame to show
//                 let frameToShow = collisionAnimation.currentFrame();    // this grabs number of current frame and increments it 
                
//                 // then grab every pixel of frame and put it into the display buffer
//                 for(let i = 0; i < collisionAnimation.pixels; i++) {
//                     display.setPixel(i,collisionAnimation.animation[frameToShow][i]);                    
//                 }

//                 //check if animation is done and we should move on to another state
//                 if (frameToShow == collisionAnimation.animation.length-1)  {
                    
//                     // We've hit score max, this player wins
//                     if (playerBlack.score >= score.max) {
//                         score.winner = playerBlack.playerColor;   // store winning color in score.winner
//                         this.gameState = "SCORE";               // go to state that displays score
                    
//                     // We've hit score max, this player wins
//                     } else if (playerTwo.score >= score.max) {
//                         score.winner = playerTwo.playerColor;   // store winning color in score.winner
//                         this.gameState = "SCORE";               // go to state that displays score

//                     // We haven't hit the max score yet, keep playing    
//                     } else {
//                         target.position = parseInt(random(0,displaySize));  // move the target to a new random position
//                         this.gameState = "PLAY";    // back to play state
//                     }
//                 } 

//                 break;

//             // Game is over. Show winner and clean everything up so we can start a new game.
//             case "SCORE":       
            
//                 // reset everyone's score
//                 playerBlack.score = 0;
//                 playerTwo.score = 0;

//                 // put the target somewhere else, so we don't restart the game with player and target in the same place
//                 target.position = parseInt(random(1,displaySize));

//                 //light up w/ winner color by populating all pixels in buffer with their color
//                 display.setAllPixels(score.winner);                    

//                 break;

//             // Not used, it's here just for code compliance
//             default:
//                 break;
//         }
//     }
// }




// This function gets called when a key on the keyboard is pressed
function keyPressed() {

    // Move player one to the left if letter A is pressed
    if (key == 'A' || key == 'a') {
        if (blackMovementCheck()){
            if (targetPositionList.indexOf(playerBlack.position) != -1) {
                stateList[playerBlack.position] = "OCCUPIED";
            }
            playerBlack.move(-1);
            stateList[playerBlack.position] = "EMPTY";
        }  
      }
    
    // And so on...
    if (key == 'D' || key == 'd') {
        if (blackMovementCheck()){
            if (targetPositionList.indexOf(playerBlack.position) != -1) {
                stateList[playerBlack.position] = "OCCUPIED";
            }
            playerBlack.move(1);
            stateList[playerBlack.position] = "EMPTY";
        }  
        console.log(playerBlack.position);
    }    

    if (key == 'J' || key == 'j') {
        if (collisionCheck(playerWhite, -1)){
            stateList[playerWhite.position] = "EMPTY";
            
            playerWhite.move(-1);
            for (let i = 0; i < targetPositionList.length; i++) {
                if (targetPositionList[i] == playerWhite.position) {
                    stateList[targetList[i].position] == "EMPTY";
                    targetList[i].move(-1);
                    stateList[targetList[i].position] == "OCCUPIED";
                }
            }
            stateList[playerWhite.position] = "OCCUPIED";
        }
    }
    
    if (key == 'L' || key == 'l') {
        if (collisionCheck(playerWhite, -1)){
            playerWhite.move(1);
        }
    }
    
    // When you press the letter R, the game resets back to the play state
    if (key == 'R' || key == 'r') {
    controller.gameState = "PLAY";
    }
  }

//State Check

function stateChange() {

}

// Collision Check

function collisionCheck(playerOnMove, movement) {
    let targetPosition = [];

    // Current position
    let playerPositionPrevious = playerOnMove.position;
    
    console.log(playerOnMove.position);
    // Check collision on next pixel
    playerOnMove.move(movement);
    let playerMovePosition = playerOnMove.position;
    // Check collision on next next pixel
    playerOnMove.move(movement);
    console.log(playerWhite.position);
    let playerMoveOneMorePosition = playerOnMove.position;

    let checkTarget = new Set(targetPositionList);
    
    if (stateList[playerMovePosition] == "OCCUPIED"){
        if (stateList[playerMoveOneMorePosition] == "OCCUPIED"){
            playerOnMove.move(-movement);
            playerOnMove.move(-movement);
            return false;
        } else {
            // for (let i = 0; i < targetPositionList.length; i++){
            //     if (targetPosition[i] == playerMovePosition) {
            //         stateList[playerMovePosition] == "EMPTY";
            //         targetList[i].move(movement);
            //         targetPosition[i] = targetList[i].position;
            //         stateList[targetPosition[i]] == "OCCUPIED";
            //     }
            // }
            playerOnMove.move(-movement);
            playerOnMove.move(-movement);
            return true;
            
        }
    } else {
        playerOnMove.move(-movement);
        playerOnMove.move(-movement);
        return true;
    }
    playerOnMove.move(-movement);
    playerOnMove.move(-movement);
    return true;
}



function blackMovementCheck() {
    let temp = 0;
    if (targetPositionList.indexOf(playerBlack.position) == -1) {
        return true;
    } else {
        for (let i = 0; i < targetPositionList.length; i++) {
            if (targetPositionList[i] == playerBlack.position) {
                temp++;
            }
        }
        if (temp == 1) {
            return true;
        }
        return false;
    }
}

// function individualCollisionCheck(position) {
//     if () {

//     }
// }
  


// ------------------------------------------------------------

class Controller {

    // This is the state we start with.
    constructor() {
        this.gameState = "PLAY";
       
    }
    
    // This is called from draw() in sketch.js with every frame
    update() {

        // STATE MACHINE ////////////////////////////////////////////////
        // This is where your game logic lives
        /////////////////////////////////////////////////////////////////
        switch(this.gameState) {

            // This is the main game state, where the playing actually happens
            case "PLAY":

                // clear screen at frame rate so we always start fresh      
                display.clear();
                targetPositionList = [targetYellowOne.position, targetYellowTwo.targetPosition];
                
   
                // now add the target
                
                // show all players in the right place, by adding them to display buffer
                display.setPixel(targetYellowOne.position, targetYellowOne.playerColor);
                display.setPixel(targetYellowTwo.position, targetYellowTwo.playerColor);

                // display.setPixel(playerBlack.position, playerBlack.playerColor);
                display.setPixel(playerBlack.position, playerBlack.playerColor);
                display.setPixel(playerWhite.position, playerWhite.playerColor);

                stateList[playerWhite.position] = "OCCUPIED";
                stateList[targetYellowOne.position] = "OCCUPIED";
                stateList[targetYellowTwo.position] = "OCCUPIED";
                // Run blackpositioncheck

                if (!blackMovementCheck()) {
                    // If black is used to mask the pixel and covered by another one
                    stateList[playerBlack.position] = "OCCUPIED";
                } else {
                    stateList[playerBlack.position] = "EMPTY";
                }

                
                
                // check if player has caught target
                // if (playerBlack.position == target.position)  {
                //     playerBlack.score++;              // increment score
                //     // this.gameState = "COLLISION";   // go to COLLISION state
                // }
                
                // // check if other player has caught target        
                // if (playerWhite.position == target.position)  {
                //     playerWhite.score++;              // increment their score
                //     // this.gameState = "COLLISION";   // go to COLLISION state
                // }

                break;

            // This state is used to play an animation, after a target has been caught by a player 
            // case "COLLISION":
                
            //      // clear screen at frame rate so we always start fresh      
            //      display.clear();

            //     // play explosion animation one frame at a time.
            //     // first figure out what frame to show
            //     let frameToShow = collisionAnimation.currentFrame();    // this grabs number of current frame and increments it 
                
            //     // then grab every pixel of frame and put it into the display buffer
            //     for(let i = 0; i < collisionAnimation.pixels; i++) {
            //         display.setPixel(i,collisionAnimation.animation[frameToShow][i]);                    
            //     }

            //     //check if animation is done and we should move on to another state
            //     if (frameToShow == collisionAnimation.animation.length-1)  {
                    
            //         // We've hit score max, this player wins
            //         if (playerBlack.score >= score.max) {
            //             score.winner = playerBlack.playerColor;   // store winning color in score.winner
            //             this.gameState = "SCORE";               // go to state that displays score
                    
            //         // We've hit score max, this player wins
            //         } else if (playerWhite.score >= score.max) {
            //             score.winner = playerWhite.playerColor;   // store winning color in score.winner
            //             this.gameState = "SCORE";               // go to state that displays score

            //         // We haven't hit the max score yet, keep playing    
            //         } else {
            //             target.position = parseInt(random(0,displaySize));  // move the target to a new random position
            //             this.gameState = "PLAY";    // back to play state
            //         }
            //     } 

            //     break;

            // // Game is over. Show winner and clean everything up so we can start a new game.
            // case "SCORE":       
            
            //     // reset everyone's score
            //     playerBlack.score = 0;
            //     playerWhite.score = 0;

            //     // put the target somewhere else, so we don't restart the game with player and target in the same place
            //     target.position = parseInt(random(1,displaySize));

            //     //light up w/ winner color by populating all pixels in buffer with their color
            //     display.setAllPixels(score.winner);                    

            //     break;

            // // Not used, it's here just for code compliance
            default:
                break;
        }
    }
}