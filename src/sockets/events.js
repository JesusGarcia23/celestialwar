import { socket } from './index';

export const socketEvents = ({ setGameStatus, setUser, setRooms }) => {
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

    socket.on('newRoomCreated', (response) => {
        console.log(response);
        if (response.accepted) {
            // setUser(response.room);
            // localStorage.setItem('user', )
        }
    })

    socket.on('sendAllRooms', (response) => {
        console.log(response);
        setRooms(response)
    })
}

export const getGameStatus = ({ setGameStatus, gameStatus }) => {
    socket.on('getGameStatus', (data) => {
        console.log(data);
    })
}