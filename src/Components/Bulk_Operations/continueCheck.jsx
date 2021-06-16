import React from 'react';


const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/bulkEdit');

function ContinueCheck(props) {


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
