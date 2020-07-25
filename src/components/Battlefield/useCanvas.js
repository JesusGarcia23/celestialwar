import React, { useState, useEffect, useRef } from 'react';

// Scaling Constants for Canvas
const SCALE = 0.1;
const OFFSET = 80;
export const canvasWidth = window.innerWidth * .5;
export const canvasHeight = window.innerHeight * .5;

export function drawCanvas(ctx){
  console.log("attempting to draw")
  ctx.fillStyle = 'cyan';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.save();
  // .restore(): Canvas 2D API restores the most recently saved canvas state
  ctx.restore();  
};

export function drawCharacters(ctx, character){
    ctx.fillStyle = 'red';
    ctx.fillRect(character.x, character.y, character.width, character.height);
    ctx.save();
}

export function useCanvas(){
    const canvasRef = useRef(null);
    const [characters, setCharacters] = useState(null)

    useEffect(()=>{
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        // clear the canvas area before rendering the coordinates held in state
        ctx.clearRect( 0,0, canvasWidth, canvasHeight );
        // draw all coordinates held in state
        console.log(characters);
        drawCanvas(ctx)
        if(characters !== null){
            drawCharacters(ctx, characters);
        }    
    }, [canvasRef]);

    return [characters, setCharacters, canvasRef, canvasWidth, canvasHeight ];
}