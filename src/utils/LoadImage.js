export default (callback, imageSrc) => {
    if (!imageSrc.length) return;

    let imageObj = new Image();

    imageObj.onload = (e) => {
        let image = e.composedPath()[0];

        callback(image, imageSrc);
    };

    imageObj.src = imageSrc;
}