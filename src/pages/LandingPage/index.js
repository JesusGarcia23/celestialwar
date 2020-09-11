import React, { useState } from 'react';

import { Link } from 'react-router-dom';

const LandingPage = (props) => {

    const { user, setUser } = props;

    const [ formInput, setFormInput ] = useState({username: ""});

    const handleChange = (event) => {
      const { value, name } = event.target;
      setFormInput((oldValues) => ({...oldValues, [name]: value }));
    } 

    const handleSubmit = (event) => {
        event.preventDefault();
        setUser(formInput.username);
        props.history.push('/battlefield')
    }
    console.log(formInput)
    return (
        <div>
        <h1>Celestial War</h1>
        <h3>Enter your username</h3>
        <input name="username" type="text" onChange={e => handleChange(e) } value={formInput.username}></input>
        <button onClick={e => handleSubmit(e)}>Go to Battlefield</button>
        <div>{user}</div>
        </div>
    )
}

export default LandingPage;