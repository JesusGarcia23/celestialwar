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
            console.log(response)
            setActualRoom(response);
        })
    },

    goToRoom (socket) {
        socket.on('goToRoom', (response) => {
            console.log("THIS HAPPENED")
            window.location.href = `/room/${response}`
        })
    },

    kicked (socket, setError, setActualRoom) {
        socket.on('kicked', (response) => {
            console.log(response)
            console.log("YOU GOT KICKED!")
            setActualRoom({});
            setError(oldState => ({...oldState, kicked: {value: true, room: response}, kickedMessage: "You were Kicked from the room"}));
        })
    }

}