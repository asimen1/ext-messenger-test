console.log('SERVICE_WORKER');

import Messenger from 'ext-messenger';
import helper from '../common/helper.js';

helper.init();

let messenger = new Messenger(Messenger.EXT_PARTS.BACKGROUND);
self.messenger = messenger;

var latestTabId;
chrome.tabs.onCreated.addListener(function(tab) {
	console.log('--- TAB CREATED: ---', tab, tab.id);
    latestTabId = tab.id;
});

function setup() {
    chrome.runtime.onConnect.addListener(function(port) {
        console.log('chrome.runtime.onConnect - is messenger port?', Messenger.isMessengerPort(port));
    });

    let connectedHandler  = function(extensionPart, port, tabId) {
        console.log('--- CONNECTED PORT: ---', arguments);
    };

    let disconnectedHandler  = function(extensionPart, port, tabId) {
        console.log('--- DISCONNECTED PORT: ---', arguments);
    };

    let initBackgroundHub = function() {
        messenger.initBackgroundHub({
            connectedHandler,
            disconnectedHandler,
        });
    };

    //self.setTimeout(initBackgroundHub, 10000);
    initBackgroundHub();
}

setup();
helper.initConnections('background', messenger);

self.runTests = async function(tabId) {
    tabId = tabId || latestTabId;

    await helper.runTests('background', 'background');

    if (tabId) {
        await helper.runTests('background', 'content_script', tabId);
        await helper.runTests('background', 'popup', tabId);
        await helper.runTests('background', 'devtool', tabId);
    } else {
        console.log('Skipping additional tests since no tab id yet, please open a tab with a real website (e.g. bing.com)');
    }
};