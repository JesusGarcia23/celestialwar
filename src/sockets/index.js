import io from 'socket.io-client';
import { socketEvents, getGameStatus, playerAccepted } from './events';
import { testFunction } from './emit';

export const socket = io('http://localhost:5000');

export const initSockets = ({ store }) => {
    const { setGameStatus, user, setUser, gameStatus } = store;
    socketEvents({ setGameStatus, setUser })
    getGameStatus({ setGameStatus, gameStatus });
}