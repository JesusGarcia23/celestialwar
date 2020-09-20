import { socket } from '../index';

export const movePlayer = (username) => {
    console.log("Player about to move ", username)
    socket.emit('movePlayer', username);
}