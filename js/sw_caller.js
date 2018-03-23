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

