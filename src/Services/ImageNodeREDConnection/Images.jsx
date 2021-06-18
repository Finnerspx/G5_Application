import React from 'react';
import Carousel from "react-elastic-carousel"
import { MdEdit, MdFileDownload } from "react-icons/md";




var imageNames = [];

const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/imageDetails');
const incomingSocket = new WebSocket('ws://127.0.0.1:1880/ws/imageDetailsResponse');

/**
 * Represents Images
 * @param {*} props 
 * @returns Carousel of images mapped to it, data is sent from Node-RED
 */

const Images = (props) => {

    const [imageDetailsArray, setImageDetails] = React.useState({});
    const [carouselData, setCarouselData] = React.useState({});
    const [editButonClicked, setEditButtonClicked] = React.useState(false);

    incomingSocket.onmessage = event => {
        imageNames = JSON.parse(event.data);
        setImageDetails(imageNames);
    }
    /**
     * Represents addDownloadFile
     * @param {string} imageTitle 
     * @param {base64} imageThumbnail 
     * 
     * MainDashboard passes in function getDownloadData as props into Images. Upon download button pressed the values of image name and image thumbnail for the 
     * selected image are sent to this function as params. Then props calls the method passed from main dashboard and sends those values back so they can be set within getDownloadData
     */

    function addDownloadFile(imageTitle, imageThumbnail) {
        props.getDownloadData(imageTitle, imageThumbnail);
    }

    /**
     * Represents getImageDataForEdit
     * @param {string} selectedImageTitle 
     * @param {base64} selectedImageThumbnail 
     * @param {int} imgWidth 
     * @param {int} imgHeight 
     * MainDashboard passes in function handleImageEditData as props into Images. Upon edit button pressed the values of image name and image thumbnail, image width and height
     * are passed in as params. Props then calls the method passed in from Main Dashboard - handleImageEditData with the captured param values so they can be set in MainDahsboard
     * 
     */

    function getImageDataForEdit(selectedImageTitle, selectedImageThumbnail, imgWidth, imgHeight) {
        const editButtonPressedValue = true;
        props.handleImageEditData(selectedImageTitle, selectedImageThumbnail, editButtonPressedValue, imgWidth, imgHeight);
    }

    

    /**
     * Represents getCarousel
     * @returns Carousel
     * Due to the return of Images being conditional based on whether a user has selected a dataset or not, the carousel containing the image data mapped from the values sent
     * by Node-RED it needs to be within its own function. So if booleanValuye is true it means the select button on a dataset has been pressed and therefore this function is called to return 
     * the images and if not then the return will just display and informative message to user.
     */

    function getCarousel() {

        return (
            <Carousel breakPoints={props.breakpoints}>
                {imageNames.map((images, index) => (
                    <div key={index} className="lg:p-3 justify-items-start">
                        <div className="lg:w-56 lg:h-56 rounded overflow-hidden lg:shadow-lg">
                            <img className="w-full lg:h-44 object-none" src={'data:image/jpeg; base64,' + imageNames[index].base64} />
                            <div>
                                <div className="flex flex-row items-center">
                                    <div className="lg:mt-2 lg:ml-3 font-semibold text-sm text-orange-bright overflow-ellipsis truncate w-30">
                                        {imageNames[index].fileName}
                                    </div>
                                    <div className="grid grid-cols-2 lg:ml-16">
                                        <div className="col-start-1">
                                            <button className="bg-sundance-blue hover:bg-orange-bright text-white lg:mt-2 lg:mr-3 font-bold py-1 px-1 rounded" onClick={() => getImageDataForEdit(imageNames[index].fileName, imageNames[index].base64, imageNames[index].imageWidth, imageNames[index].imageHeight)}><MdEdit /></button>

                                        </div>
                                        <div className="col-start-2">
                                            <button className="bg-sundance-blue hover:bg-orange-bright text-white lg:mt-2 lg:mr-3 font-bold py-1 px-1 rounded" onClick={() => addDownloadFile(imageNames[index].fileName, imageNames[index].base64)}><MdFileDownload /></button>
                                        </div>
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
                : <h1 className="text-xl font-semibold text-sundance-gold lg:mt-16">Click Select to view images</h1>
            }

        </div>


    );
}

export default Images;

