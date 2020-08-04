
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
      
      var kc = e.keyCode;
      e.preventDefault();
      console.log(kc)
      if(kc === 65) Keys.left = true;
      if(kc === 74) Keys.up = true;
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
      if(kc === 74) Keys.up = false;
      if(kc === 68) Keys.right = false;
      if(kc === 83) Keys.down = false;

      if(kc === 37) secondKeys.left = false;
      if(kc === 38) secondKeys.up = false;
      if(kc === 39) secondKeys.right = false;
      if(kc === 40) secondKeys.down = false;
    };
  }

  export function handleGravity(player, mapLevel){
    let touched = null;
    if(!player.onFloor && mapLevel.length > 0){
      touched = mapLevel.map(resource => {
        return player.hitBottom(resource);
      })
      if(touched !== null && touched.indexOf(true) < 0){
        player.y += 8;
      }else{
        player.onFloor = false;
      }
    }
  
  }

  export function handleJumpLimit(player, mapLevel){
    let touched = null;
    if(!player.onFloor && mapLevel.length > 0){
      touched = mapLevel.map(resource => {
        return player.hitTop(resource);
      })
      console.log(touched)
      if(touched !== null && touched.indexOf(true) < 0){
        player.y -= 8;
      }
    }
  
  }

  export function handleJumping(player, mapLevel){
    let touched = null;
    player.onFloor = false;
    if(player.direction === 'UP' && mapLevel.length > 0){
      touched = mapLevel.map(resource => {
        return player.hitTop(resource);
      })
      console.log(touched);
      if(touched !== null && touched.indexOf(true) < 0){
        player.y -= 15;
      }else{
        player.direction = 'DOWN'
      }
    }
  }

  export function handleMovement(player, mapLevel, otherPlayers, canvas){
    const globalMap = [...mapLevel, ...otherPlayers]
    let touched = null;

      if(mapLevel.length > 0){
      
        switch(player.sprite){
            case 'A':
              if(Keys.up && (player.y > 0)){
                player.direction = "UP";
                // touched = globalMap.map(resource => {
                //   return player.checkCollision(resource);
                // })

                // if(touched.indexOf(true) >= 0){
                //   player.y += 6;
                // }
                // if(player.jumped <= player.powerJump){
                //       player.y -= 40;
                //       player.jumped += 0.5;
                // }
              
                }
              
                if(Keys.down){
                  player.direction = "DOWN";
                  touched = globalMap.map(resource => {
                      return player.checkCollision(resource);
                    })
                    if(touched.indexOf(true) >= 0){
                      player.y -= 6;
                    }
                  player.y += 6;
                }
              
                if(Keys.left && (player.x > 4)) {
                  player.direction = "LEFT";
                  touched = globalMap.map(resource => {
                    return player.checkCollision(resource);
                  })

                  if(touched.indexOf(true) >= 0){
                    player.x += 6;
                  }
                  player.x -= 6;
                }
              
                if(Keys.right && (player.x + player.width + 4 < canvas.width)){
                  player.direction = "RIGHT";
                  touched = globalMap.map(resource => {
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
                globalMap.map(resource => {
                  player.checkCollision(resource);
                })
                  player.y -= 6;
                }
              
                if(secondKeys.down){
                  globalMap.map(resource => {
                    player.checkCollision(resource);
                  })
                  player.y += 6;
                }
              
                if(secondKeys.left && (player.x > 4)) {
                  player.direction = "LEFT";
                  touched = globalMap.map(resource => {
                    return player.checkCollision(resource);
                  })

                  if(touched.indexOf(true) >= 0){
                    player.x += 6;
                  }
                  player.x -= 6;
                }
              
                if(secondKeys.right && (player.x + player.width + 4 < canvas.width)){
                  player.direction = "RIGHT";
                  touched = globalMap.map(resource => {
                    return player.checkCollision(resource);
                  })

                  if(touched.indexOf(true) >= 0){
                    player.x -= 6;
                  }
                  player.x += 6;
                }
                break;  
              default:
                  break;  
        }
    }
  }
