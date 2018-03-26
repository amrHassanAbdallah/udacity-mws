/**
 * setting the service worker
 */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function (reg) {
        console.log('Service worker registered.');

        if (!navigator.serviceWorker.controller) {
            return;
        }

        if (reg.waiting) {
            navigator.serviceWorker.controller.postMessage({action: 'skipWaiting'});
        }

        if (reg.installing) {
            navigator.serviceWorker.addEventListener('statechange', function () {
                if (navigator.serviceWorker.controller.state == 'installed') {
                    navigator.serviceWorker.controller.postMessage({action: 'skipWaiting'});
                }
            });
        }

        reg.addEventListener('updatefound', function () {
            navigator.serviceWorker.addEventListener('statechange', function () {
                if (navigator.serviceWorker.controller.state == 'installed') {
                    navigator.serviceWorker.controller.postMessage({action: 'skipWaiting'});
                }
            });
        });

    }).catch(function () {
        console.log('Service worker registration failed');
    });
} else {
    console.log('Service workers are not supported.');
}

/**
 * Setting the images for different window sizes
 */
setImagesForDifferentWindowSizes = (pictureTag, orignalImageUrl, pageName = 'home') => {
    const availableWidthsForHome = ['-320x240_small'];
    const homeMediaWidth = ['(min-width: 460px)'];
    const availableWidthsForRestaurant = ['-800_large_1x', '-640_medium', '-320x240_small'];
    const restaurantMediaWidths = ['(min-width: 1600px)', '(min-width: 850px)', '(min-width: 460px)'];
    let availableWidths = pageName === 'home' ? availableWidthsForHome : availableWidthsForRestaurant;
    let pageMediaWidths = pageName === 'home' ? homeMediaWidth : restaurantMediaWidths;
    const imageExten = '.jpg';
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