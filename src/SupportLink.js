import React, { useState } from 'react'
import Transparent from './images/transparent.gif'

export default function SupportLink() {
    const [Socialicon, setSocialicon] = useState(0);
    
    return (
        <React.Fragment>
            <div class="moreinfo-wrap-front">
	<div id="supportWrap" class="support-wrap-front">
		<div class="support-service-front">
			
			<a id="support_email"  onMouseOver ={()=>{setSocialicon(0)}} className={`support-mail-front  ${(Socialicon===0 )? "open": "null"}`} ><img src={Transparent} title="Email"/></a>
			
			
			<a id="support_whatsapp"  onMouseOver ={()=>{setSocialicon(1)}} className={`support-whatsapp-front  ${(Socialicon===1 )? "open": "null"}`} ><img src={Transparent} title="WhatsApp"/></a>
			
			
			<a id="support_telegram"  onMouseOver ={()=>{setSocialicon(2)}} className={`support-telegram-front  ${(Socialicon===2 )? "open": "null"}`} ><img src={Transparent} title="Telegram"/></a>
			
			
			
			<a id="support_skype"   onMouseOver ={()=>{setSocialicon(3)}} className={`support-skype-front  ${(Socialicon===3 )? "open": "null"}`}><img src={Transparent} title="Skype"/></a>
			
			
			<a id="support_instagram"  onMouseOver ={()=>{setSocialicon(4)}} className={`support-ig-front  ${(Socialicon===4 )? "open": "null"}`} ><img src={Transparent} title="Instagram"/></a>
			
		</div>
		<div class="support-info-front">
        { Socialicon ===0 &&
						<div id="supportDetail_email" className={`support-detail-front ${(Socialicon===0 )? "open": "null"}`}><a href="mailto:info@duoexch.com">info@duoexch.com</a></div>
          }
		 { Socialicon ===1 &&
            <div id="supportDetail_whatsapp"  className={`support-detail-front ${(Socialicon===1 )? "open": "null"}`}>
							<a href="">+447555570000 </a>
							<a href="">+447555571111</a>
              <a href="">+447555573333</a>
						</div>}
            { Socialicon ===2 &&
						<div id="supportDetail_telegram" className={`support-detail-front ${(Socialicon===2 )? "open": "null"}`}>
							<a  >www.t.me/officialduoexchinfo</a>
							<a  >www.t.me/duoexchcustomersupport</a>
						</div>}
            { Socialicon ===3 &&
						<div id="supportDetail_skype" className={`support-detail-front ${(Socialicon===3 )? "open": "null"}`}>
							<a  >duoexchofficial</a>
						</div>
              }
              { Socialicon ===4 &&
						<div id="supportDetail_instagram" className={`support-detail-front ${(Socialicon===4 )? "open": "null"}`}>
							<a   class="ui-link" target="_blank">officialduoexch</a>
						</div>}
			
		</div>
	</div>
	
	{/* <!-- Power by --> */}
	{/* <div class="power-wrap-front">
		<h3><span>Powered by</span><img src={Transparent}/></h3>
		
			<div class="licence_embed">
				<iframe src="https://licensing.gaming-curacao.com/validator/?lh=7a83475c9e54450a218a18bd28e33fad&amp;template=seal" width="150" height="50" style={{border:'none'}}></iframe>
			</div>
		
		<p><a href="http://www.gaming-curacao.com/validation/sky-infotech-limited/" target="_blank">Sky Infotech Limited</a> is licensed and regulated by Government of Curacao under license no 365/JAZ Sub-License GLH-OCCHKTW0707072017.</p>
	</div> */}
	
	
	{/* <!-- Browser Support --> */}
	{/* <div class="browser-wrap-front">
		<img src={Transparent}/><br/>
		Our website works best in the newest and last prior version of these browsers: <br/>Google Chrome. Firefox
	</div> */}
</div>
        </React.Fragment>
    )
}
