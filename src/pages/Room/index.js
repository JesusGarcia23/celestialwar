import React, { useContext, useEffect, useState } from 'react';
import Chat from '../../components/Chat';
import TeamContainer from '../../components/TeamContainer';
import Context from '../../Context/Context';
import { joinRoom, leaveRoom, imReady, requestKingPosition } from '../../sockets/emit/roomEmit';
import { Redirect } from 'react-router-dom';
import './style.css';

const Room = (props) => {

    const MyContext = useContext(Context);

    const { id } = props.match.params;

    const { user, actualRoom, error } = MyContext;

    const { angelTeam, demonTeam} = actualRoom;

    let isHost = user.username === actualRoom.host;

    useEffect(() => {
            joinRoom(user, id);
    }, []);

    // Function to go back to lobby
    const goBackToLobby = () => {
        leaveRoom(user, id);
        props.history.push('/lobby');
    }

    // Function to set player ready
    const handlePlayerReady = () => {
        imReady(user, id);
    }

    // Function to start game
    const handleStartGame = () => {

    }

    console.log(user)
    console.log(angelTeam)

    if (error.kicked && (error.kicked.value && error.kicked.room.toString() === id)) {

        return <Redirect to ='/lobby'/>
        
    } else {

    return (
        
        <div className="room-container">
                    <div className="room-header">
                        {isHost && <h2>You're host</h2>}
                        <button onClick={e => goBackToLobby(e)}>Exit room</button>

                        <div className="settings-container">
                            <div>Map: {actualRoom && actualRoom.settings && actualRoom.settings.map}</div>
                            <div>Players: {actualRoom && actualRoom.players && actualRoom.players.length}/10</div>
                            <div></div>
                            <div></div>
                            {isHost && <button>Change Settings</button>}
                        </div>

                    </div>
                    <div className="room-team-chat-container">
                        <TeamContainer angelTeam={angelTeam} demonTeam={demonTeam} user={user} actualRoom={actualRoom} youreHost={isHost}/>
                        <Chat messagesList={actualRoom.messages} user={user} roomId={actualRoom.id}/>
                    </div>
                    {isHost ? <button className="start-ready-button" onClick={() => handleStartGame()}>Start Game</button> : 
                    <button className="start-ready-button" onClick={() => handlePlayerReady()}>I'm Ready</button>}
        </div>
    )
            
}

}

export default Room;