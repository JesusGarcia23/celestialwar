import { checkCollision, checkPedestal, hitTop, hitBottom } from './gamePhysics';
import { movePlayer, respawnPlayer } from '../../../sockets/emit/gameEmit';

  var Keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    action: false
  };

  let myDirection = "RIGHT";

  export const handleRespawn = (myPlayer, room) => {
      setTimeout(() => {
        respawnPlayer(myPlayer, room);
      }, 10000)
  }

  export const moveControls = () => {

    window.onkeydown = function(e) {
      var kc = e.keyCode;
      e.preventDefault();
      if(kc === 87) Keys.action = true;
      if(kc === 65) {
        myDirection = "LEFT";
        Keys.left = true;
      };
      if(kc === 74) {
        Keys.up = true;
      }
      if(kc === 68) {
        myDirection = "RIGHT";
        Keys.right = true
      };
      if(kc === 83) Keys.down = true;
    };
    
    window.onkeyup = function(e){
      var kc = e.keyCode;
      e.preventDefault();
      if(kc === 87) Keys.action = false;
      if(kc === 65) Keys.left = false;
      if(kc === 74) Keys.up = false;
      if(kc === 68) Keys.right = false;
      if(kc === 83) Keys.down = false;

    };
  }

  //  handles user movement
export const handleMovement = (myPlayer, gameState, attackRequest) => {

    if (gameState && gameState.gameStatus && myPlayer.alive) {

      const {players, spheres, map } = gameState.gameStatus;
      const globalMap = [...map, ...players, ...spheres];
      let touched = null;
 
      if (map.length > 0) {
  
        //  Moves to Left
        if (Keys.left && (myPlayer.x > 0.7)) {
          touched = globalMap.map(resource => {
            return checkCollision(myPlayer, resource, myDirection, gameState, attackRequest);
          })
  
          if (touched.indexOf(true) < 0) {
            movePlayer(myPlayer, "LEFT", 0.4, true, gameState);
          }
        }

        //  Moves to Right
        if (Keys.right && (myPlayer.x + myPlayer.width + 0.3 < 100)) {
          touched = globalMap.map(resource => {
            return checkCollision(myPlayer, resource, myDirection, gameState, attackRequest);
          })

          if (touched.indexOf(true) < 0) {
            movePlayer(myPlayer, "RIGHT", 0.4, true, gameState);
          }
        }

        // Jumps
        if (Keys.up) {
          handleJumping(myPlayer, globalMap, spheres, gameState, myDirection)
        }

        //  Request to ransform to warrior
        if (Keys.action) {
          
          touched = map.filter(resource => resource.type === 'warrior-pedestal').map(resource => {
            return checkPedestal(myPlayer, resource, myDirection, gameState, attackRequest);
          });

          if(touched.findIndex(pedestal => pedestal.touched) >= 0) {
            let index = touched.findIndex(pedestal => pedestal.touched);
            handleTransformation(myPlayer, touched[index].obj, spheres)
          }

          if (touched.indexOf(true) < 0) {
            
          }
          
        }
  
      }
      
    }
}

//  handles user gravity
export const handleGravity = (myPlayer, mapLevel) => {

  let touched = null;

  if ((mapLevel && mapLevel.gameStatus && mapLevel.gameStatus.map.length > 0)) {

    touched = mapLevel.gameStatus.map.map(resource => {
      return hitBottom(myPlayer, resource);
    })
    if (touched !== null && touched.indexOf(true) < 0) {
      movePlayer(myPlayer, "DOWN", 1, true, mapLevel);
    } else {
      myPlayer.onFloor = true;
      myPlayer.totalJumped = 0;
    }
  }

}

// handles user jumping
const handleJumping = (myPlayer, mapLevel, spheres, gameState) => {
  let touched = null;
  myPlayer.onFloor = false;

  if (Keys.up && mapLevel.length > 0) {

    touched = mapLevel.filter(resource => resource.type !== "warrior-pedestal").map(resource => {
      return hitTop(myPlayer, resource, spheres, gameState);
    });

    if (touched !== null && touched.indexOf(true) < 0 && Keys.up) {
      if (myPlayer.modeWarrior && myPlayer.y > 0.6) {
        movePlayer(myPlayer, "UP", 3, true, gameState);
      } else if (!myPlayer.modeWarrio && myPlayer.y > 5) {
        movePlayer(myPlayer, "UP", 3, true, gameState);
        // myPlayer.totalJumped += 1;
        // myPlayer.y -= 20;
      }
    } else{
      myPlayer.totalJumped = 100;
    }
  }
}

//  handles player transformation to warrior
const handleTransformation = (myPlayer, warriorPedestal) => {

}
