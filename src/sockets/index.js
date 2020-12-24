import io from 'socket.io-client';
import { socketEvents } from './events/index';

export const socket = io(process.env.REACT_APP_API_URL);

export let myTestVariable = false;

export const initSockets = ({ store }) => {
    const { user, setUser, setRooms, setError, setIsLoading, setActualRoom, setRespawnRequested } = store;
    socketEvents({ setRespawnRequested, setUser, setRooms, setError, setIsLoading, setActualRoom, user })
}