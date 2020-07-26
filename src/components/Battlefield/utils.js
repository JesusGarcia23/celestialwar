
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

  export function handleMovement(player){

      switch(player.sprite){
          case 'A':
            if(Keys.up){
                player.y -= 3;
              }
            
              if(Keys.down){
                player.y += 3;
              }
            
              if(Keys.left) {
                player.x -= 3;
              }
            
              if(Keys.right){
                player.x += 3;
              }
              break;
          case 'B':
            if(secondKeys.up){
                player.y -= 3;
              }
            
              if(secondKeys.down){
                player.y += 3;
              }
            
              if(secondKeys.left) {
                player.x -= 3;
              }
            
              if(secondKeys.right){
                player.x += 3;
              }
              break;  
            default:
                break;  
      }
      
  }
