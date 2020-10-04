import React, { useContext, useEffect, useState } from 'react';
import Chat from '../../components/Chat';
import TeamContainer from '../../components/TeamContainer';
import Context from '../../Context/Context';
import { joinRoom, leaveRoom } from '../../sockets/emit/roomEmit';
import { Redirect } from 'react-router-dom';
import PreBattle from '../../components/PreBattle';
import './style.css';

const Room = (props) => {

    const MyContext = useContext(Context);

    const [ preBattle, setPreBattle ] = useState(false);

    const { id } = props.match.params;

    const { user, actualRoom, error } = MyContext;

    const { angelTeam, demonTeam} = actualRoom;

    useEffect(() => {
            joinRoom(user, id);
    }, []);

    const goBackToLobby = () => {
        leaveRoom(user, id);
        props.history.push('/lobby');
    }

    const prepareGame = () => {
        setPreBattle(true);
    }

    if (error.kicked && (error.kicked.value && error.kicked.room.toString() === id)) {

        return <Redirect to ='/lobby'/>
        
    } else {

    return (
        
        <div className="room-container">
            {!preBattle ?
                <>
                    <div className="room-header">
                        {user.username === actualRoom.host && <h2>You're host</h2>}
                        <button onClick={e => goBackToLobby(e)}>Exit room</button>

                        <div className="settings-container">
                            <div>Map: {actualRoom && actualRoom.settings && actualRoom.settings.map}</div>
                            <div>Players: {actualRoom && actualRoom.players && actualRoom.players.length}/10</div>
                            <div></div>
                            <div></div>
                            {user.username === actualRoom.host && <button>Change Settings</button>}
                        </div>

                    </div>
                    <div className="room-team-chat-container">
                        <TeamContainer angelTeam={angelTeam} demonTeam={demonTeam} user={user} actualRoom={actualRoom}/>
                        <Chat messagesList={actualRoom.messages} user={user} roomId={actualRoom.id}/>
                    </div>
                    {user.username === actualRoom.host && <button onClick={() => prepareGame()}>Start Game</button>}
                </>
                : <PreBattle angelTeam={angelTeam} demonTeam={demonTeam}/>
            }
        </div>
    )
            
}

}

export default Room;