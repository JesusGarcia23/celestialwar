import io from 'socket.io-client';
import { socketEvents, getGameStatus } from './events';
import { testFunction } from './emit';

export const socket = io('http://localhost:5000');

export const initSockets = ({ setGameStatus }) => {
    socketEvents({ setGameStatus })
    getGameStatus({ setGameStatus });
}