// DO NOT USE THIS ONE

class General {
    constructor(name, x, y, width, height, sprite, color, direction, deployX, deployY) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.color = color;
        this.alive = true;
        this.direction = direction;
        this.deployX = deployX;
        this.deployY = deployY;
        this.powerJump = 5;
        this.jumped = 0;
        this.modeWarrior = false;
        this.onFloor = false;
        this.kills = 0;
    }

    touchingCheck(obj){

        if(!obj.type){
            if(this.modeWarrior){
                console.log("PLAYER TOUCHED")
                return this.attack(obj);
            }else if(obj.modeWarrior === true){
                this.receiveDamage();
            }
        }
        return false;
    }
    
    checkCollision = (obj) => {
        // RIGHT
        if( ( this.x + this.width + 2 > obj.x) && this.x < obj.x && (this.y + this.height > obj.y) && (this.y < obj.y + obj.height) && this.direction === 'RIGHT'){
            return this.touchingCheck(obj);
        //LEFT
        }else if( (this.x < obj.x + obj.width + 2) && this.x > obj.x && (this.y + this.height > obj.y + 8) && (this.y < obj.y + obj.height) && this.direction === 'LEFT'){
            return this.touchingCheck(obj);
        //UP
        }else if( (this.y < obj.y + obj.height + 12) && this.y > obj.y && (this.x + this.width > obj.x + 4) && (this.x < obj.x + obj.width) && this.direction === 'UP'){
            return this.touchingCheck(obj);
        //BOTTOM
        }else if((this.y + this.height + 2 > obj.y) && (this.x > obj.x) && (this.y < obj.y) && (this.x + this.width < obj.x + obj.width) && this.direction === 'DOWN'){
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
        setTimeout(() => {
            this.x = this.deployX;
            this.y = this.deployY;
            this.alive = true;
        }, 2500)
    }

    
    attack = (otherPlayer) => {
        if(!otherPlayer.alive){
            return false;
        }
        if(!otherPlayer.modeWarrior){
            otherPlayer.receiveDamage();
        }else if(otherPlayer.modeWarrior){
            if(otherPlayer.direction !== this.direction){
                return true;
            }else{
                otherPlayer.receiveDamage();
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

    grab(){

    }

    fly(){
        if(this.modeWarrior){

        } 
    }
}

export class Angel extends Basic {
    constructor(name, x, y, width, height, sprite, deployX, deployY, modeWarrior) {
        super(name,x, y, width, height, sprite, modeWarrior);
        this.deployX = deployX;
        this.deployY = deployY;
        this.modeWarrior = false;
        this.color = 'blue';
    }

}

export class Demon extends Basic {
    constructor(name, x, y, width, height, sprite, deployX, deployY, modeWarrior) {
        super(name,x, y, width, height, sprite, modeWarrior);
        this.deployX = deployX;
        this.deployY = deployY;
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