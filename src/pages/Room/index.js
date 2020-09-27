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

            <div className="settings-container">
                <div>Map: {actualRoom && actualRoom.settings && actualRoom.settings.map}</div>
                <div></div>
                <div></div>
                <div></div>
                {user.username === actualRoom.host && <button>Change Settings</button>}
            </div>

            </div>
            <div className="room-team-chat-container">
                <TeamContainer angelTeam={angelTeam} demonTeam={demonTeam} user={user} actualRoom={actualRoom}/>
                <Chat messagesList={actualRoom.messages} user={user}/>
            </div>
            {user.username === actualRoom.host && <button>Start Game</button>}
        </div>
    )
}

export default Room;