import React, { useContext, useEffect } from 'react';
import Context from '../../Context/Context';
import {testFunction, getAllRooms} from '../../sockets/emit';

const Lobby = (props) => {

    const myContext = useContext(Context);

    const { rooms, setRooms } = myContext;

    console.log(myContext)
    
    const { user } = myContext;

    const testCallToSocket = () => {
        testFunction();
    }
    useEffect(() => {
        getAllRooms();
    }, [])

    return (
        <div>
            <h2>Lobby</h2>
            <div>{user}</div>
            <button onClick={e => testCallToSocket(e)}>Create game</button>
        </div>
    )
}

export default Lobby;