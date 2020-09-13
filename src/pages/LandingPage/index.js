import React, { useState, useContext } from 'react';
import { addPlayer } from '../../sockets/emit';

import { Link } from 'react-router-dom';

import Context from '../../Context/Context';

const LandingPage = (props) => {

    const { user } = props;

    const myContext = useContext(Context);

    const [ formInput, setFormInput ] = useState({username: ""});

    const handleChange = (event) => {
      const { value, name } = event.target;
      setFormInput((oldValues) => ({...oldValues, [name]: value }));
    } 

    const handleSubmit = (event) => {
        event.preventDefault();
        addPlayer(formInput.username);
        props.history.push('/lobby')
    }

    return (
        <div>
        <h1>Celestial War</h1>
        <h3>Enter your username</h3>
        <input name="username" type="text" onChange={e => handleChange(e) } value={formInput.username}></input>
        <button onClick={e => handleSubmit(e)}>Go to Lobby</button>
        <div>{user}</div>
        </div>
    )
}

export default LandingPage;