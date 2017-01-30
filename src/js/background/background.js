console.log('BACKGROUND');

import Messenger from 'chrome-ext-messenger';
let messenger = new Messenger();
window.m = messenger;

messenger.initBackgroundHub();

window.runTests = function() {
    //...
};