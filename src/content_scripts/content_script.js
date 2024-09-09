console.log('CONTENT_SCRIPT');

import Messenger from 'ext-messenger';
import helper from '../common/helper.js';

helper.init();

let messenger = new Messenger(Messenger.EXT_PARTS.CONTENT_SCRIPT);
self.messenger = messenger;

helper.initConnections('content_script', messenger);

self.runTests = async function() {
    await helper.runTests('content_script', 'background');
    await helper.runTests('content_script', 'content_script');
    await helper.runTests('content_script', 'popup');
    await helper.runTests('content_script', 'devtool');
};