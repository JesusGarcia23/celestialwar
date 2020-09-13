import React, { useState, useEffect } from 'react';
import Context from './Context';
import { initSockets } from '../sockets';

const ContextProvider = (props) => {
    const [ gameStatus, setGameStatus ] = useState({});
    const [ user, setUser ] = useState(null);
    const [ rooms, setRooms ] = useState({});

    const store = {
        gameStatus,
        setGameStatus,
        user,
        setUser,
        rooms,
        setRooms
    }

    useEffect(() => initSockets({ store }), [initSockets]);
    return (
        <Context.Provider value={store}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;