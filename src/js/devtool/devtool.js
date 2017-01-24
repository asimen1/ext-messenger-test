console.log('DEVTOOL');

import Messenger from 'chrome-ext-messenger';

let messenger = new Messenger();

let messageHandler = function(message, sender, sendResponse) {
    console.log('devtools got message', arguments);
};

messenger.initConnection('devtool', 'main', messageHandler);

// ----------------------
window.dtM = messenger;