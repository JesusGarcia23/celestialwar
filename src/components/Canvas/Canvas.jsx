import React, { useEffect, useRef, useState } from 'react';
import { Basic } from '../../Classes/Character/Celestial';
import { moveCharacters, handleMovement } from './utils';
import './style.css'

let firstPlayer = new Basic('jesus', 20, 20, window.innerWidth * 0.015, window.innerHeight * 0.06, 'A');
let secondPlayer = new Basic('miguel', 40, 40, 30, 60, 'B')
const Canvas = () => {

  const [ gameOn, setGameOn ] = useState(false);
  const [players, setPlayers ] = useState([firstPlayer, secondPlayer]);
  const canvasRef = React.useRef(null);

  useEffect(() => {
    
    canvasRef.current.width = window.innerWidth - 50;
    canvasRef.current.height = window.innerHeight - 50;
    update();
  })

  const update = () => {
    if(gameOn) {
      const myCanvas = canvasRef.current;
      let context = myCanvas.getContext('2d');
      const loop = () => {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      players.map(player => {
        handleMovement(player);
        player.drawCharacter(context);
      })
      
      requestAnimationFrame(loop);
      }

      loop();

    }

  }

  const startGame = () => {
    setGameOn(!gameOn);
  }

  moveCharacters();

  return (<><canvas id='battlefield' ref={canvasRef}></canvas><button onClick={e => startGame()}>Start game</button></>)
}

export default Canvas;