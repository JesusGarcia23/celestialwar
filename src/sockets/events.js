import { socket } from './index';
import roomEvents from './events/roomEvents';
import userEvents from './events/userEvents';
import { Redirect } from 'react-router-dom';

export const socketEvents = ({ setGameStatus, setUser, setRooms, setError, setIsLoading }) => {
    socket.on('connection', (data) => {
        console.log(data);
    })

    userEvents.loggedIn(socket, setUser);
    userEvents.newPlayerAccepted(socket, setUser, setError)

    roomEvents.newRoomCreated(socket, setRooms, setError);
    roomEvents.goToCreatedRoom(socket, setUser);
    roomEvents.sendAllRooms(socket, setRooms);
    roomEvents.enterToRoom(socket, setUser);

    // ERROR HANDLING
    socket.on('sendError', (data) => {
        console.log(data)
        switch(data.type) {
            case "room": 
                setError(oldState => ({...oldState, roomAlreadyExistsMessage: data.message, roomAlreadyExists: true}));
                break;
            case "username":
                setError(oldState => ({...oldState, userAlreadyExistsMessage: data.message, userAlreadyExists: true}));
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