import { socket } from '../index';

export const userLogIn = () => {
    const user = localStorage.getItem('token') || sessionStorage.getItem('token') 
    console.log(user)
    if(user !== null && user !== "") {
        socket.emit('getUser', user);
    }
}

export const addPlayer = (username) => {
    console.log(username)
    socket.emit('addNewPlayer', username);
}