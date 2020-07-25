import React, { useEffect } from 'react';
import './style.css';
import { useCanvas } from './useCanvas';
import { Basic } from '../../Classes/Character/Celestial';

const Battlefield = () => {
    const newCharacter = new Basic('jesus', 25, 25, 20, 35);
    const anotherCharacter = new Basic('Miguel', 100, 100, 20, 35);
    const [characters, setCharacters, canvasRef, canvasWidth, canvasHeight ] = useCanvas();

    const actualCanvas = document.getElementById('battlefield-canvas')
    if(actualCanvas) {
        window.addEventListener('keydown', (event) => {
            console.log(event.keyCode);
            newCharacter.move(event.keyCode);
            console.log(newCharacter);
            setCharacters(newCharacter);
        })
    }
    
    const handleCanvasClick=(event)=>{
        if(characters === null){
            console.log(newCharacter);
            setCharacters(newCharacter);
        }
        // on each click get current mouse location 
        // add the newest mouse location to an array in state 
      };

    return (
            <canvas  ref={canvasRef} width={canvasWidth} height={canvasHeight} onClick={e => handleCanvasClick(e)}></canvas>
    )

}

export default Battlefield;