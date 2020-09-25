import React from 'react';
import './style.css';

const TeamContainer = (props) => {

    const { angelTeam, demonTeam } = props;

    console.log(demonTeam);

    return (
        <div className="team-container">
            <div className="angel-team-container">
                <div className="angel-team-socket">
                {angelTeam &&  angelTeam[0] && angelTeam[0].username}
                </div>

                <div className="angel-team-socket">
                {angelTeam && angelTeam[1] && angelTeam[1].username}
                </div>

                <div className="angel-team-socket">
                {angelTeam && angelTeam[2] && angelTeam[2].username}
                </div>

                <div className="angel-team-socket">
                {angelTeam && angelTeam[3] && angelTeam[3].username}
                </div>

                <div className="angel-team-socket">
                {angelTeam && angelTeam[4] && angelTeam[4].username}
                </div>
            </div>

            <div className="demon-team-container">
                <div className="demon-team-socket">
                {demonTeam && demonTeam[0] && demonTeam[0].username}
                </div>

                <div className="demon-team-socket">
                {demonTeam && demonTeam[1] && demonTeam[1].username}
                </div>

                <div className="demon-team-socket">
                {demonTeam && demonTeam[2] && demonTeam[2].username}
                </div>

                <div className="demon-team-socket">
                {demonTeam && demonTeam[3] && demonTeam[3].username}
                </div>

                <div className="demon-team-socket">
                {demonTeam && demonTeam[4] && demonTeam[4].username}
                </div>
            </div>
        </div>
    )
}

export default TeamContainer;