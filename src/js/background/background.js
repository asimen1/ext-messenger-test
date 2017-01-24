console.log('BACKGROUND');

import Messenger from 'chrome-ext-messenger';

let messenger = new Messenger();

function messageHandler(message, sender, sendResponse) {
    console.log('background - messageHandler()', arguments);
}

function devtoolConnectionInitHandler(port, tabId) {
    console.log('background - devtoolConnectionInitHandler()', arguments);
}

function devtoolDisconnectHandler(disconnectedPort, tabId) {
    console.log('background - devtoolDisconnectHandler()', arguments);
}

messenger.initBackgroundHub(messageHandler, {
    devtoolConnectionInitHandler: devtoolConnectionInitHandler,
    devtoolDisconnectHandler: devtoolDisconnectHandler
});

// ----------------------
window.bgM = messenger;