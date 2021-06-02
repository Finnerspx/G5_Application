const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/imageDetails');
const incomingSocket = new WebSocket('ws://127.0.0.1:1880/ws/imageDetailsResponse');

const ImageNodeREDConnection = {
    outgoingSocket: outgoingSocket,
    incomingSocket: incomingSocket
};

export default ImageNodeREDConnection;