import { checkCollision } from './gamePhysics';
  var Keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    action: false
  };

  export const moveCharacter = () => {
    window.onkeydown = function(e){
      
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

export const handleMovement = (myPlayer, otherPlayers, spheres, mapLevel, canvasRef) => {
    const globalMap = [...mapLevel, ...otherPlayers, ...spheres];
    let touched = null;

    if(mapLevel.length > 0) {

      if(Keys.up && (myPlayer.y > 0)){
        myPlayer.direction = 'UP';
        myPlayer.jumped = true;            
        }

      if(Keys.left && (myPlayer.x > 4)) {
        myPlayer.direction = "LEFT";
        touched = globalMap.map(resource => {
          return checkCollision(myPlayer, resource, spheres);
        })

        if(touched.indexOf(true) >= 0){
          myPlayer.x += 6;
        }
        myPlayer.x -= 6;
      }

    }

    if (Keys.up) {
        console.log("UP!");
    }
}


