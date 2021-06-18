const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/registerAccount');
const incomingSocket = new WebSocket('ws://127.0.0.1:1880/ws/registerAccountResponse');

incomingSocket.onopen = function (event) {
    console.log("Client connected");
};

incomingSocket.onclose = function () {
    console.log('Connection closed');
};

incomingSocket.onerror = function (error) {
    console.log('Connection closed');
};

incomingSocket.onerror = function (error) {
    console.log('Error detected: ' + error);
};

/**
 * Allows string variables contianing address and port of sockets to be called from other functions
 */

const RegisterNodeREDConnection = {
    outgoingSocket: outgoingSocket,
    incomingSocket: incomingSocket,
};

export default RegisterNodeREDConnection;