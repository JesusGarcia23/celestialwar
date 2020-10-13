import React, { useState, useRef, useContext } from 'react';
import { useEffect } from 'react';
import Context from '../../Context/Context';
import { requestGameStatus } from '../../sockets/emit/gameEmit';

const NewBattleField = (props) => {

    const canvasRef = useRef(null);

    const MyContext = useContext(Context);

    const { id } = props.match.params;

    const { user, actualRoom, error } = MyContext;

    const [ gameOn, setGameOn ] = useState(false);

    const startGame = () => {
        setGameOn(!gameOn);
      }

    useEffect(() => {
        requestGameStatus(user, id);
    },[gameOn])

    return (
        <>
            <canvas id='battlefield' ref={canvasRef}></canvas>
            <button onClick={e => startGame()}>Start game</button>
        </>)
    
}

export default NewBattleField;