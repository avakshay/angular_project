import React, { useEffect, useState } from 'react'
import Loading from './images/loading40.gif'
import Transparent from './images/transparent.gif'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Datepic from './Datepicker';
import moment from 'moment';
import {toast} from 'react-toastify'
import Reactdatepicker from './Reactdatepicker';

window.betHistoryView = 1;
window.day = 3;
const cookies = new Cookies();
toast.configure()

export default function Bethistory(props) {

    const [select, setselect] = useState(0)
	const [bethistory, setbethistory] = useState([])
	const [sDate, setsDate] = useState('')
	const [eDate, seteDate] = useState('')
	const [sTime, setsTime] = useState('09:00')
    const [eTime, seteTime] = useState('08:59')
    
    const changeStartDate = (val)=>{
		setsDate(val);
	}
	const changeEndDate = (val)=>{
		seteDate(val);
	}
	const changeStartTime = (val)=>{
		setsTime(val);
	}
	const changeEndTime = (val)=>{
		seteTime(val);
	}

    const getBetHistory = ()=>{
		
		var start = '';
		var end = '';

		if(window.day === 3){
		   start = sDate+' '+sTime+':00';
		   end = eDate+' '+eTime+':00';
		}
		else if(window.day === 1){
		  var now = moment();	
		  start = now.startOf('day').format("YYYY-MM-DD HH:mm:ss");
		  end = now.endOf('day').format("YYYY-MM-DD HH:mm:ss");

		 
		  
			
		}
		else if(window.day === 2){
		  var now = moment().subtract(1, 'days');	
		  start = now.startOf('day').format("YYYY-MM-DD HH:mm:ss");
		  end = moment().endOf('day').format("YYYY-MM-DD HH:mm:ss");
          

		}
		
        var ssid = cookies.get('sid');
        if(!ssid) return;
        axios.post('http://65.0.111.203:3000/betHistoryClient',{
            sid:ssid,
		   startDate: start,
		   endDate: end,
           view:window.betHistoryView,
           clientId:props.agentStack[props.agentStack.length-1].userid
		  })
		 .then(result => {
			 if(result.data.length == 0){
				toast.warn('You have no bets in this periods!', {position:toast.POSITION.TOP_CENTER})
			 }
			
			if(result.status === 200){
			  setbethistory(result.data);
			  console.log(result);
			}
					
		 }  
		  
		).catch(e => {
		  //setIsError(true);
		});

       }
       
    return (
        <React.Fragment>
            <div class="col-center report">
        

        
        <div id="loading" class="loading-wrap" style={{display:'none'}}>
          <ul class="loading">
            <li><img src="/images/loading40.gif"/></li>
            <li>Loading...</li>
          </ul>
        </div>
        <div id="message" class="message-wrap success">
          <a class="btn-close">Close</a>
          <p></p>
        </div>
        <h2>Betting History</h2>
        <ul class="report-tab-wrap" >
    <li  onClick ={()=>{setselect(0)}} className={`report-tab ${(select=== 0 )? "select": "null"}`}  id="reportType_exchange" data-reporttabtype="0">
        Exchange
    </li>
    <li onClick ={()=>{setselect(1)}} className={`report-tab ${(select=== 1 )? "select": "null"}`} id="reportType_sportsBook" data-reporttabtype="2">
        Sportsbook
    </li>
    <li onClick ={()=>{setselect(2)}} className={`report-tab ${(select=== 2 )? "select": "null"}`} id="reportType_bookMaker" data-reporttabtype="3">
        BookMaker
    </li>
    <li onClick ={()=>{setselect(3)}} className={`report-tab ${(select=== 3 )? "select": "null"}`} id="reportType_binary" data-reporttabtype="5">
        Binary
    </li>
</ul> 
<div class="function-wrap">
    <ul class="input-list">
        <div id="statusCondition">
            <li><label>Bet Status:</label></li>
            <li>
                <select name="betStatus" id="betStatus"><option value="2">Settled</option></select>
            </li>
        </div> 
        <li><label>Period</label></li>
        {/* <Datepic changeStartDate = {changeStartDate} changeEndDate = {changeEndDate} changeStartTime = {changeStartTime} changeEndTime = {changeEndTime}/> */}
        <Reactdatepicker changeStartDate = {changeStartDate} changeEndDate = {changeEndDate} changeStartTime = {changeStartTime} changeEndTime = {changeEndTime}/>
		<li style={{display:'none'}}>(TimeZone:IST)</li>
    </ul>
    
    <ul class="input-list">
        <li><a id="today" onClick = {()=>{window.day = 1;getBetHistory();}} class="btn">Just For Today</a></li>
        <li><a id="yesterday" onClick = {()=>{window.day = 2;getBetHistory();}} class="btn">From Yesterday</a></li>
        <li style={{display:'none'}}><a id="last7days" href="/#" class="btn">Last 7 days</a></li>
        <li style={{display:'none'}}><a id="last30days" href="/#" class="btn">Last 30 days</a></li>
        <li style={{display:'none'}}><a id="last2months" href="/#" class="btn">Last 2 Months</a></li>
        <li style={{display:'none'}}><a id="last3months" href="/#" class="btn">Last 3 Months</a></li>
        <li><a id="getPL" onClick = {()=>{window.day = 3;getBetHistory();}} class="btn-send">Get History</a></li>
    </ul>
 </div>
       
      
       
       
             <div id="noReportMessage" style={{display:'none'}}>
    <p>Betting History enables you to review the bets you have placed. <br/>Specify the time period during which your bets were placed, the type of markets on which the bets were placed, and the sport.</p>
 <p>Betting History is available online for the past 30 days.</p></div>
 <div id="report">
	<table id="matchTableTemplate" class="table-s" style={{display:'none'}}>
		<tbody><tr>
			<th width="9%" class="align-L">Bet ID
			</th>
			<th width="9%" class="align-L">PL ID
            </th>
			<th width="" class="align-L">Market
			</th>
			<th width="12%">Selection
			</th>
			<th width="4%">Type
			</th>
			<th width="8%">Bet placed
			</th>
		
			<th width="8%">Stake
			</th>
			<th width="8%">Avg. odds matched
			</th>
			<th width="10%">Profit/Loss
			</th>
			<th width="10%" id="userCancelTitle" style={{display:'none'}}>User Cancel
			</th>
		</tr>

		<tr id="matchRowTemplate" style={{display:'none'}}>
			<td class="align-L"><a id="betID" href="javascript: void(0);"></a></td>
			<td class="align-L" id="playerID"></td>
			<td id="matchTitle" class="align-L"></td>
			<td id="matchSelection"></td>
			<td><span id="matchType"></span></td>
			<td><span id="betPlaced" class="small-date"></span></td>
			
			<td id="matchStake"></td>
			<td id="matchAvgOdds"></td>
			<td><span id="pol" class="small-date"></span></td>
			<td id="userCancel"></td>
		</tr>

		<tr id="expandReductionRowTemplate" class="expand" style={{display:'none'}}>
			<td colspan="10">
				<img class="expand-arrow" src={Transparent}/>
				<table id="txTableTemplate">
					<tbody><tr>
						<th>Bet taken
						</th>
						
						<th width="14%">Stake
						</th>
						<th width="14%">Liability
						</th>
						<th width="14%">Odds matched
						</th>
						<th width="14%">Reduction
						</th>
						<th width="14%">Actual Odds.
						</th>
					</tr>

					<tr id="txRowTemplate" style={{display:'none'}}>
						<td><span id="betTaken" class="small-date"></span></td>
						<td id="txOddsReq"></td>
						<td id="txStake"></td>
						<td id="txLiability"></td>
						<td id="txOddsMatched"></td>
						<td id="reduction"></td>
						<td id="actualOdds"></td>
					</tr>
				</tbody></table>
			</td>
		</tr>

		<tr id="expandRowTemplate" class="expand" style={{display:'none'}}>
			<td colspan="2"></td>
			<td colspan="8">
				<img class="expand-arrow" src={Transparent}/>
				<table id="txTableTemplate">
					<tbody><tr>
						<th>Bet taken
						</th>
						
						<th width="17%">Stake
						</th>
						<th width="24%">Liability
						</th>
						<th width="24%">Odds matched
						</th>
					</tr>

					<tr id="txRowTemplate" style={{display:'none'}}>
						<td><span id="betTaken" class="small-date"></span></td>
						<td id="txOddsReq"></td>
						<td id="txStake"></td>
						<td id="txLiability"></td>
						<td id="txOddsMatched"></td>
					</tr>
				</tbody></table>
			</td>
		</tr>
	</tbody></table>
	
	<table id="matchTable" class="table-s" style={{display:'table'}}>
		<tbody><tr>
			<th width="9%" class="align-L">Bet ID
			</th>
			<th width="9%" class="align-L">PL ID
            </th>
			<th width="" class="align-L">Market
			</th>
			<th width="12%">Selection
			</th>
			<th width="4%">Type
			</th>
			<th width="8%">Bet placed
			</th>
			
			<th width="8%">Stake
			</th>
			<th width="8%">Avg. odds matched
			</th>
			<th width="10%">Profit/Loss
			</th>
			<th width="10%" id="userCancelTitle" style={{display:'none'}}>User Cancel
			</th>
		</tr>

		<tr id="matchRowTemplate" style={{display:'none'}}>
			<td class="align-L"><a id="betID" href="javascript: void(0);"></a></td>
			<td class="align-L" id="playerID"></td>
			<td id="matchTitle" class="align-L"></td>
			<td id="matchSelection"></td>
			<td><span id="matchType"></span></td>
			<td><span id="betPlaced" class="small-date"></span></td>
		
			<td id="matchStake"></td>
			<td id="matchAvgOdds"></td>
			<td><span id="pol" class="small-date"></span></td>
			<td id="userCancel"></td>
		</tr>

		<tr id="expandReductionRowTemplate" class="expand" style={{display:'none'}}>
			<td colspan="10">
				<img class="expand-arrow" src={Transparent}/>
				<table id="txTableTemplate">
					<tbody><tr>
						<th>Bet taken
						</th>
						<th width="14%">Odds req.
						</th>
						<th width="14%">Stake
						</th>
						<th width="14%">Liability
						</th>
						<th width="14%">Odds matched
						</th>
						<th width="14%">Reduction
						</th>
						<th width="14%">Actual Odds.
						</th>
					</tr>

					<tr id="txRowTemplate" style={{display:'none'}}>
						<td><span id="betTaken" class="small-date"></span></td>
						<td id="txOddsReq"></td>
						<td id="txStake"></td>
						<td id="txLiability"></td>
						<td id="txOddsMatched"></td>
						<td id="reduction"></td>
						<td id="actualOdds"></td>
					</tr>
				</tbody></table>
			</td>
		</tr>

		<tr id="expandRowTemplate" class="expand" style={{display:'none'}}>
			<td colspan="2"></td>
			<td colspan="8">
				<img class="expand-arrow" src={Transparent}/>
				<table id="txTableTemplate">
					<tbody><tr>
						<th>Bet taken
						</th>
						<th width="16%">Odds req.
						</th>
						<th width="17%">Stake
						</th>
						<th width="24%">Liability
						</th>
						<th width="24%">Odds matched
						</th>
					</tr>

					<tr id="txRowTemplate" style={{display:'none'}}>
						<td><span id="betTaken" class="small-date"></span></td>
						<td id="txOddsReq"></td>
						<td id="txStake"></td>
						<td id="txLiability"></td>
						<td id="txOddsMatched"></td>
					</tr>
				</tbody></table>
			</td>
		</tr>




   {bethistory.map((item,index)=>{
	   var matchName;
	   var runner;
	   var odds;
	   var profit='';
	   var matchtype; 
	   if(item.eventType == '4'){
		   matchName = 'CRICKET';
	   }else if(item.eventType == '1'){
		   matchName = 'SOCCER';
	   }
	   else if(item.eventType == '2'){
		matchName = 'TENNIS';
	   }
	   if(item.betType == 'fancy'){
		runner = item.runnerName;
		odds = item.rate+'/'+ parseFloat(item.teamName*100).toFixed(0);
	   }
	   else if(item.betType == 'match'){
		 odds = parseFloat(parseFloat(item.rate) + 1).toFixed(2);
		   if(item.teamName == 'A'){
			   runner = item.runnerName1;
		   }
		   else if(item.teamName == 'B'){
			runner = item.runnerName2;
		   }
		   else if(item.teamName == 'T'){
			runner = 'The Draw';
		   }
	   }
       
	   if(item.betType == 'fancy' && item.result){
			if(item.type=="YES"){
				if(parseFloat(item.rate) <= parseFloat(item.result)){
				
					profit=parseFloat(item.amount*item.teamName).toFixed(2);
				}
				else profit=item.amount*(-1);
			
			}
			else{
				if(parseFloat(item.rate)>parseFloat(item.result)){
					profit=item.amount;
				}
				else profit=parseFloat((item.amount*item.teamName)*(-1)).toFixed(2);
			}
	   }
	   else if(item.betType=='match' && item.winner){
		if(item.type=="LAGAI"){
			if(item.teamName=='A'){
				if(item.winner=="A") profit=parseFloat(item.rate*item.amount).toFixed(2);
				else profit=item.amount*(-1);
			}
			else if(item.teamName=="B"){
				if(item.winner=="B") profit=parseFloat(item.rate*item.amount).toFixed(2);
				else profit=item.amount*(-1);
			}
			else if(item.teamName=="T"){
				if(item.winner=="T") profit=parseFloat(item.rate*item.amount).toFixed(2);
				else profit=item.amount*(-1);
			}
		}
		else if(item.type=="KHAI"){
			if(item.teamName=='A'){
				if(item.winner!="A") profit=item.amount;
				else profit=parseFloat(item.rate*item.amount*-1).toFixed(2);
			}
			else if(item.teamName=="B"){
				if(item.winner!="B") profit=item.amount;
				else profit=parseFloat(item.rate*item.amount*-1).toFixed(2);
			}
			else if(item.teamName=="T"){
				if(item.winner!="T") profit=item.amount;
				else profit=parseFloat(item.rate*item.amount*-1).toFixed(2);
			}
		}
		
		if((item.selectionIdTie== null  || item.selectionIdTie=='') && item.winner=="T"){
			profit=0;
		}

		}
		
		if(item.type === 'LAGAI'){
			matchtype = 'BACK';
		}
		else if(item.type === 'KHAI'){
			matchtype = 'LAY';
		}
		else{
			matchtype = item.type;
		}
	  
	   
			
		return(
	    <tr key ={index} id="matchRow0" style={{display:'table-row'}}>
			<td class="align-L"><a id="betID" href="javascript: void(0);" class="expand-close" onclick="BettingHistoryUtilHandler.toggleTx(0)">{item.id}</a></td>
			<td class="align-L" id="playerID">{item.clientId}</td>
		    <td id="matchTitle" class="align-L">{matchName}<img class="fromto" src={Transparent}/><strong>{item.eventName}</strong><img class="fromto" src={Transparent}/>{item.betType == 'match' ? item.marketName : 'FANCY_BET'}</td>
			<td id="matchSelection">{runner}</td>
			<td><span id="matchType" className={`${item.type === 'LAGAI' || item.type === 'YES'? "back":"lay"}`}>{matchtype}</span></td>
			<td><span id="betPlaced" class="small-date">{item.betTime}</span></td>
			
			<td id="matchStake">{item.amount}</td>
			<td id="matchAvgOdds">{odds}</td>
		    <td><span id="pol" class="small-date"><span className={`${profit >= 0 ? "green":"red"}`}>{profit >= 0 ? profit : '('+ Math.abs(profit) +')'}</span></span></td>
			<td id="userCancel" style={{display:'none'}}></td>
		</tr>
		)})}
		
		<tr id="expand0" class="expand" style={{display:'none'}}>
			<td colspan="2"></td>
			<td colspan="8">
				<img class="expand-arrow" src={Transparent}/>
				<table id="txTable0">
					<tbody><tr>
						<th>Bet taken
						</th>
						<th width="16%">Odds req.
						</th>
						<th width="17%">Stake
						</th>
						<th width="24%">Liability
						</th>
						<th width="24%">Odds matched
						</th>
					</tr>

					<tr id="txRowTemplate" style={{display:'none'}}>
						<td><span id="betTaken" class="small-date"></span></td>
						<td id="txOddsReq"></td>
						<td id="txStake"></td>
						<td id="txLiability"></td>
						<td id="txOddsMatched"></td>
					</tr>
				   <tr id="txRow0" style={{display:'table-row'}} class="even">
						<td><span id="betTaken" class="small-date">2020-10-27 20:54:45</span></td>
						<td id="txOddsReq">1.16</td>
						<td id="txStake">10.00</td>
						<td id="txLiability"><span class="red">(1.60)</span></td>
						<td id="txOddsMatched">1.16</td>
					</tr></tbody></table>
			</td>
		</tr>
		
		
		
		
		
			
	</tbody>
	</table>
	{bethistory.length > 0 && <p class="table-other">Betting History is shown net of commission.
	</p>}
	{bethistory.length == 0 && <p class="table-other">Betting History enables you to review the bets you have placed.
	</p>}
	{bethistory.length == 0 && <p class="table-other">Specify the time period during which your bets were placed, the type of markets on which the bets were placed, and the sport.


	</p>}

	

	
	{bethistory.length == 0 && <p  style = {{marginTop:'10px'}} class="table-other">Betting History is available online for the past 30 days.


	</p>}




 <div>
	
 {bethistory.length > 0 &&	<ul id="pageNumberContent" class="pages">
		<li id="prev"><a onClick = {()=>{if(window.betHistoryView > 1){window.betHistoryView = window.betHistoryView -1;getBetHistory();}}} className={`${(window.betHistoryView > 1) ? "": "disable"}`}>Prev</a></li>
		<li id="pageNumber"><a  class="select" style={{pointerEvents:' none'}}>{window.betHistoryView}</a></li>
		<li id="next"><a onClick = {()=>{if(bethistory.length >= 50){window.betHistoryView = window.betHistoryView + 1;getBetHistory();}}} className={`${(bethistory.length >= 50) ? "": "disable"}`} >Next</a></li></ul>}
     </div>

    </div>
      </div> 
        </React.Fragment>
    )
}
