import { socket } from './index';
import { Redirect } from 'react-router-dom'

export const socketEvents = ({ setGameStatus, setUser, setRooms, setError, setIsLoading }) => {
    socket.on('connection', (data) => {
        console.log(data);
    })

    socket.on('loggedIn', (response) => {
        console.log(response)
        if(response.accepted) {
            setUser(response);
            localStorage.setItem('token', response.username);
        }else {
            setUser(response);
        }
    })

    socket.on('newPlayerAccepted', (response) => {
        if (response.accepted) {
            setUser(response);
            localStorage.setItem('token', response.username)
            setError(oldState => ({...oldState, usernameAlreadyExists: false}));
        } else {
            setError(oldState => ({...oldState, usernameAlreadyExists: true}));
        }
    })

    socket.on('newRoomCreated', (response) => {
        if (response.accepted) {
            setRooms(response.rooms);
            setError(oldState => ({...oldState, roomAlreadyExists: false}));
            socket.emit('getAllRooms');
        } else {
            setError(oldState => ({...oldState, roomAlreadyExists: true}));
        }
    })

    socket.on('goToCreatedRoom', (response) => {
        console.log(response);
        if(response.accepted) {
            setUser(oldState => ({...oldState, location: response.newRoomCreated.id}));
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