// import { Platform } from '../Platform';
// import { Resource } from '../Resource'

// export const createPlatform = (name, id, x, y, width, height, color) => {
//     console.log(`${name} has been created!`);
//     return new Resource(id, x, y, width, height, color);
// }

export const levelCreator = (listPlatforms) => {
    console.log(listPlatforms);
    // let platformsCreated = listPlatforms.map(platform => {
        // const {name, id, x, y, width, height, color} = platform
         // return createPlatform(name, id, x, y, width, height, color);
    //     return platform;
    // })
    return listPlatforms;
}