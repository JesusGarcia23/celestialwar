import React, { useContext, useState } from 'react';
import Context from '../../Context/Context';
import { swapTeam, kickUser } from '../../sockets/emit/roomEmit';
import './style.css';
import { TeamSocket, SocketOptions } from './styles';

const TeamContainer = (props) => {

    const { angelTeam, demonTeam, user, actualRoom } = props;

    const isHost = user.username === actualRoom.host;

    const handleSwapTeam = () => {
        swapTeam(user, actualRoom.id);
    }

    const handleKickUser = (userToKick) => {
        kickUser(userToKick, actualRoom.id);
    }

    const showPlayer = (team, index) => {

        return (
        <div>
            {team && team[index] && team[index].username ?
            <p>{team[index].username}</p> : <p>No Player</p>
            }

            {team && team[index] && team[index].isReady ?
            <p>{team[index].username}</p> : null
            }
                
        </div>
        )
    }

    const displayExtraOptions = (userSocket) => {
        if (userSocket && userSocket.username !== user.username) {
            return (
                <>
                {isHost && <button onClick={e => handleKickUser(userSocket)}>Kick</button>}
                </>)

        }
    }

    const checkPlayerInTeam = (team, user) => {
        return team.findIndex(userToFind => userToFind.username === user);
    }

    const handleRequestKing = (side) => {

        let userFound;

        switch(side) {
            case "angel": 
                userFound = checkPlayerInTeam(angelTeam, user.username);
                break;
            case "demon":
                userFound = checkPlayerInTeam(demonTeam, user.username);
                break;
            default: 
                return;
        }

        if (userFound > 0) {
            console.log("I WANT TO BE KING");
        } 

    }

    return (
        <div className="team-container">
            <button onClick={e => handleSwapTeam()}>Swap team</button>

            <div className="teams-container">
                
                <div className="angel-team-container">
                    <div className="socket-container">
                        <TeamSocket team={angelTeam} username={user.username} side="angel">
                            {showPlayer(angelTeam, 1)}
                        </TeamSocket>
                        <SocketOptions>
                            {angelTeam && displayExtraOptions(angelTeam[1])}
                        </SocketOptions>
                    </div>

                    <div className="socket-container">
                        <TeamSocket team={angelTeam} username={user.username} side="angel">
                            {showPlayer(angelTeam, 2)}
                        </TeamSocket>
                        <SocketOptions>
                            {angelTeam && displayExtraOptions(angelTeam[2])}
                        </SocketOptions>
                    </div>

                    <div className="socket-container">
                        <TeamSocket team={angelTeam} username={user.username} side="angel" onClick={() => handleRequestKing("angel")}>
                            {showPlayer(angelTeam, 0)}
                        </TeamSocket>
                        <SocketOptions>
                            {angelTeam && displayExtraOptions(angelTeam[0])}
                        </SocketOptions>
                    </div>

                    <div className="socket-container">
                        <TeamSocket team={angelTeam} username={user.username} side="angel">
                            {showPlayer(angelTeam, 3)}
                        </TeamSocket>
                        <SocketOptions>
                            {angelTeam && displayExtraOptions(angelTeam[3])}
                        </SocketOptions>
                    </div>

                    <div className="socket-container">
                        <TeamSocket team={angelTeam} username={user.username} side="angel">
                            {showPlayer(angelTeam, 4)}
                        </TeamSocket>
                        <SocketOptions>
                            {angelTeam && displayExtraOptions(angelTeam[4])}
                        </SocketOptions>
                    </div>
                </div>

                <div className="demon-team-container">
                    <div className="socket-container">
                        <TeamSocket team={demonTeam} username={user.username} side="demon">
                            {showPlayer(demonTeam, 1)}
                        </TeamSocket>
                        <SocketOptions>
                            {demonTeam && displayExtraOptions(demonTeam[1])}
                        </SocketOptions>
                    </div>

                    <div className="socket-container">
                        <TeamSocket team={demonTeam} username={user.username} side="demon">
                            {showPlayer(demonTeam, 2)}
                        </TeamSocket>
                        <SocketOptions>
                        {demonTeam && displayExtraOptions(demonTeam[2])}
                        </SocketOptions>
                    </div>

                    <div className="socket-container">
                        <TeamSocket team={demonTeam} username={user.username} side="demon" onClick={(e) => handleRequestKing("demon")}>
                            {showPlayer(demonTeam, 0)}
                        </TeamSocket>
                        <SocketOptions>
                            {demonTeam && displayExtraOptions(demonTeam[0])}
                        </SocketOptions>
                    </div>

                    <div className="socket-container">
                        <TeamSocket team={demonTeam} username={user.username} side="demon">
                            {showPlayer(demonTeam, 3)}
                        </TeamSocket>
                        <SocketOptions>
                            {demonTeam && displayExtraOptions(demonTeam[3])}
                        </SocketOptions>
                    </div>

                    <div className="socket-container">
                        <TeamSocket team={demonTeam} username={user.username} side="demon">
                            {showPlayer(demonTeam, 4)}
                        </TeamSocket>
                        <SocketOptions>
                            {demonTeam && displayExtraOptions(demonTeam[4])}
                        </SocketOptions>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default TeamContainer;