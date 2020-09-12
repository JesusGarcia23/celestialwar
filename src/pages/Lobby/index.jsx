import React, { useContext } from 'react';
import Context from '../../Context/Context';
import {testFunction} from '../../sockets/emit';

const Lobby = (props) => {

    const myContext = useContext(Context);

    console.log(myContext)
    
    const { user } = myContext;

    const testCallToSocket = () => {
        testFunction();
    }

    return (
        <div>
            <h2>Lobby</h2>
            <div>{user}</div>
            <button onClick={e => testCallToSocket(e)}>Click me to call Server</button>
        </div>
    )
}

export default Lobby;