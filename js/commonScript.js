/**
 * setting the service worker
 */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function (reg) {
        console.log('Service worker registered.');
    }).catch(function () {
        console.log('Service worker registration failed');
    });
} else {
    console.log('Service workers are not supported.');
}

/**
 * Setting the images for different window sizes
 */
setImagesForDifferentWindowSizes = (pictureTag, orignalImageUrl, pageName = 'home', imageExten2 = '.webp') => {
    const availableWidthsForHome = ['-320x240_small'];
    const homeMediaWidth = ['(min-width: 460px)'];
    const availableWidthsForRestaurant = ['-800_large_1x', '-640_medium', '-320x240_small'];
    const restaurantMediaWidths = ['(min-width: 1600px)', '(min-width: 850px)', '(min-width: 460px)'];
    let availableWidths = pageName === 'home' ? availableWidthsForHome : availableWidthsForRestaurant;
    let pageMediaWidths = pageName === 'home' ? homeMediaWidth : restaurantMediaWidths;
    const imageExten = imageExten2;
    const imageName = (orignalImageUrl).split(imageExten);
    createSourceTags(pictureTag, imageName, imageExten, availableWidths, pageMediaWidths);

};

/**
 * creating multiple source tag , filling them with data then append them
 */
createSourceTags = (pictureTag, imageName, imageExten, availableWidths = [], pageMediaWidths) => {
    if (pictureTag && imageName && availableWidths.length === pageMediaWidths.length) {
        for (let i = 0; i < availableWidths.length; i++) {
            let source = document.createElement('source');
            source.media = pageMediaWidths[i];
            source.srcset = imageName[0] + availableWidths[i] + imageExten;
            pictureTag.append(source);
        }
    }

};

/**
 * setting up image alt
 */
setImageAlt = (ImageTag, restaurantName) => {
    ImageTag.alt = `${restaurantName} restaurant's photo `;
};

/**
 * setting up image location
 */
function setImageLocation(locationDB) {
    return (locationDB != '/img/undefined') ? locationDB : '/img/default';
}

/**
 * setting up image src
 */
function setImageSrc(image, location) {
    image.src = location + '-640_medium.webp';
}

/**
 loading page resource
 */
loadScriptAssets = (assetsUrls = []) => {
    const body = document.getElementsByTagName("BODY")[0];

    for (let i = 0; i < assetsUrls.length; i++) {
        let tag = document.createElement("script");
        tag.src = assetsUrls[i];
        tag.type = "application/javascript";
        tag.charset = "utf-8";
        body.appendChild(tag);
    }
};

loadStyleAssets = (assetsUrls) => {
    const head = document.getElementsByTagName('head')[0];
    for (let i = 0; i < assetsUrls.length; i++) {
        let tag = document.createElement("link");
        tag.href = assetsUrls[i];
        tag.rel = 'stylesheet';
        tag.type = 'text/css';
        tag.media = 'all';
        head.appendChild(tag);
    }
};