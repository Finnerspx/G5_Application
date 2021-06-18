import React from 'react';
import { MdFileUpload, MdEdit, MdFileDownload } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { IoInformationCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { RiFilterFill } from "react-icons/ri";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

var zipFile = new JSZip();

/**
 * Represents Sidebar
 * @param {*} props 
 * @returns Sidebar JSX
 */

function Sidebar(props) {

    
    return (
            <div className="justify-items-start md:w-60 lg:w-72 bg-orange-bright h-screen shadow-custom-shadow">
            <div className="lg:pt-10 lg:ml-5 lg:flex lg:flex-row lg:items-center lg:font-normal lg:text-xl">
                    {props.topIcon}
                    <div className="lg:ml-5">
                        <h2>{props.topTitle}</h2>
                    </div>
                </div>
                <div className="flex flex-row">
                  {props.smallBtnOne}
                    <div className="lg:ml-3 lg:mt-5 lg:items-center lg:rounded">
                       {props.smallBtnTwo}
                    </div>
                </div>
                <div className="flex flex-row">
                   {props.longBtnOne}
                </div>
                <div className="lg:mt-10 lg:ml-5 lg:flex lg:flex-row lg:items-center lg:font-normal lg:text-xl">
                   {props.midIcon}
                    <div className="lg:ml-5">
                        <h2>{props.midTitle}</h2>
                    </div>
                </div>
                <p className="lg:pr-8 lg:mt-5 text-white font-medium text-md">{props.phases}</p>
                <div className="flex flex-row">
                    {props.longBtnTwo}
                </div>
                <div className="lg:mt-10 lg:ml-5 lg:flex lg:flex-row lg:items-center lg:font-normal lg:text-xl">
                    {props.lowIcon}
                    <div className="lg:ml-5">
                        <h2>{props.lowTitle}</h2>
                    </div>   
                </div>
                <p className="lg:pr-8 lg:mt-5 text-white font-semibold text-md">{props.phases}</p>
                <div className="lg:ml-3 lg:mt-5 lg:items-center lg:rounded">
                    {props.longBtnThree}
                </div>
                <div className="lg:ml-3 lg:mt-5 lg:items-center lg:rounded">
                    {props.longBtnFour}
                </div>
                <div className="lg:ml-3 lg:mt-5 lg:items-center lg:rounded">
                    {props.longBtnFive}
                </div>
                <div className="lg:pt-10">
                    <button className="bg-sundance-blue lg:px-24 lg:py-3 font-bold text-xl text-black rounded shadow-custom-shadow hover:bg-sundance-gold hover:text-white">Training</button>                    
                </div>

            </div>
    )
}

export default Sidebar;

// onClick={handleDownload}