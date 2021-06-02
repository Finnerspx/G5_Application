import React from 'react';
import Carousel from "react-elastic-carousel"
import DatasetNodeREDConnection from './DatasetNodeREDConnection';
import ImageNodeREDConnection from '../ImageNodeREDConnection/ImageNodeREDConnection';

var datasetNames = [];
var jsonObject = [];


const Dataset = (props) => {

    const [datasetNamesArray, setDatasetNames] = React.useState({});


    /**
     * Sending message to gather dataset details (name & thumbnail)
     */

     DatasetNodeREDConnection.incomingSocket.onopen = function (event) {
        if (DatasetNodeREDConnection.outgoingSocket.readyState === 1) {
            DatasetNodeREDConnection.outgoingSocket.send("datasetInformation");
        }

    }


    DatasetNodeREDConnection.incomingSocket.onmessage = event => {
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

    function handleDatasetImagesRequest(name){
       if (ImageNodeREDConnection.outgoingSocket.readyState === 1) {
           ImageNodeREDConnection.outgoingSocket.send(name);
           console.log(name);
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
                                    <button onClick={handleDatasetImagesRequest(datasets.title)}>+</button>
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