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

export const drawPlayers = (ctx, player, canvas) => {
        ctx.fillStyle = !player.modeWarrior ? player.color : (!player.king ? 'purple' : 'yellow');
        ctx.fillRect(resizeCoor(player.x, canvas.width), resizeCoor( player.y, canvas.height), 
        resizeDimension(player.width, canvas.width),resizeDimension( player.height, canvas.height));

        ctx.fillStyle = 'orange';
        ctx.font = 'bold 12px serif';
        ctx.fillText(`${player.name}`, resizeCoor(player.x + 0.6, canvas.width), resizeCoor(player.y - 0.5, canvas.height));
        ctx.textAlign = "center";
}

export const drawPlatform = (ctx, resource, canvas, modeDevelop) => {

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

export const drawWarriorPedestal = (ctx, resource, canvas, modeDevelop) => {

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

export const drawSphereCollector = (ctx, resource, canvas, modeDevelop) => {

    ctx.fillStyle = resource.side === "Demon" ? "#753040" : "#326996";
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

export const drawSphereCollectorSocket = (ctx, resource, canvas) => {

    ctx.beginPath();
    ctx.arc(resizeCoor(resource.x, canvas.width), resizeCoor(resource.y, canvas.height), resizeRadius(resource.radius, canvas), 0, Math.PI * 2);
    ctx.fillStyle = resource.color;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = resource.color;
    ctx.stroke();
}