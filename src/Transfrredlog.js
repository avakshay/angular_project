import React from 'react'
import { Link} from "react-router-dom";
import Loading from './images/loading40.gif'
export default function Transfrredlog(props) {
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
            <li><Link to="/myAccount/transferredLog" id="transferredLog" class="select">Transferred Log</Link></li>
            <li class="class">Account Details</li>
            <li><Link to="/myAccount/profile" id="profile" >Profile</Link></li>
            <li><Link to="/myAccount/activityLog" id="activityLog" >Activity Log</Link></li>
        </ul>
    </div>
</div>
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

	<h2>Transferred Log
	</h2>

	<table style={{display:'none'}}>
		<tbody><tr id="tempTr">
			<td class="align-L" id="dateTime"></td>
			<td id="beforeSettlement"></td>
			<td id="settledAmount"></td>
			<td id="afterSettlement"></td>
			<td class="align-L" id="remarks"></td>
			<td class="align-L">
				<spen id="from"></spen>
				<img class="fromto" src="/images/transparent.gif"/>
				<spen id="to"></spen>
			</td>
		</tr>

		<tr id="noDataTempTr">
			<td class="no-data" colspan="6">
				<p>No Data
				</p>
			</td>
		</tr>
	</tbody></table>

	<table class="table01">
		<tbody><tr>
			<th width="15%" class="align-L">Date/Time
			</th>
			<th width="15%">Before Settlement
			</th>
			<th width="15%">Settled Amount
			</th>
			<th width="15%">After Settlement
			</th>
			<th width="" class="align-L">Remarks
			</th>
			<th width="20%" class="align-L">From/To
			</th>
		</tr>

		</tbody><tbody id="content"><tr id="noDataTempTr">
			<td class="no-data" colspan="6">
				<p>No Data
				</p>
			</td>
		</tr></tbody>
	</table>

	{/* <!-- Pages List --> */}
	

<script type="text/javascript" src="/js/util/PageUtil.js?v=20201202_1606876800000"></script>
<div>
	<ul style={{display:'none'}}>
		<li id="prev"><a href="javascript:void(0);">Prev</a></li>
		<li id="next"><a href="javascript:void(0);">Next</a></li>
		<li id="pageNumber"><a href="javascript:void(0);"></a></li>
		<li id="more"><a href="javascript:void(0);">...</a></li>
		<input type="text" id="goToPageNumber" onkeyup="return PageHandler.validatePageNumber(this)" maxlength="6" size="4"/>
		<li><a id="goPageBtn">GO</a></li>			
	</ul>

	<ul id="pageNumberContent" class="pages"></ul>
</div>

</div>

</div>
        </React.Fragment>
    )
}
