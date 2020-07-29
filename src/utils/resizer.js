export const resizeDimension  = (objectDimension, canvasDimension) => {
    const transformedSize = canvasDimension * ((objectDimension / 100));
    return transformedSize
}

export const resizeCoor = (objectPosition, canvasDimension) => {
    const transformedCoordinate = canvasDimension * ((objectPosition / 100));
    return transformedCoordinate;
}