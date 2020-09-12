import { socket } from './index';

export const testFunction = () => {
    socket.emit('hellosocket');
}

export const addPlayer = () => {
    socket.emit('addNewPlayer');
}