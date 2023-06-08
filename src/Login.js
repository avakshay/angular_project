import React, { useState,useEffect} from 'react'
import Transparent from './images/transparent.gif'
import './Login.css'
import "react-toastify/dist/ReactToastify.css";
import BodyImage from './images/duoexch/bg-login-skyEX.jpg'
import SupportLink from './SupportLink'
import { suid } from 'rand-token';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {toast} from 'react-toastify'

const cookies = new Cookies();

var cc;
var tt;
toast.configure()

export default function Login(props) {
	const [captchaSuccess, setCaptcha] = useState(false);
	const [userid, setId] = useState("");
    const [password, setPassword] = useState("");

	function createCaptcha() {
		if(document.getElementById('captch')){
		  document.getElementById("captch").remove();
		}
		  
		var captcha = [];
		while(captcha.length < 4) {
		  //below code will not allow Repetition of Characters
		  var index = Math.floor(Math.random() * 10); //get the next character from the array
		  
		  captcha.push(index);
		  
		}
		var canv = document.createElement("canvas");
		canv.style.width='inherit';
		canv.id = "captch";
		canv.width = 70;
		canv.height=50;
		
		var ctx = canv.getContext("2d");
		ctx.font = "600 30px Arial";
		ctx.fillText(captcha.join(""),0,30);
		//storing captcha so that can validate you can save it somewhere else according to your specific requirements
		cc = captcha.join("");
	  
		if(document.getElementById("popupcaptcha")){
		  document.getElementById("popupcaptcha").appendChild(canv);
		}
	  }
	  

	  function validateCaptcha(event) {
		
		
		if (event.target.value === cc) {
		  setCaptcha(true);
	  
		}else{
		  setCaptcha(false);
		 }
		
	    }
	  
		useEffect(()=>{ 
			createCaptcha();
		  },[]);


		  const handleLogin = () => {
		
		 
		   if(userid === ''){
			 
			   createCaptcha();
			   toast.warn('Username can not be blank!', {position:toast.POSITION.TOP_CENTER})
			   
			 
		 
			 return;
			}
		   if(password === '')  {
			 createCaptcha(); 
			 toast.warn('Password can not be blank!', {position:toast.POSITION.TOP_CENTER})
			 
			 return;
		   }
		   
			if(!captchaSuccess)  {
		   
			 createCaptcha();
			toast.warn('Captcha is not valid!', {position:toast.POSITION.TOP_CENTER})
			
			 return;
		   }
			
		 
		 
			var ssid = cookies.get('sid');
			
			
			
			
			axios.post('http://65.0.111.203:3000/agentLogin',{
			  id:userid,
			  password:password
			  
			})
			.then(result => {
			   
   
			   if(result.status === 200){
				   
				 cookies.set('sid', result.data, { path: '/' });
				 props.checkShowLogin(true); 
				
				 setCaptcha(false);
				 //window.location.href = '/';
				 
		 
				
			   }
			   else{
				 setCaptcha(false);  
				 toast.warn('Username or password incorrect!', {position:toast.POSITION.TOP_CENTER})
				 //document.getElementById("errorMsg").innerHTML="Username or password incorrect!";
				 createCaptcha();
			   }
			 }
			 
		   ).catch(e => {
			 //setIsError(true);
		   });
		   
		   
			 
		   };
		 
   
		  

    return (
        <React.Fragment>
             <body style={{background: `url(${BodyImage}) no-repeat center`,
    backgroundSize: 'cover',height:'69rem'}}>
            <div class="login-wrap-front">
	<div class="kv"></div>

	<dl class="login-panel-front">
		<dt>Agent login</dt>
		<dd><input id="loginName" value = {userid} onChange ={(e)=>{setId(e.target.value)}} type="text" placeholder="Username"/></dd>
		<dd><input id="password" value = {password} onChange ={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password"/></dd>
		<dd class="valid-code">
			<input onChange = {(e)=>{validateCaptcha(e)}} id="validCode" type="text" placeholder="Validation Code" maxLength="4"/>
			<div id="popupcaptcha" style={{position:'absolute', right:'5px',width:'44px',top:'5px'}}></div> 
		</dd>
		<dd><input id="valid" name="valid" type="hidden" value="03ea1257-0d56-4934-9e92-b270d0e9cb91"/></dd>
		<dd><a id="loginBtn" onClick = {()=>{handleLogin()}} class="btn-send-front">Login
			<img class="icon-login-front" src={Transparent}/></a></dd>
		<dd id="errorMsg" class="error-front" style={{display:'none'}}> Invalid validation code!</dd>
	 </dl>
    </div>
   <SupportLink/>
 </body>
        </React.Fragment>
    )
}
