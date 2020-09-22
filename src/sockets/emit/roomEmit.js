import { socket } from '../index';

export const getAllRooms = () => {
    socket.emit('getAllRooms');
}

export const createNewRoom = (newRoom) => {
    socket.emit('createNewRoom', newRoom);
}

export const joinRoom = (player, roomId) => {
    console.log("JOINING TO... ", roomId);
    socket.emit('joinRoom', {player, roomId});
}

export const getRoomData = (player, roomId) => {
    socket.emit("getRoomData", {player, roomId});
}