export const drawPlatform = (ctx, resource, modeDevelop) => {
    ctx.fillStyle = resource.color;
    ctx.fillRect(resource.x, resource.y, resource.width, resource.height);
    if(modeDevelop){
        ctx.fillStyle = 'orange';
        ctx.font = 'bold 12px serif';
        ctx.fillText(`ID: ${resource.id}`, resource.x + 10, resource.y + 15);
    }
}