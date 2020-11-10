import React, { useState, useRef, useContext } from 'react';
import { useEffect } from 'react';
import Context from '../../Context/Context';
import { playersCreator } from '../Character/playerGenerator';
import { joinRoom } from '../../sockets/emit/roomEmit';
import { socket } from '../../sockets/index';
import { getUpdatedGameStatus } from '../../sockets/events/gameEvents';
import { forestPlatForms } from './utils/mockData';

import { drawPlatform, drawWarriorPedestal, drawSphereCollector, drawSphereCollectorSocket, drawPlayers } from './utils/resourceUtils';
import { handleMovement, moveCharacter } from './utils/playerUtils';

const NewBattleField = (props) => {

    const canvasRef = useRef(null);

    let actualRoomData = null;

    let myPlayer = null;

    const MyContext = useContext(Context);

    const { id } = props.match.params;

    const { user, actualRoom, gameStatus, error } = MyContext;

    useEffect(() => {
        socket.emit('requestGameStatus', {user, roomId: 2} );
        window.addEventListener("resize", updateCanvasSize);
        canvasRef.current.width = window.innerWidth - 50;
        canvasRef.current.height = window.innerHeight - 50;
        socket.on('updateGameStatus', (data) => {
            actualRoomData = data;
            myPlayer = getMyPlayer(actualRoomData);
            handleGameState(data);
        });
    },[actualRoom]);

    const handleGameState = (dataToDisplay) => {
        
        if (canvasRef && canvasRef.current) {

            requestAnimationFrame(() => paintGame(dataToDisplay));
            
        }

    }

    const paintGame = (gameState) => {
        
        const myCanvas = canvasRef.current;
        let context = myCanvas.getContext('2d');

        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        drawMap(context, myCanvas);

        if (gameState && gameState.gameStatus && gameState.gameStatus.map && gameState.gameStatus.players) {
            moveCharacter(myPlayer, gameState, myCanvas);
            drawAllPlayers(context, myCanvas);
        }
    }

    const getMyPlayer = (actualRoomData) => {

        if (actualRoomData.gameStatus && actualRoomData.gameStatus.players && actualRoomData.gameStatus.players.length > 0) {
            
            for (let i = 0; i <= actualRoomData.gameStatus.players.length - 1; i++) {
                
                if (actualRoomData.gameStatus.players[i].name === user.username) {
                    return actualRoomData.gameStatus.players[i];
                }
            }

        }
        return null;
    }

    const updateCanvasSize = () => {
        canvasRef.current.width = window.innerWidth - 50;
        canvasRef.current.height = window.innerHeight - 50;
    }

    const drawMap = (context, canvas) => {

        if (actualRoomData.gameStatus && actualRoomData.gameStatus.map && actualRoomData.gameStatus.map.length > 0) {
            // actualRoom.gameStatus.map
          return forestPlatForms.map(resource => {

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
                    return drawSphereCollectorSocket(context, resource, canvas)
                }
                default:
                    return;
            }
          
          })
        }
      }

    const drawAllPlayers = (context, canvas) => {

        if (actualRoomData.gameStatus && actualRoomData.gameStatus.players && actualRoomData.gameStatus.players.length > 0) {
            return actualRoomData.gameStatus.players.map(player => {
                return drawPlayers(context, player, canvas);
            })
        }
    }

    handleGameState(actualRoomData);

    return (
        <>
            <canvas id='battlefield' ref={canvasRef}></canvas>
        </>)
    
}

export default NewBattleField;