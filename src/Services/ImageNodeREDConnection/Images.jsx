import React from 'react'
import Carousel from "react-elastic-carousel"
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { MdFileDownload } from "react-icons/md";
import { getAllByAltText } from '@testing-library/dom';
import { HiOutlineRefresh } from "react-icons/hi";



var imageNames = [];
var jsonObject = [];
var filesToDownload = [];
var zipFile = new JSZip();

const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/imageDetails');
const incomingSocket = new WebSocket('ws://127.0.0.1:1880/ws/imageDetailsResponse');



const Images = (props) => {

    const [imageDetailsArray, setImageDetails] = React.useState({});
    const [carouselData, setCarouselData] = React.useState({});

    incomingSocket.onmessage = event => {
        if (event.data == "finished") {
            setImageDetails(imageNames);
        } else {
            jsonObject = JSON.parse(event.data);
            imageNames.push({
                title: jsonObject.fileName,
                thumbnail: jsonObject.base64,
            });
        }
    }

    function addDownloadFile(base64, fileName) {
        filesToDownload.push({
            title: fileName,
            thumbnail: base64
        })
    }

    function handleDownload() {
        for (var i = 0; i < filesToDownload.length; i++) {
            zipFile.file(filesToDownload[i].title, filesToDownload[i].base64, { base64: true });
        }
        zipFile.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, "download.zip");
        })
    }

    function getCarousel() {

        return (
            <Carousel breakPoints={props.breakpoints}>
                {imageNames.map((images, index) => (
                    <div key={index} className="lg:p-3 justify-items-start">
                        <div className="lg:w-56 lg:h-56 rounded overflow-hidden lg:shadow-lg">
                            <img className="w-full lg:h-44 object-cover" src={'data:image/jpeg; base64,' + images.thumbnail} />
                            <div>
                                <div className="flex flex-row items-center">
                                    <div className="lg:mt-2 lg:ml-3 font-semibold text-lg text-orange-bright overflow-ellipsis overflow-hidden w-36">
                                        {images.title}
                                    </div>
                                    <div className="lg:ml-8">
                                        <button className="bg-sundance-blue hover:bg-orange-bright text-white lg:mt-2 lg:mr-3 font-bold py-1 px-1 rounded" onClick={() => addDownloadFile(images.thumbnail, images.title)}><MdFileDownload /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </Carousel>
        );

    }

    function handleRefresh() {
        imageNames = [];
        const booleanValue = true;
        props.refreshButtonClicked(booleanValue);

    }


    /**
     * Andrews suggestion = 
     * 
     * Pass through a new array (empty) and set that equal to imageNames.
     */

    return (
      
        <div>
            <button className="lg:px-2 lg:py-2 rounded-2xl shadow-custom-shadow hover:bg-sundance-blue" onClick={handleRefresh}><HiOutlineRefresh style={{color: "#DD9933"}} className="lg:h-7 lg:w-8"/></button>
            {   props.booleanValue
                ? getCarousel()
                : <h1 className="text-xl font-semibold text-sundance-gold lg:mt-16">Images Will Show Once Selected</h1>
            }

        </div>


    );
}

export default Images;

