import React, { useState, useEffect } from 'react';
import Context from './Context';
import { initSockets } from '../sockets';

const ContextProvider = (props) => {
    const [ value, setValue ] = useState({});

    useEffect(() => initSockets({ setValue }), [initSockets]);
    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;