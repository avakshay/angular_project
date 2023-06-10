import React, { useState,useEffect } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import {toast} from 'react-toastify'

const cookies = new Cookies();
toast.configure()

export default function Addmember(props) {
    const [username,setusername] = useState('');
    const [level,setlevel] = useState('4');
    const [usernameAvail,setusernameAvail] = useState(false);
    const [pass,setpass] = useState('');
    const [confirmpass,setconfirmpass] = useState('');
    const [firstname,setfirstname] = useState('');
    const [lastname,setlastname] = useState(' ');
    const [comm,setcomm] = useState('');


    useEffect(()=>{
        
        var ssid = cookies.get('sid');
        if(!ssid) return;
        axios.post('http://65.0.111.203:3000/myComm',{
               sid:ssid
    
              })
              .then(result => {
                 
                  if(result.status === 200){
                     setcomm(result.data);
                    
                   
                  }
         
                 }
                     
                ).catch(e => {
                  //setIsError(true);
          });
        },[]);

        const validateUser = ()=>{
            
          if(username === ''  || username === ' '){
             document.getElementById("userNameErrorText").style.color = "#D0021B";
             document.getElementById("userNameErrorText").innerHTML="Username can not be blank!";
             return;
          }
          var ssid = cookies.get('sid');
          if(!ssid) return;
          axios.post('http://65.0.111.203:3000/validateAgent',{
                 sid:ssid,
                 agentId:username
      
                })
                .then(result => {
                   
                    if(result.status === 200){
                      setusernameAvail(false);  
                      document.getElementById("userNameErrorText").style.color = "#D0021B";
                      document.getElementById("userNameErrorText").innerHTML="Username not available!";
                       
                     }
                     else if(result.status === 206){
                      setusernameAvail(true);   
                      document.getElementById("userNameErrorText").style.color = "green";
                      document.getElementById("userNameErrorText").innerHTML="Username available!";

                    } 
           
                   }
                       
                  ).catch(e => {
                    //setIsError(true);
            });
          }   


  const validatePass = ()=>{
          
              if(pass.length < 4){
                 
                 document.getElementById("passwordErrorText").innerHTML="Password must be atleast 4 char long!";
                 return;
              }
              else{
                 document.getElementById("passwordErrorText").innerHTML="";
              }
             
          }   
  
  const confirmPassword = ()=>{
          
      if(pass !== confirmpass){
         
          document.getElementById("repeatPasswordErrorText").innerHTML="Password do not match!";
          return;
           }
          else{
              document.getElementById("repeatPasswordErrorText").innerHTML="";
              }
             
      }   

  const validateFirst = ()=>{
      if(firstname === '' || firstname === ' '){
          document.getElementById("firstErrorText").innerHTML="firstname can not be blank!";
      }
      else{
          document.getElementById("firstErrorText").innerHTML=""; 
      }
  }

    

    
    const addAgent = ()=>{
      if(username === ''  || username === ' '){
        validateUser();
        
        
      }
     if(username === ''  || username === ' ' || pass !== confirmpass || pass.length < 4 || usernameAvail === false || firstname === '' || firstname === ' '){
       
        validatePass();
        confirmPassword();
        validateFirst();
        
        return;
     }
        
        var ssid = cookies.get('sid');
        if(!ssid) return;
       
        axios.post('http://65.0.111.203:3000/addAgent',{
               sid:ssid,
               level:level,
               username:username,
               agentpass:pass,
               firstname:firstname,
               lastname:lastname
               

    
              })
              .then(result => {
                 
                  if(result.status === 200){
                    toast.success('Agent created successfully!', {position:toast.POSITION.TOP_CENTER})
                    document.getElementById("firstErrorText").innerHTML="";
                    document.getElementById("repeatPasswordErrorText").innerHTML="";
                    document.getElementById("passwordErrorText").innerHTML="";
                    document.getElementById("userNameErrorText").innerHTML="";
                    setusername('');
                    setusernameAvail(false);
                    setpass('');
                    setconfirmpass('');
                    setfirstname('');
                    setlastname('');
 
                          
                  }
                
                else{
                   toast.warn('Something went wrong!', {position:toast.POSITION.TOP_CENTER})
                }
        
         
                 }
                     
                ).catch(e => {
                  //setIsError(true);
            });
        }
            
    const changeEvent = (e)=>{
        var selectBox = document.getElementById("agentlevel");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        console.log(selectedValue); 
        if(selectedValue == 1){
          setlevel('1');
        }
        else if(selectedValue == 2){
          setlevel('3');
        }
        else if(selectedValue == 3){
          setlevel('3');
        }
        else if(selectedValue == 4){
          setlevel('4');
        }
    
        
    
      }	
          


return (
 <React.Fragment>
  <div id="createModal" class="pop_bg" style={{display:'block'}}>
  <div class="pop_box ">
    <a class="close_pop"  onClick={()=>{props.HandlePopup(4,false)}}>close_pop</a>

    <h3>Add Agent
    </h3>
    <ul class="half_box add-member-box">
      <li class="add_account_box">
        <dl class="border_b">
         {/* && <dt>E-mail</dt>*/}
         {/* && <dd>
            <input id="email" type="text" onclick="location.href='#stake'" placeholder="Enter" maxlength="50"/>
            <span class="must">＊</span>
         </dd>*/}

          <dt>Agent Level</dt>
            <dd>
            <select name="timezone" id="agentlevel" onChange = {(e)=>{changeEvent(e);}}>
              
            {props.userLevel < 1 && <option value="1"selected={`${level == 1 ? "selected":""}`}>SSS(Senior Super)</option>}
            {props.userLevel < 2 && <option value="2" selected={`${level == 2 ? "selected":""}`}>SS(Super Super)</option>}
            {props.userLevel < 3 && <option value="3" selected={`${level == 3 ? "selected":""}`}>SUP(Super)</option>}
            {props.userLevel < 4 && <option value="4" selected={`${level == 4 ? "selected":""}`}>MA(Master)</option>}
              
            </select>
            <span class="must">＊</span>
          </dd>
          <dt>Username</dt>
          <dd>
            <input onChange = {(e)=>{setusername(e.target.value);}} onBlur={()=>{validateUser();}} value={username} id="userName" type="text" placeholder="Enter" maxlength="16"/>
            <span class="must">＊</span>
            <span id="userNameErrorText"  class="error-text"></span>
          </dd>
          <dt>Password</dt>
          <dd>
            <input onChange = {(e)=>{setpass(e.target.value);}} onBlur={()=>{validatePass();}} value={pass} id="userPassword" type="password" placeholder="Enter"/>
            <span class="must">＊</span>
            <span id="passwordErrorText" class="error-text"></span>
          </dd>
          <dt>Confirm Password</dt>
          <dd>
            <input onChange = {(e)=>{setconfirmpass(e.target.value);}} onBlur={()=>{confirmPassword();}} value={confirmpass} id="repeatPassword" type="password"  placeholder="Enter"/>
            <span class="must">＊</span>
            <span id="repeatPasswordErrorText" class="error-text"></span>
          </dd>
        </dl>
        <dl class="">
          <dt>First Name</dt>
          <dd>
            <input onChange = {(e)=>{setfirstname(e.target.value);}} onBlur={()=>{validateFirst();}} value={firstname} id="firstName" type="text"  placeholder="Enter" maxlength="16"/>
            <span class="must">＊</span>
            <span id="firstErrorText" class="error-text"></span>
          </dd>
          <dt>Last Name</dt>
          <dd>
            <input onChange = {(e)=>{setlastname(e.target.value);}} value={lastname} id="lastName" type="text"  placeholder="Enter" maxlength="16"/>
        </dd>
          
          
          
          
          
           
          
        <dt>Commission(%)</dt>
          <dd>
            <input id="commission" type="text" placeholder="Enter" value={comm + '%'} readonly="readonly"/>
            <span class="must">＊</span>
          </dd>


          

          <dt>Time Zone</dt>
          <dd>
            <select name="timezone" id="timezone">
              
              <option value="IST" selected="selected">IST(Bangalore / Bombay / New Delhi) (GMT+5:30)</option>
              
            </select>
            <span class="must">＊</span>
          </dd>
        </dl>
      </li>
	<li class="pt_allowed_box" style={{display:'none'}}>
        




<div class="pt_allowed" style={{display:'none'}}>
    <dl>
		<dt class="dt_w50">PT Allowed To Master Agent(%)</dt>
		<dd><input id="memberMaxPT" type="text" onclick="location.href='#stake'" placeholder="Enter" value="0"/> </dd>
    </dl>
    
    
      
    
   </div>

      </li>
    </ul>
    <div class="btn_box">
      <a  id="createBtn" onClick = {()=>{addAgent();}} class="btn-send">Create</a>
    </div>
   </div>
   </div>
        </React.Fragment>
    )
}
