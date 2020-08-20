export class Sphere {
    constructor(radius, x, y, color){
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.hide = false;
        this.grabbedBy = '';
        this.type = "sphere";
        this.color = "blue";
    }

    drawSphere = (ctx, players) => {
  
    if(this.grabbedBy !== '' && players.length > 0) {
        console.log("TOUCHING")
        const ownerIndex = players.findIndex(player => player.name === this.grabbedBy)
        const owner = players[ownerIndex];
        if(owner.alive){
            this.x = owner.x;
            this.y = owner.y;
            this.color = 'transparent';
        }else{
            this.color = 'blue';
        }
    }
    ctx.beginPath();
      ctx.arc(this.x, this.y,this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }

    beGrabbed = (playerName) => {
        this.grabbedBy = playerName;
        this.hide = true;
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