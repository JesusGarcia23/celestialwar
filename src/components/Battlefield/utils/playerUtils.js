import { checkCollision } from './gamePhysics';
import { movePlayer } from '../../../sockets/emit/gameEmit';

  var Keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    action: false
  };

  export const moveCharacter = (player, gameState) => {
    window.onkeydown = function(e){
      console.log("MOVING!", player);
      console.log("DATA", gameState);
      var kc = e.keyCode;
      e.preventDefault();
      if(kc === 87) Keys.action = true;
      if(kc === 65) {
        Keys.left = true
        handleMovement(player, gameState)
      };
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
  
      if(map.length > 0) {
  
        if(Keys.up && (myPlayer.y > 0)){
          myPlayer.direction = 'UP';
          myPlayer.jumped = true;            
          }
  
        if(Keys.left && (myPlayer.x > 4)) {
          myPlayer.direction = "LEFT";
          touched = globalMap.map(resource => {
            return checkCollision(myPlayer, resource, spheres);
          })
  
          if(touched.indexOf(true) >= 0) {
            movePlayer(myPlayer, "LEFT", 0.7, false, gameState);
          } else {
            movePlayer(myPlayer, "LEFT", 0.7, true, gameState);
          }
        }
  
      }
      
    }

    if (Keys.up) {
        console.log("UP!");
    }
}


