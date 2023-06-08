import React from 'react'
import Transparent from './images/transparent.gif'
import { Link } from 'react-router-dom'
export default function RiskManagement() {
    return (
        <React.Fragment>
            <div class="main_wrap">
                
    {/* <!-- Loading Wrap --> */}
    <div id="loading" class="loading-wrap" style={{display:'none'}}>
      <ul class="loading">
        <li><img src="/images/loading40.gif"/></li>
        <li>Loading...</li>
      </ul>
    </div>
    
    {/* <!-- Message --> */}
    <div id="message" class="message-wrap success">
      <a class="btn-close">Close</a>
      <p></p>
    </div>
    
        {/* <!-- Report Table --> */}
    <div class="total_all">
        <h2>Risk Management Summary
        </h2>
        <a class="btn_replay" href="javascript:void(0);" id="refresh_Top_Racing" style={{display:'none'}}><img src={Transparent}/></a>
    </div>
    <div class="match-wrap">
        <div class="total_all">
            <h2>Cricket</h2>
            <a class="btn_replay" href="javascript:void(0);" id="refresh_Match_Odds"><img src={Transparent}/></a>
            <a class="btn_replay" href="javascript:void(0);" id="downloadFile_Match_Odds" style={{display: 'none',width: "70px"}}>Download</a>
        </div>
        <table class="table01 risk_matchodd">
            <tbody><tr>
                <th width="10%" class="align-L" rowspan="2">Sports</th>
                <th width="8%" class="align-L" rowspan="2">Market Date</th>
                <th class="align-L" rowspan="2">Event/Market Name</th>
                <th width="21%" class="align-C border-l bg-yellow" colspan="3">Player P/L</th>
                {/* <th width="6%" class="align-C border-l" rowspan="2">Downline P/L</th> */}
            </tr>
            <tr>
                <th width="7%" class="border-l bg-yellow">1</th>
                <th width="7%" class="bg-yellow">X</th>
                <th width="7%" class="bg-yellow">2</th>
            </tr>
    
            </tbody>
            <tbody id="content_MATCH_ODDS_DRAW"><tr id="tempTr_MATCH_ODDS_DRAW" class="border-t">
			<td class="align-L" rowspan="1"  id="0_1"><a id="eventType" href="javascript:void(0);">Cricket</a></td>
			<td class="align-L border-l" rowspan="1" id="1_1" >2020-12-19</td>
			<td class="align-L border-l">
				{/* <a href="javascript:void(0);" class="btn open-odds" id="showOddsBtn"  name="oddsBtn_30180016">Open</a> */}
				<Link to ='/Runningmarketanlysis' id="marketPath">
					<strong id="eventName">Australia v India</strong>
					<img class="fromto" src={Transparent}/>
					<span id="marketName">Match Odds</span>
				</Link>
			</td>
			<td class="border-l"><a class="" href="javascript:void(0);" id="selection_exposure_1">175.00</a></td>
			<td><a class="" href="javascript:void(0);" id="selection_exposure_3">150.00</a></td>
			<td><a class="" href="javascript:void(0);" id="selection_exposure_2"><span class="red">(114.00)</span></a></td>
			{/* <td class="border-l"><a href="javascript:void(0);" class="btn" id="view">View</a></td> */}
		</tr><tr id="expand_30180016" class="expand" style={{display: 'none'}}>
			<td class="border-l align-L" colspan="4">
				<img class="expand-arrow" src={Transparent}/>
				<iframe src="" frameborder="0" height="197" scrolling="no"></iframe>
				<div class="risk-message" id="risk_message" style={{display: 'none'}}></div>
			</td>
			<td width="80" class="border-l"></td>
		</tr></tbody>
        </table>
    </div>
    
    <div class="match-wrap">
        <div class="total_all">
            <h2>Soccer</h2>
            <a class="btn_replay" href="javascript:void(0);" id="refresh_Match_Odds"><img src={Transparent}/></a>
            <a class="btn_replay" href="javascript:void(0);" id="downloadFile_Match_Odds" style={{display: 'none',width: "70px"}}>Download</a>
        </div>
        <table class="table01 risk_matchodd">
            <tbody><tr>
                <th width="10%" class="align-L" rowspan="2">Sports</th>
                <th width="8%" class="align-L" rowspan="2">Market Date</th>
                <th class="align-L" rowspan="2">Event/Market Name</th>
                <th width="21%" class="align-C border-l bg-yellow" colspan="3">Player P/L</th>
                {/* <th width="6%" class="align-C border-l" rowspan="2">Downline P/L</th> */}
            </tr>
            <tr>
                <th width="7%" class="border-l bg-yellow">1</th>
                <th width="7%" class="bg-yellow">X</th>
                <th width="7%" class="bg-yellow">2</th>
            </tr>
    
            </tbody>
            <tbody id="content_MATCH_ODDS_DRAW"><tr id="tempTr_MATCH_ODDS_DRAW" class="border-t">
			<td class="align-L" rowspan="1"  id="0_1"><a id="eventType" href="javascript:void(0);">Cricket</a></td>
			<td class="align-L border-l" rowspan="1" id="1_1" >2020-12-19</td>
			<td class="align-L border-l">
				{/* <a href="javascript:void(0);" class="btn open-odds" id="showOddsBtn"  name="oddsBtn_30180016">Open</a> */}
				<Link to="/Runningmarketanlysis" href="javascript:void(0);" id="marketPath">
					<strong id="eventName">Australia v India</strong>
					<img class="fromto" src={Transparent}/>
					<span id="marketName">Match Odds</span>
				</Link>
			</td>
			<td class="border-l"><a class="" href="javascript:void(0);" id="selection_exposure_1">175.00</a></td>
			<td><a class="" href="javascript:void(0);" id="selection_exposure_3">150.00</a></td>
			<td><a class="" href="javascript:void(0);" id="selection_exposure_2"><span class="red">(114.00)</span></a></td>
			{/* <td class="border-l"><a href="javascript:void(0);" class="btn" id="view">View</a></td> */}
		</tr><tr id="expand_30180016" class="expand" style={{display: 'none'}}>
			<td class="border-l align-L" colspan="4">
				<img class="expand-arrow" src={Transparent}/>
				<iframe src="" frameborder="0" height="197" scrolling="no"></iframe>
				<div class="risk-message" id="risk_message" style={{display: 'none'}}></div>
			</td>
			<td width="80" class="border-l"></td>
		</tr></tbody>
        </table>
    </div>

    <div class="match-wrap">
        <div class="total_all">
            <h2>Tennis</h2>
            <a class="btn_replay" href="javascript:void(0);" id="refresh_Match_Odds"><img src={Transparent}/></a>
            <a class="btn_replay" href="javascript:void(0);" id="downloadFile_Match_Odds" style={{display: 'none',width: "70px"}}>Download</a>
        </div>
        <table class="table01 risk_matchodd">
            <tbody><tr>
                <th width="10%" class="align-L" rowspan="2">Sports</th>
                <th width="8%" class="align-L" rowspan="2">Market Date</th>
                <th class="align-L" rowspan="2">Event/Market Name</th>
                <th width="21%" class="align-C border-l bg-yellow" colspan="3">Player P/L</th>
                {/* <th width="6%" class="align-C border-l" rowspan="2">Downline P/L</th> */}
            </tr>
            <tr>
                <th width="7%" class="border-l bg-yellow">1</th>
                <th width="7%" class="bg-yellow">X</th>
                <th width="7%" class="bg-yellow">2</th>
            </tr>
    
            </tbody>
            <tbody id="content_MATCH_ODDS_DRAW"><tr id="tempTr_MATCH_ODDS_DRAW" class="border-t">
			<td class="align-L" rowspan="1"  id="0_1"><a id="eventType" href="javascript:void(0);">Cricket</a></td>
			<td class="align-L border-l" rowspan="1" id="1_1" >2020-12-19</td>
			<td class="align-L border-l">
				{/* <a href="javascript:void(0);" class="btn open-odds" id="showOddsBtn"  name="oddsBtn_30180016">Open</a> */}
				<a href="javascript:void(0);" id="marketPath">
					<strong id="eventName">Australia v India</strong>
					<img class="fromto" src={Transparent}/>
					<span id="marketName">Match Odds</span>
				</a>
			</td>
			<td class="border-l"><a class="" href="javascript:void(0);" id="selection_exposure_1">175.00</a></td>
			<td><a class="" href="javascript:void(0);" id="selection_exposure_3">150.00</a></td>
			<td><a class="" href="javascript:void(0);" id="selection_exposure_2"><span class="red">(114.00)</span></a></td>
			{/* <td class="border-l"><a href="javascript:void(0);" class="btn" id="view">View</a></td> */}
		</tr><tr id="expand_30180016" class="expand" style={{display: 'none'}}>
			<td class="border-l align-L" colspan="4">
				<img class="expand-arrow" src={Transparent}/>
				<iframe src="" frameborder="0" height="197" scrolling="no"></iframe>
				<div class="risk-message" id="risk_message" style={{display: 'none'}}></div>
			</td>
			<td width="80" class="border-l"></td>
		</tr></tbody>
        </table>
    </div>    
    </div>
        </React.Fragment>
    )
}
