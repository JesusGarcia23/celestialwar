import { socket } from './index';

export const socketEvents = ({ setGameStatus, setUser }) => {
    socket.on('connection', (data) => {
        console.log(data);
    })

    socket.on('newPlayerAccepted', (response) => {
        console.log(response);
        if (response.accepted) {
            setUser(response.username);
            // localStorage.setItem('user', )
        }
    })
}

export const getGameStatus = ({ setGameStatus, gameStatus }) => {
    socket.on('getGameStatus', (data) => {
        console.log(data);
    })
}