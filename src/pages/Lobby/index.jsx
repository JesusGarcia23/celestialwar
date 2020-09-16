import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context/Context';
import {testFunction, getAllRooms, createNewRoom } from '../../sockets/emit';

const Lobby = (props) => {

    let initialValues = {
        roomName: ""
    }

    const myContext = useContext(Context);

    const { rooms, setRooms } = myContext;

    const [ showCreateGame, setShowCreateGame ] = useState(false);

    const [ formInput, setFormInput ] = useState(initialValues);
    
    const { user } = myContext;

    useEffect(() => {
        getAllRooms();
    }, [])

    const showCreateGameModal = () => {
        setShowCreateGame(true);
    }

    const handleCreateRoom = (event) => {
        event.preventDefault();
        setShowCreateGame(false);
        createNewRoom(formInput)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormInput(oldState => ({...oldState, [name]: value}))
    }

    return (
        <div>
            <h2>Lobby</h2>
            <div>{user && user.username}</div>
            {showCreateGame && 
                <form onSubmit={handleCreateRoom}>
                    <label htmlFor="roomName">Room Name</label>
                    <input id="roomName" type="text" name="roomName" value={formInput.roomName} onChange={e => handleChange(e)}></input>
                    <button type="submit">Create Room</button>
                </form>
            }
            <button onClick={e => showCreateGameModal(e)}>Create game</button>
        </div>
    )
}

export default Lobby;