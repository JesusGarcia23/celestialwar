import { socket } from '../index';

export const getAllRooms = () => {
    socket.emit('getAllRooms');
}

export const createNewRoom = (newRoom) => {
    console.log("SUBMITTING!", newRoom)
    console.log(newRoom)
    socket.emit('createNewRoom', newRoom);
}

export const joinRoom = (player, roomId) => {
    console.log("JOINING TO... ", roomId);
    socket.emit('joinRoom', {player, roomId});
}