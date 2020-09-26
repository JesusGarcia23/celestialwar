import { socket } from '../index';

export const getAllRooms = () => {
    socket.emit('getAllRooms');
}

export const createNewRoom = (user, newRoom) => {
    socket.emit('createNewRoom', {user, newRoom});
}

export const joinRoom = (player, roomId) => {
    console.log("JOINING TO... ", roomId);
    socket.emit('joinRoom', {player, roomId});
}