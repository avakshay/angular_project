import React, { useState } from 'react'
import Transparent from './images/transparent.gif'
import { Link} from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Header(props) {
	
	
	const [loading, setloading] = useState(false);

	const handlerefresh = ()=>{
		setloading(true); 
    setTimeout(()=>{setloading(false);},1000);
	}

    return (
        <React.Fragment>
            <div class="top">
  <div class="header">
    <h1><a href="/agents">SKYEXCHANGE</a></h1>

    <ul class="account-wrap">
	  <li><span>{props.level}</span><strong>{props.user}</strong></li>
	  {/* <!-- single balance 加 no-multi --> */}
      <li class="main-wallet no-multi">
      	{/* <!-- 加open打開--> */}
      	<a href="#multi-balance_pop" class="a-wallet">
			  {loading === false &&
      		<ul>
      			<li>
      				<span>Main</span>
      				<strong id="mainBalance">PTH {parseFloat(props.balance).toFixed(2)}</strong>
      			</li>
      		</ul>
			  }
			{loading === true &&
      		<p class="loading-bar" id="menuRefreshLoading">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</p>}
      	</a>

		<a id="topRefresh" class="a-refresh" onClick={()=>{handlerefresh()}} style={{cursor:'pointer'}}><img src={Transparent}/></a>
      </li>
    </ul>
  </div>

  {/* <!-- Menu Wrap --> */}
  <div class="menu-wrap">
    <div class="main_wrap">
      <ul class="menu">
	      <li><Link to="/agents"  id="menu_downline_list" className={`${(props.tabMenu===1 )? "select": "null"}`} >Downline List
	      </Link></li>
	      
	      <li>
		      <Link to="/myAccount/accountSummary" id="menu_my_account" className={`${(props.tabMenu===2 || props.tabMenu===9 || props.tabMenu===10 || props.tabMenu===11 || props.tabMenu===12)? "select": "null"}`}>My Account
		      </Link>
		  </li>

	      <li>
			  <a id="menu_my_report"  className={`${(props.tabMenu===3 || props.tabMenu===4)? "menu-drop select": "null"}`}>My Report
	      </a>
		      <ul>
			      
			      <li><Link to="/downLineProfitLoss" >Profit/Loss Report by Downline
			         </Link>
				  </li>
			      <li><Link to="/marketProfitLoss" >Profit/Loss Report by Market
			        </Link>
				  </li>
			      
			      
			      
		      </ul>
	      </li>
	      
	      
	      
	      <li><Link to="/betList" id="menu_bet_list" className={`${(props.tabMenu===5)? "select": "null"}`} >BetList
	      </Link></li>
	      
	      
	      <li><Link to="/betListLive" id="menu_bet_list_live" className={`${(props.tabMenu===6)? "select": "null"}`} >BetListLive
	      </Link></li>
	      
	      
	      <li><Link to="/riskManagement" id="menu_risk_management" className={`${(props.tabMenu===7)? "select": "null"}`}>Risk Management
	      </Link></li>
	      
	      
	      <li><Link to="/cashBanking" id="menu_banking" className={`${(props.tabMenu===8)? "select": "null"}`}>Banking
	      </Link></li>
	      
		  
		 {/* <li><a id="menu_dashboard" class="">Dashboard
		  </a></li>*/}
		  
        <li class="logout">
          <a onClick = {()=>{cookies.remove('sid',  { path: '/' });setTimeout(()=>{window.location.href = '/';},200);}} id="logout">Logout<img src={Transparent}/></a>
        </li>
        <li class="time_zone"><span>Time Zone :</span> GMT+5:30</li>
      </ul>
    </div>
  </div>
</div>
        </React.Fragment>
    )
}
