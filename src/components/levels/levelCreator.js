
import { Resource } from '../Resource';

// SIZES: 
// - platforms 3% of Canvas height

// Resource CLass = (canvas, name, id, width, height, x, y, color, xPreference, yPreference)

const resizeDimension  = (objectDimension, canvasDimension) => {
    const transformedSize = canvasDimension * ((objectDimension / 100));
    return transformedSize
}

const resizeCoor = (objectPosition, canvasDimension) => {
    const transformedCoordinate = canvasDimension * ((objectPosition / 100));
    return transformedCoordinate;
}

export const generatePlatforms = (canvas, listOfPlatforms) => {
    console.log(listOfPlatforms);
    return listOfPlatforms.map(platform => {
       return new Resource(canvas, platform.name, platform.id, 
        resizeDimension(platform.width, canvas.width), resizeDimension(platform.height, canvas.height), resizeCoor(platform.x, canvas.width), resizeCoor(platform.y, canvas.height), platform.color, platform.xPreference, platform.yPreference);
    })
}

export const levelCreator = (canvas, listPlatforms) => {

    return generatePlatforms(canvas, listPlatforms);
}