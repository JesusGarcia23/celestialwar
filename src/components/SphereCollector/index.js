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
        this.sockets = [{x: 40, y:45, radius: 5}];
    }


    drawSphereCollector = (ctx) => {
        ctx.fillStyle = this.side === "Angel" ? "purple" : "Orange";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // this.generateSockets(ctx)
    }

    generateSockets = (ctx) => {
  
        if(this.sockets.length > 0) {
            this.sockets.map(socket => {
                ctx.beginPath();
                ctx.arc(this.x + socket.x, this.y + socket.y, socket.radius, 0, Math.PI * 2);
                ctx.fillStyle = "lightgray";
                ctx.fill();
                ctx.lineWidth = 3;
                ctx.strokeStyle = "lightgray";
                ctx.stroke();
            })
        }
    }
}

export class SphereCollectorSocket {
    constructor(x, y, radius, side){
        this.type = "sphere-socket";
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.side = side;
        this.color = "darkgray"
    }

    drawSphereCollectorSocket = (ctx) => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}