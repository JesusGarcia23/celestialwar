import { checkCollision, hitTop } from './gamePhysics';
import { movePlayer } from '../../../sockets/emit/gameEmit';

  var Keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    action: false
  };

  export const moveCharacter = (player, gameState, canvas) => {
    window.onkeydown = function(e) {
      var kc = e.keyCode;
      e.preventDefault();
      if(kc === 87) Keys.action = true;
      if(kc === 65) {
        Keys.left = true
        handleMovement(player, gameState, canvas)
      };
      if(kc === 74) {
        Keys.up = true;
        handleMovement(player, gameState, canvas)
      };
      if(kc === 68) {
        Keys.right = true;
        handleMovement(player, gameState, canvas)
      }
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
  
        if (Keys.up && (myPlayer.y > 0)) {
          myPlayer.direction = 'UP';
          myPlayer.jumped = true;            
          }
  
        if (Keys.left && (myPlayer.x > 4)) {
          myPlayer.direction = "LEFT";
          touched = globalMap.map(resource => {
            return checkCollision(myPlayer, resource, spheres);
          })
  
          if (touched.indexOf(true) < 0) {
            movePlayer(myPlayer, "LEFT", 0.7, true, gameState);
          }
        }

        if (Keys.right && (myPlayer.x + myPlayer.width + 4 < canvasRef.width)) {
          myPlayer.direction = "RIGHT";
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
  if (myPlayer.jumped && Keys.up && mapLevel.length > 0) {
    touched = mapLevel.filter(resource => resource.type !== "warrior-pedestal").map(resource => {
      return hitTop(myPlayer, resource, spheres, gameState);
    })
    console.log(myPlayer)
    if (touched !== null && touched.indexOf(true) < 0 && Keys.up) {
      if (myPlayer.modeWarrior && myPlayer.y > 0.6) {
        movePlayer(myPlayer, "UP", 0.7, true, gameState);
      } else if (!myPlayer.modeWarrior && myPlayer.totalJumped <= myPlayer.powerJump && myPlayer.y > 5) {
        myPlayer.totalJumped += 1;
        myPlayer.y -= 20;
      }
    } else{
      myPlayer.totalJumped = 100;
    }
  }
}


