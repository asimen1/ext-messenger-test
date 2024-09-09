console.log('DEVTOOL');

import Messenger from 'ext-messenger';
import helper from '../common/helper.js';

helper.init();

let messenger = new Messenger(Messenger.EXT_PARTS.DEVTOOL);
self.messenger = messenger;

helper.initConnections('devtool', messenger);

self.runTests = async function() {
    await helper.runTests('devtool', 'background');
    await helper.runTests('devtool', 'content_script');
    await helper.runTests('devtool', 'popup');
    await helper.runTests('devtool', 'devtool');
};

let runTestsBtn = document.getElementById('runTests');
runTestsBtn.addEventListener('click', function() {
    self.runTests();
});