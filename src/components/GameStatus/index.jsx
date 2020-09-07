export class GameStatus {
    constructor() {
        this.archangelDeath = 0;
        this.demonDeath = 0;
        this.angelSpheresCollected = 0;
        this.demonSpheresCollected = 0;
    }


    checkStatus = () => {
        if(this.angelSpheresCollected === 13) {
            console.log("ANGELS WIN")
        } else if(this.demonSpheresCollected === 13) {
            console.log("DEMONS WIN")
        } else if(this.demonDeath === 3) {
            console.log("ANGELS WIN")
        } else if(this.archangelDeath === 3) {
            console.log("DEMONS WIN")
        }
    }
}