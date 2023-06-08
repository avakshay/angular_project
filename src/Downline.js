import React from 'react'
import Reactdatepicker from './Reactdatepicker'

export default function Downline() {
    return (
        <React.Fragment>
            <div class="main_wrap" style={{height: 'calc(100% - 105px)'}}>
	<h2>Profit/Loss Report by Downline
	</h2>
	{/* <!-- function --> */}
	<div class="function-wrap">
		<ul class="input-list">
			<div id="statusCondition" style={{display:'none'}}>
				<li>
					<label>Bet Status:</label>
				</li>
				<li>
					<select name="betStatus" id="betStatus"></select>
				</li>
			</div>
			<li>
				<label>Time Zone</label>
			</li>
			<li>
				<select name="timezone" id="timezone">
					<option value="Pacific/Midway">Pacific/Midway(GMT-11:00)</option>
					<option value="Pacific/Honolulu">Pacific/Honolulu(GMT-10:00)</option>
					<option value="America/Juneau">America/Juneau(GMT-9:00)</option>
					<option value="America/Los_Angeles">America/Los_Angeles(GMT-8:00)</option>
					<option value="America/Phoenix">America/Phoenix(GMT-7:00)</option>
					<option value="America/Chicago">America/Chicago(GMT-6:00)</option>
					<option value="America/New_York">America/New_York(GMT-5:00)</option>
					<option value="America/Santiago">America/Santiago(GMT-4:00)</option>
					<option value="America/Sao_Paulo">America/Sao_Paulo(GMT-3:00)</option>
					<option value="Atlantic/South_Georgia">Atlantic/South_Georgia(GMT-2:00)</option>
					<option value="Atlantic/Azores">Atlantic/Azores(GMT-1:00)</option>
					<option value="Europe/London">Europe/London(GMT+0:00)</option>
					<option value="Europe/Paris">Europe/Paris(GMT+1:00)</option>
					<option value="Africa/Cairo">Africa/Cairo(GMT+2:00)</option>
					<option value="Asia/Qatar">Asia/Qatar(GMT+3:00)</option>
					<option value="Asia/Dubai">Asia/Dubai(GMT+4:00)</option>
					<option value="Asia/Karachi">Asia/Karachi(GMT+5:00)</option>
					<option value="IST" selected="selected">IST(Bangalore / Bombay / New Delhi) (GMT+5:30)</option>
					<option value="Asia/Kathmandu">Asia/Kathmandu(GMT+5:45)</option>
					<option value="Asia/Dhaka">Asia/Dhaka(GMT+6:00)</option>
					<option value="Asia/Bangkok">Asia/Bangkok(GMT+7:00)</option>
					<option value="Asia/Hong_Kong">Asia/Hong_Kong(GMT+8:00)</option>
					<option value="Asia/Tokyo">Asia/Tokyo(GMT+9:00)</option>
					<option value="Australia/Adelaide">Australia/Adelaide(GMT+9:30)</option>
					<option value="Australia/Melbourne">Australia/Melbourne(GMT+10:00)</option>
					<option value="Asia/Magadan">Asia/Magadan(GMT+11:00)</option>
					<option value="Pacific/Fiji">Pacific/Fiji(GMT+12:00)</option>
				</select>
			</li>
			<li></li>
			<li>
				<label>Period</label>
			</li>
			<Reactdatepicker/>
			{/* <li>
				<input id="startDate" class="cal-input" type="text" placeholder="YYYY-MM-DD" min="2020-10-04" max="2020-12-06" onclick="calendarObj.show(event,'startDate');"/>
				<input id="startTime" disabled="" class="time-input disable" type="text" placeholder="09:00" maxlength="5"/>to
				<input id="endDate" class="cal-input" type="text" placeholder="YYYY-MM-DD" min="2020-10-04" max="2020-12-06" onclick="calendarObj.show(event,'endDate');"/>
				<input id="endTime" disabled="" class="time-input disable" type="text" placeholder="08:59" maxlength="5"/>
			</li> */}
			<li style={{display:'none'}}>(TimeZone:IST)</li>
		</ul>
		<ul class="input-list">
			<li><a id="today"  class="btn">Just For Today</a>
			</li>
			<li><a id="yesterday"  class="btn">From Yesterday</a>
			</li>
			<li style={{display:'none'}}><a id="last7days"  class="btn">Last 7 days</a>
			</li>
			<li style={{display:'none'}}><a id="last30days"  class="btn">Last 30 days</a>
			</li>
			<li style={{display:'none'}}><a id="last2months"  class="btn">Last 2 Months</a>
			</li>
			<li style={{display:'none'}}><a id="last3months"  class="btn">Last 3 Months</a>
			</li>
			<li><a id="getPL"  class="btn-send">Get P &amp; L</a>
			</li>
		</ul>
	</div>
	{/* <!-- No Report Message --> */}
	<div id="noReportMessage"></div>

	{/* <!-- function end--> */}
	{/* <!-- Loading Wrap --> */}
	<div id="loading" class="loading-wrap" style={{display:'none'}}>
		<ul class="loading">
			<li>
				<img src="/images/loading40.gif"/>
			</li>
			<li>Loading...</li>
		</ul>
	</div>
	{/* <!-- Message --> */}
	<div id="message" class="message-wrap success"> <a class="btn-close">Close</a>
		<p></p>
	</div>
	
	{/* <!-- Report Table --> */}
	<table style={{display:'none'}}>
		<tbody>
			<tr id="tempTr">
				<td class="align-L">
					<a id="_bySport"  class="expand-close"></a>
					<a id="_userName" class="ico_account" ></a>
				</td>
				<td id="_stake"></td>
				<td id="_profitLoss"></td>
				<td id="_profitLossDownLine"></td>
				<td id="_tax3"></td>
				<td id="_rebate3"></td>
				<td id="_tax2"></td>
				<td id="_rebate2"></td>
				<td id="_payout1"></td>
				<td id="_tax1"></td>
				<td id="_rebate1"></td>
				<td id="_profitLoss1"></td>
				<td id="_profitLossUpLine"></td>
			</tr>
			<tr id="subTempTr" class="expand">
				<td class="align-L">
					<a id="_sportName" class="ico_account" ></a>
				</td>
				<td id="sport_stake"></td>
				<td id="sport_profitLoss"></td>
				<td id="sport_profitLossDownLine"></td>
				<td id="sport_tax3"></td>
				<td id="sport_rebate3"></td>
				<td id="sport_tax2"></td>
				<td id="sport_rebate2"></td>
				<td id="sport_payout1"></td>
				<td id="sport_tax1"></td>
				<td id="sport_rebate1"></td>
				<td id="sport_profitLoss1"></td>
				<td id="sport_profitLossUpLine"></td>
			</tr>
			<tr id="tempTotalTr" class="total">
				<td class="align-L">Total</td>
				<td id="_totalStake"></td>
				<td id="_totalProfitLoss"></td>
				<td id="_totalProfitLossDownLine"></td>
				<td id="_totalTax3"></td>
				<td id="_totalRebate3"></td>
				<td id="_totalTax2"></td>
				<td id="_totalRebate2"></td>
				<td id="_totalPayout1"></td>
				<td id="_totalTax1"></td>
				<td id="_totalRebate1"></td>
				<td id="_totalProfitLoss1"></td>
				<td id="_totalProfitLossUpLine"></td>
			</tr>
		</tbody>
	</table>
	<div class="total_all" id="userTreeDiv">
		<ul style={{display:'none'}}>
			<li id="tempTree" class=""><a><span class="lv_1"></span></a>
			</li>
			<li id="tempCurrencyTree" class="currency_tag"><strong></strong>
			</li>
		</ul>
		<div id="treePath" class="agent_path">
			<ul class="agent_path-L" id="userTree"></ul>
		</div>
		<div id="expandAllDiv" style={{display:'none'}}>	<a id="showDetail"  class="btn_expand">Expand All</a>
		</div>
	</div>
	{/* <!-- Report Table --> */}
	<div id="reportDiv" class="over-wrap" style={{maxHeight: 'calc(100% - 32px - 93px - 55px)'}}>
		<table id="table_DL" class="table01 table-pt" style={{display:'none'}}>
			<tbody>
				<tr id="head">
					<th id="header_userName" width="" class="align-L">UID</th>
					<th width="11%" class="">Stake</th>
					<th width="11%" class="">Player P/L</th>
					<th id="header_profitLoss_downLine" width="11%" class="">Downline P/L</th>
					<th id="header_tax_agent_3" width="11%" class="">Master Comm.</th>
					<th id="header_rebate_agent_3" width="11%" class="">Master Rebate</th>
					<th id="header_tax_agent_2" width="11%" class="">Super Comm.</th>
					<th id="header_rebate_agent_2" width="11%" class="">Super Rebate</th>
					<th id="header_payout_agent_1" width="11%" class="">SS PT</th>
					<th id="header_tax_agent_1" width="11%" class="">SS Comm.</th>
					<th id="header_rebate_agent_1" width="11%" class="">SS Rebate</th>
					<th id="header_profitLoss_agent_1" width="11%" class="">SS Total</th>
					<th width="11%" class="">Upline P/L</th>
				</tr>
			</tbody>
			<tbody id="content"></tbody>
		</table>
	</div>
</div>
        </React.Fragment>
    )
}
