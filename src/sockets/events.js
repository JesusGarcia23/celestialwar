import { socket } from './index';

export const socketEvents = ({ setValue }) => {
    socket.on('connection', (data) => {
        console.log(data);
    })
}

export const getGameStatus = ({ setGameStatus }) => {
    socket.on('getGameStatus', (data) => {
        console.log(data);
    })
}