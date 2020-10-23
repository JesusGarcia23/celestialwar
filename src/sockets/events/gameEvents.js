export default {

    getGameStatus (socket, setGameStatus) {
        socket.on('getGameStatus', (data) => {
            console.log(data)
            setGameStatus(data);
        })
    },
}