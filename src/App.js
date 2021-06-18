import React, {useState} from 'react';
import MainDashboard from './Pages/MainDashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UploadPage from './Pages/Upload/UploadPage';
import Collaborators from './Pages/Collaborators/Collaborators';
import EditPage from './Pages/Edit/EditPage';
import LoginNodeREDConnection from './Components/Login/LoginNodeRedConnection';
import Form from './Pages/Form/Form';

  /**
   * Represents main run time function. 
   * Controls the state of whether a user is logged in or not. 
   * Conditional rendering based on login success as to whether user is met with landing page or main dashboard.
   * Routes are set within App for navigation.
   */
  
function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  LoginNodeREDConnection.incomingSocket.onmessage = e => {
    if (e.data == "login success") {
      setIsLoggedIn(true);
    }
  }

  const [imageName, setImageName] = React.useState();
  const [imageThumbnail, setImageThumbnail] = React.useState();
  const [editButtonPressed, setEditButtonPressed] = React.useState(false);
  const [datasetName, setDatasetName] = React.useState();
  const [imageWidth, setImageWidth] = React.useState();
  const [imageHeight, setImageHeight] = React.useState();

  function getImageData(nameOfImage, thumbnailOfImage, editButtonPressedValue, nameOfDataset, imageWidth, imageHeight){
    setImageName(nameOfImage);
    setImageThumbnail(thumbnailOfImage);
    setEditButtonPressed(editButtonPressedValue);
    setDatasetName(nameOfDataset);
    setImageWidth(imageWidth);
    setImageHeight(imageHeight);
  }

  function getLoggedOut(isClicked) {
    setIsLoggedIn(isClicked);
  }


  return (
    <>

      <Router>
        {!isLoggedIn ? (<Form/>)
      :  <Route path="/" exact component={()=> <MainDashboard getLoggedOut={getLoggedOut} getImageData={getImageData}/>} />}
        <Switch>
          {/* <Route path="/" exact component={()=> <MainDashboard  getImageData={getImageData}/>} /> */}
          <Route path='/upload' component={UploadPage} />
          <Route path="/collaborators" component={Collaborators}/>
          <Route path="/editPage" component={()=> <EditPage datasetName={datasetName} buttonPressed={editButtonPressed} imageName={imageName} thumbnailOfImage={imageThumbnail} imageWidth={imageWidth} imageHeight={imageHeight}/>}/>
        </Switch>
      </Router>

    </>
  );

}

export default App;
