import io from 'socket.io-client';
import { socketEvents, getGameStatus } from './events/index';

export const socket = io(process.env.REACT_APP_API_URL);

export const initSockets = ({ store }) => {
    const { setGameStatus, user, setUser, gameStatus, rooms, setRooms, error, setError, setIsLoading } = store;
    socketEvents({ setGameStatus, setUser, setRooms, setError, setIsLoading })
    getGameStatus({ setGameStatus, gameStatus });
}