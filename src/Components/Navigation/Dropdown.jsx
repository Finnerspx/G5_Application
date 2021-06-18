import React from 'react';
import { createPopper } from "@popperjs/core";

/**
 * Represents Dropdown
 * @param {*} props 
 * @returns JSX of a dropdown menu within the Navbar
 */

const Dropdown = (props) => {

    const [showDropdown, setShowDropdown] = React.useState(false);

    const btnDropRef = React.createRef();
    const popoverDropRef = React.createRef();

    const [isClicked, setIsClicked] = React.useState(false);

    const openDropdownPopover = () => {
        createPopper(btnDropRef.current, popoverDropRef.current, {
            placement: "bottom-start"
        });
        
        setShowDropdown(true);
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    }

    const handleClickSecond = () => {
      if (isClicked === true) {
        setIsClicked(false);
      } else {
        setIsClicked(true);
      }
      props.getIsClicked(isClicked);
    }

    let bgColor;
    props.color === "white"
      ? (bgColor = "bg-blueGray-700")
      : (bgColor = "bg-" + props.color + "-500");

      return (
        <>
            <div className="relative inline-flex align-middle w-full">
              <button
                // className={
                //   "text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 " +
                //   bgColor
                // }
                type="button"
                ref={btnDropRef}
                onClick={() => {
                    showDropdown
                    ? closeDropdown()
                    : openDropdownPopover();
                }}
              >
                {props.dropdownIcon}
              </button>
              <div
                ref={popoverDropRef}
                className={
                  (showDropdown ? "block " : "hidden ") +
                  (props.color === "white" ? "bg-white " : bgColor + " ") +
                  "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
                }
                style={{ minWidth: "12rem" }}
              >
                <a
                  href="#pablo"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                    (props.color === "white" ? " text-blueGray-700" : "text-white")
                  }
                  onClick={e => e.preventDefault()}
                >
                  {props.first}
                </a>
                <a
                  href="#pablo"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                    (props.color === "white" ? " text-blueGray-700" : "text-white")
                  }
                  onClick={handleClickSecond}
                >
               {props.second}
                </a>
                <a
                  href="#pablo"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                    (props.color === "white" ? " text-blueGray-700" : "text-white")
                  }
                  onClick={e => e.preventDefault()}
                >
                  {props.third}
                </a>
                <div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25" />
                <a
                  href="#pablo"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                    (props.color === "white" ? " text-blueGray-700" : "text-white")
                  }
                  onClick={e => e.preventDefault()}
                >
                  {props.fourth}
                </a>
              </div>
            </div>
      </>
    );

}

export default Dropdown
