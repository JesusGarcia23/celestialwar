export default {

    newRoomCreated (socket, setRooms, setError) {
        socket.on('newRoomCreated', (response) => {
            if (response.accepted) {
                setRooms(response.rooms);
                setError(oldState => ({...oldState, roomAlreadyExists: false, roomAlreadyExistsMessage: ""}));
                socket.emit('getAllRooms');
            }
        })
    },

    goToRoom (socket, setUser) {
        socket.on('goToRoom', (response) => {
            console.log(response);
            if(response.accepted) {
                setUser(oldState => ({...oldState, location: response.roomId}));
            }
        })
    },

    sendAllRooms (socket, setRooms) {
        socket.on('sendAllRooms', (response) => {
            setRooms(response)
        })
    },

    sendRoomData (socket, setActualRoom) {
        socket.on('sendRoomData', (response) => {
            setActualRoom(response);
        })
    }

}