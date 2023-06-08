import React, { useState,useEffect } from 'react'
import Cookies from 'universal-cookie';
import Transparent from './images/transparent.gif'
import Addmember from './Addmember';
import AddAgents from './AddAgents';
import AddSuper from './AddSuper';
import BankingModel from './BankingModel';
import ChangeStatus from './ChangeStatus';
import CreditRef from './CreditRef';
import Dashboard from './Dashboard';
import Marqueebox from './Marqueebox';
import TotalBox from './TotalBox';
import FixedFooter from './FixedFooter';
import axios from 'axios';
import AgentProfile from "./AgentProfile";
import ClientProfile from "./ClientProfile";

const cookies = new Cookies();

export default function Agents(props) {

    const [Changestatus, setChangestatus] = useState(false);
    const [AddMember, setAddMember] = useState(false);
    const [AddAgent, setAddAgent] = useState(false);
    const [Creditrefence, setCreditrefence] = useState(false);
    const [agentId, setagentId] = useState('');
    const [currentStatus, setcurrentStatus] = useState('');
    const [agentType, setagentType] = useState('');
    const [lev, setlev] = useState('');
    const [updatedStatus, setupdatedStatus] = useState(true);
    const [userId, setuserId] = useState('');
    const [userLevel, setuserLevel] = useState(null);
    
    const [agentStack, setagentStack] = useState([]);
    const [view, setview] = useState(1);
    const [pro, setpro] = useState(1);




    useEffect(()=>{

        
        var ssid = cookies.get('sid');
        axios.post('http://65.0.111.203:3000/agentInfo',{
         sid:ssid
        })
        .then(result => {
           
     
          if(result.status === 200){
             
             setuserId(result.data.id);
             setuserLevel(result.data.level);
             
             let arr = [];
             let obj = {userid:result.data.id,level:result.data.level}
             arr.push(obj);
             
             setagentStack(arr);
            
          
           }
          
         }
         
         ).catch(e => {
            //setIsError(true);
         });
         
        
     },[]);



    
   const changeUpdatedStatus = ()=>{
       
       setupdatedStatus(!updatedStatus);
   }
  
   
   const pushAgent = (agent,cla) => {
       let arr = [...agentStack];
       
       arr.push({userid:agent,level:cla});
       
       setagentStack(arr);
       console.log(agentStack,'push');
       
   }
    
  const popAgent = (index) => {
      let arrr = [...agentStack];
      
      setagentStack(arrr.splice(0,index+1));
   } 
  const changeView = (v) => {
      setview(v);  
  } 
  const changePro = (v) => {
    setpro(v);  
  } 

 
  
   
  const HandlePopup = (val1,val2,obj)=>{
        if(val1 === 1){
          setChangestatus(val2);
          if(val2 === true){
            setlev(obj.lev);
            setagentId(obj.user);
            setcurrentStatus(obj.userstatus);
            setagentType(obj.type);
          }
        }
        if(val1 === 2){
          setAddMember(val2);
        }
        if(val1 === 3){
          setCreditrefence(val2);
        }
        if(val1 === 4){
          setAddAgent(val2);
       }
   }
   
   

    return (
        <React.Fragment>
          {Changestatus && <ChangeStatus changeUpdatedStatus = {changeUpdatedStatus} HandlePopup={HandlePopup} lev = {lev} agentId = {agentId} currentStatus = {currentStatus} agentType = {agentType}/>}
          {AddMember && <Addmember HandlePopup={HandlePopup}/>}
          {AddAgent && <AddAgents HandlePopup={HandlePopup} userLevel = {userLevel}/>}
          {Creditrefence && <CreditRef HandlePopup={HandlePopup}/>}  
          <div id="mainWrap" class="main_wrap">
            <Marqueebox/>
            <AddSuper view={view} changeView={changeView} popAgent = {popAgent} changeUpdatedStatus = {changeUpdatedStatus} agentStack = {agentStack} HandlePopup={HandlePopup} agentId = {agentId} userId = {userId} userLevel = {userLevel}/>
            {view === 1 && <TotalBox/>}
            {view === 1 && <Dashboard view={view} changeView={changeView} changePro = {changePro} userLevel={userLevel} agentStack = {agentStack} pushAgent = {pushAgent} HandlePopup={HandlePopup} updatedStatus = {updatedStatus}/>}
            {view === 2 && <AgentProfile agentStack = {agentStack}/>}
            {view === 3 && <ClientProfile agentStack = {agentStack} pro = {pro}/> }
          </div> 
          <BankingModel/>
          <FixedFooter/> 
                   
        </React.Fragment>
       )
    }
