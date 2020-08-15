export class Sphere {
    constructor(radius, x, y){
        this.radius = radius;
        this.x = x;
        this.y = y;
    }

    drawSphere = (ctx) => {
    ctx.beginPath();
      ctx.arc(this.x, this.y,this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#42c5f5';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#2f9cc4';
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
        ctx.fillStyle = 'grey';
        ctx.fillRect(this.x, this.y, 40, 40);
    }

    refillContainer = (ctx) => {

    }

}