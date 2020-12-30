export const isPlayerHostAlready = (user, rooms) => {

    if (!rooms.length || rooms.length === 0) {
        return false;
    }

    let roomToFind = rooms.filter(room => room.host === user.username);

    if (roomToFind.length === 0)
        return false;

    return roomToFind[0].id;
}

export const isPlayerAlreadyPlaying = (user, rooms) => {

    if (!rooms.length || rooms.length === 0) {
        return false;
    }

    let roomsAlreadyPLaying = rooms.filter(room => room.gameStarted);

    if (roomsAlreadyPLaying.length === 0)
        return false;

    let roomToFind = roomsAlreadyPLaying.filter(roomToCheck => roomToCheck.gameStatus.players.map(playerToFind => playerToFind.name === user.username));

    if (roomToFind.length === 0)
        return false;
    
    return roomToFind[0].id;
}