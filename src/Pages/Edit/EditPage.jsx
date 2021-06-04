import React from 'react'
import Navbar from '../../Components/Navigation/Navbar'

function EditPage(props) {

    return (
        <div className="w-full h-screen">
            <div>
                <Navbar />
            </div>
            <div className="w-full h-screen  grid justify-items-center">
                {
                    props.buttonPressed
                        ? <div>
                            <h1>{props.imageName}</h1>
                            <img src={'data:image/jpeg; base64,' + props.thumbnailOfImage} />
                        </div>

                        : <div>
                            <h1>Nothing has been selected to edit</h1>
                        </div>

                }


            </div>
        </div>
    )
}

export default EditPage;
