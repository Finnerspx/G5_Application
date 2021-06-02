import React from 'react';
import Carousel from "react-elastic-carousel"

var datasetNames = [];
var jsonObject = [];


const DatasetNodeRED = (props) => {

    const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/datasetDetails');
    const incomingSocket = new WebSocket('ws://127.0.0.1:1880/ws/datasetDetailsResponse');
    const [datasetNamesArray, setDatasetNames] = React.useState({});


    /**
     * Sending message to gather dataset details (name & thumbnail)
     */

    incomingSocket.onopen = function (event) {
        if (outgoingSocket.readyState === 1) {
            outgoingSocket.send("datasetInformation");
        }

    }


    incomingSocket.onmessage = event => {
        if (event.data == "finished") {
            setDatasetNames(datasetNames);
        } else {
            jsonObject = JSON.parse(event.data);
            datasetNames.push({
                title: jsonObject.datasetName,
                thumbnail: jsonObject.base64,
            });
        }
    }



    return (
        <Carousel breakPoints={props.breakpoint}>
            {datasetNames.map((datasets, index) => (
                <div key={index} className="lg:p-3 justify-items-start">
                    <div className="lg:w-80 lg:h-52 rounded overflow-hidden lg:shadow-lg">
                        <img className="rounded w-full h-40 object-cover" src={'data:image/jpeg; base64,' + datasets.thumbnail} />
                        <div>
                            <div className="flex flex-row items-center">
                                <div className="font-semibold text-lg text-orange-bright overflow-ellipsis overflow-hidden lg:justify-items-start lg:ml-3 lg:w-20">
                                    {datasets.title}
                                </div>
                                <div className="ml-20">
                                    {/* <Checkboxes name={datasets.title}/> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
}



export default DatasetNodeRED;