import React from 'react';
import Navbar from '../Components/Navigation/Navbar';
import Sidebar from '../Components/SideBar/Sidebar';
import Dataset from '../Services/DatasetNodeREDConnection/Dataset';
import Images from '../Services/ImageNodeREDConnection/Images';
import { FaFolder } from 'react-icons/fa';
import { IoMdImage } from 'react-icons/io';
import { IoPersonAdd, IoInformationCircle, IoCodeWorking } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { RiFilterFill } from "react-icons/ri";
import { HiOutlineRefresh } from "react-icons/hi";
import { MdFileUpload, MdEdit, MdFileDownload, MdDone } from "react-icons/md";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { GiResize } from "react-icons/gi";
import { BiRename } from "react-icons/bi";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import './MainDashboard.css';
import useBulkOperations from '../Components/Bulk_Operations/useBulkOperations';
import ContinueCheck from '../Components/Bulk_Operations/continueCheck';


const outgoingBulk = new WebSocket('ws://127.0.0.1:1880/ws/bulkEdit');

var filesToDownload = [];
var zipFile = new JSZip();


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
    }

    function getDownloadData(imageTitle, imageThumbnail) {
        filesToDownload.push({
            title: imageTitle,
            thumbnail: imageThumbnail
        })
        setFilesToDownload(filesToDownload);
    }

    function handleImageEditData(nameOfImage, thumbnailOfImage, editButtonPressedValue, imageWidth, imageHeight) {
        props.getImageData(nameOfImage, thumbnailOfImage, editButtonPressedValue, datasetNameValue, imageWidth, imageHeight);
    }

    function handleDownload() {
        for (var i = 0; i < filesToDownload.length; i++) {
            zipFile.file(filesToDownload[i].title, filesToDownload[i].base64, { base64: true });
        }
        zipFile.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, "download.zip");
        })
    }

    function handleBulkRename() {
        if (outgoingBulk.readyState === 1) {
            var bulkRename = {
                'type': 'rename',
                'datasetName': datasetNameValue,
            };
            outgoingBulk.send(JSON.stringify(bulkRename));
        }
    }

    const { theBulkRotate, theBulkResize, handleRotateChange, handleResizeChange, handleRotateSubmit, handleResizeSubmit } = useBulkOperations(datasetNameValue);

    return (

        <div className="grid-container">
            <div className="item1">
                <Navbar />
            </div>
            <div className="item2">
                <Sidebar
                    topTitle={"Dataset"}
                    topIcon={<FaFolder className="lg:w-8 lg:h-8" />}
                    midIcon={<IoInformationCircle className="lg:w-8 lg:h-8" />}
                    lowIcon={<RiFilterFill className="lg:w-8 lg:h-8" />}
                    lowTitle={"Filter"}
                    phases={"To be implemented in phase 2"}
                    midTitle={"Image Details"}
                    smallBtnOne={
                        <div className="hover:text-white font-medium hover:bg-sundance-blue lg:mt-5 lg:ml-2 lg:bg-custom-gray lg:flex lg:justify-start lg:shadow-custom-shadow lg:items-center lg:rounded lg:h-10 lg:w-28">
                            <Link to="/upload" className="lg:flex lg:inline lg:pl-4">
                                <div className="lg:mr-2 lg:mt-1"><MdFileUpload /></div>
                    Upload
                    </Link>
                        </div>
                    }

                    smallBtnTwo={
                        <button className="hover:text-white font-medium lg:h-10 lg:w-28 flex flex-row bg-custom-gray rounded outline-none pl-2 py-2 lg:shadow-custom-shadow hover:bg-sundance-blue" onClick={handleDownload} >
                            <div className="lg:mr-1 lg:mt-1"><MdFileDownload /></div>
                    Download
                    </button>
                    }

                    longBtnOne={
                        <div className="hover:text-white font-medium hover:bg-sundance-blue lg:mt-5 lg:ml-2 lg:bg-custom-gray lg:flex lg:justify-start lg:shadow-custom-shadow lg:items-center lg:rounded lg:h-9 lg:w-60">
                            <Link to="/collaborators" className="lg:flex lg:inline lg:pl-9">
                                <div className="lg:mr-2 lg:mt-1"><IoPersonAdd /></div>
                            Add Collaborators
                        </Link>
                        </div>
                    }

                    longBtnTwo={<div className="hover:text-white font-semibold hover:bg-sundance-blue lg:mt-5 lg:ml-2 lg:bg-custom-gray lg:flex lg:justify-start lg:shadow-custom-shadow lg:items-center lg:rounded lg:h-10 lg:w-60">
                        <Link to="/editPage" className="lg:flex lg:inline lg:pl-16">
                            <div className="lg:mr-5 lg:mt-1"><MdEdit /></div>
                        Edit
                    </Link>
                    </div>}

                    longBtnThree={<Popup
                        trigger={<button className="hover:text-white font-medium lg:h-10 lg:w-60 flex flex-row bg-custom-gray rounded outline-none pl-2 py-2 lg:shadow-custom-shadow hover:bg-sundance-blue" >
                            <div className="lg:mr-5 lg:mt-1"><GiResize className="lg:ml-10" /></div>
                    Bulk Resize
            </button>}
                        modal
                        nested
                    >
                        {close => (
                            <div>
                                <form onSubmit={(e) => handleResizeSubmit(e)} onChange={(e) => handleResizeChange(e)}>
                                    <button className="lh:w-5 lg:w-5" onClick={close}>
                                        &times;
                        </button>
                                    <div className="text-xl font-medium text-black-dark  grid justify-items-center"> Bulk Reize </div>
                                    <div className="content">
                                        {' '}
                                        <div className="grid justify-items-center">
                                            <div className="bg-black-dark lg:mt-5 lg:w-72 lg:h-16 shadow-custom-shadow">
                                                <input className="lg:w-72 lg:h-16 text-center bg-black-dark outline-none placeholder-white"
                                                    type="text"
                                                    placeholder="Enter new size"
                                                    name="bulkResize"
                                                    value={theBulkResize}
                                                    onChange={handleResizeChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 lg:mt-4">
                                        <div className="grid justify-items-center">
                                            <Popup
                                                trigger={<button className="lg:ml-72 shadow-custom-shadow w-32 lg:h-10 rounded text-xl text-white bg-black-dark hover:bg-orange-bright cursor-pointer" >
                                                    Continue
            </button>}
                                                modal
                                                nested
                                            >
                                                {close => (
                                                    <div>
                                                        <button className="lh:w-5 lg:w-5" onClick={close}>
                                                            &times;
                        </button>
                                                        <div className="text-lg font-medium text-black-dark  grid justify-items-center"> Do you wish to continue?</div>
                                                        <div className="content">
                                                            {' '}
                                                            <div className="grid justify-items-center">
                                                                <ContinueCheck resize={true} resizeValue={theBulkResize} datasetName={datasetNameValue} />
                                                            </div>
                                                        </div>


                                                    </div>
                                                )}
                                            </Popup>
                                            {/* <input className="lg:ml-72 shadow-custom-shadow w-32 lg:h-10 rounded text-xl text-white bg-black-dark hover:bg-orange-bright cursor-pointer" type="submit" /> */}
                                        </div>
                                        <div className="grid justify-items-center">
                                            <div className="lg:mr-72 shadow-custom-shadow w-32 lg:h-10 rounded text-xl text-white bg-black-dark hover:bg-orange-bright cursor-pointer">
                                                <button
                                                    className="lg:ml-10 lg:mt-1"
                                                    onClick={() => {
                                                        close();
                                                    }}
                                                >
                                                    close
                                        </button>
                                            </div>
                                        </div>
                                    </div>

                                </form>

                            </div>
                        )}
                    </Popup>
                    }

                    longBtnFour={<Popup
                        trigger={<button className="hover:text-white font-medium lg:h-10 lg:w-60 flex flex-row bg-custom-gray rounded outline-none pl-2 py-2 lg:shadow-custom-shadow hover:bg-sundance-blue" >
                            <div className="lg:mr-5 lg:mt-1"><BiRename className="lg:ml-10" /></div>
                         Bulk Rename
                          </button>}
                        modal
                        nested
                    >
                        {close => (
                            <div>
                                <button className="lh:w-5 lg:w-5" onClick={close}>
                                    &times;
                        </button>
                                <div className="text-lg font-medium text-black-dark  grid justify-items-center"> Do you wish to continue?</div>
                                <div className="content">
                                    {' '}
                                    <div className="grid justify-items-center">
                                    <button className="lg:mt-4 shadow-custom-shadow w-32 lg:h-10 rounded text-xl text-white bg-sundance-blue hover:bg-orange-bright cursor-pointer" onClick={handleBulkRename}>Yes</button>

                                    </div>
                                </div>


                            </div>
                        )}
                    </Popup>
                    }
                    longBtnFive={
                        <Popup
                            trigger={<button className="hover:text-white font-medium lg:h-10 lg:w-60 flex flex-row bg-custom-gray rounded outline-none pl-2 py-2 lg:shadow-custom-shadow hover:bg-sundance-blue" >
                                <div className="lg:mr-5 lg:mt-1"><GiResize className="lg:ml-10" /></div>
                        Bulk Rotate
                </button>}
                            modal
                            nested
                        >
                            {close => (
                                <div>
                                    <form onChange={(e) => handleRotateChange(e)} onSubmit={(e) => handleRotateSubmit(e)} >

                                        <button className="lh:w-5 lg:w-5" onClick={close}>
                                            &times;
                            </button>
                                        <div className="text-xl font-medium text-black-dark  grid justify-items-center"> Bulk Rotate </div>
                                        <div className="content">
                                            {' '}
                                            <div className="grid justify-items-center">
                                                <div className="bg-black-dark lg:mt-5 lg:w-72 lg:h-16 shadow-custom-shadow">
                                                    <input className="lg:w-72 lg:h-16 text-center bg-black-dark outline-none placeholder-white"
                                                        type="text" placeholder="Enter rotation degree"
                                                        name="bulkRotate"
                                                        value={theBulkRotate}
                                                        onChange={handleRotateChange}

                                                    />
                                                </div>
                                            </div>


                                        </div>
                                        <div className="grid grid-cols-2 lg:mt-4">
                                            <div className="grid justify-items-center">
                                                <Popup
                                                    trigger={<button className="lg:ml-72 shadow-custom-shadow w-32 lg:h-10 rounded text-xl text-white bg-black-dark hover:bg-orange-bright cursor-pointer" >
                                                        Continue
            </button>}
                                                    modal
                                                    nested
                                                >
                                                    {close => (
                                                        <div>
                                                            <button className="lh:w-5 lg:w-5" onClick={close}>
                                                                &times;
                        </button>
                                                            <div className="text-lg font-medium text-black-dark  grid justify-items-center"> Do you wish to continue?</div>
                                                            <div className="content">
                                                                {' '}
                                                                <div className="grid justify-items-center">
                                                                    <ContinueCheck resize={false} resizeValue={theBulkRotate} datasetName={datasetNameValue} />
                                                                </div>
                                                            </div>


                                                        </div>
                                                    )}
                                                </Popup>
                                            </div>
                                            <div className="grid justify-items-center">
                                                <div className="lg:mr-72 shadow-custom-shadow w-32 lg:h-10 rounded text-xl text-white bg-black-dark hover:bg-orange-bright cursor-pointer">
                                                    <button
                                                        className="lg:ml-10 lg:mt-1"
                                                        onClick={() => {
                                                            close();
                                                        }}
                                                    >
                                                        close
                                        </button>
                                                </div>
                                            </div>
                                        </div>


                                    </form>
                                </div>
                            )}
                        </Popup>

                    }


                />
            </div>
            <div className="item3 lg:mt-10 lg:mr-40 ">
                <div className="lg:flex lg:flex-row lg:items-center lg:font-normal lg:text-2xl">
                    <FaFolder className="lg:w-10 lg:h-10" />
                    <div className="lg:ml-5">
                        <h3>Dataset</h3>
                    </div>
                </div>
                <div className="lg:mt-5">
                    <Dataset getData={getData} />
                </div>
            </div>
            <div className="item4 lg:mb-60 lg:mr-20">
                <div className="lg:flex lg:flex-row lg:items-center lg:font-normal lg:text-2xl">
                    <IoMdImage className="lg:h-10 lg:w-10" />
                    <div className="lg:mr-20 lg:ml-5">
                        <h3>Selected Dataset Images</h3>
                    </div>
                </div>
                <div>
                    <Images handleImageEditData={handleImageEditData} getDownloadData={getDownloadData} breakpoints={imageBreakPoints} datasetName={datasetNameValue} booleanValue={buttonClicked} />
                </div>
            </div>
        </div>
    );
}

export default MainDashboard;

