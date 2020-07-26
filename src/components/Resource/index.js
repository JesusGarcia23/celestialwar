export class Resource {
    constructor(canvas, name, id, width, height, x, y, color, xPreference, yPreference){
        this.canvas = canvas;
        this.name = name;
        this.id = id;
        this.width = width;
        this.height = height;
        this.x = this.setPosition(x, width, canvas.width, xPreference);
        this.y = this.setPosition(y, height, canvas.height, yPreference);
        this.color = color;
        this.xPreference = xPreference;
        this.yPreference = yPreference;
    }

    setPosition(position, objectDimension, canvasDimension, fixedPosition){
        console.log(objectDimension);
        switch(fixedPosition){
            case 'center': {
                console.log(objectDimension)
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

    drawObject = (ctx) => {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}