import React, { useState, useContext } from 'react';
import { addPlayer } from '../../sockets/emit';

import { Link, Redirect } from 'react-router-dom';

import Context from '../../Context/Context';

const LandingPage = (props) => {

    const myContext = useContext(Context);

    const { user, error } = myContext;

    const [ formInput, setFormInput ] = useState({username: ""});

    const handleChange = (event) => {
      const { value, name } = event.target;
      setFormInput((oldValues) => ({...oldValues, [name]: value }));
    } 

    const handleSubmit = (event) => {
        event.preventDefault();
        addPlayer(formInput.username);
    }

    if(user && user.accepted) {
        return <Redirect to='/lobby'/>
    }
    else {
    return (
        <div>
        <h1>Celestial War</h1>
        <h3>Enter your username</h3>
        <input name="username" type="text" onChange={e => handleChange(e) } value={formInput.username}></input>
        {error.usernameAlreadyExists && <p style={{color: 'red'}}>Username already Exists</p>}
        <button onClick={e => handleSubmit(e)}>Go to Lobby</button>
        <div>{user}</div>
        </div>
    )
}
}

export default LandingPage;