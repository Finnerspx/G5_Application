import React from 'react';
import MainDashboard from './Pages/MainDashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UploadPage from './Pages/Upload/UploadPage';
import Collaborators from './Pages/Collaborators/Collaborators';


function App() {
  return (
    <>
      <Router>
        {/* {!isLoggedIn ? (<Form/>)
      : <MainDashboard/>} */}
        <Switch>
          <Route path="/" exact component={MainDashboard} />
          <Route path='/upload' component={UploadPage} />
          <Route path="/collaborators" component={Collaborators}/>
        </Switch>
      </Router>

    </>
  );

}

export default App;
