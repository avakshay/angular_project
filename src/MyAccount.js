import React, { useState,useEffect } from 'react'
import Cookies from 'universal-cookie';
import Loading from './images/loading40.gif'
import axios from 'axios';
import { Link} from "react-router-dom";


const cookies = new Cookies();

export default function MyAccount(props) {

	const [accountSummary, setaccountSummary] = useState([])

    useEffect(() => {
        var ssid = cookies.get('sid');
        if(!ssid) return;
        axios.post('http://65.0.111.203:3000/myAccountSummary',{
            sid:ssid
           }).then(result => {
            setaccountSummary(result.data.balance)
           // console.log(result.data.balance); 
     }
     
   ).catch(e => {
     //setIsError(true);
   });
           
    }, [])
    return (
        <React.Fragment>
            <div class="main_wrap">
	{/* <!-- agent path --> */}
	<div class="agent_path">
		<ul id="agentPath" class="agent_path-L">
			<li id="path6" class="" style={{display:'none'}}>
				<a href="javascript: void(0);"> <span class="lv_0">
                    COM
                </span> <strong></strong> </a>
			</li>
			<li id="path5" class="last_li" >
			<Link to="/agents"> <span class="lv_1">
				{props.level}
                </span> <strong>{props.user}</strong> </Link>
			</li>
			<li id="path4" class="" style={{display:'none'}}>
				<a href="javascript: void(0);"> <span class="lv_2">
                    SUP
                </span> <strong></strong> </a>
			</li>
			<li id="path3" class="" style={{display:'none'}}>
				<a href="javascript: void(0);"> <span class="lv_3">
                    MA
                </span> <strong></strong> </a>
			</li>
			<li id="path0" class="" style={{display:'none'}}>
				<a href="javascript: void(0);"> <span class="lv_4">
                    PL
                </span> <strong></strong> </a>
			</li>
			<ul class="account_pop" id="accountPop" >
				<li id="popTmp" style={{display:'none'}}>
					<a href=""></a>
				</li>
			</ul>
		</ul>
	</div>
	
	{/* <!-- Agent Left Column --> */}
	<div class="col-left">
		{/* <!-- Sub Menu and Path --> */}
		<div class="sub_path">
			{/* <!-- Sub Menu --> */}
			<ul class="menu-list">
			<li class="class">Position</li>
            <li><Link to="/myAccount/accountCashStatement" id="accountStatement">Account Statement</Link></li>
            <li><Link to="/myAccount/accountSummary" id="accountSummary" class="select">Account Summary</Link></li>
            <li><Link to="/myAccount/transferredLog" id="transferredLog" >Transferred Log</Link></li>
            <li class="class">Account Details</li>
            <li><Link to="/myAccount/profile" id="profile" >Profile</Link></li>
            <li><Link to="/myAccount/activityLog" id="activityLog" >Activity Log</Link></li>
			</ul>
		</div>
	</div>
	{/* <!-- Loading Wrap --> */}
	<div id="loading" class="loading-wrap" style={{display:'none'}}>
		<ul class="loading">
			<li><img src={Loading}/></li>
			<li>Loading...</li>
		</ul>
	</div>
	{/* <!-- Message --> */}
	<div id="message" class="message-wrap success"> <a class="btn-close">Close</a>
		<p></p>
	</div>
	
	{/* <!-- Center Column --> */}
	<div class="col-center report">
		<h2>Account Summary</h2>
		<div class="white-wrap">
			<dl class="head-balance"> <dt>Your Balances</dt>
				<dd id="yourBalance">{accountSummary} <span>PTH</span></dd>
			</dl>
		</div>
	</div>
</div>
        </React.Fragment>
    )
}
