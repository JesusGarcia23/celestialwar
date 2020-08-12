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

export class SphereContainer {
    constructor(canvas, name, type, x, y){
        this.canvas = canvas;
        this.name = name;
        this.type = type;
        this.x = x;
        this.y = y;
        this.counter = 6;
    }

    drawContainer = (ctx) => {
        ctx.fillStyle = 'purple';
        ctx.fillRect(this.x, this.y, 40, 40);
    }

    refillContainer = (ctx) => {

    }

}