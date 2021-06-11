import React from 'react';
import Carousel from "react-elastic-carousel"

import { getAllByAltText } from '@testing-library/dom';
import { HiOutlineRefresh } from "react-icons/hi";
import { MdEdit, MdFileDownload } from "react-icons/md";
import {Link} from 'react-router-dom';




var imageNames = [];
var jsonObject = [];
var filesToDownload = [];

const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/imageDetails');
const incomingSocket = new WebSocket('ws://127.0.0.1:1880/ws/imageDetailsResponse');



const Images = (props) => {

    const [imageDetailsArray, setImageDetails] = React.useState({});
    const [carouselData, setCarouselData] = React.useState({});

    incomingSocket.onmessage = event => {
        imageNames = JSON.parse(event.data);
        setImageDetails(imageNames);
    }

    function addDownloadFile(imageTitle, imageThumbnail) {
        props.getDownloadData(imageTitle, imageThumbnail);
    }

    function getImageDataForEdit(selectedImageTitle, selectedImageThumbnail) {
        const editButtonPressedValue = true;
        props.handleImageEditData(selectedImageTitle, selectedImageThumbnail, editButtonPressedValue);
    }



    function getCarousel() {

        return (
            <Carousel breakPoints={props.breakpoints}>
                {imageNames.map((images, index) => (
                    <div key={index} className="lg:p-3 justify-items-start">
                        <div className="lg:w-56 lg:h-60 rounded overflow-hidden lg:shadow-lg">
                            <button onClick={() => getImageDataForEdit(imageNames[index].fileName, imageNames[index].base64)}><MdEdit/></button>
                            <img className="w-full lg:h-44 object-cover" src={'data:image/jpeg; base64,' + imageNames[index].base64} />
                            <div>
                                <div className="flex flex-row items-center">
                                    <div className="lg:mt-2 lg:ml-3 font-semibold text-lg text-orange-bright overflow-ellipsis overflow-hidden w-36">
                                        {imageNames[index].fileName}
                                    </div>
                                    <div className="lg:ml-8">
                                        <button className="bg-sundance-blue hover:bg-orange-bright text-white lg:mt-2 lg:mr-3 font-bold py-1 px-1 rounded" onClick={() => addDownloadFile(imageNames[index].fileName, imageNames[index].base64)}><MdFileDownload /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </Carousel>
        );

    }

    return (
      
        <div>
            {   props.booleanValue
                ? getCarousel()
                : <h1 className="text-xl font-semibold text-sundance-gold lg:mt-16">Images Will Show Once Selected</h1>
            }

        </div>


    );
}

export default Images;

