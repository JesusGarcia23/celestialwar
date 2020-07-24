const { createContext } = require("react");

class General {
    constructor(name, x, y,width, height, sprite, health, alive) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.health = health;
        this.alive = alive;
    }

    
    collision(space){

    }
    
    receiveDamage(damage){
        this.health -= damage;
    }

    drawCharacter = function(){
        const characterSprite = new Image();
        characterSprite.src = this.sprite;
        createContext.drawImage(characterSprite, this.x, this.y, this.width, this.height)
    }

}

class Basic extends General {
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