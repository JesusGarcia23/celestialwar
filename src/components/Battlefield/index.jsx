// levelCreator is the function to call to make platforms

import React, { useEffect, useRef, useState } from 'react';
import { Angel, Demon } from '../Character'
import { moveCharacters, handleMovement } from './utils';
import {forest} from '../levels/Forest'
import './style.css';

let firstPlayer = new Angel('jesus', 20, 20, window.innerWidth * 0.015, window.innerHeight * 0.06, 'A');
let secondPlayer = new Demon('miguel', 60, 60, window.innerWidth * 0.015, window.innerHeight * 0.06, 'B');

const Battlefield = (props) => {

  const [ gameOn, setGameOn ] = useState(false);
  const [players, setPlayers ] = useState([firstPlayer, secondPlayer]);
  const [mapLevel, setmapLevel] = useState([]);
  const canvasRef = React.useRef(null);
console.log(mapLevel)

  useEffect(() => {
    
    canvasRef.current.width = window.innerWidth - 50;
    canvasRef.current.height = window.innerHeight - 50;
    if(gameOn){
      setmapLevel(forest(canvasRef.current));
    }
    
    //update();
  },[gameOn])


  const drawMap = (context) => {
    if(mapLevel.length > 0){
      return mapLevel.map(platform => {
        return platform.drawObject(context);
      })
    }
  }

  const update = () => {
    if(gameOn) {
      const myCanvas = canvasRef.current;
      let context = myCanvas.getContext('2d');
      const loop = () => {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      drawMap(context);

      players.map(player => {
        handleMovement(player, mapLevel);
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

  update();
  moveCharacters();

  return (<><canvas id='battlefield' ref={canvasRef}></canvas><button onClick={e => startGame()}>Start game</button></>)
}

export default Battlefield;