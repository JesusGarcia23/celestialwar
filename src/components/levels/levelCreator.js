
import { Resource } from '../Resource';
import { WarriorPedestal } from '../WarriorPedestal';
import { Sphere, SphereContainer } from '../Sphere';
import { SphereCollector, SphereCollectorSocket } from '../SphereCollector';
import { resizeDimension , resizeRadius, resizeCoor } from '../../utils/resizer';

// SIZES: 
// - platforms 3% of Canvas height

// Resource CLass = (canvas, name, id, width, height, x, y, color, xPreference, yPreference)

export const generateResources = (canvas, listOfResources) => {
    return listOfResources.map((resource, index) => {
        switch(resource.type){
            case 'platform': {
                return new Resource(canvas, resource.name, resource.type, index + 1, 
                    resizeDimension(resource.width, canvas.width), resizeDimension(resource.height, canvas.height), resizeCoor(resource.x, canvas.width), resizeCoor(resource.y, canvas.height), resource.color, resource.xPreference, resource.yPreference);
            }
            case 'warrior-pedestal': {
                return new WarriorPedestal(resizeDimension(resource.width, canvas.width), resizeDimension(resource.height, canvas.height), resizeCoor(resource.x, canvas.width), resizeCoor(resource.y, canvas.height))
            }
            case 'sphere-generator': {
                return new SphereContainer(canvas, resource.name, resource.type, resizeCoor(resource.x, canvas.width), resizeCoor(resource.y, canvas.height));
            }
            case 'sphere-collector': {
                return new SphereCollector(resizeCoor(resource.x, canvas.width), resizeCoor(resource.y, canvas.height),resizeDimension(resource.width, canvas.width), resizeDimension(resource.height, canvas.height), resource.side)
            }
            case 'sphere-socket': {
                return new SphereCollectorSocket(resizeCoor(resource.x, canvas.width), resizeCoor(resource.y, canvas.height), resizeRadius(resource.radius, canvas), resource.side)
            }
            default: 
                return null;
        }
       })
}

export const generateSphere = (listOfSpheres) => {
    return new Sphere()
}

export const levelCreator = (canvas, resourcesList) => {
    return generateResources(canvas, resourcesList);
}