
import { Resource } from '../Resource';
import { Sphere, SphereContainer } from '../Sphere';
import { resizeDimension , resizeCoor } from '../../utils/resizer';

// SIZES: 
// - platforms 3% of Canvas height

// Resource CLass = (canvas, name, id, width, height, x, y, color, xPreference, yPreference)

export const generatePlatforms = (canvas, listOfResources) => {
    return listOfResources.map(resource => {
        switch(resource.type){
            case 'platform': {
                return new Resource(canvas, resource.name, resource.type, resource.id, 
                    resizeDimension(resource.width, canvas.width), resizeDimension(resource.height, canvas.height), resizeCoor(resource.x, canvas.width), resizeCoor(resource.y, canvas.height), resource.color, resource.xPreference, resource.yPreference);
            }
            case 'sphere-generator': {
                return new SphereContainer(canvas, resource.name, resource.type, resizeCoor(resource.x, canvas.width), resizeCoor(resource.y, canvas.height));
            }
            default: 
                return null;
        }
       })
}

export const generateSphere = (listOfSpheres) => {
    return new Sphere()
}

export const levelCreator = (canvas, listPlatforms) => {
    return generatePlatforms(canvas, listPlatforms);
}