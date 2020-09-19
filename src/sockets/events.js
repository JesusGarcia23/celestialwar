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
            setError(oldState => ({...oldState, userAlreadyExists: false, userAlreadyExistsMessage: ""}));
        }
    })

    socket.on('newRoomCreated', (response) => {
        if (response.accepted) {
            setRooms(response.rooms);
            setError(oldState => ({...oldState, roomAlreadyExists: false, roomAlreadyExistsMessage: ""}));
            socket.emit('getAllRooms');
        }
    })

    socket.on('goToCreatedRoom', (response) => {
        console.log(response);
        if(response.accepted) {
            setUser(oldState => ({...oldState, location: response.newRoomCreated.id}));
        }
    })

    socket.on('sendAllRooms', (response) => {
        setRooms(response)
    })

    socket.on('sendError', (data) => {
        console.log(data)
        switch(data.type) {
            case "room": 
                setError(oldState => ({...oldState, roomAlreadyExistsMessage: data.message}));
                setError(oldState => ({...oldState, roomAlreadyExists: true}));
                break;
            case "user":
                setError(oldState => ({...oldState, userAlreadyExistsMessage: data.message}));
                setError(oldState => ({...oldState, userAlreadyExists: true}));
                break;
            default:
                return;
        }
    })
}

export const getGameStatus = ({ setGameStatus, gameStatus }) => {
    socket.on('getGameStatus', (data) => {
        console.log(data);
    })
}