export default {

    loggedIn (socket, setUser) {
        socket.on('loggedIn', (response) => {
            console.log(response)
            if(response.accepted) {
                setUser(response);
                localStorage.setItem('token', response.username);
            }else {
                setUser(response);
            }
        })
        
    },

    newPlayerAccepted (socket, setUser, setError) {
        socket.on('newPlayerAccepted', (response) => {
            if (response.accepted) {
                setUser(response);
                localStorage.setItem('token', response.username)
                setError(oldState => ({...oldState, userAlreadyExists: false, userAlreadyExistsMessage: ""}));
            }
        })
    }

}
