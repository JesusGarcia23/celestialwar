// DO NOT USE THIS ONE

class General {
    constructor(name, x, y, width, height, sprite, color, alive) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.color = color;
        this.alive = alive;
    }

    
    checkCollision = (obj) => {
        console.log("character Y position: ", this.y)
        console.log("character Y position + height: ", this.y + this.height);
        console.log(`object ${obj.name} Y position: `, obj.y);
        if(this.x + this.width + 2 > obj.x && this.x < obj.x && this.y + this.height > obj.y &&  this.y < obj.y + obj.height){
            console.log("TOUCHED RIGHT")
            return true;
        //LEFT
        }else if(this.x < obj.x + obj.width + 2 && this.x > obj.x && this.y + this.height > obj.y && this.y < obj.y + obj.height){
            console.log("TOUCHED LEFT")
            return true;
        //UP
        }else if(this.y < obj.y + obj.height + 2 && this.y > obj.y && this.x + this.width > obj.x && this.x < obj.x + obj.width){
            console.log("TOUCHED UP")
            return true;
        //BOTTOM
        }else if(this.y + this.height + 2 > obj.y && this.y < obj.y && this.x + this.width > obj.x && this.x < obj.x + obj.width){
            console.log("TOUCHED BOTTOM")
            return true;
        }
        return false;
    }
    
    receiveDamage = (damage) => {
        this.health -= damage;
    }

    drawCharacter = (ctx) => {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // const characterSprite = new Image();
        // characterSprite.src = this.sprite;
        // createContext.drawImage(characterSprite, this.x, this.y, this.width, this.height)
    }

}

class Basic extends General {
    move(key){
        console.log(this.name + ' MOVED!')
        switch(key.toLowerCase()){
            // RIGHT
            case 'd':
                this.x = this.x + 5;
                break;
            // LEFT 
            case 'a':
                this.x = this.x - 5;
                break;
            case 's':
                this.y = this.y + 5;
                break;
            case 'w':
                this.y = this.y - 5;
                break;    
            default:
                return;
        }
    }

    grab(){

    }

    jump(){

    }
}

class Soldier extends General {

    attack(){
        return 1;
    }

    fly(){

    }
}

export class King extends General {
    attack(){
        return 1;
    }

    fly(){
        
    }
}


export class Angel extends Basic {
    constructor(name, x, y, width, height, sprite, color, alive) {
        super(name,x, y, width, height, sprite, alive);
        this.color = 'blue';
    }

}

export class AngelSoldier extends Soldier {

}

export class Demon extends Basic {
    constructor(name, x, y, width, height, sprite, color, alive) {
        super(name,x, y, width, height, sprite, alive);
        this.color = 'red';
    }
}

export class DemonSoldier extends Soldier {

}