// DO NOT USE THIS ONE

class General {
    constructor(name, x, y, width, height, sprite, color, direction) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.color = color;
        this.alive = true;
        this.direction = direction;
        this.powerJump = 5;
        this.jumped = 0;
        this.modeWarrior = false;
        this.onFloor = false;
    }

    touchingCheck(obj){
        console.log(obj);

        if(!obj.type){
            if(this.modeWarrior){
                console.log("PLAYER TOUCHED")
                return this.attack(obj);
            }
        }
        return true;
    }
    
    checkCollision = (obj) => {
        // RIGHT
        if(( this.x + this.width + 2 > obj.x) && this.x < obj.x && (this.y + this.height > obj.y) && (this.y < obj.y + obj.height) && this.direction === 'RIGHT'){
            console.log("character Y position: ", this.y, ", Height: ", this.height, ", X Position: ", this.x, ", Width: ", this.width);
            console.log("Object: ", obj.name, " TOUCHED: Y position: ", obj.y, ", Height: ", obj.height, ", X Position: ", obj.x, ", Width: ", obj.width);
            console.log("TOUCHED RIGHT")
            return this.touchingCheck(obj);
        //LEFT
        }else if( (this.x < obj.x + obj.width + 2) && this.x > obj.x && (this.y + this.height > obj.y + 8) && (this.y < obj.y + obj.height) && this.direction === 'LEFT'){
            console.log("character Y position: ", this.y, ", Height: ", this.height, ", X Position: ", this.x, ", Width: ", this.width);
            console.log("Object: ", obj.name, " TOUCHED: Y position: ", obj.y, ", Height: ", obj.height, ", X Position: ", obj.x, ", Width: ", obj.width);
            console.log("TOUCHED LEFT")
            return this.touchingCheck(obj);
        //UP
        }else if( (this.y < obj.y + obj.height + 12) && this.y > obj.y && (this.x + this.width > obj.x + 4) && (this.x < obj.x + obj.width) && this.direction === 'UP'){
            console.log("TOUCHED UP")
            return this.touchingCheck(obj);
        //BOTTOM
        }else if((this.y + this.height + 2 > obj.y) && (this.x > obj.x) && (this.y < obj.y) && (this.x + this.width < obj.x + obj.width) && this.direction === 'DOWN'){
            console.log("character Y position: ", this.y, ", Height: ", this.height, ", X Position: ", this.x, ", Width: ", this.width);
            console.log("Object: ", obj.name, " TOUCHED: Y position: ", obj.y, ", Height: ", obj.height, ", X Position: ", obj.x, ", Width: ", obj.width);
            return this.touchingCheck(obj);
        }
        
        return false;
    }

    hitBottom = (obj) => {
         if((this.y + this.height + 2 > obj.y) && (this.x > obj.x) && (this.y < obj.y) && (this.x + this.width < obj.x + obj.width)){
            this.jumped = 0;
            this.onFloor = true;
            return true;
        }else{
            this.onFloor = false;
        }
        return false;
    }

    receiveDamage = () => {
        this.alive = false;
    }

    
    attack = (otherPlayer) => {
        if(!otherPlayer.alive){
            return false;
        }
        if(!otherPlayer.modeWarrior){
            otherPlayer.alive = false;
        }else if(otherPlayer.modeWarrior){
            if(otherPlayer.direction !== this.direction){
                return true;
            }else{
                otherPlayer.alive = false;
            }
        } 
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
            case 'j':
                this.y = this.y - 5;
                break;    
            default:
                return;
        }
    }

    grab(){

    }

    fly(){
        if(this.modeWarrior){

        } 
    }
}

export class Angel extends Basic {
    constructor(name, x, y, width, height, sprite, alive, modeWarrior) {
        super(name,x, y, width, height, sprite, alive, modeWarrior);
        this.modeWarrior = true;
        this.color = 'blue';
    }

}

export class Demon extends Basic {
    constructor(name, x, y, width, height, sprite, alive, modeWarrior) {
        super(name,x, y, width, height, sprite, alive, modeWarrior);
        this.modeWarrior = true;
        this.color = 'red';
    }
}

export class King extends General {
    attack(){
        return 1;
    }

    fly(){
        
    }
}