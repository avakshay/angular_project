import React from 'react'
import Login from './Login';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MyAccount from './MyAccount';
import Banking from './Banking';
import BetlistLive from './BetlistLive'
import BetList from './BetList'
import RiskManagement from './RiskManagement'
import Downline from './Downline'
import Market from './Market'
import Accountstatement from './Accountstatement';
import Profile from './Profile'
import Transfrredlog from './Transfrredlog'
import ActivityLog from './ActivityLog'
import Combine from './Combine'
import RunningFullmarket from './RunningFullmarket'



function App() { 
  
  return (
   <React.Fragment>
     <Router>
       <Switch>
        
        <Route exact path= '/' component={Combine}></Route>
        <Route exact path='/:eventType' component={Combine}></Route>
        <Route exact path='/:eventType/:subType' component={Combine}></Route>

       
       </Switch>
     </Router>
   </React.Fragment>
  );
}

export default App;
