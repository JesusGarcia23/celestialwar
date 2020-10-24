import { Angel, Demon, King } from '../Character';
import { resizeDimension, resizeCoor } from '../../utils/resizer';

export const generatePlayer = (canvas, listOfPlayers) => {

    return listOfPlayers.map(player => {
        switch(player.type){
            case "Angel": {
                return new Angel(player.name, resizeCoor(player.x, canvas.width), resizeCoor(player.y, canvas.height), resizeDimension(player.width, canvas.width), resizeDimension(player.height, canvas.height), player.sprite, player.direction, player.deployX, player.deployY);
            }
            case "Demon": {
                return new Demon(player.name, resizeCoor(player.x, canvas.width), resizeCoor(player.y, canvas.height), resizeDimension(player.width, canvas.width), resizeDimension(player.height, canvas.height), player.sprite, player.direction, player.deployX, player.deployY);
            }
            case "Archangel": {
                return new King(player.name, resizeCoor(player.x, canvas.width), resizeCoor(player.y, canvas.height), resizeDimension(player.width, canvas.width), resizeDimension(player.height, canvas.height), player.sprite, player.direction, player.deployX, player.deployY);
            }
            default: 
                break;
        }
    })
}

export const playersCreator = (canvas, listOfPlayers) => {
    
    return generatePlayer(canvas, listOfPlayers)
}