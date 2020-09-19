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

    goToCreatedRoom (socket, setUser) {
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

    enterToRoom (socket, setUser) {
        socket.on('enterToRoom', (response) => {
            if(response.accepted) {
                setUser(oldState => ({...oldState, location: response.roomToJoin.id}));
            }
        })
    }

}