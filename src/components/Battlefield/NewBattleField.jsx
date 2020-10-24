import React, { useState, useRef, useContext } from 'react';
import { useEffect } from 'react';
import Context from '../../Context/Context';
import { playersCreator } from '../Character/playerGenerator';
import { requestGameStatus } from '../../sockets/emit/gameEmit';
import { drawPlatform } from './utils/resourceUtils';

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

        if(actualRoom.gameStatus && actualRoom.gameStatus.map && actualRoom.gameStatus.map.length > 0) {
          return actualRoom.gameStatus.map.map(resource => {

            switch(resource.type) {
                case 'platform': {
                   return drawPlatform(context, resource, canvas)
                }
                default:
                    return;
            }
            //   console.log(resource)
            // switch(resource.type) {
            //   case 'platform': {
            //     return resource.drawPlatform(context, false);
            //   }
            //   case 'sphere-generator': {
            //     return resource.drawContainer(context);
            //   }
            //   case 'warrior-pedestal': {
            //     return resource.drawPedestal(context);
            //   }
            //   case 'sphere-collector': {
            //     return resource.drawSphereCollector(context);
            //   }
            //   case 'sphere-socket': {
            //     return resource.drawSphereCollectorSocket(context);
            //   }
            //   default:
            //     return null;
            // }
          
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