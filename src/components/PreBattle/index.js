import React, { useState } from 'react';
import './style.css';

const PreBattle = (props) => {

    const { angelTeam, demonTeam } = props;

    const [ myTeam, setMyTeam ] = useState([]);

    return (
        <div className="pre-battle-container">
            <h2>Pre Battle</h2>
            <div className="pre-battle-teams-container">
                <div className="pre-battle-team">
                    <div className="pre-battle-team-socket">
                    </div>
                    <div className="pre-battle-team-socket">
                    </div>
                    <div className="pre-battle-team-socket-king">
                    </div>
                    <div className="pre-battle-team-socket">
                    </div>
                    <div className="pre-battle-team-socket">
                    </div>
                </div>
                <div className="pre-battle-team">
                    <div className="pre-battle-team-socket">
                    </div>
                    <div className="pre-battle-team-socket">
                    </div>
                    <div className="pre-battle-team-socket-king">
                    </div>
                    <div className="pre-battle-team-socket">
                    </div>
                    <div className="pre-battle-team-socket">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreBattle;