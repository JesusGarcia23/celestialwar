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

export const createNewRoom = (newRoom) => {
    console.log("SUBMITTING!", newRoom)
    console.log(newRoom)
    socket.emit('createNewRoom', newRoom);
}

export const joinRoom = (roomId) => {
    console.log("JOINING TO... ", roomId);
    socket.emit('joinRoom', roomId);
}