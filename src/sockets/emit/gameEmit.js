import { socket } from '../index';

export const requestGameStatus = (player, roomId) => {
    socket.emit('requestGameStatus', {player, roomId});
}

export const movePlayer = (player) => {
    console.log("Player about to move ", player)
    socket.emit('movePlayer', player);
}
