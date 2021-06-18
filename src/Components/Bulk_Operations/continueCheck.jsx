import React from 'react';

const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/bulkEdit');

/**
 * Representes ContinueCheckl
 * @param {*} props 
 * @returns button
 */

function ContinueCheck(props) {


    /**
     * Represents submissionResize
     * Deals with the sending of resize details to Node-RED as JSOn on websocket
     * Is called when props.resize passed from MainDashboard is true 
     */
    function submissionResize(){        

        if (outgoingSocket.readyState === 1){
            var vBulkResize = {
                'bulkResize':  props.resizeValue,
                'type': 'resize',
                'datasetName': props.datasetName

            };
            outgoingSocket.send(JSON.stringify(vBulkResize));

        }
    }

       /**
     * Represents submissionRotate
     * Deals with the sending of rotate details to Node-RED as JSOn on websocket
     * Is called when props.resize passed from MainDashboard is false 
     */

    function submissionRotate(){

        if (outgoingSocket.readyState === 1){
            var vBulkRotate = {
                'bulkRotate':   props.rotateValue,
                'type': 'rotate',
                'datasetName': props.datasetName
            };
            outgoingSocket.send(JSON.stringify(vBulkRotate));

        }
    }



    return (
       <button className="lg:mt-4 shadow-custom-shadow w-32 lg:h-10 rounded text-xl text-white bg-sundance-blue hover:bg-orange-bright cursor-pointer" onClick={props.resize ? submissionResize : submissionRotate}>Yes</button>
    )
}

export default ContinueCheck;
