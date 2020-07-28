
  var Keys = {
    up: false,
    down: false,
    left: false,
    right: false
  };

  var secondKeys = {
    up: false,
    down: false,
    left: false,
    right: false
  };

export const moveCharacters = () => {
    window.onkeydown = function(e){
      console.log(e)
      var kc = e.keyCode;
      e.preventDefault();
      console.log(kc)
    
      if(kc === 65) Keys.left = true;
      if(kc === 87) Keys.up = true;
      if(kc === 68) Keys.right = true;
      if(kc === 83) Keys.down = true;

      if(kc === 37) secondKeys.left = true;
      if(kc === 38) secondKeys.up = true;
      if(kc === 39) secondKeys.right = true;
      if(kc === 40) secondKeys.down = true;
    };
    
    window.onkeyup = function(e){
      var kc = e.keyCode;
      e.preventDefault();
    
      if(kc === 65) Keys.left = false;
      if(kc === 87) Keys.up = false;
      if(kc === 68) Keys.right = false;
      if(kc === 83) Keys.down = false;

      if(kc === 37) secondKeys.left = false;
      if(kc === 38) secondKeys.up = false;
      if(kc === 39) secondKeys.right = false;
      if(kc === 40) secondKeys.down = false;
    };
  }

  export function handleMovement(player, mapLevel){
    let touched = null;
      if(mapLevel.length > 0){
      
        switch(player.sprite){
            case 'A':
              if(Keys.up){
                touched = mapLevel.map(resource => {
                  return player.checkCollision(resource);
                })
                if(touched.indexOf(true) >= 0){
                  player.y += 6;
                }
                  player.y -= 6;
                }
              
                if(Keys.down){
                  touched = mapLevel.map(resource => {
                      return player.checkCollision(resource);
                    })
                    if(touched.indexOf(true) >= 0){
                      player.y -= 6;
                    }
                  player.y += 6;
                }
              
                if(Keys.left) {
                  touched = mapLevel.map(resource => {
                    return player.checkCollision(resource);
                  })
                  console.log(touched)
                  if(touched.indexOf(true) >= 0){
                    player.x += 6;
                  }
                  player.x -= 6;
                }
              
                if(Keys.right){
                  touched = mapLevel.map(resource => {
                    return player.checkCollision(resource);
                  })
                  if(touched.indexOf(true) >= 0){
                    player.x -= 6;
                  }
                  player.x += 6;
                }
                break;
            case 'B':
              if(secondKeys.up){
                mapLevel.map(resource => {
                  player.checkCollision(resource);
                })
                  player.y -= 6;
                }
              
                if(secondKeys.down){
                  mapLevel.map(resource => {
                    player.checkCollision(resource);
                  })
                  player.y += 6;
                }
              
                if(secondKeys.left) {
                  mapLevel.map(resource => {
                    player.checkCollision(resource);
                  })
                  player.x -= 6;
                }
              
                if(secondKeys.right){
                  mapLevel.map(resource => {
                    player.checkCollision(resource);
                  })
                  player.x += 6;
                }
                break;  
              default:
                  break;  
        }
    }
  }
