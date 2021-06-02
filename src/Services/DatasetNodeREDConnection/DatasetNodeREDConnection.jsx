const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/datasetDetails');
const incomingSocket = new WebSocket('ws://127.0.0.1:1880/ws/datasetDetailsResponse');

const DatasetNodeREDConnection = {
    outgoingSocket: outgoingSocket,
    incomingSocket: incomingSocket
};

export default DatasetNodeREDConnection;