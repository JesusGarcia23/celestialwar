const handleAttack = () => {

}

const handleDamage = () => {

}

const touchingCheck = (myPlayer, obj) => {
    // CHECK TOUCHING OTHER PLAYERS
  if (!obj.type) {
      if(myPlayer.modeWarrior) {
          handleAttack(myPlayer, obj);
      }else if(obj.modeWarrior === true){
          handleDamage(myPlayer);
      }
      return false;
  }
  // CHECK FOR WARRIOR PEDESTALS
  if (obj.type === 'warrior-pedestal') {
      return false;
  }
  return true;
};

const sphereCollision = (myPlayer, sphere) => {
    let distX = Math.abs(sphere.x - myPlayer.x - myPlayer.width / 2);
    let distY = Math.abs(sphere.y - myPlayer.y - myPlayer.height / 2);

    if (distX > (myPlayer.width / 2 + sphere.radius)) { return false; }
    if (distY - 10 > (myPlayer.height / 2 + sphere.radius)) { return false; }

    if (distX <= (myPlayer.width / 2 )) { return true; } 
    if (distY <= (myPlayer.height /2 )) { return true; }

    let dx= distX - myPlayer.width / 2;
    let dy= distY - myPlayer.height / 2;
    return ( dx*dx+dy*dy <= (sphere.radius*sphere.radius));
};

const handleInsertSphere = (myPlayer, socket, spheres, gameStatus) => {
    let sphereGrabbed = spheres.filter(sphere => sphere.grabbedBy === this.name);
        let touched =  sphereCollision(myPlayer, socket);
        if (touched && myPlayer.sphereGrabbed && socket.side === myPlayer.side && socket.empty && sphereGrabbed.length > 0) {
            if (myPlayer.side === "Angel") {
                gameStatus.angelSpheresCollected += 1;
            } else if (myPlayer.side === "Demon") {
                gameStatus.demonSpheresCollected += 1;
            }
            sphereGrabbed[0].grabbedBy = "";
            this.sphereGrabbed = false;
            socket.empty = false;
            socket.color = "blue";
        }
};

export const checkCollision = (myPlayer, obj, spheres) => {

    if (obj.radius !== null && obj.type === 'sphere') {
      let touched = sphereCollision(myPlayer, obj);
      if (touched && !myPlayer.sphereGrabbed && !myPlayer.modeWarrior && !obj.hide) {
          obj.beGrabbed(myPlayer.name);
          myPlayer.sphereGrabbed = true;
      }

    }
    if (obj.type === "sphere-collector") {
        return false;
    }
    
    // RIGHT
    if ((myPlayer.x + myPlayer.width + 0.58 > obj.x) && myPlayer.x < obj.x && (myPlayer.y + myPlayer.height > obj.y) && (myPlayer.y < obj.y + obj.height) && myPlayer.direction === 'RIGHT'){
        return touchingCheck(myPlayer, obj);
    }// LEFT
    else if ((myPlayer.x < obj.x + obj.width + 0.58) && myPlayer.x > obj.x && (myPlayer.y + myPlayer.height > obj.y + 8) && (myPlayer.y < obj.y + obj.height) && myPlayer.direction === 'LEFT'){
        return touchingCheck(myPlayer, obj);
    }// UP      
    else if ((myPlayer.y - 7 < obj.y + obj.height + 0.58) && (myPlayer.x + myPlayer.width > obj.x + 4) && (myPlayer.x < obj.x + obj.width) && myPlayer.direction === 'UP'){
        return touchingCheck(myPlayer, obj);
    }// BOTTOM
    else if ((myPlayer.y + myPlayer.height + 0.58 > obj.y) && (myPlayer.x > obj.x) && (myPlayer.y < obj.y) && (myPlayer.x + myPlayer.width < obj.x + obj.width) && myPlayer.direction === 'DOWN'){
        return touchingCheck(myPlayer, obj);
    }
    return false;
};

export const hitTop = (myPlayer, obj, spheres, gameStatus) => {
    if(obj.type === "sphere-socket") {
        handleInsertSphere(myPlayer, obj, spheres, gameStatus)
    }
    if(obj.type === "sphere-collector") {
        return false;
    }
    if(myPlayer.y < 0.58) {
        return true;
    }

    if( (myPlayer.y - 2 < obj.y + obj.height + 0.7) && (myPlayer.x + myPlayer.width > obj.x + 0.7) && (myPlayer.x < obj.x + obj.width) && (myPlayer.y > obj.y)){
        return true;
    }
    return false;
};

export const hitBottom = (myPlayer, obj) => {

    if (obj.id === 6) {
        console.log(obj)
    }
    if(obj.type === 'warrior-pedestal'){
        return false;
    }
    if(obj.type === "sphere-collector") {
        return false;
    }
    
     if((myPlayer.y + myPlayer.height + 0.5 > obj.y) && (myPlayer.x + 0.2 > obj.x) && (myPlayer.y < obj.y) && ( (myPlayer.x + myPlayer.width - 0.2) < obj.x + obj.width )){
        myPlayer.onFloor = true;
        return true;
    }else{
        myPlayer.onFloor = false;
    }
    return false;
};