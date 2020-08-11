
import { Resource } from '../Resource';
import { resizeDimension , resizeCoor } from '../../utils/resizer';
// SIZES: 
// - platforms 3% of Canvas height

// Resource CLass = (canvas, name, id, width, height, x, y, color, xPreference, yPreference)

export const generatePlatforms = (canvas, listOfPlatforms) => {
    return listOfPlatforms.map(platform => {
       return new Resource(canvas, platform.name, platform.type, platform.id, 
        resizeDimension(platform.width, canvas.width), resizeDimension(platform.height, canvas.height), resizeCoor(platform.x, canvas.width), resizeCoor(platform.y, canvas.height), platform.color, platform.xPreference, platform.yPreference);
    })
}

// export const generateSpheres = (listOfSpheres) => {
//     return generate
// }

export const levelCreator = (canvas, listPlatforms) => {
    return generatePlatforms(canvas, listPlatforms);
}