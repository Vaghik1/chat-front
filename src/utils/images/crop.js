export function getCroppedImg(image, crop, fileName) {
    console.log(image.naturalWidth, image.width);
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
    );

    // As Base64 string
    return canvas.toDataURL('image/jpeg');

    // As a blob
    // return new Promise((resolve, reject) => {
    //     canvas.toBlob(blob => {
    //         blob.name = fileName;
    //         resolve(blob);
    //     }, 'image/jpeg', 1);
    // });
}