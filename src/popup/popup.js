console.log('POPUP');

import Messenger from 'ext-messenger';
import helper from '../common/helper.js';

helper.init();

let messenger = new Messenger(Messenger.EXT_PARTS.POPUP);
self.messenger = messenger;

helper.initConnections('popup', messenger);

self.runTests = async function() {
    await helper.runTests('popup', 'background');
    await helper.runTests('popup', 'content_script');
    await helper.runTests('popup', 'popup');
    await helper.runTests('popup', 'devtool');
};

let runTestsBtn = document.getElementById('runTests');
runTestsBtn.addEventListener('click', function() {
    self.runTests();
});