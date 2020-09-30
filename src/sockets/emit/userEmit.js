import { socket } from '../index';

export const userLogIn = () => {
    const user = localStorage.getItem('token') || sessionStorage.getItem('token') 
    if(user !== null && user !== "") {
        socket.emit('getUser', user);
    }
}

export const addPlayer = (username) => {
    socket.emit('addNewPlayer', username);
}