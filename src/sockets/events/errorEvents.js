
export default {

    serverError(socket) {
        socket.io.on('connect_error', function(err) {
            // handle server error here
            socket.disconnect();
            
            /* Redirect user to ERROR 500 page */
            // if(window.location.pathname !== '/error500') {
            //     window.location.href = '/error500';
            // }
          });
    },

    redirectUser (socket, setUser) {
        socket.on('redirect', (response) => {
            console.log(response);
            window.location.href = response.route
        })
    },
    
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