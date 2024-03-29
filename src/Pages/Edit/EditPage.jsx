import React from 'react'
import Navbar from '../../Components/Navigation/Navbar'
import Sidebar from '../../Components/SideBar/Sidebar'
import { IoPersonAdd, IoInformationCircle } from "react-icons/io5";
import { ImBin2 } from "react-icons/im";
import { Link } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import '../MainDashboard.css';
import useEdit from '../../Components/Edit/useEdit';
import ImageMapper from "react-image-mapper";


const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/editImage');

/**
 * Represents EditPage
 * @param {*} props 
 * @returns Image Mapper of image along with a form so that user can click coordinates and enter them into form along with label name to submit to Node-RED
 */


function EditPage(props) {

    var imageThumbnail = `data:image/jpeg;base64, ${props.thumbnailOfImage}`;

    const [x_coordinate, setX] = React.useState();
    const [y_coordinate, setY] = React.useState();
    
    
    const { values, handleChange } = useEdit(); //React hook for edit


    /**
     * Represents onSubmit
     * @param {event} e 
     * Upon the input of type submit in the form returned by EditPage being clicked this event function is called.
     * Here an array with all details required to be sent to Node-RED for annotating and labelling an image are instantiated. 
     * Outgoing socket connection is checked for a posiotive ready state and if so it will send the array as a JSON object to Node-RED
     */
    const onSubmit = e => {
        e.preventDefault();
        if (outgoingSocket.readyState === 1) {
            var editImageDetails = {
                'imageName': props.imageName,
                //'imageThumbnail': props.thumbnailOfImage,
                'datasetName': props.datasetName,
                'x0': values.x0,
                'y0': values.y0,
                'x1': values.x1,
                'y1': values.y1,
                'label': values.label,
            };

            outgoingSocket.send(JSON.stringify(editImageDetails));
        }
    }
    /**
     * Represents clickedOutside
     * @param {*} event 
     * Value captures the coordinates from ImageMapper and sets them
     */

    function clickedOutside(event) {
        const x_coordinate = event.nativeEvent.layerX;
        const y_coordinate = event.nativeEvent.layerY;
        setX(x_coordinate);
        setY(y_coordinate);
    };

    return (
        <div className="grid-container">
            <div className="item1">
                <Navbar />
            </div>
            <div className="item2">
                <Sidebar
                    topTitle={props.imageName}
                    topIcon={<IoInformationCircle className="lg:w-8 lg:h-8" />}

                    longBtnTwo={<div className="hover:text-white font-semibold hover:bg-sundance-blue lg:mb-96 lg:ml-2 lg:bg-custom-gray lg:flex lg:justify-start lg:shadow-custom-shadow lg:items-center lg:rounded lg:h-10 lg:w-60">
                        <Link to="/" className="lg:flex lg:inline lg:pl-16">
                            <div className="lg:mr-5 lg:mt-1"><AiFillHome /></div>
                    Home
                </Link>
                    </div>}

                />
            </div>
            <div className="item3">
                <div className="w-full h-screen grid justify-items-center">
                    {
                        props.buttonPressed
                            ? <div>
                                <div className="lg:mt-5 lg:mr-32 shadow-xl lg:px-40 lg:py-10">
                                    <div className="flex justify-center cursor-crosshair">
                                    <ImageMapper
                                        src={imageThumbnail}
                                        width={props.imageWidth/2}
                                        height={props.imageHeight/2}
                                        onImageClick={event => clickedOutside(event)}
                                    />
                                    </div>
                                    <h2 className="text-1xl font-semibold">Selected Coordinates</h2>
                                    <p className="text-lg font-medium">X: <a className="text-sundance-blue">{x_coordinate}</a> & Y: <a className="text-orange-bright">{y_coordinate}</a></p>
                                </div>

                                <div className="lg:mt-5">
                                    <form onSubmit={(event) => onSubmit(event)} onChange={(event) => handleChange(event)}>
                                        <div className="grid grid-cols-2 gap-4 lg:mr-32">
                                            <div className="col-span-2">
                                                <input
                                                    type="text"
                                                    name="label"
                                                    className="bg-gray-200 lg:px-10 lg:py-5 rounded shadow-custom-shadow outline-none text-black placeholder-black"
                                                    value={values.label}
                                                    onChange={handleChange}
                                                    inputProps={{ maxLength: 12 }}
                                                    placeholder="Annotation Name"
                                                    />

                                            </div>
                                            <div>
                                                    <input
                                                        className="bg-gray-200 lg:px-5 lg:py-5 rounded shadow-custom-shadow outline-none text-black placeholder-black"
                                                        name="x0"
                                                        type="text"
                                                        value={values.x0}
                                                        onChange={handleChange}
                                                        placeholder="x0"
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        className="bg-gray-200 lg:px-5 lg:py-5 rounded shadow-custom-shadow outline-none text-black placeholder-black"

                                                        name="y0"
                                                        type="text"
                                                        value={values.y0}
                                                        onChange={handleChange}
                                                        placeholder="y0"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 lg:mt-5 lg:mr-32">
                                                <div>
                                                    <input
                                                        className="bg-gray-200 lg:px-5 lg:py-5 rounded shadow-custom-shadow outline-none text-black placeholder-black"

                                                        name="x1"
                                                        type="text"
                                                        value={values.x1}
                                                        onChange={handleChange}
                                                        placeholder="x1"
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        className="bg-gray-200 lg:px-5 lg:py-5 rounded shadow-custom-shadow outline-none text-black placeholder-black"

                                                        name="y1"
                                                        type="text"
                                                        value={values.y1}
                                                        onChange={handleChange}
                                                        placeholder="y1"
                                                    />
                                                </div>
                                            </div>
                                            <div className="lg:mt-5 lg:mr-32">
                                                <input className="shadow-custom-shadow lg:px-52 lg:py-5 rounded text-xl font-bold text-white bg-sundance-blue hover:bg-orange-bright cursor-pointer" type="submit" />
                                            </div>

                                    </form>
                                </div>
                                </div>

                            : <h1>Noting</h1>
                    }

                </div>
            </div>
            </div>
    )
}

export default EditPage;