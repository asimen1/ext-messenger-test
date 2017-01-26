console.log('DEVTOOL');

import Messenger from 'chrome-ext-messenger';
let messenger = new Messenger();
window.m = messenger;

/*let messageHandler = function(message, sender, sendResponse) {
    console.log('devtools got message', arguments);

    sendResponse();
};

messenger.initConnection('devtool', 'main', messageHandler);

// ----------------------
window.dtM = messenger;

window.dtM.sendMessage('content_script', 'main', 'sent from devtool-main to content_script-main', function() {
    console.log('i am callback - devtool-main to content_script-main');
});

window.dtM.sendMessageToHub('sent from devtool-main to hub', function() {
    console.log('i am callback - devtool-main to hub');
});*/