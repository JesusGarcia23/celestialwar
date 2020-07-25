// DO NOT USE THIS ONE

class General {
    constructor(name, x, y, width, height, sprite, health, alive) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.health = health;
        this.alive = alive;
    }

    
    collision = (space) => {

    }
    
    receiveDamage = (damage) => {
        this.health -= damage;
    }

    drawCharacter = (ctx) => {
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // const characterSprite = new Image();
        // characterSprite.src = this.sprite;
        // createContext.drawImage(characterSprite, this.x, this.y, this.width, this.height)
    }

}

export class Basic extends General {
    
    move(key){
        console.log(this.name + ' MOVED!')
        switch(key.toLowerCase()){
            // RIGHT
            case 'd':
                this.x = this.x + 10;
                break;
            // LEFT 
            case 'a':
                this.x = this.x - 10;
                break;
            case 's':
                this.y = this.y + 10;
                break;
            case 'w':
                this.y = this.y - 10;
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

class King extends General {
    attack(){
        return 1;
    }

    fly(){
        
    }
}


class Angel extends Basic {

}

class AngelSoldier extends Soldier {

}

class Demon extends Basic {

}

class DemonSoldier extends Soldier {

}