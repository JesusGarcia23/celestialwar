import { listOfPlatforms } from './resources';
import { levelCreator } from '../levelCreator';

// MIDDLE VALUE = canvas width/height divided by 2, minus half of width/height of item 


export const forest = (canvas) => {

    return levelCreator(canvas, listOfPlatforms);
}