import React from 'react'
import Navbar from '../../Components/Navigation/Navbar'
import Sidebar from '../../Components/SideBar/Sidebar'
import { IoPersonAdd, IoInformationCircle } from "react-icons/io5";
import { ImBin2 } from "react-icons/im";
import { Link } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import '../MainDashboard.css';
import useEdit from '../../Components/Edit/useEdit';


const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/editImage');


function EditPage(props) {


    const {values, handleChange} = useEdit();

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

    return (
        <div className="grid-container">
            <div className="item1">
                <Navbar />
            </div>
            <div className="item2">
                <Sidebar
                    topTitle={"Image Details"}
                    topIcon={<IoInformationCircle className="lg:w-8 lg:h-8" />}
                    longBtnOne={
                        <div className="hover:text-white font-medium hover:bg-sundance-blue lg:mt-52 lg:ml-2 lg:bg-custom-gray lg:flex lg:justify-start lg:shadow-custom-shadow lg:items-center lg:rounded lg:h-9 lg:w-60">
                            <Link to="/" className="lg:flex lg:inline lg:pl-9">
                                <div className="lg:mr-2 lg:mt-1"><ImBin2 /></div>
                        Delete All Annotations
                    </Link>
                        </div>
                    }
                    longBtnTwo={<div className="hover:text-white font-semibold hover:bg-sundance-blue lg:ml-2 lg:bg-custom-gray lg:flex lg:justify-start lg:shadow-custom-shadow lg:items-center lg:rounded lg:h-10 lg:w-60">
                        <Link to="/" className="lg:flex lg:inline lg:pl-16">
                            <div className="lg:mr-5 lg:mt-1"><AiFillHome /></div>
                    Home
                </Link>
                    </div>}

                />
            </div>
            <div className="item3">
                <div className="w-full h-screen grid justify-items-center">
                    <div className="lg:mr-20 lg:mt-28 lg:w-3/4 lg:h-2/3 bg-gray-200">
                        {
                            props.buttonPressed
                                ? <div>
                                    <h1 className="text-2xl text-orange-bright font-medium whitespace-nowrap uppercase">{props.imageName}</h1>
                                    <img className="object-center w-52 h-52" src={'data:image/jpeg; base64,' + props.thumbnailOfImage} />
                                    <div className="lg:mt-10" >
                                        <form onSubmit={(event) => onSubmit(event)} onChange={(event) => handleChange(event)}>
                                            {/**Coordinates Form */}
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <input
                                                        name="x0"
                                                        type="text"
                                                        value={values.x0}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        name="y0"
                                                        type="text"
                                                        value={values.y0}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="x1" 
                                                        value={values.x1}
                                                        onChange={handleChange}
                                                        />
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="y1" 
                                                        value={values.y1}
                                                        onChange={handleChange}
                                                        
                                                        />
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="label" 
                                                        value={values.label}
                                                        onChange={handleChange}
                                                        inputProps={{maxLength: 12}}
                                                        
                                                        />
                                                </div>


                                            </div>

                                            <div>
                                                <input className="shadow-custom-shadow h-10 w-96 rounded-xl text-xl text-white bg-sundance-blue hover:bg-orange-bright cursor-pointer" type="submit"/>
                                            </div>



                                        </form>

                                    </div>

                                </div>
                                : <h1 className="lg:mt-20 text-2xl text-orange-bright font-medium ">No image has been seleted to edit</h1>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPage;


{/* <div className="w-full h-screen">
<div>
    <Navbar />
</div>
<Sidebar/>
<div className="w-full h-screen  grid justify-items-center">
    <div className="lg: mt-20 w-2/3 h-2/3 bg-gray-200">
{
        props.buttonPressed
            ? <div className="grid justify-items-center lg:mt-16">
                <h1 className="lg:mt-20 text-2xl text-orange-bright font-medium whitespace-nowrap uppercase">{props.imageName}</h1>
                <img className="lg:mt-10 object-center w-72 h-52" src={'data:image/jpeg; base64,' + props.thumbnailOfImage} />
            </div>

            : <div>
                <h1>Nothing has been selected to edit</h1>
            </div>

    }

    </div>
  

</div>
</div> */}