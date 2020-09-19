import { socket } from './index';
import roomEvents from './events/roomEvents';
import userEvents from './events/userEvents';
import errorHandling from './events/errorEvents';

export const socketEvents = ({ setGameStatus, setUser, setRooms, setError, setIsLoading }) => {
    socket.on('connection', (data) => {
        console.log(data);
    })

    // USER EVENTS
    userEvents.loggedIn(socket, setUser);
    userEvents.newPlayerAccepted(socket, setUser, setError)

    // ROOM EVENTS
    roomEvents.newRoomCreated(socket, setRooms, setError);
    roomEvents.goToRoom(socket, setUser);
    roomEvents.sendAllRooms(socket, setRooms);

    // ERROR HANDLING
    errorHandling.sendError(socket, setError);
}

export const getGameStatus = ({ setGameStatus, gameStatus }) => {
    socket.on('getGameStatus', (data) => {
        console.log(data);
    })
}