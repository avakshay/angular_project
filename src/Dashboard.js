import React, { useState,useEffect } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import Transparent from './images/transparent.gif'


const cookies = new Cookies();


var globalArray1 = [];
var globalArray2 = [];


export default function Dashboard(props) {
   const [user,setuser] = useState([]);
   const [client,setclient] = useState([]);
   const [agentView,setagentView] = useState(1);
   const [clientView,setclientView] = useState(1);
   const [a,seta] = useState(1);
   const [b,setb] = useState(1);
   
   
    useEffect(()=>{
        if(props.agentStack.length > 1)return;
        globalArray1 = [];
        globalArray2 = [];
        var ssid = cookies.get('sid');
        if(!ssid) return;
        
        if(window.changePage != 1){
          setagentView(1);
          setclientView(1);
        }
        axios.post('http://65.0.111.203:3000/agentBelowDetailInfo',{
               sid:ssid
    
              })
              .then(result => {
                 
                  if(result.status === 200){
                     
                    
                    for (let key in result.data) { 
                        
                        if (result.data.hasOwnProperty(key)) 
                        { 
                            result.data[key].user = key;
                            globalArray1.push(result.data[key]);
                            
                            
                        } 
                    }
                    let arr = [];
                    globalArray1.map((item)=>{
                        arr.push(item);
                    });
                    var startCount = 0;
                    
                    if(window.changePage == 1){
                      var startCount = 10*(agentView-1);
                    }
                    setuser(arr.splice(startCount,10)); 
                    if(window.changePage == 1){
                        window.changePage = 2;
                    }

                  }
         
                 }
                     
                ).catch(e => {
                  //setIsError(true);
              });

        axios.post('http://65.0.111.203:3000/clientBelowDetailInfo',{
            sid:ssid
    
              })
              .then(result => {
                  if(result.status === 200){
                    
                    
                    for (let key in result.data) { 
                        
                        if (result.data.hasOwnProperty(key)) 
                        { 
                            result.data[key].user = key;
                            globalArray2.push(result.data[key]);
                        } 
                    }
                    
                    let arr = [];
                    globalArray2.map((item)=>{
                        arr.push(item);
                    });
                    var startCount = 0;
                    if(window.changePage == 1){
                      var startCount = 10*(clientView-1);
                    }
                    setclient(arr.splice(startCount,10)); 
                    if(window.changePage == 1){
                        window.changePage = 2;
                    }

                  }
         
                 }
                     
             ).catch(e => {
                  //setIsError(true);
             });
             
             
          
        },[props.updatedStatus]);


        
    useEffect(()=>{
        
        let arr = [];
        globalArray1.map((item)=>{
            arr.push(item);
        });
        var startCount = 10*(agentView-1);
        
        
        setuser(arr.splice(startCount,10)); 


        },[agentView]);


    useEffect(()=>{
       
       
        
        let arr = [];
        globalArray2.map((item)=>{
            arr.push(item);
        });
        var startCount = 10*(clientView-1);
        
        
        setclient(arr.splice(startCount,10)); 
                    
        },[clientView]);


    const changeCountAgent = (e)=>{
        
        seta(parseInt(e.target.value));
        
    }

    const changeCountClient = (e)=>{
       
        setb(parseInt(e.target.value));
        
        
    }

    useEffect(()=>{
       
        if(props.agentStack.length <= 1)return;
        var agentId = props.agentStack[props.agentStack.length-1].userid;
        
        var ssid = cookies.get('sid');
        if(!ssid) return;
        globalArray1 = [];
        globalArray2 = [];
        setagentView(1);
        setclientView(1);

        axios.post('http://65.0.111.203:3000/agentBelowBelowDetailInfo',{
               sid:ssid,
               agentId:agentId
    
              })
              .then(result => {
                  if(result.status === 200){
                     
                    for (let key in result.data) { 
                        
                        if (result.data.hasOwnProperty(key)) 
                        { 
                            result.data[key].user = key;
                            globalArray1.push(result.data[key]);
                            
                            
                        } 
                    }
                    let arr = [];
                    globalArray1.map((item)=>{
                        arr.push(item);
                    });
                    var startCount = 10*(agentView-1);
                    
                    setuser(arr.splice(0,10)); 
                    

                  }
         
                 }
                     
                ).catch(e => {
                  //setIsError(true);
            });

        axios.post('http://65.0.111.203:3000/clientBelowBelowDetailInfo',{
            sid:ssid,
            agentId:agentId

    
              })
              .then(result => {
                  if(result.status === 200){
                    
                    for (let key in result.data) { 
                        
                        if (result.data.hasOwnProperty(key)) 
                        { 
                            result.data[key].user = key;
                            globalArray2.push(result.data[key]);
                        } 
                    }
                    let arr = [];
                    globalArray2.map((item)=>{
                        arr.push(item);
                    });
                    var startCount = 10*(clientView-1);
                    
                    setclient(arr.splice(0,10)); 
                    
                    // console.log(result);

                  }
         
                 }
                     
             ).catch(e => {
                  //setIsError(true);
             });
             
   
      },[props.agentStack.length]);

    
    
        

    return (
        <React.Fragment>
           {globalArray1.length > 0 && <table id="resultTable" class="table01 margin-table" style={{display:' table'}}>
            <tbody><tr>
                <th id="accountTh" width="" class="align-L" >Account(Agents)</th>
                <th id="creditRefTh" style={{display:'none'}} width="10%" >Credit Ref.</th> 
                <th id="creditLimitTh" width="10%" style={{display:'none'}}>Credit Limit</th>
                
                <th id="currentPLTh" width="10%" style={{display:'none'}}>Current P/L
                </th>
                <th id="transferablePLTh" width="10%" style={{display:'none'}}>Transferable P/L
                </th>
                <th id="balanceTh" width="10%" >Remaining bal.</th>
                <th id="exposureTh" width="10%" >Total Agent bal.</th>
                <th id="availableBalanceTh" width="10%" >Total client bal.</th>
                <th id="creditPLTh" width="10%" style={{display:'none'}}>Balance</th>
                <th id="playerBalanceTh" width="10%" >Available bal.</th>
                <th id="exposureLimitTh" width="10%" style={{display:'none'}}>Exposure Limit</th>
            
                <th id="refPLTh" width="10%" >Ledger Exposure</th>
                <th id="statusTh" width="10%" >Status</th>
                <th id="actionTh" width="15%" >Action</th>
            </tr>
            <tr id="dataTemplate" style={{display:'none'}}>
                <td id="accountCol"  class="align-L">
                    
                    <a id="account" class="ico_account"></a>
                </td>
                <td id="creditRef" class="credit-amount-member" ><a id="creditRefBtn" class="favor-set" ></a></td>
                <td id="creditLimit" style={{display:'none'}}></td>
                
                <td id="currentPL" style={{display:'none'}}></td>
                <td id="transferablePL" style={{display:'none'}}></td>
                <td id="balance" ></td>
                <td id="currentExposure" ></td>
                <td id="available" ></td>
                <td id="creditPL" style={{display:'none'}}></td>
                <td id="playerBalance" style={{display:'none'}}></td>
                <td id="exposureLimit" style={{display:'none'}}></td>
            
                <td id="refPL" ></td>
                <td id="statusCol" >
                    <ul id="tipsPopup" class="status-popup" style={{display:'none'}}>
                    </ul>
                    <span id="status"></span>
                </td>
                <td id="actionCol" >
                    <ul class="action">
                        <li>
                            <a id="banking" class="bank">Bank</a>
                        </li>
                        <li>
                            <a id="p_l" class="p_l" >Betting Profit &amp; Loss</a>
                        </li>
                        <li>
                            <a id="betting_history" class="betting_history">Betting History</a>
                        </li>
                        <li>
                            <a id="change" class="status" href="#change">Change Status</a>
                        </li>
                        <li>
                            <a id="profile" class="profile">Profile</a>
                        </li>
                    </ul>
                </td>
            </tr>

      {user.map((item,index)=>{
        var lev;
        var cla;
        if(item.level == 1){
            lev = 'SSS';
            cla = '1';
          }
          else if(item.level == 2){
           lev = 'SS';
           cla = '2';
          }
         else if(item.level == 3){
           lev = 'SUP';
           cla = '3';
          }
         else if(item.level == 4){
           lev = 'MA';
           cla = '4';
          }
          
          let b = item.balance ? item.balance : 0;
          let ld = item.ldb ? item.ldb : 0;
          let lw = item.lwc ? item.lwc : 0;
          let le = item.le ? item.le : 0;
          var avail_balance = parseFloat(b)+parseFloat(ld) + parseFloat(lw);
          var status = 1;

          if(item.userBlocked == 0 && item.betBlocked == 0){
              status = 1;
          }
          else if(item.userBlocked == 0 && item.betBlocked == 1){
              status = 2;
          }
          else if(item.userBlocked == 1){
              status = 3;
          }
       
          

        return(
        <tr key={index} id="14" style={{display: 'table-row'}} main_userid="wb77">
                <td id="accountCol"  class="align-L">
                    
                <a onClick ={()=>{if(props.agentStack.length > 0 && props.agentStack[props.agentStack.length-1].level <=4){props.pushAgent(item.user,cla);}}} id="account14" class="ico_account"><span className={`lv_${true ? cla:" "}`}>{lev}</span>{item.user}</a>
                </td>
                <td id="creditRef14" style={{display:'none'}} class="credit-amount-member" ><a id="creditRefBtn" style={{display:'none'}} class="favor-set" >0.00</a></td>
                <td id="creditLimit14" style={{display:'none'}}>0.00</td>
                
                <td id="currentPL14" style={{display:'none'}}>0.00</td>
                <td id="transferablePL14" style={{display:'none'}}>0.00</td>
                <td id="balance14" >{parseFloat(b).toFixed(2)}</td>
                <td id="currentExposure14" >{parseFloat(ld).toFixed(2)}</td>
                <td id="available14" >{parseFloat(lw).toFixed(2)}</td>
                <td id="creditPL14" style={{display:'none'}}>0.00</td>
                <td id="playerBalance14" style={{display: 'table-cell'}}>{parseFloat(avail_balance).toFixed(2)}</td>
                <td id="exposureLimit" style={{display:'none'}}></td>
            
                <td id="refPL14" className={`${(le >= 0) ? "green": "red"}`}>{le >= 0 ? parseFloat(Math.abs(le)).toFixed(2): '('+parseFloat(Math.abs(le)).toFixed(2)+')'}</td>
                <td id="statusCol" >
                    <ul id="tipsPopup" class="status-popup" style={{display:'none'}}>
                    </ul>

                   {item.userBlocked == 0 && item.betBlocked == 0 && <span id="status14"  class="status-active"><img src={Transparent}/>Active</span>}
                   {item.userBlocked == 0 && item.betBlocked == 1 && <span id="status14"  class="status-suspend"><img src={Transparent}/>Suspended</span>}
                   {item.userBlocked == 1 && <span id="status14"  class="status-lock"><img src={Transparent}/>Locked</span>}
                </td>
                <td id="actionCol" >
                    <ul class="action">
                        <li>
                            <a id="banking" class="bank" style={{display:'none'}}>Bank</a>
                        </li>
                        <li>
                            
                        </li>
                        <li>
                            
                        </li>
                        {props.agentStack.length === 1 && <li>
                            <a id="change14" class="status"  onClick={()=>{window.changePage = 1; props.HandlePopup(1,true,{lev:lev,user:item.user,userstatus:status,type:'ag'})}}>Change Status</a>
                        </li>}
                        <li>
                            <a id="profile14" onClick={()=>{if(props.agentStack.length > 0 && props.agentStack[props.agentStack.length-1].level <=4){props.pushAgent(item.user,cla);} props.changeView(2);}} class="profile">Profile</a>
                        </li>
                    </ul>
                 </td>
               </tr>
             )})}
            </tbody></table>}

        {globalArray1.length > 0 && user.length === 0 && <p class="no-data">There are no more agents.</p>} 
        {globalArray1.length > 0 &&  <div>      
            <ul id="pageNumberContent" class="pages">
                <li id="prev"><a onClick = {()=>{if(agentView > 1){setagentView(agentView-1);}}} className={`${(agentView > 1) ? "": "disable"}`}>Prev</a></li>
                <li id="pageNumber"><a  class="select" style={{pointerEvents: 'none'}}>{agentView}</a></li>
                <li id="next"><a onClick = {()=>{if(user.length >= 10){setagentView(agentView+1);}}} className={`${(user.length >= 10) ? "": "disable"}`}>Next</a></li>
                <input onChange= {(e)=>{changeCountAgent(e);}}  type="number" id="goToPageNumber_1"  maxlength="6" size="4"/><a onClick = {()=>{ if(a > 0 && a <= parseInt(globalArray1.length/10)+1) setagentView(a);}} id="goPageBtn_1">GO</a> 
                </ul>
            </div>  }

        {globalArray2.length > 0 &&  <table id="resultTable" class="table01 margin-table" style={{display:' table'}}>
           <tbody><tr>
                <th id="accountTh" width="" class="align-L" >Account(Clients)</th>
                <th id="creditRefTh" style={{display:'none'}} width="10%" >Credit Ref.</th> 
                <th id="creditLimitTh" width="10%" style={{display:'none'}}>Credit Limit</th>
                
                <th id="currentPLTh" width="10%" style={{display:'none'}}>Current P/L
                </th>
                <th id="transferablePLTh" width="10%" style={{display:'none'}}>Transferable P/L
                </th>
                <th id="balanceTh" width="10%" >Remaining bal.</th>
               
                
                <th id="creditPLTh" width="10%" style={{display:'none'}}>Balance</th>
                <th id="playerBalanceTh" width="10%" >Exposure</th>
                <th id="exposureLimitTh" width="10%" style={{display:'none'}}>Exposure Limit</th>
            
                <th id="refPLTh" width="10%" >Ledger Exposure</th>
                <th id="statusTh" width="10%" >Status</th>
                <th id="actionTh" width="15%" >Action</th>
            </tr>

         {client.map((item,index)=>{
          
          
          let b = item.balance ? item.balance : 0;
          
          let le = item.le ? item.le : 0;
          let expo = item.exposure ? item.exposure : 0;
          var status = 1;

          if(item.userBlocked == 0 && item.betBlocked == 0){
              status = 1;
          }
          else if(item.userBlocked == 0 && item.betBlocked == 1){
              status = 2;
          }
          else if(item.userBlocked == 1){
              status = 3;
          }
          

          

        return(
        <tr key={index} id="14" style={{display: 'table-row'}} main_userid="wb77">
                <td id="accountCol"  class="align-L">
                    
                <a style = {{pointerEvents:'none'}} id="account14" class="ico_account"><span class="lv_0">PL</span>{item.user}</a>
                </td>
                <td id="creditRef14" style={{display:'none'}} class="credit-amount-member" ><a id="creditRefBtn" style={{display:'none'}} class="favor-set" >0.00</a></td>
                <td id="creditLimit14" style={{display:'none'}}>0.00</td>
                
                <td id="currentPL14" style={{display:'none'}}>0.00</td>
                <td id="transferablePL14" style={{display:'none'}}>0.00</td>
                <td id="balance14" >{parseFloat(b).toFixed(2)}</td>
                
                <td id="creditPL14" style={{display:'none'}}>0.00</td>
                <td id="playerBalance14" class = "red" style={{display: 'table-cell'}}>{'('+ parseFloat(Math.abs(expo)).toFixed(2)+')'}</td>
                <td id="exposureLimit" style={{display:'none'}}></td>
            
                <td id="refPL14" className={`${(le >= 0) ? "green": "red"}`}>{le >= 0 ? parseFloat(Math.abs(le)).toFixed(2): '('+parseFloat(Math.abs(le)).toFixed(2)+')'}</td>
                <td id="statusCol" >
                    <ul id="tipsPopup" class="status-popup" style={{display:'none'}}>
                    </ul>

                   {item.userBlocked == 0 && item.betBlocked == 0 && <span id="status14"  class="status-active"><img src={Transparent}/>Active</span>}
                   {item.userBlocked == 0 && item.betBlocked == 1 && <span id="status14"  class="status-suspend"><img src={Transparent}/>Suspended</span>}
                   {item.userBlocked == 1 && <span id="status14"  class="status-lock"><img src={Transparent}/>Locked</span>}
                </td>
                <td id="actionCol" >
                    <ul class="action">
                        <li>
                            <a id="banking" class="bank"  style={{display:'none'}}>Bank</a>
                        </li>
                        
                       {props.agentStack.length === 1 &&  <li>
                            <a id="change14" class="status"  onClick={()=>{window.changePage = 1; props.HandlePopup(1,true,{lev:'CLI',user:item.user,userstatus:status,type:'cli'})}}>Change Status</a>
                        </li>}

                        <li>
                            <a id="profile14" onClick={()=>{props.changePro(1); props.pushAgent(item.user,'5'); props.changeView(3);}} class="profile">Profile</a>
                        </li>
                        <li>
                            <a id="p_l0" onClick={()=>{props.changePro(2);props.pushAgent(item.user,'5'); props.changeView(3);}} class="p_l" >Betting Profit &amp; Loss</a>
                        </li>
                        <li>
                            <a id="betting_history0" onClick={()=>{props.changePro(3); props.pushAgent(item.user,'5'); props.changeView(3);}} class="betting_history">Betting History</a>
                        </li>
                    </ul>
                  </td>
               </tr>
             )})}
           </tbody>
           
        </table>}
       
        {globalArray2.length > 0 && client.length === 0 && <p class="no-data">There are no more clients.</p>}
          {globalArray2.length > 0 &&  <div>      
            <ul id="pageNumberContent" class="pages">
                <li id="prev"><a onClick = {()=>{if(clientView > 1){setclientView(clientView-1);}}} className={`${(clientView > 1) ? "": "disable"}`}>Prev</a></li>
                <li id="pageNumber"><a  class="select" style={{pointerEvents: 'none'}}>{clientView}</a></li>
                <li id="next"><a onClick = {()=>{if(client.length >= 10){setclientView(clientView+1);}}} className={`${(client.length >= 10) ? "": "disable"}`}>Next</a></li>
                <input onChange= {(e)=>{changeCountClient(e);}} type="number" id="goToPageNumber_1"  maxlength="6" size="4"/><a onClick = {()=>{if(b > 0 && b <= (parseInt(globalArray2.length/10)+1)) setclientView(b);}} id="goPageBtn_1">GO</a> 
                </ul>
            </div>}
           {globalArray1.length === 0 && globalArray2.length === 0 && <p class="no-data">There are no agents and clients.</p>}
        <div style = {{marginTop: '15px',color: 'transparent'}}>.</div>

            
           
        </React.Fragment>
       )
     }
