import React, { useState, useEffect } from 'react';
import Context from './Context';
import { initSockets } from '../sockets';

export let respawnPlayer = false;

const ContextProvider = (props) => {

    const [ gameStatus, setGameStatus ] = useState({});
    const [ listPlayers, setListPlayers ] = useState({});
    const [ user, setUser ] = useState(null);
    const [ rooms, setRooms ] = useState({});
    const [ actualRoom, setActualRoom ] = useState({});
    const [ error, setError ] = useState({});
    const [ respawnRequested, setRespawnRequested ] = useState(false);

    const store = {
        gameStatus, setGameStatus,
        user, setUser,
        rooms, setRooms,
        actualRoom, setActualRoom,
        error, setError,
        listPlayers, setListPlayers,
        respawnRequested, setRespawnRequested
    }

    useEffect(() => initSockets({ store }), [initSockets]);
    return (
        <Context.Provider value={store}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;