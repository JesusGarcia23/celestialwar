// levelCreator is the function to call to make platforms

import React, { useEffect, useRef, useState } from 'react';
import { moveCharacters, handleMovement, handleGravity, handleSphereGravity,  handleJumping, handleClashing } from './playerControllers';
import { forest } from '../levels/Forest'
import { listPlayers } from '../players';
import { playersCreator } from '../Character/playerGenerator';
import { GameStatus } from '../GameStatus';
import { Sphere } from '../Sphere'
import './style.css';

const testSphere = new Sphere(5, 700, 0, 'cyan');
const testSphere2 = new Sphere(5, 680, 0, 'cyan');
const testGameStatus = new GameStatus();

const Battlefield = (props) => {

  const { user } = props;
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
      setSpheres([testSphere, testSphere2]);
      setmapLevel([...forest(canvasRef.current), testSphere]);
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
          case 'warrior-pedestal': {
            return resource.drawPedestal(context);
          }
          case 'sphere-collector': {
            return resource.drawSphereCollector(context);
          }
          case 'sphere-socket': {
            return resource.drawSphereCollectorSocket(context);
          }
          default:
            return null;
        }
      
      })
    }
  }

  const update = () => {
    
    if (gameOn) {
      const myCanvas = canvasRef.current;
      let context = myCanvas.getContext('2d');
      const loop = () => {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawMap(context);

      spheres.length > 0 && spheres.map(sphere => {
        sphere.drawSphere(context, players);
        handleSphereGravity(sphere, mapLevel);
      });

      players.filter(player => player.alive === true).map(player => {
        handleGravity(player, mapLevel);
        handleJumping(player, mapLevel, spheres, testGameStatus);
        handleMovement(player, mapLevel, players, spheres, canvasRef.current, testGameStatus);
        handleClashing(player, mapLevel)
        player.drawCharacter(context);
      })

      testGameStatus.checkStatus();

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

  return (<>
  <canvas id='battlefield' ref={canvasRef}></canvas>
  <div>Hello {user}</div>
  <button onClick={e => startGame()}>Start game</button></>)
}

export default Battlefield;