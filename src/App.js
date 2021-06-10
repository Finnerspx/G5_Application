import React from 'react';
import MainDashboard from './Pages/MainDashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UploadPage from './Pages/Upload/UploadPage';
import Collaborators from './Pages/Collaborators/Collaborators';
import EditPage from './Pages/Edit/EditPage';


function App() {

  const [imageName, setImageName] = React.useState();
  const [imageThumbnail, setImageThumbnail] = React.useState();
  const [editButtonPressed, setEditButtonPressed] = React.useState(false);
  const [datasetName, setDatasetName] = React.useState();

  function getImageData(nameOfImage, thumbnailOfImage, editButtonPressedValue, nameOfDataset){
    setImageName(nameOfImage);
    setImageThumbnail(thumbnailOfImage);
    setEditButtonPressed(editButtonPressedValue);
    setDatasetName(nameOfDataset);
  }



  return (
    <>

      <Router>
        {/* {!isLoggedIn ? (<Form/>)
      : <MainDashboard/>} */}
        <Switch>
          <Route path="/" exact component={()=> <MainDashboard  getImageData={getImageData}/>} />
          <Route path='/upload' component={UploadPage} />
          <Route path="/collaborators" component={Collaborators}/>
          <Route path="/editPage" component={()=> <EditPage datasetName={datasetName} buttonPressed={editButtonPressed} imageName={imageName} thumbnailOfImage={imageThumbnail}/>}/>
        </Switch>
      </Router>

    </>
  );

}

export default App;
