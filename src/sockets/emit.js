import { socket } from './index';

export const testFunction = () => {
    socket.emit('hellosocket');
}

export const addPlayer = (username) => {
    socket.emit('addNewPlayer', username);
}