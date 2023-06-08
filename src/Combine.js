import React, { useState,useEffect } from 'react'
import LoginAgent from './Login'
import Header from './Header';
import {toast} from 'react-toastify'
import Cookies from 'universal-cookie';
import axios from 'axios';
import Agents from './Agents';
import Accountstatement from './Accountstatement';
import BetList from "./BetList";
import Downline from "./Downline";
import Market from "./Market";
import BetListLive from "./BetlistLive";
import RiskManagement from "./RiskManagement";
import Banking from "./Banking";
import MyAccount from './MyAccount';
import Profile from './Profile'
import Transfrredlog from './Transfrredlog'
import ActivityLog from './ActivityLog'
import RunningFullmarket from './RunningFullmarket';
import Runningmarketanlysis from './Runningmarketanlysis';
import Changepassword from './Changepassword';


toast.configure()

const cookies = new Cookies();

  
export default function Combine(props) {

  
   var eventT = 1;
  
  if(props.match.params.eventType === 'agents'){
    eventT = 1;
   }
   else if(props.match.params.eventType === 'myAccount' && props.match.params.subType === 'accountCashStatement'){
    eventT = 9;
   }
   else if(props.match.params.eventType === 'myAccount' && props.match.params.subType === 'accountSummary'){
    eventT = 2;
   }
   else if(props.match.params.eventType === 'myAccount' && props.match.params.subType === 'transferredLog'){
    eventT = 10;
   }
   else if(props.match.params.eventType === 'myAccount' && props.match.params.subType === 'profile'){
    eventT = 11;
   }
   else if(props.match.params.eventType === 'myAccount' && props.match.params.subType === 'activityLog'){
    eventT = 12;
   }
   else if(props.match.params.eventType === 'myAccount'){
    eventT = 2;
   }
   else if(props.match.params.eventType === 'downLineProfitLoss'){
     eventT = 3;
   }
   else if(props.match.params.eventType === 'marketProfitLoss'){
     eventT = 4;
   }
   else if(props.match.params.eventType === 'betList'){
     eventT = 5;
   }
   else if(props.match.params.eventType === 'betListLive'){
    eventT = 6;
   }
   else if(props.match.params.eventType === 'riskManagement'){
    eventT = 7;
   }
  else if(props.match.params.eventType === 'cashBanking'){
    eventT = 8;
   }
   else if(props.match.params.eventType === 'Runningmarketanlysis'){
    eventT = 14;
   }
   const [isLoggedIn, setLoggedIn] = useState(null);
   const [tabMenu,setTabMenu] = useState(eventT);
   const [user,setuser] = useState('');
   const [balance,setbalance] = useState(0);
   const [level,setlevel] = useState('');
   const [ShowPassModel, setShowPassModel] = useState(false)

   


   useEffect(()=>{

		if(cookies.get('sid')){
      setLoggedIn(true);
      
      var ssid = cookies.get('sid');
      axios.post('http://65.0.111.203:3000/agentInfo',{
			 sid:ssid
			})
			.then(result => {
			   
   
			  if(result.status === 200){
				   
           setuser(result.data.id);
           setbalance(result.data.balance);
           if(result.data.level == 1){
             setlevel('SA');
           }
           else if(result.data.level == 2){
            setlevel('SS');
           }
          else if(result.data.level == 3){
            setlevel('SM');
           }
          else if(result.data.level == 4){
            setlevel('MA');
           }
				
			   }
			  else{
          setLoggedIn(false);
          cookies.remove('sid',  { path: '/' });
				 
			   }
			 }
			 
		   ).catch(e => {
			    //setIsError(true);
		   });
		   
		  
     }
     else{
       setLoggedIn(false);
     }
   },[isLoggedIn]);
    
    
  useEffect(()=>{
    setTabMenu(eventT);
    
  },[eventT]);
  

   const checkShowLogin = (bool)=>{
     setLoggedIn(bool);
   }
   const handlepassmodel = ()=>{
    setShowPassModel(true)
  }
   const handleClosepassmodel = ()=>{
    setShowPassModel(false)
  }

   return (
    <React.Fragment>
     {isLoggedIn === false && <LoginAgent checkShowLogin={checkShowLogin}/>}
     {isLoggedIn && ShowPassModel  && <Changepassword  handleClosepassmodel={handleClosepassmodel}/>}
     {isLoggedIn && <Header tabMenu = {tabMenu} user = {user} balance = {balance} level = {level}/>}
     {isLoggedIn && tabMenu === 1 && <Agents/>}
     {isLoggedIn && tabMenu === 2 && <MyAccount user = {user}  level = {level}/>}
     {isLoggedIn && tabMenu === 3 && <Downline/>}
     {isLoggedIn && tabMenu === 4 && <Market/>}
     {isLoggedIn && tabMenu === 5 && <BetList/>}
     {isLoggedIn && tabMenu === 6 && <BetListLive/>}
     {isLoggedIn && tabMenu === 7 && <RiskManagement/>}
     {isLoggedIn && tabMenu === 8 && <Banking balance={balance}/>}
     {isLoggedIn && tabMenu === 9 && <Accountstatement user = {user}  level = {level}/>}
     {isLoggedIn && tabMenu === 10 && <Transfrredlog user = {user}  level = {level}/>}
     {isLoggedIn && tabMenu === 11 && <Profile user = {user}  level = {level} handlepassmodel={handlepassmodel}/>}
     {isLoggedIn && tabMenu === 12 && <ActivityLog user = {user}  level = {level}/>}
     {isLoggedIn && tabMenu === 14 && <Runningmarketanlysis/>}


  
    </React.Fragment>
  )
}
