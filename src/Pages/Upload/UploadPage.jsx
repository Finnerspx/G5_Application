import React from 'react'
import Navbar from '../../Components/Navigation/Navbar';
import UploadComponent from '../../Components/Upload/UploadComponent';

function UploadPage() {
    return (
        <div className="w-full h-screen">  
            <div>
                <Navbar />
            </div>
                <UploadComponent/>

        </div>
    )
}

export default UploadPage;
