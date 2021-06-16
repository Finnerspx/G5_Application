import React from 'react';
import Popup from 'reactjs-popup';


const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/bulkEdit');

function useBulkOperations(datasetNameValue) {


    const [theBulkRotate, setBulkRotate] = React.useState();


    const [theBulkResize, setBulkResize] = React.useState();


    const handleRotateChange = e => {

        e.preventDefault();

        setBulkRotate(e.target.value);

    }

    const handleResizeChange = e => {
        e.preventDefault();

        setBulkResize(e.target.value);
    }

    const handleRotateSubmit = e => {
        e.preventDefault();

        if (outgoingSocket.readyState === 1){
            var vBulkRotate = {
                'bulkRotate':  theBulkRotate,
                'type': 'rotate',
                'datasetName': datasetNameValue
            };
            console.log(vBulkRotate);
            outgoingSocket.send(JSON.stringify(vBulkRotate));

        }
    }
    

    const handleResizeSubmit = e => {
        e.preventDefault();

        return(
            <h1>Hello</h1>

        );

        // if (outgoingSocket.readyState === 1){
        //     var vBulkResize = {
        //         'bulkResize':  theBulkResize,
        //         'type': 'resize',
        //         'datasetName': datasetNameValue

        //     };
        //     console.log(vBulkResize);
        //     outgoingSocket.send(JSON.stringify(vBulkResize));

        // }
    }


    

    
    return {theBulkRotate, theBulkResize, handleRotateChange, handleResizeChange, handleRotateSubmit,handleResizeSubmit };
   
   
}

export default useBulkOperations;
