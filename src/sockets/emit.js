import { socket } from './index';

export const testFunction = () => {
    socket.emit('hellosocket');
}

export const addPlayer = (username) => {
    socket.emit('addNewPlayer', username);
}

export const getAllRooms = () => {
    socket.emit('getAllRooms');
}

export const createNewRoom = () => {
    socket.emit('createNewRoom');
}