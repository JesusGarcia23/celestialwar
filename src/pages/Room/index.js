import React from 'react';
import Chat from '../../components/Chat';
import TeamContainer from '../../components/TeamContainer';
import './style.css';

const Room = () => {
    return (
        <div className="room-container">
        <TeamContainer />
        <Chat />
        </div>
    )
}

export default Room;