export const resizeDimension  = (objectDimension, canvasDimension) => {
    const transformedSize = canvasDimension * ((objectDimension / 100));
    return transformedSize
}

export const resizeRadius = (objectRadius, canvasDimension) => {
    var radiusX = canvasDimension.width * ((objectRadius / 100)); // set horizontal radius to be atleast as wide as width of div
    var radiusY = canvasDimension.height * ((objectRadius / 100)); // set vertical radius to be atleast as high as height of div
    return Math.min(radiusX, radiusY);
}

export const resizeCoor = (objectPosition, canvasDimension) => {
    const transformedCoordinate = canvasDimension * ((objectPosition / 100));
    return transformedCoordinate;
}