import { Angel, Demon } from '../Character';
import { resizeDimension, resizeCoor } from '../../utils/resizer';

export const generatePlayer = (canvas, listOfPlayers) => {
    console.log(listOfPlayers);
    return listOfPlayers.map(player => {
        console.log(player);
        switch(player.type){
            case "Angel": {
                return new Angel(player.name, resizeCoor(player.x, canvas.width), resizeCoor(player.y, canvas.height), resizeDimension(player.width, canvas.width), resizeDimension(player.height, canvas.height), player.sprite, player.deployX, player.deployY);
            }
            case "Demon": {
                return new Demon(player.name, resizeCoor(player.x, canvas.width), resizeCoor(player.y, canvas.height), resizeDimension(player.width, canvas.width), resizeDimension(player.height, canvas.height), player.sprite, player.deployX, player.deployY);
            }
            default: 
                break;
        }
    })
}

export const playersCreator = (canvas, listOfPlayers) => {
    
    return generatePlayer(canvas, listOfPlayers)
}