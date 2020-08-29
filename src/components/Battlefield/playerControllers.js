
  var Keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    action: false
  };

  var secondKeys = {
    up: false,
    down: false,
    left: false,
    right: false
  };

const handlePedestal = (pedestal, player, spheres) => {
  let sphereIndex = spheres.findIndex(sphere => sphere.grabbedBy === player.name);
  if(!pedestal.activated && sphereIndex >= 0){
    pedestal.side = player.side;
    pedestal.activated = true;
    pedestal.color = (player.side === "Angel" ? 'blue' : 'red');
    spheres[sphereIndex].hide = true;
    spheres[sphereIndex].grabbedBy = '';
    player.sphereGrabbed = false;
    player.modeWarrior = true;
  }
  if(pedestal.activated && player.sphereGrabbed) {
    player.modeWarrior = true;
  }
}

export const moveCharacters = () => {
    window.onkeydown = function(e){
      
      var kc = e.keyCode;
      e.preventDefault();
      if(kc === 87) Keys.action = true;
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
      if(kc === 87) Keys.action = false;
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


  export function RectCircleColliding(circle,mapLevel){
    let touched = null;

    if(mapLevel.length > 0){
      touched = mapLevel.filter(resource => resource.type !== 'warrior-pedestal').map(rect => {
        let distX = Math.abs(circle.x - rect.x - rect.width / 2);
        let distY = Math.abs(circle.y - rect.y - rect.height / 2);

        if (distX > (rect.width / 2 + circle.radius)) { return false; }
        if (distY - 10 > (rect.height / 2 + circle.radius)) { return false; }
    
        if (distX <= (rect.width / 2 )) { return true; } 
        if (distY <= (rect.height /2 )) { return true; }
    
        let dx= distX - rect.width / 2;
        let dy= distY - rect.height / 2;
        return ( dx*dx+dy*dy <= (circle.radius*circle.radius));
      })
    }
    return touched;
}

  export function handleGravity(player, mapLevel){
    let touched = null;
    if(!player.onFloor && mapLevel.length > 0){
      touched = mapLevel.map(resource => {
        return player.hitBottom(resource);
      })
      if(touched !== null && touched.indexOf(true) < 0){
        player.onFloor = false;
        player.y += 10;
      }else{
        player.onFloor = true;
        player.totalJumped = 0;
      }
    }
  
  }

  export function handleSphereGravity(sphere, mapLevel){
        let touched = null;
    if(mapLevel.length > 0){
      touched = RectCircleColliding(sphere, mapLevel);
      if(touched !== null && touched.indexOf(true) < 0){
        sphere.y += 10;
      }
    }
  };

  export function handleJumpLimit(player, mapLevel){
    let touched = null;
    if(!player.onFloor && mapLevel.length > 0){
      touched = mapLevel.map(resource => {
        return player.hitTop(resource);
      })
      if(touched !== null && touched.indexOf(true) < 0){
        player.y -= 8;
      }else if(touched.indexOf(true) >= 0){
        player.totalJumped = 100;
      }
    }
  }

  export function handleJumping(player, mapLevel){
    let touched = null;
    player.onFloor = false;
    if(player.jumped && mapLevel.length > 0){
      touched = mapLevel.filter(resource => resource.type !== "warrior-pedestal").map(resource => {
        return player.hitTop(resource);
      })
      if(touched !== null && touched.indexOf(true) < 0 && Keys.up){
        if(player.modeWarrior){
          player.y -= 15;
        }else if(!player.modeWarrior && player.totalJumped <= player.powerJump){
          player.totalJumped += 1;
          player.y -= 20;
        }
      }else{
        player.totalJumped = 100;
      }
    }
  }

  export function handleMovement(player, mapLevel, otherPlayers, spheres, canvas){
    const globalMap = [...mapLevel, ...otherPlayers, ...spheres];
    let touched = null;

      if(mapLevel.length > 0){
      
        switch(player.sprite){
            case 'A':
              if(Keys.up && (player.y > 0)){
                player.direction = 'UP';
                player.jumped = true;              
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

              if(Keys.action){
                touched = globalMap.filter(resource => resource.type === 'warrior-pedestal').map(pedestal => {
                return player.checkPedestal(pedestal);
                });
                if(touched.findIndex(pedestal => pedestal.touched) >= 0){
                  let index = touched.findIndex(pedestal => pedestal.touched);
                  handlePedestal(touched[index].obj, player, spheres);
                }
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
              if(secondKeys.up && (player.y > 0)){
                player.direction = 'UP';
                player.jumped = true;              
                }
              
                if(secondKeys.down){
                  player.direction = "DOWN";
                  touched = globalMap.map(resource => {
                      return player.checkCollision(resource);
                    })
                    if(touched.indexOf(true) >= 0){
                      player.y -= 6;
                    }
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
                    console.log(touched)
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
