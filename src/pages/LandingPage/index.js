import React from 'react';

import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
        <h1>Celestial War</h1>
        <Link to='/lobby'>Go to Lobby</Link>
        <Link to='/test'>Go to Battlefield</Link>
        </div>
    )
}

export default LandingPage;