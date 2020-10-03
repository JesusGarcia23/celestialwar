import { socket } from '../index';
import roomEvents from './roomEvents';
import userEvents from './userEvents';
import gameEvents from './gameEvents'; 
import errorHandling from './errorEvents';

export const socketEvents = ({ setGameStatus, setUser, setRooms, setError, setIsLoading, setActualRoom, actualRoom, user }) => {
    socket.on('connection', (data) => {
        console.log(data);
    });

    // USER EVENTS
    userEvents.loggedIn(socket, setUser);
    userEvents.newPlayerAccepted(socket, setUser, setError);

    // ROOM EVENTS
    roomEvents.newRoomCreated(socket, setRooms, setError);
    roomEvents.sendAllRooms(socket, setRooms);
    roomEvents.getUpdatedRoom(socket, setActualRoom);
    roomEvents.goToRoom(socket);
    roomEvents.userLeavingRoom(socket, setActualRoom);
    roomEvents.kicked(socket, setError, setActualRoom);

    // ERROR HANDLING
    errorHandling.serverError(socket);
    errorHandling.sendError(socket, setError);
    errorHandling.redirectUser(socket);
}

export const getGameStatus = ({ setGameStatus }) => {
    gameEvents.getGameStatus(socket, setGameStatus)
}