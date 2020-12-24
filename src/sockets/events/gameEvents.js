export default {

    resetRespawnRequest(socket, setRespawnRequested) {
        socket.on('resetRespawnRequest', (data) => {
            console.log("REQUEST RECOVERED")
            console.log(data);
            // setRespawnRequested(false);
        })
    }
}