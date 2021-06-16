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

// const regSuccess = () => incomingSocket.onmessage = e => {
//     if (e.data == "register success"){
//         return true;
//     }else {
//         return false;
//     }
// }

const RegisterNodeREDConnection = {
    outgoingSocket: outgoingSocket,
    incomingSocket: incomingSocket,
  //  successfulReg: regSuccess,
};

export default RegisterNodeREDConnection;