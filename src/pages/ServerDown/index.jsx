import React, { useEffect } from 'react';
import { socket } from '../../sockets/index';

const ServerDown = () => {

    useEffect(() => {
        socket.disconnect();
    }, [])
    return (
        <div>
            Server Down!
        </div>
    )
}

export default ServerDown;