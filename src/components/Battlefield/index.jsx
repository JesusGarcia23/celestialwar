// levelCreator is the function to call to make platforms

import React, { useEffect, useRef, useState } from 'react';
import { moveCharacters, handleMovement, handleGravity } from './playerControllers';
import {forest} from '../levels/Forest'
import { listPlayers } from '../players';
import { playersCreator } from '../Character/playerGenerator';
import './style.css';


const Battlefield = (props) => {

  const [ gameOn, setGameOn ] = useState(false);
  const [players, setPlayers ] = useState([]);
  const [mapLevel, setmapLevel] = useState([]);
  const canvasRef = useRef(null);
console.log(mapLevel)

  useEffect(() => {
    
    canvasRef.current.width = window.innerWidth - 50;
    canvasRef.current.height = window.innerHeight - 50;
    
    if(gameOn){
      setmapLevel(forest(canvasRef.current));
      setPlayers(playersCreator(canvasRef.current, listPlayers));
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
        handleGravity(player, mapLevel);
        handleMovement(player, mapLevel, canvasRef.current);
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