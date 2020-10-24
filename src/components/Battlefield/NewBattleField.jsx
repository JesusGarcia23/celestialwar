import React, { useState, useRef, useContext } from 'react';
import { useEffect } from 'react';
import Context from '../../Context/Context';
import { playersCreator } from '../Character/playerGenerator';
import { requestGameStatus } from '../../sockets/emit/gameEmit';
import { drawPlatform, drawWarriorPedestal, drawSphereCollector, drawSphereCollectorSocket, drawPlayers } from './utils/resourceUtils';

const NewBattleField = (props) => {

    const canvasRef = useRef(null);

    const MyContext = useContext(Context);

    const { id } = props.match.params;

    const { user, actualRoom, gameStatus, error } = MyContext;

    const [ gameOn, setGameOn ] = useState(actualRoom.gameStarted);

    useEffect(() => {
        window.addEventListener("resize", updateCanvasSize);
        canvasRef.current.width = window.innerWidth - 50;
        canvasRef.current.height = window.innerHeight - 50;
        update(canvasRef.current);

    },[]);

    const updateCanvasSize = () => {
        canvasRef.current.width = window.innerWidth - 50;
        canvasRef.current.height = window.innerHeight - 50;
    }

    const drawMap = (context, canvas) => {

        if (actualRoom.gameStatus && actualRoom.gameStatus.map && actualRoom.gameStatus.map.length > 0) {
          return actualRoom.gameStatus.map.map(resource => {

            switch(resource.type) {
                case 'platform': {
                   return drawPlatform(context, resource, canvas);
                }
                case 'warrior-pedestal': {
                    return drawWarriorPedestal(context, resource, canvas);
                }
                case 'sphere-collector': {
                    return drawSphereCollector(context, resource, canvas);
                }
                case 'sphere-socket': {
                    return drawSphereCollectorSocket(context, resource, canvas)
                }
                default:
                    return;
            }
          
          })
        }
      }

    const drawAllPlayers = (context, canvas) => {

        if (actualRoom.gameStatus && actualRoom.gameStatus.players && actualRoom.gameStatus.players.length > 0) {
            return actualRoom.gameStatus.players.map(player => {
                return drawPlayers(context, player, canvas);
            })
        }
    }

    const update = (myCanvas) => {

        if (gameOn) {

            if (myCanvas) {
          
                let context = myCanvas.getContext('2d');

                const loop = () => {
  
                    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
                    drawMap(context, myCanvas);
                    drawAllPlayers(context, myCanvas);
            
                    // players.filter(player => player.alive === true).map(player => {
                    //   handleGravity(player, mapLevel);
                    //   handleJumping(player, mapLevel, spheres, testGameStatus);
                    //   handleMovement(player, mapLevel, players, spheres, canvasRef.current, testGameStatus);
                    //   handleClashing(player, mapLevel)
                    //   player.drawCharacter(context);
                    // })
            
                    // spheres.length > 0 && spheres.map(sphere => {
                    //   sphere.drawSphere(context, players);
                    //   handleSphereGravity(sphere, mapLevel);
                    // })
            
                    requestAnimationFrame(loop);
                }
    
                loop();
            
            }
    
        }
    
    }

    return (
        <>
            <canvas id='battlefield' ref={canvasRef}></canvas>
        </>)
    
}

export default NewBattleField;