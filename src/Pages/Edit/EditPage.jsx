import React from 'react'
import Navbar from '../../Components/Navigation/Navbar'
import Sidebar from '../../Components/SideBar/Sidebar'
import '../MainDashboard.css';

function EditPage(props) {

    return (
        <div className="grid-container">
            <div className="item1">
                <Navbar/>
            </div>
            <div className="item2">
                <Sidebar/>
            </div>
            <div className="item3">
                <div className="w-full h-screen grid justify-items-center">
                    <div className="lg:mr-20 lg:mt-28 lg:w-3/4 lg:h-2/3 bg-gray-200">
                        {
                            props.buttonPressed
                            ? <div>
                                <h1 className="text-2xl text-orange-bright font-medium whitespace-nowrap uppercase">{props.imageName}</h1>
                                <img className="object-center w-52 h-52" src={'data:image/jpeg; base64,' + props.thumbnailOfImage} />
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