import React from 'react';
import Carousel from "react-elastic-carousel"
import DatasetNodeREDConnection from './DatasetNodeREDConnection';
import ImageNodeREDConnection from '../ImageNodeREDConnection/ImageNodeREDConnection';

var datasetNames = [];

const incomingSocket = new WebSocket('ws://127.0.0.1:1880/ws/datasetDetailsResponse');

const imageOutgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/imageDetails');


/**
 * Represents Dataset
 * @param {*} props 
 * @returns Carousel of mapped dataset.
 */

const Dataset = (props) => {

    const [datasetNamesArray, setDatasetNames] = React.useState({});

    /**
     * Represents handleClick
     * @param {string} datasetName 
     * Upon selecting the button found within the card of the dataset *Select* this function is called. 
     * Sends the datasetName to Node-RED and sets a boolean value to true which references to MainDashboard that the button has been clicked. 
     * Dataset takes in props and a function getData is passed as props from MainDashboard, here the function is called with the dataset name and boolean value passed back to it.
     */

    function handleClick(datasetName) {
        if (imageOutgoingSocket.readyState === 1) {
            imageOutgoingSocket.send(datasetName);
        }
        const booleanValue = true;
        props.getData(booleanValue, datasetName);
    }

    incomingSocket.onmessage = event => {
        datasetNames = JSON.parse(event.data);
        setDatasetNames(datasetNames);
    }

    const breakPoints = [
        { width: 1920, itemsToShow: 3, itemsToScroll: 3 },
    ];



    return (
        <Carousel breakPoints={breakPoints}>
            {datasetNames.map((datasets, index) => (
                <div key={index} className="lg:p-3 justify-items-start">
                    <div className="lg:w-80 lg:h-52 rounded overflow-hidden lg:shadow-lg">
                        <img className="rounded w-full h-40 object-cover" src={'data:image/jpeg; base64,' + datasetNames[index].base64} />
                        <div>
                            <div className="flex flex-row items-center lg:pt-2">
                                <div className="font-semibold text-lg text-black overflow-ellipsis truncate lg:justify-items-start lg:ml-3 lg:w-24">
                                    {datasetNames[index].datasetName}
                                </div>
                                <div className="ml-20">
                                    <button className="lg:px-3 lg:py-1 bg-sundance-blue rounded font-medium text-white hover:bg-orange-bright" onClick={() => handleClick(datasetNames[index].datasetName)}>Select</button>
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