import { socket } from './index';

export const socketEvents = ({ setGameStatus, setUser, setRooms, setError }) => {
    socket.on('connection', (data) => {
        console.log(data);
    })

    socket.on('newPlayerAccepted', (response) => {
        if (response.accepted) {
            setUser(response);
            setError(oldState => ({...oldState, usernameAlreadyExists: false}));
        } else {
            setError(oldState => ({...oldState, usernameAlreadyExists: true}));
        }
    })

    socket.on('newRoomCreated', (response) => {
        console.log(response)
        if (response.accepted) {
            setRooms(response.rooms);
            socket.emit('getAllRooms');
        }
    })

    socket.on('sendAllRooms', (response) => {
        console.log(response)
        setRooms(response)
    })
}

export const getGameStatus = ({ setGameStatus, gameStatus }) => {
    socket.on('getGameStatus', (data) => {
        console.log(data);
    })
}