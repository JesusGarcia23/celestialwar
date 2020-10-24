import { resizeDimension, resizeCoor, resizeRadius } from '../utils/resizer';

const setPosition = (position, objectDimension, canvasDimension, fixedPosition) => {
    switch(fixedPosition){
        case 'center': {
            return (canvasDimension / 2) - (objectDimension / 2);
        }
        case 'start': {
            return 0;
        }
        case 'end': {
            return (canvasDimension - objectDimension);
        }
        default: 
        return position;
    }   
}

export const drawPlatform = (ctx, resource, canvas, modeDevelop) => {
    console.log(canvas)
    ctx.fillStyle = resource.color;
    ctx.fillRect(
        setPosition(resizeCoor(resource.x, canvas.width), resizeDimension(resource.width, canvas.width), canvas.width, resource.xPreference),
        setPosition(resizeCoor(resource.y, canvas.height), resizeDimension(resource.height, canvas.height), canvas.height, resource.yPreference),  
        resizeDimension(resource.width, canvas.width), 
        resizeDimension(resource.height, canvas.height));
    if(modeDevelop){
        ctx.fillStyle = 'orange';
        ctx.font = 'bold 12px serif';
        ctx.fillText(`ID: ${resource.id}`, resource.x + 10, resource.y + 15);
    }
}