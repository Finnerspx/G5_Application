import React, { useState } from 'react';
const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/uploadDataset');
const incomingSocket = new WebSocket('ws://127.0.0.1:1880/ws/uploadDatasetResponse');
const useUpload = () => {


    const [values, setValues] = useState({
        datasetName: '',
    });

    const handleFileChange = e => {
        e.preventDefault();

        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleFileSubmit = e => {
        e.preventDefault();

    if (outgoingSocket.readyState === 1) {
        console.log(values.datasetName);

        var sendDetails = {
          'fileName': values.datasetName,
        };

        outgoingSocket.send(JSON.stringify(sendDetails));
    }
}

    return {handleFileChange, handleFileSubmit, values};

 
}

export default useUpload;