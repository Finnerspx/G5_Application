import React from 'react';
import Navbar from '../Components/Navigation/Navbar';
import Sidebar from '../Components/SideBar/Sidebar';
import Dataset from '../Services/DatasetNodeREDConnection/Dataset';
import Images from '../Services/ImageNodeREDConnection/Images';
import {FaFolder} from 'react-icons/fa';
import {IoMdImage} from 'react-icons/io';
import { HiOutlineRefresh } from "react-icons/hi";
import './MainDashboard.css';

const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/imageDetails');
var emptyArray = [];
var filesToDownload = [];

const MainDashboard = (props) => {

    // var buttonClickedValue, datasetNameValue;
    const [buttonClicked, setButtonClicked] = React.useState();
    const [datasetNameValue, setDatasetNameValue] = React.useState();
    const [downloadImages, setFilesToDownload] = React.useState();
 
    const datasetBreakpoints = [
        {
            width: 1920, itemsToShow: 3, itemsToScroll: 3
        }
    ];
    const imageBreakPoints = [
        { width: 1920, itemsToShow: 4, itemsToScroll: 5 },
    ];

    function getData(buttonNewValue, datasetNewValue) {

        setButtonClicked(buttonNewValue);
        setDatasetNameValue(datasetNewValue);

        sendImageDetailsRequest(buttonClicked, datasetNameValue);

    }

    function getDownloadData(imageTitle, imageThumbnail) {
            filesToDownload.push({
            title: imageTitle,
            thumbnail: imageThumbnail
        })
        setFilesToDownload(filesToDownload);
    }

    function sendImageDetailsRequest(buttonClickedCondition, nameOfDatasetSelected){
        if (buttonClickedCondition){
            if (outgoingSocket.readyState === 1) {
                outgoingSocket.send(nameOfDatasetSelected);
            }
        }

    }

    function refreshButtonClicked(buttonClickedUpdated){
        setButtonClicked(buttonClickedUpdated);
    }

    function handleImageEditData(nameOfImage, thumbnailOfImage, editButtonPressedValue){
        props.getImageData(nameOfImage, thumbnailOfImage, editButtonPressedValue);
    }



    return (

        <div className="grid-container"> 
                <div className="item1">
                    <Navbar />
                </div>
                <div className="item2">
                    <Sidebar filesToDownload={filesToDownload}/>
                </div>
                <div className="item3 lg:mt-10 lg:mr-40 ">
                    <div className="lg:flex lg:flex-row lg:items-center lg:font-normal lg:text-2xl">
                        <FaFolder className="lg:w-10 lg:h-10"/>
                        <div className="lg:ml-5">
                        <h3>Dataset</h3>
                        </div>
                    </div>
                    <div className="lg:mt-16">
                    <Dataset getData={getData}/>
                    </div>
                </div>
                <div className="item4  lg:mb-60 lg:mr-20">
                <div className="lg:flex lg:flex-row lg:items-center lg:font-normal lg:text-2xl">
                        <IoMdImage className="lg:h-10 lg:w-10"/>
                        <div className="lg:mr-20 lg:ml-5">
                        <h3>Selected Dataset Images</h3>
                        </div>
                    </div>
                    <div>
                    <Images handleImageEditData={handleImageEditData} refreshButtonClicked={refreshButtonClicked} getDownloadData={getDownloadData} breakpoints={imageBreakPoints} datasetName={datasetNameValue} booleanValue={buttonClicked}/>
                    </div>
                </div>
            </div>
        );
}

export default MainDashboard;




