import React from 'react'
import { Link} from "react-router-dom";
import Loading from './images/loading40.gif'

export default function ActivityLog(props) {
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
        
        <li id="path5" class="last_li">
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
        
        <ul class="account_pop" id="accountPop">
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
            <li><Link to="/myAccount/accountCashStatement" id="accountStatement" >Account Statement</Link></li>
            <li><Link to="/myAccount/accountSummary" id="accountSummary" >Account Summary</Link></li>
            <li><Link to="/myAccount/transferredLog" id="transferredLog" >Transferred Log</Link></li>
            <li class="class">Account Details</li>
            <li><Link to="/myAccount/profile" id="profile" >Profile</Link></li>
            <li><Link to="/myAccount/activityLog" id="activityLog" class="select">Activity Log</Link></li>
        </ul>
    </div>
</div>
	{/* <!-- Center Column --> */}
{/* <!-- Center Column --> */}
<div id="report" class="col-center report">
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
	<h2>Activity Log
	</h2>
	<table style={{display:'none'}}>
		<tbody><tr id="tempTr">
			<td class="align-L" id="loginDate"></td>
			<td class="align-L" id="loginMessage"><span class="green"></span></td>
			<td id="ipAddress"></td>
			<td id="isp"></td>
			<td id="location"></td>
		</tr>
	</tbody></table>

	{/* <!-- Report Table --> */}
	<table class="table01">
		<tbody><tr>
			<th width="15%" class="align-L">Login Date &amp; Time
			</th>
			<th width="15%" class="align-L">Login Status
			</th>
			<th width="12%">IP Address
			</th>
			<th width="28%">ISP
			</th>
			<th width="">City/State/Country
			</th>
		</tr>
		</tbody><tbody id="content"><tr id="tempTr">
			<td class="align-L" id="loginDate">2020-11-27 09:03:45</td>
			<td class="align-L green" id="loginMessage">Login Success</td>
			<td id="ipAddress">103.88.56.122</td>
			<td id="isp">Nddr Infotech Pvt.Ltd.</td>
			<td id="location">Patna, Bihar, IN</td>
		</tr></tbody>
	</table>

	{/* <!-- Pages List --> */}

<div>
	<ul style={{display:'none'}}>
		<li id="prev"><a href="javascript:void(0);">Prev</a></li>
		<li id="next"><a href="javascript:void(0);">Next</a></li>
		<li id="pageNumber"><a href="javascript:void(0);"></a></li>
		<li id="more"><a href="javascript:void(0);">...</a></li>
		<input type="text" id="goToPageNumber" onkeyup="return PageHandler.validatePageNumber(this)" maxlength="6" size="4"/>
		<li><a id="goPageBtn">GO</a></li>			
	</ul>

	<ul id="pageNumberContent" class="pages"><li id="prev"><a href="javascript:void(0);" class="disable" style={{pointerEvents:' none'}}>Prev</a></li><li id="pageNumber"><a href="javascript:void(0);" class="select" style={{pointerEvents:' none'}}>1</a></li><li id="pageNumber"><a href="javascript:void(0);">2</a></li><li id="next"><a href="javascript:void(0);">Next</a></li></ul>
</div>

</div>
</div>
        </React.Fragment>
    )
}
