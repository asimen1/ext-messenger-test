console.log('POPUP');

import Messenger from 'chrome-ext-messenger';
let messenger = new Messenger();
window.m = messenger;

let messageHandler = function(message, sender, sendResponse) {
    console.log('popup got message:', arguments);
    sendResponse('I AM RESPONSE FROM POPUP');
};

window.c = messenger.initConnection('main', messageHandler);

let messageHandler2 = function(message, sender, sendResponse) {
    console.log('popup 2 got message:', arguments);
    sendResponse('I AM RESPONSE FROM POPUP 2');
};

window.c2 = messenger.initConnection('main2', messageHandler2);

window.runTests = function() {
    console.log('POPUP TO BACKGROUND:');
    console.log('--- main to main2 --- ');
    window.c.sendMessage('background:main2', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to main --- ');
    window.c.sendMessage('background:main', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main2 to main --- ');
    window.c2.sendMessage('background:main2', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to main,main2 --- ');
    window.c.sendMessage('background:main,main2', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to * --- ');
    window.c.sendMessage('background:*', 'some message', function(res) { console.log('got response:', res); });

    console.log('POPUP TO CONTENT SCRIPT:');
    console.log('--- main to main2 --- ');
    window.c.sendMessage('content_script:main2', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to main --- ');
    window.c.sendMessage('content_script:main', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main2 to main --- ');
    window.c2.sendMessage('content_script:main2', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to main,main2 --- ');
    window.c.sendMessage('content_script:main,main2', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to * --- ');
    window.c.sendMessage('content_script:*', 'some message', function(res) { console.log('got response:', res); });

    console.log('POPUP TO POPUP:');
    console.log('--- main to main --- ');
    window.c.sendMessage('popup:main', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to main --- ');
    window.c.sendMessage('popup:main', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main2 to main --- ');
    window.c2.sendMessage('popup:main', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to main,main2 --- ');
    window.c.sendMessage('popup:main,main2', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to * --- ');
    window.c.sendMessage('popup:*', 'some message', function(res) { console.log('got response:', res); });

    console.log('POPUP TO DEVTOOL:');
    console.log('--- main to main --- ');
    window.c.sendMessage('devtool:main', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to main --- ');
    window.c.sendMessage('devtool:main', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main2 to main --- ');
    window.c2.sendMessage('devtool:main', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to main,main2 --- ');
    window.c.sendMessage('devtool:main,main2', 'some message', function(res) { console.log('got response:', res); });

    console.log('--- main to * --- ');
    window.c.sendMessage('devtool:*', 'some message', function(res) { console.log('got response:', res); });
};