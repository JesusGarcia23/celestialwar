import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../../Context/Context';
import { getAllRooms, createNewRoom, joinRoom } from '../../sockets/emit/roomEmit';

const Lobby = (props) => {

    let initialValues = {
        roomName: ""
    }

    const myContext = useContext(Context);

    const { rooms, error, user } = myContext;

    const [ showCreateGame, setShowCreateGame ] = useState(false);

    const [ formInput, setFormInput ] = useState(initialValues);
    
    useEffect(() => {
        getAllRooms();
    }, [])

    const showCreateGameModal = () => {
        setShowCreateGame(true);
    }

    const handleCreateRoom = (event) => {
        event.preventDefault();
        createNewRoom(user, formInput);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormInput(oldState => ({...oldState, [name]: value}))
    }

    const joinToRoom = (roomId) => {
        joinRoom(user, roomId);
    }

    const showListOfRooms = () => {
        if(rooms.length > 0) {
            return rooms.map(room => <li key={room.id}>{room.name} <button onClick={e => joinToRoom(room.id)}>Join Room</button></li>)
        }
    }

    if(user && user.accepted && user.location){
        return (<Redirect to={`/room/${user.location}`} />)
    }

    else {
        return (
        <div>
            <h2>Lobby</h2>
            <div>{user && user.username}</div>
            {showCreateGame && 
                <form onSubmit={handleCreateRoom}>
                    <label htmlFor="roomName">Room Name</label>
                    <input id="roomName" type="text" name="roomName" value={formInput.roomName} onChange={e => handleChange(e)}></input>
                    <button type="submit">Create Room</button>
                    {error.roomAlreadyExists && <p style={{color: 'red'}}>{error.roomAlreadyExistsMessage}</p>}
                </form>
            }
            <button onClick={e => showCreateGameModal(e)}>Create game</button>

            <div>
                <h2>List of Rooms</h2>
                <ul>
                {showListOfRooms()}
                </ul>
            </div>
        </div>
    )
        }
}

export default Lobby;