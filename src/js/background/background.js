console.log('BACKGROUND');

import Messenger from 'chrome-ext-messenger';
let messenger = new Messenger();
window.m = messenger;

chrome.tabs.onCreated.addListener(function(tab) {
	console.log('-- TAB CREATED: ---', tab, tab.id);
});

let connectedHandler  = function(extensionPart, port, tabId) {
	console.log('--- CONNECTED PORT: ---', arguments);
};

let disconnectedHandler  = function(extensionPart, port, tabId) {
	console.log('--- DISCONNECTED PORT: ---', arguments);
};

//window.setTimeout(messenger.initBackgroundHub, 10000);
messenger.initBackgroundHub({ connectedHandler: connectedHandler, disconnectedHandler: disconnectedHandler });

let messageHandler = function(message, sender, sendResponse) {
    console.log('background got message:', arguments);
    sendResponse('I AM RESPONSE FROM BACKGROUND');
};

window.c = messenger.initConnection('main', messageHandler);

let messageHandler2 = function(message, sender, sendResponse) {
    console.log('background 2 got message:', arguments);
    sendResponse('I AM RESPONSE FROM BACKGROUND 2');
};

window.c2 = messenger.initConnection('main2', messageHandler2);

window.runTests = function(tabId) {
    console.log('BACKGROUND TO BACKGROUND:');
    console.log('--- main to main2 --- ');
    window.c.sendMessage('background:main2', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to main --- ');
    window.c.sendMessage('background:main', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main2 to main --- ');
    window.c2.sendMessage('background:main2', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to main,main2 --- ');
    window.c.sendMessage('background:main,main2', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to * --- ');
    window.c.sendMessage('background:*:' + tabId, 'some message', function(res) { console.log('got response:', res); });

    console.log('BACKGROUND TO CONTENT SCRIPT:');
    console.log('--- main to main2 --- ');
    window.c.sendMessage('content_script:main2:' + tabId, 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to main --- ');
    window.c.sendMessage('content_script:main:' + tabId, 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main2 to main --- ');
    window.c2.sendMessage('content_script:main2:' + tabId, 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to main,main2 --- ');
    window.c.sendMessage('content_script:main,main2:' + tabId, 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to * --- ');
    window.c.sendMessage('content_script:*:' + tabId, 'some message', function(res) { console.log('got response:', res); });

    console.log('BACKGROUND TO POPUP:');
    console.log('--- main to main --- ');
    window.c.sendMessage('popup:main:' + tabId, 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to main --- ');
    window.c.sendMessage('popup:main:' + tabId, 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main2 to main --- ');
    window.c2.sendMessage('popup:main:' + tabId, 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to main,main2 --- ');
    window.c.sendMessage('popup:main,main2:' + tabId, 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to * --- ');
    window.c.sendMessage('popup:*:' + tabId, 'some message', function(res) { console.log('got response:', res); });

    console.log('BACKGROUND TO DEVTOOL:');
    console.log('--- main to main --- ');
    window.c.sendMessage('devtool:main:' + tabId, 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to main --- ');
    window.c.sendMessage('devtool:main:' + tabId, 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main2 to main --- ');
    window.c2.sendMessage('devtool:main:' + tabId, 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to main,main2 --- ');
    window.c.sendMessage('devtool:main,main2:' + tabId, 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to * --- ');
    window.c.sendMessage('devtool:*:' + tabId, 'some message', function(res) { console.log('got response:', res); });

    console.log('DISCONNECTING main2:');
    window.c2.disconnect();
};