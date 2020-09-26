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

    const { angelTeam, demonTeam} = actualRoom;

    useEffect(() => {
        joinRoom(user, id);
    }, [])

    return (
        <div className="room-container">
            <div>
            {user.username === actualRoom.host && <h1>You're host</h1>}
            </div>
            <div className="room-team-chat-container">
                <TeamContainer angelTeam={angelTeam} demonTeam={demonTeam}/>
                <Chat />
            </div>
        </div>
    )
}

export default Room;