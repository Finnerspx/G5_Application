import React from 'react'
import Carousel from "react-elastic-carousel"
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { MdFileDownload } from "react-icons/md";


var imageNames = [];
var jsonObject = [];
var filesToDownload = [];
var zipFile = new JSZip();



function ImageNodeRED(props) {

    const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/imageDetails');
    const incomingSocket = new WebSocket('ws://127.0.0.1:1880/ws/imageDetailsResponse');

    const [imageDetailsArray, setImageDetails] = React.useState({});

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

export default ImageNodeRED;
