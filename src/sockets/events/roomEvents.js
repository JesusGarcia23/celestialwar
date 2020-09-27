export default {

    newRoomCreated (socket, setRooms, setError) {
        socket.on('newRoomCreated', (response) => {
            if (response.accepted) {
                setRooms(response.rooms);
                setError(oldState => ({...oldState, roomAlreadyExists: false, roomAlreadyExistsMessage: ""}));
            }
        })
    },

    goToRoom (socket, setUser, setActualRoom, user) {

        socket.on('goToRoom', (response) => {
            console.log(response);
            if(response.accepted) {
                setActualRoom(response.roomInfo);
                setUser(oldState => ({...oldState, location: response.roomInfo.id}));
            }
        })
    },

    sendAllRooms (socket, setRooms) {
        socket.on('sendAllRooms', (response) => {
            setRooms(response)
        })
    },

    getUpdatedRoom (socket, setActualRoom) {
        socket.on('getUpdatedRoom', (response) => {
            console.log(response)
            setActualRoom(response);
        })
    }

}