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

export const leaveRoom = (player, roomId) => {
    socket.emit('leaveRoom', {player, roomId});
}

export const sendMessage = (player, message, roomId) => {
    socket.emit('sendMessage', {player, message, roomId});
}

export const kickUser = (player, roomId) => {
    socket.emit('kickUser', {player, roomId});
}

export const swapTeam = (player, roomId) => {
    console.log("SWAPPING TEAM... ", roomId);
    socket.emit('swapTeam', {player, roomId});
}

export const imReady = (player, roomId) => {
    socket.emit('imReady', {player, roomId})
}


export const requestKingPosition = (player, roomId) => {
    socket.emit('requestKingPosition', {player, roomId})
}