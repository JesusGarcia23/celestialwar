import React, { useState, useEffect } from 'react';
import Context from './Context';
import { initSockets } from '../sockets';

const ContextProvider = (props) => {
    const [ gameStatus, setGameStatus ] = useState({});
    const [ user, setUser ] = useState(null);

    const store = {
        gameStatus,
        setGameStatus,
        user,
        setUser
    }

    useEffect(() => initSockets({ store }), [initSockets]);
    return (
        <Context.Provider value={store}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;