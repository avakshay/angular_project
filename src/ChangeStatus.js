import React, { useState,useEffect } from 'react'
import Transparent from './images/transparent.gif'
import {toast} from 'react-toastify'
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();
toast.configure()

export default function ChangeStatus(props) {

    const [currentStatus,setcurrentStatus] = useState(props.currentStatus);
    const [select,setselect] = useState(0);
    const [pass,setpass] = useState('');


    const updateStatus = ()=>{
        if(select === 0){
         toast.warn('Please select a status', {position:toast.POSITION.TOP_CENTER})
        }
        else if(pass === '' || pass === ' '){
         toast.warn('password can not be blank', {position:toast.POSITION.TOP_CENTER})
        }
        else if(props.agentType === 'ag'){
        var ssid = cookies.get('sid');
        if(!ssid) return;
        axios.post('http://65.0.111.203:3000/updateStatusAgent',{
               sid:ssid,
               status:select,
               agentId:props.agentId,
               password:pass

              })
              .then(result => {
                  if(result.status === 200){
                     toast.success('Agent status updated successfully', {position:toast.POSITION.TOP_CENTER})
                     props.changeUpdatedStatus();
                     setcurrentStatus(select);
                     setselect(0);
                     
                     props.HandlePopup(1,false)
  
                  }
                  else{
                    toast.warn('Something went wrong', {position:toast.POSITION.TOP_CENTER})
                  }
         
                 }
                     
                ).catch(e => {
                  //setIsError(true);
              });
            }
       else if(props.agentType === 'cli'){
          var ssid = cookies.get('sid');
          if(!ssid) return;
          axios.post('http://65.0.111.203:3000/updateStatusClient',{
               sid:ssid,
               status:select,
               agentId:props.agentId,
               password:pass

              })
              .then(result => {
                  if(result.status === 200){
                     toast.success('Client status updated successfully', {position:toast.POSITION.TOP_CENTER})
                     props.changeUpdatedStatus();
                     setcurrentStatus(select);
                     setselect(0);
                      
                     props.HandlePopup(1,false)
                    
                  }
                  else{
                    toast.warn('Something went wrong', {position:toast.POSITION.TOP_CENTER})
                  }
         
                 }
                     
                ).catch(e => {
                  //setIsError(true);
              });
       
         }
      }

  
     
  return (
   <React.Fragment>
   <div id="changeStatusModal" class="pop_bg" style={{display: 'block'}}>
   <div class="pop_box">
    <a class="close_pop" onClick={()=>{window.changePage = 2; props.HandlePopup(1,false)}}>close_pop</a>
    <h3>Change Status</h3>
    <div class="status_id">
      <p id="changeAccount"><span class="lv_2">{props.lev}</span>{props.agentId}</p>
    {currentStatus == 1 && <p class="status-active" id="originalStatus"><img src={Transparent}/>Active</p>}
    {currentStatus == 2 && <p class="status-suspend" id="originalStatus"><img src={Transparent}/>Suspended</p>}
    {currentStatus == 3 && <p class="status-lock" id="originalStatus"><img src={Transparent}/>Locked</p>}
    </div>

    <div class="white-wrap">

      <ul id="statusBtn" class="status_but">
        <li>
          <a id="activeBtn" onClick = {()=>{if(currentStatus != 1){if(select === 1){setselect(0)}else{setselect(1)}}}} className={`but_active ${(select == 1) ? "open": ""} ${(currentStatus == 1) ? "disable": ""}`} data-status="active">
            <img class="" src={Transparent}/>
            Active
          </a>
        </li>
        <li>
          <a id="suspendBtn" onClick = {()=>{if(currentStatus == 1){if(select === 2){setselect(0)}else{setselect(2)}}}} className={`but_suspend ${(select == 2) ? "open": ""} ${(currentStatus == 2 || currentStatus == 3) ? "disable": ""}`}  data-status="suspend">
            <img class="" src={Transparent}/>
            Suspend
          </a>
        </li>
        <li>
          <a id="lockedBtn" onClick = {()=>{if(currentStatus != 3) {if(select === 3){setselect(0)}else{setselect(3)}}}} className={`but_locked ${(select == 3) ? "open": ""} ${(currentStatus == 3) ? "disable": ""}`}  data-status="locked">
            <img class="" src={Transparent}/>
            Locked
          </a>
        </li>
      </ul>

    </div>

    <div class="suspend-wrap" id="maxWinLossSuspendDiv" style={{display: 'none'}}>
      <div class="status_id" id="maxWinLossSuspendStatus"></div>

      <div class="fix-content">
        <p id="maxLossSuspendInfo" style={{display: 'none'}}>Please change downline Max Loss Limit over the total loss or executed on Transferable P/L, before you unsuspend.</p>
        <p id="maxWinSuspendInfo" style={{display: 'none'}}>Please change downline Max Win Limit over the total win or executed on Transferable P/L, before you unsuspend.</p>

        <ul class="status_but">
          <li>
            <a class="but_suspend disable" id="maxLossUnSuspendBtn" >Unsuspend <strong>Loss</strong> Limit</a>
          </li>
          <li>
            <a class="but_suspend disable" id="maxWinUnSuspendBtn" >Unsuspend <strong>Win</strong> Limit</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="suspend-wrap" id="passLockDiv" style={{display: 'none'}}>
      <div class="sys-lock status_id">
        <p class="status-lock"><img src={Transparent}/>Passlocked</p>
      </div>

      <div class="fix-content">
        <ul class="status_but">
          <li>
            <a class="but_locked" id="unPassLockBtn" >Unlock</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="sys-suspend status_id" id="systemSuspendMessage" style={{display: 'none'}}>
      <p class="status-suspend"><img src={Transparent}/>System Suspend</p>
    </div>

    <div class="sys-lock status_id" id="systemLockedMessage" style={{display: 'none'}}>
      <p class="status-lock"><img src={Transparent}/>System Locked</p>
    </div>

    <div class="btn_box inline-form">
      <dl class="form_list">

        <dt>Password
        </dt>
        <dd>
          <input onChange = {(e)=>{setpass(e.target.value)}} id="changeStatusPassword" type="password" placeholder="Enter"/>
        </dd>
      </dl>
      <div class="btn_box">
        <a id="changeStatusBtn" onClick = {()=>{updateStatus();}} class="btn-send">Change
        </a>
      </div>
    </div>
   </div>
  </div>
 </React.Fragment>
  )
}
