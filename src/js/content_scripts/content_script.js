console.log('CONTENT_SCRIPT');

import Messenger from 'chrome-ext-messenger';

let messenger = new Messenger();

let isTopPage;
try {
    isTopPage = window.self === window.top;
} catch (e) {
    isTopPage = false;
}


let messageHandler = function(message, sender, sendResponse) {
    console.log('content_script messageHandler()', arguments);

    // Messages that only the top page should handle (not iframes).
    if (isTopPage) {

    }
};

messenger.initConnection('content_script', 'main', messageHandler);

// Passing through the background page because devtool window might be closed
// and we won't know because no response will be sent.
/*messenger.sendMessageToHub({ name: Messages.GET_CURRENT_STATE }, function(response) {
    console.log('content_script getCurrentState response', arguments);
});*/

// ----------------------
window.csM = messenger;