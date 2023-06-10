import React, { useState,useEffect } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import {toast} from 'react-toastify'

const cookies = new Cookies();
toast.configure()

export default function Addmember(props) {
    const [username,setusername] = useState('');
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
            axios.post('http://65.0.111.203:3000/validateClient',{
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

    const addClient = ()=>{
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
       
        axios.post('http://65.0.111.203:3000/addClient',{
               sid:ssid,
               username:username,
               agentpass:pass,
               firstname:firstname,
               lastname:lastname
               

    
              })
              .then(result => {
                 
                  if(result.status === 200){
                    toast.success('Player created successfully!', {position:toast.POSITION.TOP_CENTER})
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
            

 return (
  <React.Fragment>
   <div id="createModal" class="pop_bg" style={{display:'block'}}>
   <div class="pop_box ">
    <a class="close_pop"  onClick={()=>{props.HandlePopup(2,false)}}>close_pop</a>

    <h3>Add Player
    </h3>
     <ul class="half_box add-member-box">
      <li class="add_account_box">
        <dl class="border_b">
          {/* && <dt>E-mail</dt>*/}
         {/* && <dd>
            <input id="email" type="text" onclick="location.href='#stake'" placeholder="Enter" maxlength="50"/>
            <span class="must">＊</span>
         </dd>*/}
          <dt>Username</dt>
          <dd>
            <input onChange = {(e)=>{setusername(e.target.value);}} onBlur={()=>{validateUser();}} id="userName" type="text" value={username} placeholder="Enter" maxlength="16"/>
            <span class="must">＊</span>
            <span id="userNameErrorText" class="error-text" ></span>
          </dd>
          <dt>Password</dt>
          <dd>
            <input onChange = {(e)=>{setpass(e.target.value);}} onBlur={()=>{validatePass();}} id="userPassword" value={pass} type="password" placeholder="Enter"/>
            <span class="must">＊</span>
            <span id="passwordErrorText" class="error-text" ></span>
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
            <input onChange = {(e)=>{setlastname(e.target.value);}} value = {lastname} id="lastName" type="text"  placeholder="Enter" maxlength="16"/>
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
<div class="sports_box" style={{height: '350px',overflow: 'hidden',overflowY: 'auto'}}>
    <p>
        My Sports PT Setting
		<span id="settingNote" class="note" style={{display:'none'}}>PT setting % value must be multiplier of 5 : </span>
    </p>

    <ul class="half_box">
        <li>
            <div id="sportsSet" class="sports_set">
                <dl class="bg_head">
					<dt>All Sports Set</dt>
                    <dd>
						<input id="allowOneMaxPT" type="text" onclick="location.href='#stake'" placeholder="Enter" value="0"/>
                        <ul class="odd-add">
                            <li><a class="up"  name="copy_one_up">up</a></li>
                            <li><a class="down"  name="copy_one_down">down</a></li>
                        </ul>
						<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    </dd>
                    
                    
                    
                    
                </dl>
                
                <dl class="">
                    <dt>Soccer</dt>
                   	
                   	<dd class="">
                        <input id="soccer_PT" type="text" name="normal" data-type="1" value="0"/>
                    </dd>
					<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    
                    
                    
                </dl>
				
                <dl class="bg_dark">
                    <dt>Tennis</dt>
                   	
                   	<dd class="">
                        <input id="tennis_PT" type="text" name="normal" data-type="2" value="0"/>
                    </dd>
					<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    
                    
                    
                </dl>
				
                <dl class="">
                    <dt>Cricket</dt>
                   	
                   	<dd class="">
                        <input id="cricket_PT" type="text" name="normal" data-type="4" value="0"/>
                    </dd>
					<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    
                    
                    
                </dl>
				
                <dl class="bg_dark">
                    <dt>Rugby Union</dt>
                   	
                   	<dd class="">
                        <input id="rugby_union_PT" type="text" name="normal" data-type="5" value="0"/>
                    </dd>
					<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    
                    
                    
                </dl>
				
                <dl class="">
                    <dt>Horse Racing</dt>
                   	
                   	<dd class="">
                        <input id="horse_racing_PT" type="text" name="normal" data-type="7" value="0"/>
                    </dd>
					<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    
                    
                    
                </dl>
				
                <dl class="bg_dark">
                    <dt>Greyhound Racing</dt>
                   	
                   	<dd class="">
                        <input id="greyhound_racing_PT" type="text" name="normal" data-type="4339" value="0"/>
                    </dd>
					<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    
                    
                    
                </dl>
				
                <dl class="">
                    <dt>American Football</dt>
                   	
                   	<dd class="">
                        <input id="american_football_PT" type="text" name="normal" data-type="6423" value="0"/>
                    </dd>
					<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    
                    
                    
                </dl>
				
                <dl class="bg_dark">
                    <dt>Basketball</dt>
                   	
                   	<dd class="">
                        <input id="basketball_PT" type="text" name="normal" data-type="7522" value="0"/>
                    </dd>
					<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    
                    
                    
                </dl>
				
                <dl class="">
                    <dt>Politics</dt>
                   	
                   	<dd class="">
                        <input id="politics_PT" type="text" name="normal" data-type="2378961" value="0"/>
                    </dd>
					<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    
                    
                    
                </dl>
				
            </div>
			<p>My PT Allowed <strong id="yourPT">0</strong>%</p>
        </li>

        <li>
            
            <div id="fancyBetSet" class="sports_set" style={{display:'none', height:'150px'}}>
                <dl class="bg_head">
                    <dt>FancyBet Setting</dt>
                </dl>

                <dl class="">
					<dt>Super</dt>
                    <dd>
						<input id="company_fancy_bet_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="company" value="0"/>
                        <ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
						<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    </dd>
                </dl>

                <dl class="bg_dark" id="fancyBetSSSPt">
                    <dt>SSS</dt>
                    <dd>
                        <input id="sss_fancy_bet_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="sss" value="0"/>
                        <ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
                        <div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    </dd>
                </dl>

                <dl class="" id="fancyBetDirectLevelPt">
					<dt>Master Agent</dt>
                    <dd>
						<input id="shareHolder_fancy_bet_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="shareHolder" value="0"/>
                        <ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
						<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    </dd>
                </dl>
            </div>
            <p id="fancyBetTotalPTCol" style={{display:'none'}}>
                FancyBet total PT allowed <strong id="fancyBetTotalPT">0</strong>%
            </p>
        </li>

        <li>
            <div id="bookMakerSet" class="sports_set" style={{display:'none', height:'115px'}}>
                <dl class="bg_head">
                    <dt>BookMaker Setting</dt>
                </dl>

                <dl class="">
                    <dt>Super</dt>
                    <dd>
                        <input id="company_book_maker_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="company" value="0"/>
                        <ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
                        <div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    </dd>
                </dl>

                <dl class="bg_dark" id="bookMakerDirectLevelPt">
                    <dt>Master Agent</dt>
                    <dd>
                        <input id="shareHolder_book_maker_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="shareHolder" value="0"/>
                        <ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
                        <div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    </dd>
                </dl>
            </div>
            <p id="bookMakerTotalPTCol" style={{display:'none'}}>
                BookMaker total PT allowed <strong id="bookMakerTotalPT">0</strong>%
            </p>
        </li>

        <li>
			<div id="sportsbookTennisSet" class="sports_set" style={{display:'none',height:'115px'}}>
                <dl class="bg_head">
                    <dt>SportsBook</dt>
                    <dd><a class="toggle_on"  id="edit_allow_sportsbookTennis">ON</a></dd>
                </dl>

                <dl class="">
					<dt>Super</dt>
                    <dd>
						<input id="company_sportsbook_tennis_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="company" value="0"/>
                        <ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
						<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    </dd>
                </dl>

                <dl class="bg_dark">
					<dt>Master Agent</dt>
                    <dd>
						<input id="shareHolder_sportsbook_tennis_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="shareHolder" value="0"/>
                        <ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
						<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    </dd>
                </dl>
            </div>
            <p style={{display:'none'}}>
                Sportsbook total PT allowed <strong id="sportsbookTennisTotalPT">0</strong>%
            </p>
        </li>
        
        <li>
            <div id="sportsbookPremiumCricketSet" class="sports_set" style={{display:'none'}}>
                <dl class="bg_head">
                    <dt>SportsBook - Premium</dt>
                    <dd><a class="toggle_on"  id="edit_allow_sportsbookPremiumCricket">ON</a></dd>
                </dl>

                <dl class="">
                    <dt>Super
                    </dt>
                    <dd>
                        <input id="company_sportsbookPremiumCricket_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="company" value="0"/>
                        <ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
                        <div class="tips-popup" style={{display:'none'}}>
                            multiplier of 5
                        </div>
                    </dd>

                </dl>

                <dl class="bg_dark">
                    <dt>Master Agent
                    </dt>
                    <dd>
                        <input id="shareHolder_sportsbookPremiumCricket_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="shareHolder" value="0"/>
                        <ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
                        <div class="tips-popup" style={{display:'none'}}>
                            multiplier of 5
                        </div>
                    </dd>
                </dl>
            </div>
            <p style={{display:'none'}}>
                Premium total PT allowed <strong id="sportsbookPremiumCricketTotalPT">0</strong>%
            </p>
        </li>

        
        <li>
            <div id="financialBinarySet" class="sports_set" style={{display:'none'}}>
                <dl class="bg_head">
                    <dt>Binary Setting</dt>
                </dl>

                <dl class="">
                    <dt>Super
                    </dt>
                    <dd>
                        <input id="company_financialBinary_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="company" value="0"/>
                        <ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
                        <div class="tips-popup" style={{display:'none'}}>
                            multiplier of 5
                        </div>
                    </dd>

                </dl>

                <dl class="bg_dark">
                    <dt>Master Agent
                    </dt>
                    <dd>
                        <input id="shareHolder_financialBinary_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="shareHolder" value="0"/>
                        <ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
                        <div class="tips-popup" style={{display:'none'}}>
                            multiplier of 5
                        </div>
                    </dd>
                </dl>
            </div>
            <p style={{display:'none'}}>
                Binary total PT allowed <strong id="financialBinaryTotalPT">0</strong>%
            </p>
        </li>

        <li>
            <div id="casinoSet" class="sports_set">
                <dl class="bg_head">
                    <dt>Casino Setting</dt>
                    <dd style={{display:'none'}}>
                   		<a class="toggle_on"  id="new_allow_casino">ON</a>
                	</dd>
                </dl>
                
                <dl class="">
                    <dt>Live</dt><br/>
                    <dt>Super</dt>
                    
                    <dd>
						<input id="live_agent_casino_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="agent" data-categorytype="live" value="100"/>
						<ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
						<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    </dd>
                    
                    <dt>Master Agent</dt>
                    <dd>
						<input id="live_downline_casino_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="downline" data-categorytype="live" value="0"/>
						<ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
						<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    </dd>
                </dl>
                <p style={{display:'none'}}>
					LIVE total PT allowed <strong id="casino_live_TotalPT">0</strong>%
				</p>
				
                <dl class="bg_dark">
                    <dt>R&amp;G</dt><br/>
                    <dt>Super</dt>
                    
                    <dd>
						<input id="rng_agent_casino_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="agent" data-categorytype="rng" value="100"/>
						<ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
						<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    </dd>
                    
                    <dt>Master Agent</dt>
                    <dd>
						<input id="rng_downline_casino_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="downline" data-categorytype="rng" value="0"/>
						<ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
						<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    </dd>
                </dl>
                <p style={{display:'none'}}>
					RNG total PT allowed <strong id="casino_rng_TotalPT">0</strong>%
				</p>
				
                <dl class="">
                    <dt>SLOT</dt><br/>
                    <dt>Super</dt>
                    
                    <dd>
						<input id="slot_agent_casino_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="agent" data-categorytype="slot" value="100"/>
						<ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
						<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    </dd>
                    
                    <dt>Master Agent</dt>
                    <dd>
						<input id="slot_downline_casino_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="downline" data-categorytype="slot" value="0"/>
						<ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
						<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    </dd>
                </dl>
                <p style={{display:'none'}}>
					SLOT total PT allowed <strong id="casino_slot_TotalPT">0</strong>%
				</p>
				
                <dl class="bg_dark">
                    <dt>Virtual Sports</dt><br/>
                    <dt>Super</dt>
                    
                    <dd>
						<input id="virtual_agent_casino_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="agent" data-categorytype="virtual" value="100"/>
						<ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
						<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    </dd>
                    
                    <dt>Master Agent</dt>
                    <dd>
						<input id="virtual_downline_casino_PT" type="text" onclick="location.href='#stake'" placeholder="Enter" data-type="downline" data-categorytype="virtual" value="0"/>
						<ul class="odd-add">
                            <li><a class="up" >up</a></li>
                            <li><a class="down" >down</a></li>
                        </ul>
						<div class="tips-popup" style={{display:'none'}}>multiplier of 5</div>
                    </dd>
                </dl>
                <p style={{display:'none'}}>
					VIRTUAL total PT allowed <strong id="casino_virtual_TotalPT">0</strong>%
				</p>
				
            </div>
        </li>
      </ul>
   </div>
      </li>
    </ul>
    <div class="btn_box">
      <a  id="createBtn" onClick = {()=>{addClient();}} class="btn-send">Create</a>
     </div>
    </div>
   </div>
    </React.Fragment>
    )
}
