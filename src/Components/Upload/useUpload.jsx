import React, { useState } from 'react';
const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/uploadDataset');
const incomingSocket = new WebSocket('ws://127.0.0.1:1880/ws/uploadDatasetResponse');

/**
 * Represents useUpload
 * @returns handleChange, values
 */

const useUpload = () => { //React hook


    const [values, setValues] = useState({
        datasetName: '',
    });

    /**
     * Represents handleFileChange
     * @param {event} e 
     * Sets values of the array by capturing the name attribute of the input tag within UploadComponent.jsx this is then set with the value attribute from the input tag
     */


    const handleFileChange = e => {
        e.preventDefault();

        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }



    return {handleFileChange,  values };

 
}

export default useUpload;