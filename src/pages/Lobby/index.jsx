import React, { useContext } from 'react';
import Context from '../../Context/Context';
import {testFunction} from '../../sockets/emit';

const Lobby = (props) => {

    const myContext = useContext(Context);

    const testCallToSocket = () => {
        testFunction();
    }

    console.log(myContext)

    return (
        <div>
            Lobby
            <button onClick={e => testCallToSocket(e)}>Click me to call Server</button>
        </div>
    )
}

export default Lobby;