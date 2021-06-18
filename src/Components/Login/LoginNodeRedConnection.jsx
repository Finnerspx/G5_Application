const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/login');
const incomingSocket = new WebSocket('ws://127.0.0.1:1880/ws/loginResponse');

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

incomingSocket.onmessage = event => {
    if (event.data === "register success") {

    }
}

/**
 * Allows string variables contianing address and port of sockets to be called from other functions
 */
const LoginNodeREDConnection = {
    outgoingSocket: outgoingSocket,
    incomingSocket: incomingSocket,
};

export default LoginNodeREDConnection;