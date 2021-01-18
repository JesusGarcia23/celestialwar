import { grabSphere, insertSphere, attackPlayer } from '../../../sockets/emit/gameEmit';

let sphereAlreadyGrabbed = false;
let playerInsertedSphere = false;
let playerAttacked = false;

const resetPlayerAttack = () => {
    setTimeout(() => {
        playerAttacked = false;
    }, 1000)
}


const resetInsertSphere = () => {
    setTimeout(() => {
        playerInsertedSphere = false;
    }, 1000)
}

const resetGrabSphere = () => {
    setTimeout(() => {
        sphereAlreadyGrabbed = false;
    }, 1000)
}

// user attack when colliding with other players and modeWarrior is true
const handleAttack = (myPlayer, otherPlayer, room) => {

    if (!otherPlayer.alive) {
        return false;
    }

    if (!otherPlayer.modeWarrior && !playerAttacked) {
        playerAttacked = true;
        attackPlayer(myPlayer, otherPlayer, "ATTACK", room);
        resetPlayerAttack();
        return false;
    }

    if (otherPlayer.modeWarrior && (otherPlayer.direction !== myPlayer.direction) && !playerAttacked) {
        playerAttacked = true;
        attackPlayer(myPlayer, otherPlayer, "ATTACK", room);
        resetPlayerAttack();
        return false;
        
    } 
    else {
        // bouncing logic here

        return false;
    }

};

const handleDamage = (myPlayer, otherPlayer, room) => {

};

// Checks if user is touching a player
const touchingCheck = (myPlayer, obj, room, attackRequest) => {
    
    // CHECK TOUCHING OTHER PLAYERS
  if (!obj.type) {
      if(myPlayer.modeWarrior) {
          handleAttack(myPlayer, obj, room, attackRequest);
      }else if(obj.modeWarrior === true){
          handleDamage(myPlayer, obj, room);
      }
      return false;
  }
  // CHECK FOR WARRIOR PEDESTALS
  if (obj.type === 'warrior-pedestal') {
      return false;
  }
  return true;
};

// checks if user touched a sphere
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

// inserts sphere into sphere socket
const handleInsertSphere = (myPlayer, sphereSocket, spheres, room) => {
    let sphereGrabbed = spheres.filter(sphere => sphere.grabbedBy === myPlayer.name);
    let touched =  sphereCollision(myPlayer, sphereSocket);

    if (touched && myPlayer.sphereGrabbed && sphereSocket.empty && 
        (sphereSocket.side.toLowerCase() === myPlayer.side.toLowerCase()) && sphereGrabbed.length > 0 && !playerInsertedSphere) {
            playerInsertedSphere = true;
            insertSphere(myPlayer, sphereGrabbed[0], sphereSocket, room);
            resetInsertSphere();
    }
};

// Checks for user collision (platforms, other players, spheres)
export const checkCollision = (myPlayer, obj, myDirection, room, attackRequest) => {

    if (obj.radius !== null && obj.type === 'sphere') {

        let touched = sphereCollision(myPlayer, obj);
        if (touched && !myPlayer.sphereGrabbed && !myPlayer.modeWarrior && !obj.hide && !sphereAlreadyGrabbed) {
            sphereAlreadyGrabbed = true;
            grabSphere(myPlayer, obj, room);
            resetGrabSphere();
        }
    }
    if (obj.type === "sphere-collector") {
        return false;
    }
    
    // RIGHT
    if ((myPlayer.x + myPlayer.width + 0.6 > obj.x) && myPlayer.x < obj.x && (myPlayer.y + myPlayer.height > obj.y) && (myPlayer.y < obj.y + obj.height + 0.5) && (myDirection === 'RIGHT' || myDirection === 'UP')) {
        return touchingCheck(myPlayer, obj, room, attackRequest);
    }// LEFT
    else if ((myPlayer.x < obj.x + obj.width + 0.5) && myPlayer.x > obj.x && (myPlayer.y + myPlayer.height > obj.y) && (myPlayer.y < obj.y + obj.height + 0.5) && (myDirection === 'LEFT' || myDirection === 'UP')) {
        return touchingCheck(myPlayer, obj, room, attackRequest);
    }// UP      
    else if ((myPlayer.y - 7 < obj.y + obj.height + 0.58) && (myPlayer.x + myPlayer.width > obj.x + 4) && (myPlayer.x < obj.x + obj.width) && myPlayer.direction === 'UP') {
        return touchingCheck(myPlayer, obj, room, attackRequest);
    }// BOTTOM
    else if ((myPlayer.y + myPlayer.height + 0.58 > obj.y) && (myPlayer.x + 0.58 > obj.x) && (myPlayer.y < obj.y) && (myPlayer.x + myPlayer.width < obj.x + obj.width) && myPlayer.direction === 'DOWN') {
        return touchingCheck(myPlayer, obj, room, attackRequest);
    }
    return false;
};

// check for user top collision
export const hitTop = (myPlayer, obj, spheres, room) => {
    if(obj.type === "sphere-socket") {
        handleInsertSphere(myPlayer, obj, spheres, room)
    }
    if (obj.type === "sphere-collector") {
        return false;
    }
    if (myPlayer.y < 0.58) {
        return true;
    }

    if ( (myPlayer.y > obj.y) && (myPlayer.y - 2 < obj.y + obj.height + 0.7) && (myPlayer.x + myPlayer.width > obj.x + 0.2) && (myPlayer.x < obj.x + obj.width + 0.5) && ( (myPlayer.x + myPlayer.width - 0.9) < obj.x + obj.width + 0.5 )) {
        return true;
    }
    return false;
};

// Checks for user bottom collision
export const hitBottom = (myPlayer, obj) => {

    if (obj.type === 'warrior-pedestal') {
        return false;
    }
    if (obj.type === "sphere-collector") {
        return false;
    }
    
    if ( (myPlayer.y < obj.y) && (myPlayer.y + myPlayer.height + 0.5 > obj.y - 0.4) && (myPlayer.x + myPlayer.width > obj.x + 0.2) && (myPlayer.x < obj.x + obj.width + 0.5) && ( (myPlayer.x + myPlayer.width - 0.5) < obj.x + obj.width + 0.5 )) {
        myPlayer.onFloor = true;
        return true;
        
    } else {
        myPlayer.onFloor = false;
    }
    return false;
};