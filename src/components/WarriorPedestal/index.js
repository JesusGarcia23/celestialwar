export class WarriorPedestal {
    constructor(width, height, x, y){
        this.width = width;
        this.height = height;
        this.type = 'warrior-pedestal';
        this.x = x;
        this.y = y;
        this.activated = false;
        this.side = null;
    }

    drawPedestal = (ctx) => {
        ctx.fillStyle = 'brown';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}