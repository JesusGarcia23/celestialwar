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
        this.side = '';
        this.sphereGrabbed = false;
        this.sphereInserted = false;
        this.direction = direction;
        this.deployX = deployX;
        this.deployY = deployY;
        this.modeWarrior = false;
        this.king = false;
        this.jumped = false;
        this.powerJump = 20;
        this.totalJumped = 0;
        this.onFloor = false;
        this.kills = 0;
    }

    touchingCheck(obj){

        // CHECK TOUCHING OTHER PLAYERS
        if(!obj.type){
            if(this.modeWarrior){
                return this.attack(obj);
            }else if(obj.modeWarrior === true){
                this.receiveDamage();
            }
        }
        // CHECK FOR WARRIOR PEDESTALS
        if(obj.type === 'warrior-pedestal'){
            return false;
        }
        return true;
    }

    sphereCollision(circle){
            let distX = Math.abs(circle.x - this.x - this.width / 2);
            let distY = Math.abs(circle.y - this.y - this.height / 2);
    
            if (distX > (this.width / 2 + circle.radius)) { return false; }
            if (distY - 10 > (this.height / 2 + circle.radius)) { return false; }
        
            if (distX <= (this.width / 2 )) { return true; } 
            if (distY <= (this.height /2 )) { return true; }
        
            let dx= distX - this.width / 2;
            let dy= distY - this.height / 2;
            return ( dx*dx+dy*dy <= (circle.radius*circle.radius));
    }
    
    checkCollision = (obj) => {
        if(obj.radius !== null && obj.type === 'sphere'){
            let touched = this.sphereCollision(obj);
            if(touched && !this.sphereGrabbed && !this.modeWarrior && !obj.hide){
                obj.beGrabbed(this.name);
                this.sphereGrabbed = true;
            }

        }
        
        // RIGHT
        if( ( this.x + this.width + 2 > obj.x) && this.x < obj.x && (this.y + this.height > obj.y) && (this.y < obj.y + obj.height) && this.direction === 'RIGHT'){
            return this.touchingCheck(obj);
        }// LEFT
        else if( (this.x < obj.x + obj.width + 2) && this.x > obj.x && (this.y + this.height > obj.y + 8) && (this.y < obj.y + obj.height) && this.direction === 'LEFT'){
            return this.touchingCheck(obj);
        }// UP      
        else if( (this.y - 7 < obj.y + obj.height + 7) && (this.x + this.width > obj.x + 4) && (this.x < obj.x + obj.width) && this.direction === 'UP'){
            return this.touchingCheck(obj);
        }// BOTTOM
        else if((this.y + this.height + 2 > obj.y) && (this.x > obj.x) && (this.y < obj.y) && (this.x + this.width < obj.x + obj.width) && this.direction === 'DOWN'){
            return this.touchingCheck(obj);
        }
        return false;
    }

    hitTop = (obj) => {
        if( (this.y - 7 < obj.y + obj.height + 7) && (this.x + this.width > obj.x + 4) && (this.x < obj.x + obj.width) && (this.y > obj.y)){
            return true;
        }
        return false;
    }

    hitBottom = (obj) => {
        if(obj.type === 'warrior-pedestal'){
            return false;
        }
        
         if((this.y + this.height + 4 > obj.y) && (this.x + 5 > obj.x) && (this.y < obj.y) && ( (this.x + this.width - 5) < obj.x + obj.width )){
            this.onFloor = true;
            this.totalJumped = 0;
            return true;
        }else{
            this.onFloor = false;
        }
        return false;
    }

    checkPedestal = (obj) => {
        if( ( this.x + this.width + 2 > obj.x) && this.x < obj.x && (this.y + this.height > obj.y) && (this.y < obj.y + obj.height)){
            return {touched: true, obj};
        }// LEFT
        else if( (this.x < obj.x + obj.width + 2) && this.x > obj.x && (this.y + this.height > obj.y + 8) && (this.y < obj.y + obj.height)){
            return {touched: true, obj};
        }
        return {touched: false, obj};
    }

    receiveDamage = () => {
        this.alive = false;
        this.modeWarrior = false;
        this.sphereGrabbed = false;
        setTimeout(() => {
            this.x = this.deployX;
            this.y = this.deployY;
            this.alive = true;
        }, 2500)
    };

    
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
    };

    drawCharacter = (ctx) => {
        ctx.fillStyle = !this.modeWarrior ? this.color : (!this.king ? 'purple' : 'yellow');
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // const characterSprite = new Image();
        // characterSprite.src = this.sprite;
        // createContext.drawImage(characterSprite, this.x, this.y, this.width, this.height)
    };


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
    constructor(name, x, y, width, height, sprite, direction, deployX, deployY) {
        super(name,x, y, width, height, sprite, direction);
        this.jumped = false;
        this.side = 'Angel';
        this.deployX = deployX;
        this.deployY = deployY;
        this.color = 'blue';
    }

}

export class Demon extends Basic {
    constructor(name, x, y, width, height, sprite, direction, deployX, deployY, modeWarrior) {
        super(name,x, y, width, height, sprite,direction, modeWarrior);
        this.jumped = false;
        this.side = 'Demon';
        this.direction = direction;
        this.deployX = deployX;
        this.deployY = deployY;
        this.modeWarrior = true;
        this.color = 'red';
    }
}

export class King extends General {
    constructor(name, x, y, width, height, sprite, direction, deployX, deployY){
        super(name, x, y, width, height, sprite, direction, deployX, deployY);
        this.modeWarrior = true;
        this.color = "yellow";
        this.king = true;
    }
}