import React from 'react';
import Carousel from "react-elastic-carousel"
import DatasetNodeREDConnection from './DatasetNodeREDConnection';
import ImageNodeREDConnection from '../ImageNodeREDConnection/ImageNodeREDConnection';

var datasetNames = [];
var imageNames = [];
var jsonObject = [];

const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/datasetDetails');
const incomingSocket = new WebSocket('ws://127.0.0.1:1880/ws/datasetDetailsResponse');

const imageOutgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/imageDetails');


incomingSocket.onopen = function (event) {
    if (outgoingSocket.readyState === 1) {
        outgoingSocket.send("datasetInformation");
    }
}


const Dataset = (props) => {

    const [datasetNamesArray, setDatasetNames] = React.useState({});

    function handleClick(datasetName) {
        if (imageOutgoingSocket.readyState === 1) {
            imageOutgoingSocket.send(datasetName);
        }
        const booleanValue = true;
        props.getData(booleanValue, datasetName);
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

    const breakPoints = [
        { width: 1920, itemsToShow: 3, itemsToScroll: 3 },
    ];



    return (
        <Carousel breakPoints={breakPoints}>
            {datasetNames.map((datasets, index) => (
                <div key={index} className="lg:p-3 justify-items-start">
                    <div className="lg:w-80 lg:h-52 rounded overflow-hidden lg:shadow-lg">
                        <img className="rounded w-full h-40 object-cover" src={'data:image/jpeg; base64,' + datasets.thumbnail} />
                        <div>
                            <div className="flex flex-row items-center lg:pt-2">
                                <div className="font-semibold text-lg text-black overflow-ellipsis truncate lg:justify-items-start lg:ml-3 lg:w-24">
                                    {datasets.title}
                                </div>
                                <div className="ml-20">
                                    <button className="lg:px-3 lg:py-1 bg-sundance-blue rounded font-medium text-white hover:bg-orange-bright" onClick={() => handleClick(datasets.title)}>Select</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
}



export default Dataset;