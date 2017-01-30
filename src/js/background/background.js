console.log('BACKGROUND');

import Messenger from 'chrome-ext-messenger';
let messenger = new Messenger();
window.m = messenger;

messenger.initBackgroundHub();

let messageHandler = function(message, sender, sendResponse) {
    console.log('background got message:', arguments);
    sendResponse('I AM RESPONSE FROM BACKGROUND');
};

window.c = messenger.initConnection('main', messageHandler);

// let messageHandler2 = function(message, sender, sendResponse) {
//     console.log('background 2 got message:', arguments);
//     sendResponse('I AM RESPONSE FROM BACKGROUND 2');
// };

// window.c2 = messenger.initConnection('main2', messageHandler2);

window.runTests = function() {
    //...
};