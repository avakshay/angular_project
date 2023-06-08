import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import Transparent from './images/transparent.gif'
import  './mobilelogin.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
import {toast} from 'react-toastify'

const cookies = new Cookies();

var cc;
var tt;
toast.configure()

export default function MobileLogin(props) {

	const [Socialicon, setSocialicon] = useState(0);
	const [captchaSuccess, setCaptcha] = useState(false);
	const [userid, setId] = useState("");
	const [password, setPassword] = useState("");
	
	function createCaptcha() {
		if (document.getElementById("captch")) {
		  document.getElementById("captch").remove();
		}
	  
		var captcha = [];
		while (captcha.length < 4) {
		  //below code will not allow Repetition of Characters
		  var index = Math.floor(Math.random() * 10); //get the next character from the array
	  
		  captcha.push(index);
		}
		var canv = document.createElement("canvas");
		canv.style.width = "inherit";
		canv.id = "captch";
		canv.width = 70;
		canv.height = 50;
	  
		var ctx = canv.getContext("2d");
		ctx.font = "600 30px Arial";
		ctx.fillText(captcha.join(""), 0, 30);
		//storing captcha so that can validate you can save it somewhere else according to your specific requirements
		cc = captcha.join("");
	  
		if (document.getElementById("popupcaptcha")) {
		  document.getElementById("popupcaptcha").appendChild(canv);
		}
	  }
	  
	  function validateCaptcha(event) {
		if (event.target.value === cc) {
		  setCaptcha(true);
		} else {
		  setCaptcha(false);
		}
	  }
	  
	  useEffect(() => {
		createCaptcha();
	  }, []);
	  
	  const handleLogin = () => {
		if (userid === "") {
		  createCaptcha();
		  toast.warn("Username can not be blank!", {
			position: toast.POSITION.TOP_CENTER,
		  });
	  
		  return;
		}
		if (password === "") {
		  createCaptcha();
		  toast.warn("Password can not be blank!", {
			position: toast.POSITION.TOP_CENTER,
		  });
	  
		  return;
		}
	  
		if (!captchaSuccess) {
		  createCaptcha();
		  toast.warn("Captcha is not valid!", {
			position: toast.POSITION.TOP_CENTER,
		  });
	  
		  return;
		}
	  
		var ssid = cookies.get("sid");
	  
		axios
		  .post("http://65.0.111.203:3000/agentLogin", {
			id: userid,
			password: password,
		  })
		  .then((result) => {
			if (result.status === 200) {
			  cookies.set("sid", result.data, { path: "/" });
			  props.checkShowLogin(true);
	  
			  setCaptcha(false);
			  
			} else {
			  setCaptcha(false);
			  toast.warn("Username or password incorrect!", {
				position: toast.POSITION.TOP_CENTER,
			  });
			  createCaptcha();
			}
		  })
		  .catch((e) => {
			//setIsError(true);
		  });
	  };
	  
	
    return (
        <React.Fragment>
        <body style={{ color: '#222',
		 backgroundColor: '#FFB80C',
		 backgroundImage: 'linear-gradient(56deg, #FFCC2E 4%, #FFB80C 42%)',minHeight: '100vh',
		 backgroundAttachment: 'fixed'}}>
            <header className="login-head-mobile">
			<Link to="/" className="close-mobile" style={{padding:0}}></Link>
	<h1>Duoexch</h1>
  </header>
  <dl className="form-login-mobile" >
	<dd id="loginNameErrorClass" >
		<input type="email" value = {userid} onChange ={(e)=>{setId(e.target.value)}} id="loginName" data-role="none"  placeholder="Username"/>
	</dd>
	<dd id="passwordErrorClass">
		<input type="password" value = {password} onChange ={(e)=>{setPassword(e.target.value)}} id="password" data-role="none" placeholder="Password"/>
	</dd>
	<dd id="validCodeErrorClass">
		<input  type="text" onChange = {(e)=>{validateCaptcha(e)}} id="validCode" inputMode="numeric"  placeholder="Validation" maxLength="4"/>  <div id="popupcaptcha" className="CaptchaPopup-mobile">
	 </div> 
	 </dd>
	 <dd>
		<a   className="btn-send-mobile" onClick = {()=>{handleLogin()}} id="loginBtn">Login</a>
	 </dd>
	 <dd id="errorMsg" className="state-mobile"></dd>
   </dl>
  
<div id="supportWrap" class="support-wrap-mobile">
	<div class="support-service-mobile">
		<a id="support_email"  
		onClick ={()=>{setSocialicon(0)}} 
		className={`support-mail-mobile  ${(Socialicon===0 )? "open": "null"}`}
		><img src={Transparent} title="Email"/></a>
		<a id="support_whatsapp"   
		onClick ={()=>{setSocialicon(1)}} 
		className={`support-whatsapp-mobile  ${(Socialicon===1 )? "open": "null"}`}
		><img src={Transparent} title="WhatsApp"/></a>
		<a id="support_telegram"  
		onClick ={()=>{setSocialicon(2)}} 
		className={`support-telegram-mobile  ${(Socialicon===2 )? "open": "null"}`}
		><img src={Transparent} title="Telegram"/></a>
		<a id="support_skype"   
		onClick ={()=>{setSocialicon(3)}} 
		className={`support-skype-mobile  ${(Socialicon===3 )? "open": "null"}`}
		><img src={Transparent} title="Skype"/></a>
		<a id="support_instagram"  
		onClick ={()=>{setSocialicon(4)}} 
		className={`support-ig-mobile  ${(Socialicon===4 )? "open": "null"}`}
		><img src={Transparent} title="Instagram"/></a>
	</div>
	<div class="support-info-mobile">
		{ Socialicon ===0 &&
		<div id="supportDetail_email" 
		className={`support-detail-mobile ${(Socialicon===0 )? "open": "null"}`}
		><a ><span>info@duoexch.com</span></a></div>
	    }
		<div id="supportDetail_whatsapp" className={`support-detail-mobile ${(Socialicon===1 )? "open": "null"}`}>
		{ Socialicon ===1 &&
			<a ><span>+447555570000</span></a>
		}
		{ Socialicon ===1 &&
			<a ><span>+447555571111</span></a>
		}
		{ Socialicon ===1 &&
			<a ><span>+447555573333</span></a>
		}
		</div>
		<div id="supportDetail_telegram" className={`support-detail-mobile ${(Socialicon===2 )? "open": "null"}`}>
		{ Socialicon ===2 &&
			<a ><span>www.t.me/officialduoexchinfo</span></a>
		}
		{ Socialicon ===2 &&
			<a ><span>www.t.me/duoexchcustomersupport</span></a>
		}
		</div>
		<div id="supportDetail_skype" className={`support-detail-mobile ${(Socialicon===3 )? "open": "null"}`}>
		{ Socialicon ===3 &&
			<a ><span>duoexchofficial</span></a>
		}
			</div>
		<div id="supportDetail_instagram" className={`support-detail-mobile ${(Socialicon===4 )? "open": "null"}`}>
		{ Socialicon ===4 &&
			
			<a ><span>officialduoexch</span></a>
			}
			</div>
	</div>
</div>
</body>
</React.Fragment>
    )
}
