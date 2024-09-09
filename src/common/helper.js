// ----------------------------------------------------
// INTERNAL
// ----------------------------------------------------

let msgCounter = 0;
async function sendMessage(connection, to) {
    let fromToString = `${connection.extPart}:${connection.name} to ${to}`;
    let message = `${msgCounter} - some message: ${fromToString}`;

    let toPart = to.split(':')[0];
    let toNames = to.split(':')[1].split(',');
    let validResponses;
    if (toNames[0] === '*') {
        validResponses = [
            `I AM RESPONSE FROM ${toPart}:main (received msg: ${message})`,
            `I AM RESPONSE FROM ${toPart}:main2 (received msg: ${message})`,
        ];
    } else {
        validResponses = toNames.map((toName) => {
            return `I AM RESPONSE FROM ${toPart}:${toName} (received msg: ${message})`;
        });
    }

    console.log(`sendMessage: ${message}`);
    await connection.sendMessage(to, message).then((res) => {
        console.log(`sendMessage response: ${msgCounter} - got response:`, res);

        // Since we can send a message to multiple connection names (e.g. background:main, main2), we
        // need to check if the response is from one of them.
        let validResponseIndex = validResponses.indexOf(res);
        console.assert(validResponseIndex !== -1, '\nInvalid response:', res, '\nExpected one of this responses:', validResponses);
        if (validResponseIndex !== -1) {
            validResponses.splice(validResponseIndex, 1);
        }
    });
    msgCounter++;
}

// ----------------------------------------------------
// EXPORTED
// ----------------------------------------------------

function init() {
    // Make this methods are available to the global object.
    self.initConnections = initConnections;
    self.disconnectConnections = disconnectConnections;
}

function initConnections(extPart, messenger) {
    let messageHandler = function(message, from, sender, sendResponse) {
        console.log(`${extPart}:main got message:`, arguments);
        sendResponse(`I AM RESPONSE FROM ${extPart}:main (received msg: ${message})`);
    };
    self.c1 = messenger.initConnection('main', messageHandler);

    let messageHandler2 = function(message, from, sender, sendResponse) {
        console.log(`${extPart}:main2 got message:`, arguments);
        sendResponse(`I AM RESPONSE FROM ${extPart}:main2 (received msg: ${message})`);
    };
    self.c2 = messenger.initConnection('main2', messageHandler2);
}

function disconnectConnections() {
    self.c1.disconnect();
    self.c2.disconnect();
}

async function runTests(fromExtPart, toExtPart, tabId) {
    console.log('----------------------------------');
    console.log(`${fromExtPart} -> ${toExtPart}:`);
    console.log('----------------------------------');

    let tabIdStr = tabId ? `:${tabId}` : '';

    await sendMessage(self.c1, `${toExtPart}:main2${tabIdStr}`);
    await sendMessage(self.c1, `${toExtPart}:main${tabIdStr}`);
    await sendMessage(self.c2, `${toExtPart}:main${tabIdStr}`);
    await sendMessage(self.c1, `${toExtPart}:main,main2${tabIdStr}`);
    await sendMessage(self.c1, `${toExtPart}:*${tabIdStr}`);
}

export default {
    init,
    initConnections,
    disconnectConnections,
    runTests,
};