import React, { useState, useEffect } from 'react';
import Context from './Context';
import { initSockets } from '../sockets';

const ContextProvider = (props) => {
    const [ gameStatus, setGameStatus ] = useState({});

    useEffect(() => initSockets({ setGameStatus }), [initSockets]);
    return (
        <Context.Provider value={gameStatus}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;