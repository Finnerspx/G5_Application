import React from 'react'
import useUpload from './useUpload';



const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/uploadDataset');
const incomingSocket = new WebSocket('ws://127.0.0.1:1880/ws/uploadDatasetResponse');
const imageDatasetOutgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/datasetDetails');

function UploadComponent() {


    const { handleFileChange, handleFileSubmit, values } = useUpload();
    const [totalFiles, setTotalFiles] = React.useState(0);
    var multipleFileName = [];
    var multipleFileBase64 = [];
    var imageFiles = [];



    const onChange = e => {

        for (var i = 0; i <= e.target.files.length; i++) {
            let file = e.target.files[i];

            if (file) {
                const reader = new FileReader();
                reader.onload = _handleReaderLoader;
                reader.readAsBinaryString(file);
                multipleFileName.push(file.name);
                // setFile(file.name);
            }
        }

        var totalFiles = e.target.files.length;
        document.getElementById("numberOfFiles").innerHTML = totalFiles;
    }

    const _handleReaderLoader = readEvent => {
        /**Creates a base64 encoded ASCII string from a string of binary data 
         * btoa = binary to ASCII
         */
        let binaryString = readEvent.target.result;
        multipleFileBase64.push(btoa(binaryString));
    }

    const onFileSubmit = e => {
        e.preventDefault();

        if (outgoingSocket.readyState === 1) {
            for (var i = 0; i < multipleFileName.length; i++) {
                var imageDetails = {
                    'datasetName': values.datasetName,
                    'fileName': multipleFileName[i],
                    'base64': multipleFileBase64[i]
                }
                imageFiles.push(imageDetails);
            }
            outgoingSocket.send(JSON.stringify(imageFiles));
        }
    }

    incomingSocket.onmessage = event => {
        var json_object = JSON.parse(event.data)

        if (json_object.trigger === "upload successful") {
            alert(json_object.amount + " files were uploaded successfully.");
            if (imageDatasetOutgoingSocket.readyState === 1) {
                imageDatasetOutgoingSocket.send("datasetInformation");
            }
        } else if (json_object.trigger === "upload unsuccessful") {
            alert("There was an error uploading " + json_object.amount + " files. Please try again later. If the problem persists contact technical support.");
        } else if (json_object.trigger === "file already exists") {
            alert(json_object.amount + " files with the same filename already exist. Please change the offending filenames and try again.");
        } else if (json_object.trigger === "files too large") {
            alert("The " + json_object.amount + "Mb total file size you attemtped to upload exceeds the 250Mb upload limit. Please reduce the total file size and try again.");
        } else {
            alert("Error");
        }
    }


    return (

        <div className=" grid justify-items-center w-full h-screen ">
            <div className="lg:pl-20 lg:mt-10 text-center">
                <h1 className="lg:p-5 text-4xl text-orange-bright font-bold whitespace-nowrap uppercase"> Upload Page </h1>
                <h2 className="text-2xl text-black-dark font-medium  whitespace-nowrap">Time to upload new files?</h2>
                <p className="text-xl text-black-dark font-normal">Upload your new dataset or new images to an existing dataset below</p>
                <div className="lg:mt-5 lg:px-10 lg:py-10 shadow-lg">
                    <form onSubmit={(e) => onFileSubmit(e)} onChange={(e) => handleFileChange(e)}>
                        <input className=" outline-none placeholder-black" type="text" name="datasetName" placeholder="Enter dataset name" value={values.datasetName} onChange={handleFileChange}></input>
                    </form>
                </div>
                {/* //Break  */}
                <form onSubmit={(e) => onFileSubmit(e)} onChange={(e) => onChange(e)}>
                    <div className="max-w-xl mt-10 mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
                        <div className="md:flex">
                            <div className="w-full">
                                <div className="p-4 border-b-3"> <span className="text-xl font-bold text-sundance-gold">Upload</span> </div>
                                <div className="p-3">
                                    <div className="mb-2"> <span>Attachments</span>
                                        <div className="relative h-40 rounded-lg border-dashed border-2 border-gray-400 bg-white flex justify-center items-center hover:cursor-pointer">
                                            <div className="absolute">
                                                <div className="flex flex-col items-center "> <i className="fa fa-cloud-upload fa-3x text-gray-200"></i> <span class="block text-gray-400 font-normal">Attach you files here</span> <span class="block text-gray-400 font-normal">or</span> <span class="block text-blue-400 font-normal">Browse files</span> </div>
                                            </div> <input type="file" accept="image/jpeg" id="file" allowdirs="true" multiple className="h-full w-full opacity-0" name="" />
                                        </div>
                                        <p id="showFiles"></p>
                                        <div className="flex justify-between items-center text-gray-400"> <span>Accepted file type:jpg/jpeg only</span> <span class="flex items-center "><i class="fa fa-lock mr-1"></i> Total Selected Files: <a id="numberOfFiles" className="text-orange-bright">0</a></span> </div>
                                    </div>
                                    <div className="mt-3 text-center pb-3">
                                        <input className="shadow-custom-shadow h-10 w-96 rounded-xl text-xl text-white bg-sundance-blue hover:bg-orange-bright cursor-pointer" type="submit" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UploadComponent;
