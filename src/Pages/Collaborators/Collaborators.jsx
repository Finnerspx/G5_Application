import React from 'react'
import { PhaseThreeData, PhaseTwoData } from '../../Components/Maintenance/PhaseContent'
import Navbar from '../../Components/Navigation/Navbar'

/**
 * Represents Collaborators Page
 * @returns JSX to display phases 2 and 3 for the user
 */

function Collaborators() {
    return (
        <div className="w-full h-screen">
            <div>
                <Navbar />
            </div>
            <div className="w-full h-screen grid justify-items-center">
                <div className="grid justify-items-center lg:mt-20">
                    <h1 className="text-4xl text-orange-bright font-bold whitespace-nowrap uppercase">Work In Progress</h1>
                    <p className="font-normal text-xl">Check back soon - look below too what changes are due in which phase :)</p>
                </div>
                <div className="lg:mt-16">
                <h2 className="font-bold text-2xl">Phase Two</h2>
                    {PhaseTwoData.map((phaseTwo, index) => (
                        <div key={index} className="lg:p-3 justify-items-start inline-block">
                            <div className="lg:w-60 lg:h-72 rounded overflow-hidden lg:shadow-lg">
                                <img className="rounded w-full object-cover" src={phaseTwo.displayImage} />
                                <div className="lg:mb-6 lg:ml-5">
                                    <div className="flex flex-row items-center">
                                        <div className="font-semibold text-lg text-sundance-blue lg:justify-items-start">
                                            {phaseTwo.title}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lg:mt-5">
                    <h2 className="font-bold text-2xl">Phase Three</h2>
                {PhaseThreeData.map((phaseThree, index) => (
                        <div key={index} className="lg:p-3 justify-items-start inline-block">
                            <div className="lg:w-60 lg:h-72 rounded overflow-hidden lg:shadow-lg">
                                <img className="rounded w-full object-cover" src={phaseThree.displayImage} />
                                <div className="lg:mb-6 lg:ml-5">
                                    <div className="flex flex-row items-center">
                                        <div className="font-semibold text-lg text-sundance-blue lg:justify-items-start">
                                            {phaseThree.title}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Collaborators
