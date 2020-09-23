import React, { useContext, useEffect } from 'react';
import Chat from '../../components/Chat';
import TeamContainer from '../../components/TeamContainer';
import Context from '../../Context/Context';
import { joinRoom } from '../../sockets/emit/roomEmit';
import './style.css';

const Room = (props) => {

    const MyContext = useContext(Context);

    const { id } = props.match.params;

    const { user, actualRoom } = MyContext;

    useEffect(() => {
        joinRoom(user, id);
    }, [])

    return (
        <div className="room-container">
        <TeamContainer />
        <Chat />
        </div>
    )
}

export default Room;