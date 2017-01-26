console.log('BACKGROUND');

import Messenger from 'chrome-ext-messenger';
let messenger = new Messenger();
window.m = messenger;

window.m.initBackgroundHub();

/*function messageHandler(message, sender, sendResponse) {
    console.log('background - messageHandler()', arguments);

    sendResponse();
}

let dtTabIds = [];
function devtoolConnectionInitHandler(port, tabId) {
    console.log('background - devtoolConnectionInitHandler()', arguments);
    dtTabIds.push(tabId);
}

function devtoolDisconnectHandler(disconnectedPort, tabId) {
    console.log('background - devtoolDisconnectHandler()', arguments);
}

let csTabIds = [];
function contentScriptConnectionInitHandler(port, tabId) {
    console.log('background - contentScriptConnectionInitHandler()', arguments);
    csTabIds.push(tabId);
}

messenger.initBackgroundHub(messageHandler, {
    devtoolConnectionInitHandler: devtoolConnectionInitHandler,
    devtoolDisconnectHandler: devtoolDisconnectHandler,
    contentScriptConnectionInitHandler: contentScriptConnectionInitHandler
});

// ----------------------
window.bgM = messenger;

window.bgM.sendHubMessage('content_script', 'main', dtTabIds[0], 'sent from hub to content_script-main', function() {
    console.log('i am callback - hub to content_script-main');
});

window.bgM.sendHubMessage('devtool', 'main', csTabIds[0], 'sent from hub to devtool-main', function() {
    console.log('i am callback - hub to devtool-main');
});*/