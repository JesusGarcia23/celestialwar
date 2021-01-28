import React, { useRef, useContext } from 'react';
import { useEffect } from 'react';
import Context from '../../Context/Context';
import { socket } from '../../sockets/index';
import { forestPlatForms, forestSpheres } from './utils/mockData';

import { drawPlatform, drawWarriorPedestal, drawSphereCollector, drawSphereCollectorSocket, drawPlayers, drawSpheres } from './utils/resourceUtils';
import { handleMovement, moveControls, handleGravity, handleRespawn } from './utils/playerUtils';

const NewBattleField = (props) => {

    const canvasRef = useRef(null);

    const requestRef = useRef();

    let actualRoomData = null;

    let myPlayer = null;

    let respawnPlayer = false;

    const MyContext = useContext(Context);

    const { id } = props.match.params;

    const { user, error, attackRequest } = MyContext;

    const resetPlayerRequestToTransform = () => {
        setTimeout(() => {
            respawnPlayer = false;
        }, 10000)
      }

    useEffect(() => {
        socket.emit('requestGameStatus', {user, roomId: id} );
        window.addEventListener("resize", updateCanvasSize);
        canvasRef.current.width = window.innerWidth - 50;
        canvasRef.current.height = window.innerHeight - 50;
        socket.on('updateGameStatus', (data) => {
            actualRoomData = data;
            myPlayer = getMyPlayer(actualRoomData);
        });

        requestRef.current = requestAnimationFrame(animateGame);

    return () => cancelAnimationFrame(requestRef.current);
    },[actualRoomData]);

    const animateGame = () => {

        const myCanvas = canvasRef.current;
        let context = myCanvas.getContext('2d');

        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        drawMap(context, myCanvas);

        if (actualRoomData && actualRoomData.gameStatus && actualRoomData.gameStatus.map && 
            actualRoomData.gameStatus.players && !actualRoomData.gameStatus.gameFinished) {
                
            if (!myPlayer.alive && !respawnPlayer) {
                handleRespawn(myPlayer, actualRoomData);
                respawnPlayer = true;
                resetPlayerRequestToTransform();
            }
            handleGravity(myPlayer, actualRoomData, myCanvas);
            handleMovement(myPlayer, actualRoomData, attackRequest);
            drawAllPlayers(context, myCanvas);
            drawAllSpheres(context, myCanvas);
        }

        requestRef.current = requestAnimationFrame(animateGame);
    };

    const getMyPlayer = (actualRoomData) => {

        if (actualRoomData.gameStatus && actualRoomData.gameStatus.players && actualRoomData.gameStatus.players.length > 0) {
            
            for (let i = 0; i <= actualRoomData.gameStatus.players.length - 1; i++) {
                
                if (actualRoomData.gameStatus.players[i].name === user.username) {
                    return actualRoomData.gameStatus.players[i];
                }
            }

        }
        return null;
    };

    const updateCanvasSize = () => {
        canvasRef.current.width = window.innerWidth - 50;
        canvasRef.current.height = window.innerHeight - 50;
    };

    const drawMap = (context, canvas) => {
        if (actualRoomData && actualRoomData.gameStatus && actualRoomData.gameStatus.map && actualRoomData.gameStatus.map.length > 0) {
            // actualRoom.gameStatus.map
          return actualRoomData.gameStatus.map.map(resource => {

            switch(resource.type) {
                case 'platform': {
                   return drawPlatform(context, resource, canvas, true);
                }
                case 'warrior-pedestal': {
                    return drawWarriorPedestal(context, resource, canvas);
                }
                case 'sphere-collector': {
                    return drawSphereCollector(context, resource, canvas);
                }
                case 'sphere-socket': {
                    return drawSphereCollectorSocket(context, resource, canvas);
                }
                default:
                    return null;
            }
          
          })
        }
    };

    const drawAllSpheres = (context, canvas) => {

        if (actualRoomData.gameStatus && actualRoomData.gameStatus.spheres) {

            return actualRoomData.gameStatus.spheres.filter(sphereToFilter => !sphereToFilter.hide ).map(sphere => {
                return drawSpheres(sphere, actualRoomData.gameStatus.players,  context, canvas)
            }) 
        }
    }

    const drawAllPlayers = (context, canvas) => {

        if (actualRoomData.gameStatus && actualRoomData.gameStatus.players && actualRoomData.gameStatus.players.length > 0) {
            return actualRoomData.gameStatus.players.filter(player => player.alive).map(player => {
                return drawPlayers(context, player, canvas);
            })
        }
    };

    moveControls();

    return (
        <>
            <canvas id='battlefield' ref={canvasRef}></canvas>
        </>)
    
};

export default NewBattleField;