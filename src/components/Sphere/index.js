export class Sphere {
    constructor(radius, x, y){
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.hide = false;
        this.type = "sphere";
        this.color = "blue";
    }

    drawSphere = (ctx) => {
    ctx.beginPath();
      ctx.arc(this.x, this.y,this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
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