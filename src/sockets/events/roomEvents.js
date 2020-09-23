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

    goToRoom (socket, setUser, user) {

        socket.on('goToRoom', (response) => {

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

        socket.on('getUpdatedRoom', (response) => {
            console.log("JOINED!")
            console.log(response);
            setActualRoom(response);
        })
    }

}