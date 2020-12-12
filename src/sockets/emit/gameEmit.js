import { socket } from '../index';

export const requestGameStatus = (player, roomId) => {
    socket.emit('requestGameStatus', {player, roomId});
}

export const grabSphere = (player, sphere, room) => {
    socket.emit('playerGrabbedSphere', {player, sphere, roomId: room.id})
}

export const attackPlayer = (myPlayer, otherPlayer, action, room) => {
    socket.emit('playerAttacked', {firstPlayer: myPlayer, secondPlayer: otherPlayer, action, roomId: room.id})
}

export const movePlayer = (player, direction, moveAmount, canMove, room) => {
    
    switch (direction) {
        case "LEFT": 
            if (canMove) {
                socket.emit('movePlayer', {player, roomId: room.id, direction, moveAmount});
            }
            break;
        case "RIGHT":
            if (canMove) {
                socket.emit('movePlayer', {player, roomId: room.id, direction, moveAmount});
            }
            break;
        case "UP":
            if (canMove) {
                socket.emit('movePlayer', {player, roomId: room.id, direction, moveAmount});
            }
            break;
        case "DOWN":
            if (canMove) {
                socket.emit('movePlayer', {player, roomId: room.id, direction, moveAmount});
            }
            break;
        default:
            break;
        }
    
    socket.emit('movePlayer', {player, roomId: room.id});
}
