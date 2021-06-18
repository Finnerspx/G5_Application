import React from 'react';
import Popup from 'reactjs-popup';


const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/bulkEdit');

/**
 * Represents useBulkOperations
 * @param {string} datasetNameValue 
 * @returns theBulkRotate, theBulkResize, handleRotateChange, handleResizeChange, handleRotateSubmit,handleResizeSubmit
 */


function useBulkOperations(datasetNameValue) {


    const [theBulkRotate, setBulkRotate] = React.useState();


    const [theBulkResize, setBulkResize] = React.useState();

/**
 * Represents handleRotateChaneg
 * Deals with event changes spefically for Rotate within MainDahsboard.jsx
 * @param {event} e 
 */
    const handleRotateChange = e => {

        e.preventDefault();

        setBulkRotate(e.target.value);

    }
/**
 * Represents handleResizeChange
 * Deals with event changes spefically for Resize within MainDahsboard.jsx
 * @param {event} e 
 */
    const handleResizeChange = e => {
        e.preventDefault();

        setBulkResize(e.target.value);
    }

    /**
     * Represents handleRotateSubmit
     * @param {event} e 
     * Sends bulk rotate details to Node-Red as JSON object on web socket
     */
    const handleRotateSubmit = e => {
        e.preventDefault();

        if (outgoingSocket.readyState === 1){
            var vBulkRotate = {
                'bulkRotate':  theBulkRotate,
                'type': 'rotate',
                'datasetName': datasetNameValue
            };
            outgoingSocket.send(JSON.stringify(vBulkRotate));

        }
    }
    

    const handleResizeSubmit = e => {
        e.preventDefault();

        return(
            <h1>Hello</h1>

        );
    }


    

    
    return {theBulkRotate, theBulkResize, handleRotateChange, handleResizeChange, handleRotateSubmit,handleResizeSubmit };
   
   
}

export default useBulkOperations;
