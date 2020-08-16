// levelCreator is the function to call to make platforms

import React, { useEffect, useRef, useState } from 'react';
import { moveCharacters, handleMovement, handleGravity, handleSphereGravity, RectCircleColliding,  handleJumping } from './playerControllers';
import { forest } from '../levels/Forest'
import { listPlayers } from '../players';
import { playersCreator } from '../Character/playerGenerator';
import { Sphere } from '../Sphere'
import './style.css';

const testSphere = new Sphere(5, 100, 101, 'cyan');

const Battlefield = (props) => {

  const modeDevelop = true;
  const [ gameOn, setGameOn ] = useState(false);
  const [ players, setPlayers ] = useState([]);
  const [ mapLevel, setmapLevel ] = useState([]);
  const [ spheres , setSpheres ] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    
    canvasRef.current.width = window.innerWidth - 50;
    canvasRef.current.height = window.innerHeight - 50;
    
    if(gameOn){
      setPlayers(playersCreator(canvasRef.current, listPlayers));
      setmapLevel([...forest(canvasRef.current)]);
    }
    update();
  },[gameOn])


  const drawMap = (context) => {
    if(mapLevel.length > 0){
      return mapLevel.map(resource => {
        switch(resource.type){
          case 'platform': {
            return resource.drawPlatform(context, modeDevelop);
          }
          case 'sphere-generator': {
            return resource.drawContainer(context);
          }
          default:
            return null;
        }
      
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
      testSphere.drawSphere(context);
      players.filter(player => player.alive === true).map(player => {
        handleGravity(player, mapLevel);
        handleSphereGravity(testSphere, mapLevel);
        handleJumping(player, mapLevel);
        handleMovement(player, mapLevel, players, canvasRef.current);
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