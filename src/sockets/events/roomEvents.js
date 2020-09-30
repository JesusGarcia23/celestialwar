export default {

    newRoomCreated (socket, setRooms, setError) {
        socket.on('newRoomCreated', (response) => {
 
            if (response.accepted && window.location.pathname === '/lobby') {
                setRooms(response.rooms);
                setError(oldState => ({...oldState, roomAlreadyExists: false, roomAlreadyExistsMessage: ""}));
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
            setActualRoom(response);
        })
    },

    goToRoom (socket) {
        socket.on('goToRoom', (response) => {
            window.location.href = `/room/${response}`
        })
    }

}