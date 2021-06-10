import React from 'react';


const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/bulkEdit');

function useBulkOperations(datasetNameValue) {

    // // const [values, setValues] = React.useState({
    // //     bulkResize: '',
    // //     bulkRotate: '',
    // // });

    // const [bulkResize, setBulkResize] = React.useState({});
    // const [bulkRotate, setBulkRotate]=  React.useState({});

    // const handleResizeChange = e => {
    //     e.preventDefault();
        
    //     setValues({
            
    //     }) 
    // }


    // const handleChange = e => {
    //     e.preventDefault();

    //     setValues({
    //         ...values,
    //         [e.target.name]: [e.target.value]
    //     });

    //     setJsonResize
    // }

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     if (outgoingSocket.readyState === 1) {
    //         var bulkDetails = {
    //             'bulkResize': values.bulkResize,
    //             'bulkRotate': values.bulkRotate,
    //         };

    //         outgoingSocket.send(JSON.stringify(bulkDetails));
    //     }


    // }

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

        if (outgoingSocket.readyState === 1){
            var vBulkResize = {
                'bulkResize':  theBulkResize,
                'type': 'resize',
                'datasetName': datasetNameValue

            };
            console.log(vBulkResize);
            outgoingSocket.send(JSON.stringify(vBulkResize));

        }
    }


    

    
    return {theBulkRotate, theBulkResize, handleRotateChange, handleResizeChange, handleRotateSubmit,handleResizeSubmit };
   
   
}

export default useBulkOperations;
