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
                                        <div className="flex justify-between items-center text-gray-400"> <span>Accepted file type:jpg/jpeg only</span> <span class="flex items-center "><i class="fa fa-lock mr-1"></i> secure</span> </div>
                                    </div>
                                    <div className="mt-3 text-center pb-3">  <input className="shadow-custom-shadow h-10 w-96 rounded-xl text-xl text-white bg-sundance-blue hover:bg-orange-bright cursor-pointer" type="submit" /> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>


        </div>

        // <div className="lg:mt-28">
        //     <div>
        //         <h1 className="text-4xl text-orange-bright font-bold inline-block mr-4 py-2 whitespace-nowrap uppercase">Upload Page</h1>
        //     </div>
        //     <div>
        //         <form className="bg-white lg:shadow-xl rounded lg:px-8 lg:pt-6 lg:pb-8 lg:mb-4" onSubmit={(e) => onFileSubmit(e)} onChange={(e) => handleFileChange(e)}>
        //             <input className="outline-none placeholder-sundance-blue mt-5" type="text" name="datasetName" placeholder="Enter dataset name" value={values.datasetName} onChange={handleFileChange}></input>
        //         </form>
        //     </div>
        //     <div>
        //         <form className="lg:mt-5" onSubmit={(e) => onFileSubmit(e)} onChange={(e) => onChange(e)}>
        //                 <label className=" ml-5 bg-sundance-blue w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-orange-bright text-white hover:text-sundance-blue">
        //                     <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        //                         <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        //                     </svg>
        //                     <span className="mt-2 text-base leading-normal">Select a file</span>
        //                     <input type='file' className="hidden" id="file" allowdirs="true" multiple />
        //                 </label>
        //             <div className="lg:mt-5 items-center">
        //                 <input className="shadow-custom-shadow h-10 w-80 rounded-xl text-xl text-white bg-sundance-blue hover:bg-orange-bright cursor-pointer" type="submit" />
        //             </div>
        //         </form>
        //     </div>

        // </div>
    );
}

export default UploadComponent;
