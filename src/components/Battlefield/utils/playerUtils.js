import { checkCollision, hitTop, hitBottom } from './gamePhysics';
import { movePlayer } from '../../../sockets/emit/gameEmit';

  var Keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    action: false
  };

  export const moveControls = () => {

    window.onkeydown = function(e) {
      var kc = e.keyCode;
      e.preventDefault();
      if(kc === 87) Keys.action = true;
      if(kc === 65) Keys.left = true;
      if(kc === 74) Keys.up = true;
      if(kc === 68) Keys.right = true;
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

export const handleMovement = (myPlayer, gameState, canvasRef) => {

    if (gameState && gameState.gameStatus) {

      const {players, spheres, map } = gameState.gameStatus;
      const globalMap = [...map, ...players, ...spheres];
      let touched = null;
  
      if (map.length > 0) {
  
        if (Keys.left && (myPlayer.x > 0.7)) {
          touched = globalMap.map(resource => {
            return checkCollision(myPlayer, resource, spheres);
          })
  
          if (touched.indexOf(true) < 0) {
            movePlayer(myPlayer, "LEFT", 0.7, true, gameState);
          }
        }

        if (Keys.right && (myPlayer.x + myPlayer.width + 0.3 < 100)) {
          console.log("Player X: ", myPlayer.x)
          console.log("Player Width: ", myPlayer.width);
          console.log(canvasRef.width)
          touched = globalMap.map(resource => {
            return checkCollision(myPlayer, resource, spheres);
          })

          if (touched.indexOf(true) < 0) {
            movePlayer(myPlayer, "RIGHT", 0.7, true, gameState);
          }
        }

        if (Keys.up) {
          console.log("UP!");
          handleJumping(myPlayer, globalMap, spheres, gameState)
        }
  
      }
      
    }
}

export const handleJumping = (myPlayer, mapLevel, spheres, gameState) => {
  let touched = null;
  myPlayer.onFloor = false;
  console.log("JUMPING")
  if (Keys.up && mapLevel.length > 0) {
    touched = mapLevel.filter(resource => resource.type !== "warrior-pedestal").map(resource => {
      return hitTop(myPlayer, resource, spheres, gameState);
    })
    console.log(touched)
    if (touched !== null && touched.indexOf(true) < 0 && Keys.up) {
      if (myPlayer.modeWarrior && myPlayer.y > 0.6) {
        movePlayer(myPlayer, "UP", 3, true, gameState);
      } else if (!myPlayer.modeWarrior && myPlayer.totalJumped <= myPlayer.powerJump && myPlayer.y > 5) {
        myPlayer.totalJumped += 1;
        myPlayer.y -= 20;
      }
    } else{
      myPlayer.totalJumped = 100;
    }
  }
}

export function handleGravity(myPlayer, mapLevel, canvasRef) {

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

