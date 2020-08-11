export class Sphere {
    constructor(canvas, radius, x, y, color){
        this.canvas = canvas;
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    drawSphere = (ctx) => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}