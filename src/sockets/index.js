import io from 'socket.io-client';
import { socketEvents, getGameStatus } from './events';

export const socket = io('http://localhost:5000');

export const initSockets = ({ store }) => {
    const { setGameStatus, user, setUser, gameStatus, rooms, setRooms, error, setError, setIsLoading } = store;
    socketEvents({ setGameStatus, setUser, setRooms, setError, setIsLoading })
    getGameStatus({ setGameStatus, gameStatus });
}