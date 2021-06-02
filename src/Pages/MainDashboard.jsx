import React from 'react';
import Navbar from '../Components/Navigation/Navbar';
import Sidebar from '../Components/SideBar/Sidebar';
import DatasetNodeRED from '../Services/DatasetNodeREDConnection/DatasetNodeRED';
import Carousel from "react-elastic-carousel"
import ImageNodeRED from '../Services/ImageNodeREDConnection/ImageNodeRED';

class MainDashboard extends React.Component {

    constructor() {
        super();
        this.datasetDetails = [];
        this.jsonObjectDataset = [];
        this.state = {
            datasetContents: []
        };

    }

    onMessageRecieve = () => {

    }

    render() {

        const datasetBreakpoints = [
            {
                width: 1920, itemsToShow: 3, itemsToScroll: 3
            }
        ];
        const imageBreakPoints = [
            { width: 1920, itemsToShow: 4, itemsToScroll: 5 },
        ];


        return (
            <div className="w-full h-screen">
                <Navbar />
                <div className="lg:grid lg:grid-cols-3 gap-3">
                    <div className="justify-items-start md:w-60 lg:w-72 bg-orange-bright h-screen shadow-custom-shadow">
                        <Sidebar />
                    </div>
                    <div className="grid-rows-2 grid-flow-col gap-4">
                        <div className="lg:mt-20">
                            <div className="px-10 py-10">
                                <button type="button" onClick={this.onMessageRecieve}>Test</button>
                            </div>
                            <DatasetNodeRED breakpoints={datasetBreakpoints} />
                        </div>
                        <div>
                            <ImageNodeRED breakpoints={imageBreakPoints} />
                        </div>
                    </div>

                </div>

            </div>


        )
    }
}
export default MainDashboard;




