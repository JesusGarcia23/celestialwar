import React, { useContext } from 'react';
import Context from '../../Context/Context';
import { swapTeam, kickUser } from '../../sockets/emit/roomEmit';
import './style.css';

const TeamContainer = (props) => {

    const { angelTeam, demonTeam, user, actualRoom } = props;

    const isHost = user.username === actualRoom.host;

    const handleSwapTeam = () => {
        swapTeam(user, actualRoom.id);
    }

    const handleKickUser = (userToKick) => {
        kickUser(userToKick, actualRoom.id);
    }

    const displayExtraOptions = (userSocket) => {
        if (userSocket && userSocket.username !== user.username) {
            return (
                <>
                {isHost && <button onClick={e => handleKickUser(userSocket)}>Kick</button>}
                </>)

        }
    }

    return (
        <div className="team-container">
            <button onClick={e => handleSwapTeam()}>Swap team</button>

            <div className="teams-container">
                
                <div className="angel-team-container">
                    <div className="socket-container">
                        <div className="angel-team-socket">
                            {angelTeam && angelTeam[0] ? angelTeam[0].username : "No Player"}
                        </div>
                        <div className="socket-options-container">
                            {angelTeam && displayExtraOptions(angelTeam[0])}
                        </div>
                    </div>

                    <div className="socket-container">
                        <div className="angel-team-socket">
                            {angelTeam && angelTeam[1] ? angelTeam[1].username : "No Player"}
                        </div>
                        <div className="socket-options-container">
                            {angelTeam && displayExtraOptions(angelTeam[1])}
                        </div>
                    </div>

                    <div className="socket-container">
                        <div className="angel-team-socket">
                            {angelTeam && angelTeam[2] ? angelTeam[2].username : "No Player"}
                        </div>
                        <div className="socket-options-container">
                            {angelTeam && displayExtraOptions(angelTeam[2])}
                        </div>
                    </div>

                    <div className="socket-container">
                        <div className="angel-team-socket">
                            {angelTeam && angelTeam[3] ? angelTeam[3].username : "No Player"}
                        </div>
                        <div className="socket-options-container">
                            {angelTeam && displayExtraOptions(angelTeam[3])}
                        </div>
                    </div>

                    <div className="socket-container">
                        <div className="angel-team-socket">
                            {angelTeam && angelTeam[4] ? angelTeam[4].username : "No Player"}
                        </div>
                        <div className="socket-options-container">
                            {angelTeam && displayExtraOptions(angelTeam[4])}
                        </div>
                    </div>
                </div>

                <div className="demon-team-container">
                    <div className="socket-container">
                        <div className="demon-team-socket">
                            {demonTeam && demonTeam[0] ? demonTeam[0].username : "No Player"}
                        </div>
                        <div className="socket-options-container">
                            {demonTeam && displayExtraOptions(demonTeam[0])}
                        </div>
                    </div>

                    <div className="socket-container">
                        <div className="demon-team-socket">
                            {demonTeam && demonTeam[1] ? demonTeam[1].username : "No Player"}
                        </div>
                        <div className="socket-options-container">
                        {demonTeam && displayExtraOptions(demonTeam[1])}
                        </div>
                    </div>

                    <div className="socket-container">
                        <div className="demon-team-socket">
                            {demonTeam && demonTeam[2] ? demonTeam[2].username : "No Player"}
                        </div>
                        <div className="socket-options-container">
                            {demonTeam && displayExtraOptions(demonTeam[2])}
                        </div>
                    </div>

                    <div className="socket-container">
                        <div className="demon-team-socket">
                            {demonTeam && demonTeam[3] ? demonTeam[3].username : "No Player"}
                        </div>
                        <div className="socket-options-container">
                            {demonTeam && displayExtraOptions(demonTeam[3])}
                        </div>
                    </div>

                    <div className="socket-container">
                        <div className="demon-team-socket">
                            {demonTeam && demonTeam[4] ? demonTeam[4].username : "No Player"}
                        </div>
                        <div className="socket-options-container">
                            {demonTeam && displayExtraOptions(demonTeam[4])}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default TeamContainer;