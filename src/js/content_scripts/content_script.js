console.log('CONTENT_SCRIPT');

import Messenger from 'ext-messenger';
let messenger = new Messenger();
window.m = messenger;


let isTopPage;
try {
    isTopPage = window.self === window.top;
} catch (e) {
    isTopPage = false;
}


let messageHandler = function(message, from, sender, sendResponse) {
    // Messages that only the top page should handle (not iframes).
    if (isTopPage) {
        console.log('content_script got message:', arguments);
        sendResponse('I AM RESPONSE FROM CONTENT_SCRIPT');
    }
};

window.c = messenger.initConnection('main', messageHandler);

let messageHandler2 = function(message, from, sender, sendResponse) {
    // Messages that only the top page should handle (not iframes).
    if (isTopPage) {
        console.log('content_script 2 got message:', arguments);
        sendResponse('I AM RESPONSE FROM CONTENT_SCRIPT 2');
    }
};

window.c2 = messenger.initConnection('main2', messageHandler2);

window.runTests = function() {
    // ----------------------------------------------------
    console.log('CONTENT SCRIPT TO BACKGROUND:');
    // ----------------------------------------------------

    console.log('--- main to main2 --- ');
    window.c.sendMessage('background:main2', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('--- main to main --- ');
    window.c.sendMessage('background:main', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('--- main2 to main --- ');
    window.c2.sendMessage('background:main2', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('--- main to main,main2 --- ');
    window.c.sendMessage('background:main,main2', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('--- main to * --- ');
    window.c.sendMessage('background:*', 'some message').then((res) => {
        console.log('got response:', res);
    });

    // ----------------------------------------------------
    console.log('CONTENT SCRIPT TO CONTENT SCRIPT:');
    // ----------------------------------------------------

    console.log('--- main to main2 --- ');
    window.c.sendMessage('content_script:main2', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('--- main to main --- ');
    window.c.sendMessage('content_script:main', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('--- main2 to main --- ');
    window.c2.sendMessage('content_script:main2', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('--- main to main,main2 --- ');
    window.c.sendMessage('content_script:main,main2', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('--- main to * --- ');
    window.c.sendMessage('content_script:*', 'some message').then((res) => {
        console.log('got response:', res);
    });

    // ----------------------------------------------------
    console.log('CONTENT SCRIPT TO POPUP:');
    // ----------------------------------------------------

    console.log('--- main to main --- ');
    window.c.sendMessage('popup:main', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('--- main to main --- ');
    window.c.sendMessage('popup:main', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('--- main2 to main --- ');
    window.c2.sendMessage('popup:main', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('--- main to main,main2 --- ');
    window.c.sendMessage('popup:main,main2', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('--- main to * --- ');
    window.c.sendMessage('popup:*', 'some message').then((res) => {
        console.log('got response:', res);
    });

    // ----------------------------------------------------
    console.log('CONTENT SCRIPT TO DEVTOOL:');
    // ----------------------------------------------------

    console.log('--- main to main --- ');
    window.c.sendMessage('devtool:main', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('--- main to main --- ');
    window.c.sendMessage('devtool:main', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('--- main2 to main --- ');
    window.c2.sendMessage('devtool:main', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('--- main to main,main2 --- ');
    window.c.sendMessage('devtool:main,main2', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('--- main to * --- ');
    window.c.sendMessage('devtool:*', 'some message').then((res) => {
        console.log('got response:', res);
    });

    console.log('DISCONNECTING main2 (after 2000ms timeout):');
    window.setTimeout(function() {
        window.c2.disconnect();
    }, 2000);
};

// For firefox...
// window.setTimeout(function() {
//     console.log('for firefox - runTests()');
//     window.runTests();
// }, 5000);