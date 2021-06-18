import React from 'react';
import Dropdown from './Dropdown';
import { FaUserAlt } from "react-icons/fa";
import { MdHelpOutline } from "react-icons/md";
import Logo from '../../Logo/Logo.png';
import '../../Logo/logo.css';
import {Link} from 'react-router-dom'

/**
 * Represents Navbar
 * @param {*} props 
 * @returns JSX for navigation with use of props for values passed in 
 */

const Navbar = (props) => {

  /**
   * Represents getIsClicked
   * @param {boolean} isClicked 
   * props function to determine dropdown being clicked so it opens
   */

  function getIsClicked(isClicked) {
    props.getIsClicked(isClicked)
  }


    return (
        <>
          <nav className="relative flex flex-wrap items-center justify-between px-2 bg-black-dark h-20 mb-3">
            <div className="container px-3 mx-auto flex flex-wrap items-center justify-between">
              <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                <Link to="/">
                <h1
                  className="text-4xl text-orange-bright font-bold inline-block mr-4 py-2 whitespace-nowrap uppercase"
                  
                >
                  G5 - <a className="text-3xl text-sundance-gold font-semibold inline-block mr-1 py-2 whitespace-nowrap">Application</a>
                </h1>
                </Link>
               
              </div>
              <div
                className={
                  "lg:flex flex-grow items-center lg:mr-10"
                }
               
              >
                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto lg:mr-20">
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white"
                    >
                     <Dropdown dropdownIcon={<MdHelpOutline className="h-5 w-5"/>} color={"red"} first={"Accessibility Information"} second={"Documentation"} third={"Additional Training"} fourth={"Sundance Website"}/>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="#pablo"
                    >
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white"
                    >
                      <Dropdown getIsClicked={getIsClicked} dropdownIcon={<FaUserAlt className="h-5 w-5"/>} color={"green"} first={"Account Information"} second={"Logout"}/>
                    </a>
                  </li>
                </ul>
                <div className="sundance-logo-nav">
                    <img src={Logo}></img>
                </div>
              </div>
            </div>
          </nav>
        </>
      );



    // return (
    //     <div className="w-full h-20 bg-black-dark">
    //         <div className="">
    //         <div className="grid justify-items-start lg:ml-60 lg:py-5">
    //             <h1 className="text-3xl text-orange-bright font-bold">G5 - <a className="text-3xl text-sundance-gold font-semibold">Application</a></h1>
    //         </div>
    //         <div className="">
    //                 <Dropdown color={"red"}/>
    //             </div>
    //         </div>
            
    
    //     </div>
    // );
}

export default Navbar;