import {Resource} from '../../Resource';

// MIDDLE VALUE = canvas width/height divided by 2, minus half of width/height of item 

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

const generatePlatforms = (canvas, listOfPlatforms) => {
    console.log(listOfPlatforms);
    return listOfPlatforms.map(platform => {
       return new Resource(canvas, platform.name, platform.id, 
        resizeDimension(platform.width, canvas.width), resizeDimension(platform.height, canvas.height), resizeCoor(platform.x, canvas.width), resizeCoor(platform.y, canvas.height), platform.color, platform.xPreference, platform.yPreference);
    })
}

export const forest = (canvas) => {
    console.log(Resource)
   let listOfPlatforms = [
        {
            name: 'base',
            id: 1,
            width: 100,
            height: 10,
            x: 0,
            y: 20,
            color: 'brown',
            xPreference: 'center',
            yPreference: 'end'
        },
        {
            name: 'collector-base',
            id: 2,
            width: 30,
            height: 3,
            x: 0,
            y: 20,
            color: 'yellow',
            xPreference: 'center',
            yPreference: null
        },
    ]

    const genereratedList = generatePlatforms(canvas, listOfPlatforms)


    return genereratedList;
}