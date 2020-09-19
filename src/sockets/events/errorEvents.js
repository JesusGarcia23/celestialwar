export default {
    
    sendError(socket, setError) {
        socket.on('sendError', (data) => {
            console.log(data)
            switch(data.type) {
                case "room": 
                    setError(oldState => ({...oldState, roomAlreadyExistsMessage: data.message, roomAlreadyExists: true}));
                    break;
                case "username":
                    setError(oldState => ({...oldState, userAlreadyExistsMessage: data.message, userAlreadyExists: true}));
                    break;
                default:
                    return;
            }
        })
    }
}