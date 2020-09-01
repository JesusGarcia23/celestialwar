export class SphereCollector {
    constructor(x, y, width, height, side){
        this.type = "sphere-collector";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "";
        this.side = side;
        this.quantity = 0;
    }


    drawSphereCollector = (ctx) => {
        ctx.fillStyle = this.side === "Angel" ? "purple" : "Orange";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}