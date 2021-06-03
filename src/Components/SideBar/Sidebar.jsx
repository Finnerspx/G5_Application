import React from 'react';
import { MdFileUpload, MdEdit, MdFileDownload } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { IoInformationCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { RiFilterFill } from "react-icons/ri";

function Sidebar() {
    return (
            <div className="justify-items-start md:w-60 lg:w-72 bg-orange-bright h-screen shadow-custom-shadow">
            <div className="lg:pt-10 lg:ml-5 lg:flex lg:flex-row lg:items-center lg:font-normal lg:text-xl">
                    <FaFolder className="lg:w-8 lg:h-8" />
                    <div className="lg:ml-5">
                        <h2>Dataset</h2>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="hover:text-white font-semibold hover:bg-sundance-blue lg:mt-5 lg:ml-2 lg:bg-custom-gray lg:flex lg:justify-start lg:shadow-custom-shadow lg:items-center lg:rounded lg:h-10 lg:w-28">
                        <Link to="/upload" className="lg:flex lg:inline lg:pl-4">
                            <div className="lg:mr-2 lg:mt-1"><MdFileUpload /></div>
                    Upload
                    </Link>
                    </div>
                    <div className="lg:ml-3 lg:mt-5 lg:items-center lg:rounded">
                        <button className="hover:text-white font-semibold lg:h-10 lg:w-28 flex flex-row bg-custom-gray rounded outline-none pl-2 py-2 lg:shadow-custom-shadow hover:bg-sundance-blue" >
                            <div className="lg:mr-1 lg:mt-1"><MdFileDownload /></div>
                        Download
                        </button>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="hover:text-white font-semibold hover:bg-sundance-blue lg:mt-5 lg:ml-2 lg:bg-custom-gray lg:flex lg:justify-start lg:shadow-custom-shadow lg:items-center lg:rounded lg:h-9 lg:w-60">
                        <Link to="/collaborators" className="lg:flex lg:inline lg:pl-9">
                            <div className="lg:mr-2 lg:mt-1"><IoPersonAdd/></div>
                            Add Collaborators
                        </Link>
                    </div>
                </div>
                <div className="lg:mt-10 lg:ml-5 lg:flex lg:flex-row lg:items-center lg:font-normal lg:text-xl">
                    <IoInformationCircle className="lg:w-8 lg:h-8" />
                    <div className="lg:ml-5">
                        <h2>Image Details</h2>
                    </div>
                </div>
                <p className="lg:pr-8 lg:mt-5 text-white font-semibold text-md">To be implemented in phase 2</p>
                <div className="flex flex-row">
                    <div className="hover:text-white font-semibold hover:bg-sundance-blue lg:mt-5 lg:ml-2 lg:bg-custom-gray lg:flex lg:justify-start lg:shadow-custom-shadow lg:items-center lg:rounded lg:h-10 lg:w-60">
                        <Link to="/edit" className="lg:flex lg:inline lg:pl-16">
                            <div className="lg:mr-5 lg:mt-1"><MdEdit/></div>
                            Edit
                        </Link>
                    </div>
                </div>
                <div className="lg:mt-10 lg:ml-5 lg:flex lg:flex-row lg:items-center lg:font-normal lg:text-xl">
                    <RiFilterFill className="lg:w-8 lg:h-8" />
                    <div className="lg:ml-5">
                        <h2>Filter</h2>
                    </div>   
                </div>
                <p className="lg:pr-8 lg:mt-5 text-white font-semibold text-md">To be implemented in phase 2</p>
                <div className="lg:pt-80">
                    <button className="bg-sundance-blue lg:px-24 lg:py-3 font-bold text-xl text-black rounded shadow-custom-shadow hover:bg-sundance-gold hover:text-white">Training</button>                    
                </div>

            </div>
    )
}

export default Sidebar;

// onClick={handleDownload}