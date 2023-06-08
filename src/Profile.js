import React, { useState, useEffect } from "react";
import axios from "axios";
// import Transparent from "../images/transparent.gif";
import Loading from './images/loading40.gif'
import Cookies from 'universal-cookie';
import { Link} from "react-router-dom";


const cookies = new Cookies();
export default function Profile(props) {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
  
    useEffect(() => {
        var ssid = cookies.get('sid');
        if(!ssid) return;
      axios.post("http://65.0.111.203:3000/myProfile", {
          sid:ssid
        })
        .then((result) => {
         
             console.log(result);
            setfirstname(result.data[0].first_name);
            setlastname(result.data[0].last_name);
        })
        .catch((e) => {
          //setIsError(true);
        });
    }, []);


    return (
        <React.Fragment>
            <div class="main_wrap">
    {/* <!-- agent path --> */}
<div class="agent_path">
    <ul id="agentPath" class="agent_path-L">
        
        <li id="path6" class="" style={{display:'none'}}>
            <a href="javascript: void(0);">
                <span class="lv_0">
                    COM
                </span>
                <strong></strong>
            </a>
        </li>
        
        <li id="path5" class="last_li" >
        <Link to="/agents">
                <span class="lv_1">
                {props.level}
                </span>
                <strong>{props.user}</strong>
            </Link>
        </li>
        
        <li id="path4" class="" style={{display:'none'}}>
            <a href="javascript: void(0);">
                <span class="lv_2">
                    SUP
                </span>
                <strong></strong>
            </a>
        </li>
        
        <li id="path3" class="" style={{display:'none'}}>
            <a href="javascript: void(0);">
                <span class="lv_3">
                    MA
                </span>
                <strong></strong>
            </a>
        </li>
        
        <li id="path0" class="" style={{display:'none'}}>
            <a href="javascript: void(0);">
                <span class="lv_4">
                    PL
                </span>
                <strong></strong>
            </a>
        </li>
        
        <ul class="account_pop" id="accountPop" >
            <li id="popTmp" style={{display:'none'}}>
                <a href=""></a>
            </li>
        </ul>
    </ul>
</div>

<div class="col-left">

    {/* <!-- Sub Menu and Path --> */}
    <div class="sub_path">

        {/* <!-- Sub Menu --> */}
        <ul class="menu-list">
            
        <li class="class">Position</li>
            <li><Link to="/myAccount/accountCashStatement" id="accountStatement" >Account Statement</Link></li>
            <li><Link to="/myAccount/accountSummary" id="accountSummary" >Account Summary</Link></li>
            <li><Link to="/myAccount/transferredLog" id="transferredLog" >Transferred Log</Link></li>
            <li class="class">Account Details</li>
            <li><Link to="/myAccount/profile" id="profile" class="select">Profile</Link></li>
            <li><Link to="/myAccount/activityLog" id="activityLog" >Activity Log</Link></li>
            
        </ul>
     </div>
   </div>


    {/* <!-- Center Column --> */}
    <div class="col-center report">
        

{/* <!-- Loading Wrap --> */}
<div id="loading" class="loading-wrap" style={{display:'none'}}>
  <ul class="loading">
    <li><img src={Loading}/></li>
    <li>Loading...</li>
  </ul>
</div>

{/* <!-- Message --> */}
<div id="message" class="message-wrap success">
  <a class="btn-close">Close</a>
  <p></p>
</div>



        <h2>Profile</h2>

        <div class="event-left">
            <div class="profile-wrap">
                <h3>About You</h3>
                <dl>
                    <dt>First Name</dt>
                    <dd>{firstname}</dd>

                    <dt>Last Name</dt>
                    <dd>{lastname}</dd>

                    <dt>Birthday</dt>
                    <dd></dd>

                    <dt>E-mail</dt>
                    <dd>sky@exch.com</dd>

                    <dt>Password</dt>
                    <dd>********************************
                        <a  class="favor-set" onClick={()=>{props.handlepassmodel()}}>Edit</a>
                    </dd>

                    <dt>Time Zone</dt>
                    <dd>IST</dd>

                    <dt>Languages</dt>
                    <dd>
                        <select id="lang">
                            
                            <option value="en" selected="">English
                            </option>
                            
                            <option value="cn">中文
                            </option>
                            
                        </select>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="event-right">
            <div class="profile-wrap">
                <h3>Contact Details</h3>
                <dl>
                    <dt>Primary number</dt>
                    <dd></dd>
                </dl>
            </div>
            <div class="profile-wrap" style={{display:'none'}}>
                <h3>PT</h3>
                <dl>
                    <dt>My PT Allowed</dt>
                    <dd>0%</dd>
                </dl>
                <dl>
                    <dt>My Fancy Bet PT</dt>
                    <dd>0%</dd>
                </dl>
                <dl>
                    <dt>Sportsbook PT</dt>
                    <dd>0%</dd>
                </dl>
                <dl>
                    <dt>Sportsbook Premium PT</dt>
                    <dd>0%</dd>
                </dl>
                <dl>
                    <dt>My Book Maker PT</dt>
                    <dd>0%</dd>
                </dl>
                <dl>
                    <dt>Casino PT Allowed</dt>
                    <dd>LIVE: 0%, RNG: 0%, SLOT: 0%, VIRTUAL: 0%</dd>
                </dl>
            </div>
        </div>
    </div>
</div>
        </React.Fragment>
    )
}
