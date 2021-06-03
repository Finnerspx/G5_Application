import React from 'react'
import useUpload from './useUpload';



const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/uploadDataset');
const incomingSocket = new WebSocket('ws://127.0.0.1:1880/ws/uploadDatasetResponse');

function UploadComponent() {

    
    const { handleFileChange, handleFileSubmit, values } = useUpload();
    var multipleFileName = [];
    var multipleFileBase64 = [];



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
    }

    const _handleReaderLoader = readEvent => {
        /**Creates a base64 encoded ASCII string from a string of binary data 
         * btoa = binary to ASCII
         */
        let binaryString = readEvent.target.result;
        multipleFileBase64.push(btoa(binaryString));
        // setBase64(btoa(binaryString));
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
                outgoingSocket.send(JSON.stringify(imageDetails));
                var indexName = multipleFileName.indexOf(i);
                var indexBase64 = multipleFileBase64.indexOf(i);
                multipleFileName.splice(indexName, 1);
                multipleFileBase64.splice(indexBase64, 1);
            }


        }
    }


   return (

        <div className="lg:mt-48">
            <div>
                <form className="bg-white lg:shadow-xl rounded lg:px-8 lg:pt-6 lg:pb-8 lg:mb-4" onSubmit={(e) => onFileSubmit(e)} onChange={(e) => handleFileChange(e)}>
                    <input className="outline-none placeholder-sundance-blue mt-5" type="text" name="datasetName" placeholder="Enter dataset name" value={values.datasetName} onChange={handleFileChange}></input>
                </form>
            </div>
            <div>
                <form className="lg:mt-5" onSubmit={(e) => onFileSubmit(e)} onChange={(e) => onChange(e)}>
                        <label className=" ml-5 bg-sundance-blue w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-orange-bright text-white hover:text-sundance-blue">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span className="mt-2 text-base leading-normal">Select a file</span>
                            <input type='file' className="hidden" id="file" allowdirs="true" multiple/>
                        </label>
                    <div className="lg:mt-5 items-center">
                        <input className="shadow-custom-shadow h-10 w-80 rounded-xl text-xl text-white bg-sundance-blue hover:bg-orange-bright cursor-pointer" type="submit" />
                    </div>
                </form>
            </div>

        </div>
    );
   }

export default UploadComponent;
