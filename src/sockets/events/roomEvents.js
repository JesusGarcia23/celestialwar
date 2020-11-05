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
    },

    userLeavingRoom (socket, setActualRoom) {
        socket.on('exitedRoom', (response) => {
            if (response) {
                setActualRoom({});
            }
        } ) 
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