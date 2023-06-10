import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Transparent from './images/transparent.gif'
import Pagination from 'react-js-pagination';
import ChangeClientPassword from './ChangeClientPassword';
import { toast } from "react-toastify";
import moment from 'moment';
import Datepic from './Datepicker';
import Bethistory from './Bethistory';
import Reactdatepicker from './Reactdatepicker';

const cookies = new Cookies();
window.pnlView = 1;
window.daypnl = 3;
toast.configure()


export default function ClientProfile(props) {
    const [view, setview] = useState(props.pro);
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [comm, setcomm] = useState("");
    const [exp, setexp] = useState("");
    const [balance, setbalance] = useState("")
    const [ShowPassModel, setShowPassModel] = useState(false)
    const [accountStatement, setaccountStatement] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [time, setDate] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
	const [sDate, setsDate] = useState('')
	const [eDate, seteDate] = useState('')
	const [sTime, setsTime] = useState('09:00')
	const [eTime, seteTime] = useState('08:59')
	const [select, setselect] = useState(0)
	const [profitLoss, setprofitLoss] = useState([])
	const [click, setclick] = useState(-1);
	const [eventType, seteventType] = useState('0');
	const [eventProfitLoss, seteventProfitLoss] = useState([])
	const [netpl, setnetpl] = useState(0);
    const [postsPerPage] = useState(6);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = accountStatement.slice(indexOfFirstPost, indexOfLastPost);
  
    useEffect(() => {
        var ssid = cookies.get('sid');
        if(!ssid) return;
      axios.post("http://65.0.111.203:3000/clientAccountSummary", {
          sid:ssid,
          agentId:props.agentStack[props.agentStack.length-1].userid
        })
        .then((result) => {
             console.log(result.data);
            setfirstname(result.data.firstname);
            setlastname(result.data.lastname);
            setcomm(result.data.comm);
            setbalance(result.data.balance);
            setexp(result.data.exp)
        })
        .catch((e) => {
          //setIsError(true);
        });

        axios.post('http://65.0.111.203:3000/clientTransHistory',{
             sid:ssid,
             agentId:props.agentStack[props.agentStack.length-1].userid,
            })
            .then(result => {
              if(result.status === 200){
                 console.log(result);
                setaccountStatement(result.data)
               }
             }
             ).catch(e => {
                //setIsError(true);
             });
    }, []);

    const handlepassmodel = ()=>{
        setShowPassModel(true)
      }
       const handleClosepassmodel = ()=>{
        setShowPassModel(false)
      }

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
    
    useEffect(() => {
		var timerID = setInterval( () => tick(), 1000 );
		return function cleanup() {
			clearInterval(timerID);
		  };
	   },[]);
	  
	  function tick() {
		  setDate(moment().format('YYYY-MM-DD HH:mm:ss'));
		 }
	
		 
	const changeEvent = (e)=>{
      var selectBox = document.getElementById("sportsevent");
      var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	  console.log(selectedValue);  
	  if(selectedValue == 0){
		  seteventType('0');
	  }
	  else if(selectedValue == 1){
		  seteventType('1');
	  }
	  else if(selectedValue == 2){
		seteventType('2');
	  }
	  else if(selectedValue == 4){
		seteventType('4');
	  }

	  window.pnlView = 1;
      getpnl(selectedValue);



	}	

	const getpnl = (valEventtype)=>{
		
			var start = '';
			var end = '';
	
			if(window.daypnl === 3){
			   start = sDate+' '+sTime+':00';
			   end = eDate+' '+eTime+':00';
			}
			else if(window.daypnl === 1){
			  var now = moment();	
			  start = now.startOf('day').format("YYYY-MM-DD HH:mm:ss");
			  end = now.endOf('day').format("YYYY-MM-DD HH:mm:ss");
	
			 
			  
				
			}
			else if(window.daypnl === 2){
			  var now = moment().subtract(1, 'days');	
			  start = now.startOf('day').format("YYYY-MM-DD HH:mm:ss");
			  end = moment().endOf('day').format("YYYY-MM-DD HH:mm:ss");
			  
	
			}
			
            var ssid = cookies.get('sid');
            if(!ssid) return;
			axios.post('http://65.0.111.203:3000/profitLossClient',{
                sid:ssid,
			   startDate: start,
			   endDate: end,
			   eventType:valEventtype,
			   view:window.pnlView,
               clientId:props.agentStack[props.agentStack.length-1].userid
			  })
			 .then(result => {
				 if(result.data.length == 0){
					toast.warn('You have no bets in this periods!', {position:toast.POSITION.TOP_CENTER})
					if(eventType != '0'){
						seteventType('0');
					}
				 }
				
				if(result.status === 200){
				  setprofitLoss(result.data);
				  console.log(result);
				  var arr = [];
				  var netSum = 0;
				  result.data.map((item)=>{
					  arr.push(item.eventId);
					  netSum = netSum + parseFloat(item.pl);
				  });
				  seteventProfitLoss(arr);
				  setnetpl(netSum.toFixed(2));
				  if(arr.length === 0){
					  return;
				  }
				  
			      axios.post('http://65.0.111.203:3000/eventProfitLossClient',{
                    sid:ssid,
			        clientId:props.agentStack[props.agentStack.length-1].userid,
			       eventId:arr,
				  })
				  .then(result => {
                     if(result.status === 200){
                         seteventProfitLoss(result.data);
                         console.log(result);
				      }
                         
                       

				   })
                  .catch(e => {
					//setIsError(true);
				  })


                  }			
			   }  
			  
			).catch(e => {
			  //setIsError(true);
			});
	
		}


		const handleSlip = (index)=>{
			if(click === index){
				setclick(-1);
			} 
			else{
				setclick(index);
			}
			
		 }

        // Change page
  const handlePageChange = ( pageNumber ) => {
    // console.log( `active page is ${ pageNumber }` );
    setCurrentPage( pageNumber )
 };
// console.log(props.agentStack[props.agentStack.length-1].userid);

return (
<React.Fragment>
{ ShowPassModel &&
          <ChangeClientPassword agentStack={props.agentStack} handleClosepassmodel={handleClosepassmodel}/>
        }
    
<div class="main_wrap">
      


<div style={{top:'0px'}} class="col-left">

    
    <div class="sub_path">

       
        <ul class="menu-list">
            
	            <li class="class">Position</li>
	            <li>
	                <a onClick={()=>{setview(1);}} id="accountSummary"  className={`${view === 1 ? "select":""}`}>Account Summary</a>
	            </li>
	
	            <li  class="class">Performance</li>
	            
	            <li>
	                <a onClick={()=>{setview(2);}} id="bettingHistory" className={`${view === 2 ? "select":""}`} >Betting History</a>
	            </li>
	            <li>
	                <a onClick={()=>{setview(3);}} id="profitLoss" className={`${view === 3 ? "select":""}`}>Betting Profit &amp; Loss</a>
	            </li>
	            
	            
	            <li>
	                <a onClick={()=>{setview(4);}} id="transactionHistory" className={`${view === 4 ? "select":""}`}>Transaction&nbsp;History
	                </a>
	            </li>
	            
	            <li><a id="_activityLog" >Activity Log</a></li>

            
        </ul>
    </div>
</div>


   
{view === 1 && <div class="col-center report">
        


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


	<h2>Account Summary</h2>

        <ul class="acc-info">
			<li class="user">{props.agentStack[props.agentStack.length-1].userid}</li>
            <li class="status_all">
                <strong id="status"></strong>
            </li>
            
            
            
        </ul>

        
        <table class="table01">
            <tbody><tr>
        <th width="20%" class="align-L">Wallet</th>
                
        <th width="25%">Available to Bet</th>
        <th width="">Funds available to withdraw</th>
        <th width="25%">Current exposure</th>
            </tr>

            <tr>
        <td class="align-L">Main wallet</td>
                
                <td id="availableToBet">{balance}</td>
                <td id="availableToWithDraw">{balance}</td>
                <td id="currentExposure">{exp < 0 ? '('+ Math.abs(exp).toFixed(2) +')' : '0.00'}</td>
            </tr>
        </tbody></table>

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
					<dd>gdyhfgddg@gmail.com</dd>

					<dt>Password</dt>
                    <dd>********************************
                    <a class="favor-set" onClick={()=>handlepassmodel()}>Edit</a>
                    </dd>

					<dt>Time Zone</dt>
					<dd>IST</dd>
                </dl>
            </div>

            <div class="profile-wrap">
				<h3>Contact Details</h3>
                <dl>
					<dt>Primary number</dt>
					<dd></dd>
                </dl>
            </div>
        </div>

        <div class="event-right">
            <div class="profile-wrap">
				<h3>Limits &amp; Commission</h3>
                <dl>
					<dt>Exposure Limit</dt>
					<dd id="mainwalletExposureLimit">10,000.00</dd>
					
					<dt>Commission</dt>
                    <dd>
                        <span id="commission">{comm}.0%</span>
						
                    </dd>

					
                </dl>
            </div>
			
            <div class="profile-wrap" style={{display:'none'}}>
                <h3>PT</h3>
                <dl class="casinopt-list-wrap">
					
					
					<dt>PT Setting</dt>
                    <dd>
                    
						<a class="favor-set" >Edit</a>
						
                    </dd>
					
                    <dd class="dl_list">
                        <img class="expand-arrow" src="/images/transparent.gif"/>
                        <dl class="casinopt-list-head">
							<dt></dt>
							
							<dd>SS</dd>
							
							<dd>SS (Actual)</dd>
							
							<dd>SUP (Actual)</dd>
							
							<dd>MA (Actual)</dd>
							
						</dl>
						
                   		<dl class="casinopt-list">
                         <dt>Soccer</dt>
							
							<dd id="profile_soccer_5_PT_setting">0%</dd>
							
							<dd id="profile_soccer_5_PT">0%</dd>
							
							<dd id="profile_soccer_4_PT">0%</dd>
							
							<dd id="profile_soccer_3_PT">0%</dd>
							
                    	</dl>
                        
                   		<dl class="casinopt-list">
                         <dt>Tennis</dt>
							
							<dd id="profile_tennis_5_PT_setting">0%</dd>
							
							<dd id="profile_tennis_5_PT">0%</dd>
							
							<dd id="profile_tennis_4_PT">0%</dd>
							
							<dd id="profile_tennis_3_PT">0%</dd>
							
                    	</dl>
                        
                   		<dl class="casinopt-list">
                         <dt>Cricket</dt>
							
							<dd id="profile_cricket_5_PT_setting">0%</dd>
							
							<dd id="profile_cricket_5_PT">0%</dd>
							
							<dd id="profile_cricket_4_PT">0%</dd>
							
							<dd id="profile_cricket_3_PT">0%</dd>
							
                    	</dl>
                        
                   		<dl class="casinopt-list">
                         <dt>Rugby Union</dt>
							
							<dd id="profile_rugby_union_5_PT_setting">0%</dd>
							
							<dd id="profile_rugby_union_5_PT">0%</dd>
							
							<dd id="profile_rugby_union_4_PT">0%</dd>
							
							<dd id="profile_rugby_union_3_PT">0%</dd>
							
                    	</dl>
                        
                   		<dl class="casinopt-list">
                         <dt>Horse Racing</dt>
							
							<dd id="profile_horse_racing_5_PT_setting">0%</dd>
							
							<dd id="profile_horse_racing_5_PT">0%</dd>
							
							<dd id="profile_horse_racing_4_PT">0%</dd>
							
							<dd id="profile_horse_racing_3_PT">0%</dd>
							
                    	</dl>
                        
                   		<dl class="casinopt-list">
                         <dt>Greyhound Racing</dt>
							
							<dd id="profile_greyhound_racing_5_PT_setting">0%</dd>
							
							<dd id="profile_greyhound_racing_5_PT">0%</dd>
							
							<dd id="profile_greyhound_racing_4_PT">0%</dd>
							
							<dd id="profile_greyhound_racing_3_PT">0%</dd>
							
                    	</dl>
                        
                   		<dl class="casinopt-list">
                         <dt>American Football</dt>
							
							<dd id="profile_american_football_5_PT_setting">0%</dd>
							
							<dd id="profile_american_football_5_PT">0%</dd>
							
							<dd id="profile_american_football_4_PT">0%</dd>
							
							<dd id="profile_american_football_3_PT">0%</dd>
							
                    	</dl>
                        
                   		<dl class="casinopt-list">
                         <dt>Basketball</dt>
							
							<dd id="profile_basketball_5_PT_setting">0%</dd>
							
							<dd id="profile_basketball_5_PT">0%</dd>
							
							<dd id="profile_basketball_4_PT">0%</dd>
							
							<dd id="profile_basketball_3_PT">0%</dd>
							
                    	</dl>
                        
                   		<dl class="casinopt-list">
                         <dt>Politics</dt>
							
							<dd id="profile_politics_5_PT_setting"></dd>
							
							<dd id="profile_politics_5_PT"></dd>
							
							<dd id="profile_politics_4_PT"></dd>
							
							<dd id="profile_politics_3_PT"></dd>
							
                    	</dl>
                        
                    </dd>

					<div style={{display:'none'}}>
                        <dt>Fancy Bet PT Setting</dt>
                        <dd></dd>
                        <dd class="dl_list">
                            <img class="expand-arrow" src="/images/transparent.gif"/>
                            <dl>
                                <dt>Fancy Bet</dt>
                                <dd id="profile_company_fancy_bet_PT">0%</dd>
                            </dl>
                        </dd>
                    </div>

                    <div style={{display:'none'}}>
                        <dt>Book Maker PT Setting</dt>
                        <dd></dd>
                        <dd class="dl_list">
                            <img class="expand-arrow" src="/images/transparent.gif"/>
                            <dl>
                                <dt>Book Maker</dt>
                                <dd id="profile_company_book_maker_PT">0%</dd>
                            </dl>
                        </dd>
                    </div>

					<div style={{display:'none'}}>
                        <dt style={{width:'200px'}}>SportsBook PT Setting</dt>
                        <dd></dd>
                        <dd class="dl_list">
                            <img class="expand-arrow" src="/images/transparent.gif"/>
                            <dl>
                                <dt>PT</dt>
                                <dd id="profile_is_allow_sportsbookTennis">ON</dd>
                                <dt>Sportsbook</dt>
                                <dd id="profile_company_sportsbook_tennis_PT">0%</dd>
                            </dl>
                        </dd>
                    </div>
                </dl>
              </div>   
        </div>
      </div>}
     {view === 2 && 
     <Bethistory agentStack={props.agentStack}/>
     }

    {view === 3 && <div class="col-center report">
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
         <div class="white-wrap">
				<h3>Profit &amp; Loss - Main wallet</h3>
				<ul class="acc-info">
					<li class="user">{props.agentStack[props.agentStack.length-1].userid}</li>
					<li class="time">{time}</li>
				</ul>
			<ul class="report-tab-wrap" >
    		<li onClick ={()=>{setselect(0)}} className={`report-tab ${(select=== 0 )? "select": "null"}`} id="reportType_exchange" data-reporttabtype="0">
   	 		    Exchange
   			 </li>
		    <li onClick ={()=>{setselect(1)}} className={`report-tab ${(select=== 1 )? "select": "null"}`} id="reportType_casino" data-reporttabtype="1">
		        Casino
		    </li>    
		    <li onClick ={()=>{setselect(2)}} className={`report-tab ${(select=== 2 )? "select": "null"}`} id="reportType_sportsBook" data-reporttabtype="2">
		        Sportsbook
		    </li>
    		<li onClick ={()=>{setselect(3)}} className={`report-tab ${(select=== 3 )? "select": "null"}`} id="reportType_bookMaker" data-reporttabtype="3">
		        BookMaker
		    </li>
		    <li onClick ={()=>{setselect(4)}} className={`report-tab ${(select=== 4 )? "select": "null"}`} id="reportType_bPoker" data-reporttabtype="4">
		        BPoker
		    </li>
		    <li onClick ={()=>{setselect(5)}} className={`report-tab ${(select=== 5 )? "select": "null"}`} id="reportType_binary" data-reporttabtype="5">
		        Binary
		    </li>
			</ul>
			<div class="function-wrap">
			    <ul class="input-list">
			        <div id="statusCondition" style={{display:'none'}}>
		            <li><label>Bet Status:</label></li>
		            <li>
		                <select name="betStatus" id="betStatus">
		                </select>
		            </li>
		        </div>        
    <li><label>Period</label></li>
	<Reactdatepicker/>
    {/* <Datepic changeStartDate = {changeStartDate} changeEndDate = {changeEndDate} changeStartTime = {changeStartTime} changeEndTime = {changeEndTime}/> */}
      
		
        <li style={{display:'none'}}>(TimeZone:IST)</li>
    </ul>
    <ul class="input-list">
        <li><a id="today" onClick = {()=>{window.daypnl = 1;getpnl(eventType);}}  class="btn">Just For Today</a></li>
        <li><a id="yesterday" onClick = {()=>{window.daypnl = 2;getpnl(eventType);}}  class="btn">From Yesterday</a></li>
        <li style={{display:'none'}}><a id="last7days"   class="btn">Last 7 days</a></li>
        <li style={{display:'none'}}><a id="last30days"   class="btn">Last 30 days</a></li>
        <li style={{display:'none'}}><a id="last2months"   class="btn">Last 2 Months</a></li>
        <li style={{display:'none'}}><a id="last3months"   class="btn">Last 3 Months</a></li>
        <li><a id="getPL" onClick = {()=>{window.daypnl = 3;getpnl(eventType);}}  class="btn-send">Get P &amp; L</a></li>
    </ul>
</div>
{profitLoss.length == 0  &&<div id="noReportMessage"><p>Betting Profit &amp; Loss enables you to review the bets you have placed. <br/>
  Specify the time period during which your bets were placed, the type of markets on which the bets were placed, and the sport.</p>
	<p>Betting Profit &amp; Loss is available online for the past 2 months.</p></div>}
		</div>

         {profitLoss.length > 0 && <div id="report" data-report="profitAndLossReport">
	<ul id="spotsUl" class="total-show">
		<li id="totalPL">Total P/L: PTH {netpl}</li>
		<li id="sumOfQuery" class="sports-switch">PTH {netpl}</li>
		<li class="sports-switch">
			<select name="sports" id="sportsevent" onChange = {(e)=>{changeEvent(e);}}>
				
			<option value="0" selected="selected">ALL</option><option value="1">SOCCER</option><option value="2">TENNIS</option><option value="4">CRICKET</option></select>
		</li>
	</ul>
	

	<table id="reportTable" class="table01 table-pnl" style={{display:'table'}}>
		<tbody>
		<tr>
			<th width="" class="align-L">Market
			</th>
			<th width="15%">Start Time
			</th>
			<th width="15%">Settled date
			</th>
			<th width="18%">Profit/Loss
			</th>
		</tr>

		<tr id="summaryTemplate" style={{display:'none'}}>
			<td id="title" class="align-L"></td>
			<td id="startTime"></td>
			<td id="settledDate"></td>
			<td>
				<a id="pl" class="expand-close" href="javascript: void(0);"></a>
			</td>
		</tr>

		
	{profitLoss.map((item,index) =>{	
		var matchName;
		
       if(item.eventType == '4'){
	       matchName = 'CRICKET';
       }else if(item.eventType == '1'){
	       matchName = 'SOCCER';
        }
       else if(item.eventType == '2'){
           matchName = 'TENNIS';
       }
    
	
	
	return(

	<React.Fragment key = {index}> 	
	 <tr id="summary0" style={{display: 'table-row'}} >
			<td id="title" class="align-L">{matchName}<img class="fromto" src={Transparent}/><strong>{item.eventName}</strong></td>
			<td id="startTime">{item.startTime}</td>
			<td id="settledDate">{item.settledDate}</td>
			<td>
				<a id="pl0" className={`${click === index ? "expand-open":"expand-close"}`}  onClick={()=>{handleSlip(index);}}>{item.pl}</a>
			</td>
		</tr>

	 {click === index && <tr id="detail0" class="expand" style={{display: 'table-row'}}>
			<td colspan="4">
				<img class="expand-arrow-R" src={Transparent}/>

				<table class="table-commission">
					<tbody><tr>
						<th width="9%">Bet ID
						</th>
						<th width="">Selection
						</th>
						<th width="9%">Odds
						</th>
						<th width="13%">Stake
						</th>
						<th width="8%">Type
						</th>
						<th width="16%">Placed
						</th>
						<th width="23%">Profit/Loss
						</th>
					</tr>

			{eventProfitLoss.map((item2,index2)=>{
				   var playerName;
				   var odds;
				   var matchtype; 
				   var profit='';
				   if(item2.betType === 'match'){
					  odds = parseFloat(parseFloat(item2.rate) + 1).toFixed(2);
					 if(item2.teamName === 'A'){
					   playerName = item2.runnerName1;
						
					  } 
					  else if(item2.teamName === 'B')
                        playerName = item2.runnerName2;
					  }
					  else if(item2.teamName === 'T'){
						playerName = 'The Draw'; 
					  }
				     else if(item2.betType === 'fancy'){
						playerName = item2.runnerName;
						odds = item2.rate+'/'+ parseFloat(item2.teamName*100).toFixed(0);
					 }
					 
					 if(item2.type === 'LAGAI'){
						matchtype = 'BACK';
					}
					else if(item2.type === 'KHAI'){
						matchtype = 'LAY';
					}
					else{
						matchtype = item2.type;
					}


				if(item2.betType == 'fancy' && item2.result){
						if(item2.type=="YES"){
							if(parseFloat(item2.rate)<=parseFloat(item2.result)){
								profit=parseFloat(item2.amount*item2.teamName).toFixed(2);
							}
							else profit=parseFloat(item2.amount*(-1)).toFixed(2);
						}
						else{
							if(parseFloat(item2.rate)>parseFloat(item2.result)){
								profit=parseFloat(item2.amount).toFixed(2);
							}
							else profit=parseFloat((item2.amount*item2.teamName)*(-1)).toFixed(2);
						}
				   }
				   else if(item2.betType=='match' && item2.winner){
					if(item2.type=="LAGAI"){
						if(item2.teamName=='A'){
							if(item2.winner=="A") profit=parseFloat(item2.rate*item2.amount).toFixed(2);
							else profit=parseFloat(item2.amount*(-1)).toFixed(2);
						}
						else if(item2.teamName=="B"){
							if(item2.winner=="B") profit=parseFloat(item2.rate*item2.amount).toFixed(2);
							else profit=parseFloat(item2.amount*(-1)).toFixed(2);
						}
						else if(item2.teamName=="T"){
							if(item2.winner=="T") profit=parseFloat(item2.rate*item2.amount).toFixed(2);
							else profit=parseFloat(item2.amount*(-1)).toFixed(2);
						}
					}
					else if(item2.type=="KHAI"){
						if(item2.teamName=='A'){
							if(item2.winner!="A") profit=parseFloat(item2.amount).toFixed(2);
							else profit=parseFloat(item2.rate*item2.amount*-1).toFixed(2);
						}
						else if(item2.teamName=="B"){
							if(item2.winner!="B") profit=parseFloat(item2.amount).toFixed(2);
							else profit=parseFloat(item2.rate*item2.amount*-1).toFixed(2);
						}
						else if(item2.teamName=="T"){
							if(item2.winner!="T") profit=parseFloat(item2.amount).toFixed(2);
							else profit=parseFloat(item2.rate*item2.amount*-1).toFixed(2);
						}
					}
					
					if((item2.selectionIdTie== null  || item2.selectionIdTie=='' || item2.selectionIdTie==' ') && item2.winner=="T"){
						profit=0;
					}
			     	}

                 return(
					  <React.Fragment key = {index2}> 	
			          {item.eventId === item2.eventId &&  <tr id="txTemplate" className ={`${(index2 % 2) == 0 ? "even": ""}`}>
						<td id="betID">{item2.id}</td>
						<td id="matchSelection">{playerName}</td>
						<td id="txOddsMatched">{odds}</td>
						<td id="txStake">{item2.amount}</td>
						<td><span id="matchType" className={`${item2.type === 'LAGAI' || item2.type === 'YES' ? "back":"lay"}`}>{matchtype}</span></td>
						<td id="placed">{item2.betTime}</td>
						<td id="txLiability" className={`${profit >= 0 ? "green":"red"}`}>{profit >= 0 ? profit : '('+ Math.abs(profit).toFixed(2) +')'}</td>
					 </tr>}
					 </React.Fragment>
                     )})}
					
					
				</tbody>
			</table>

			</td>
		</tr>}
		</React.Fragment>
		)})}
		
		
         </tbody>
	   </table>
	   <p class="table-other">Profit and Loss is shown net of commission.
	 </p>
    </div>}


  <div>
     {profitLoss.length > 0 &&	<ul id="pageNumberContent" class="pages">
		<li id="prev"><a onClick = {()=>{if(window.pnlView > 1){window.pnlView = window.pnlView -1;getpnl(eventType);}}} className={`${(window.pnlView > 1) ? "": "disable"}`}>Prev</a></li>
		<li id="pageNumber"><a  class="select" style={{pointerEvents:' none'}}>{window.pnlView}</a></li>
		<li id="next"><a onClick = {()=>{if(profitLoss.length >= 50){window.pnlView = window.pnlView + 1;getpnl(eventType);}}} className={`${(profitLoss.length >= 50) ? "": "disable"}`} >Next</a></li></ul>}

      </div>
         
             
             </div>}     




    {view === 4 && <div class="col-center report">
		

        
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
        
            <h2>Transaction&nbsp;History
             </h2>
            
                <table style={{display:'none'}}>
        
                    <tbody>
                        <tr id="tempTr">
                        <td id="createDate" class="align-L"></td>
                        <td id="deposit">-</td>
                        <td id="withdraw">-</td>
                        <td id="balance"></td>
                        <td id="remark"></td>
                        <td>
                            <spen id="from"></spen>
                            <img class="fromto" src="/images/transparent.gif"/>
                            <spen id="to"></spen>
                        </td>
                    </tr>
        
                    <tr id="noDataTempTr">
                        <td class="no-data" colspan="5">
                            <p>No Data</p>
                        </td>
                    </tr>
                </tbody></table>
        
                <table id="table_log" class="table01">
                    <tbody><tr>
                        <th width="15%" class="align-L">Date/Time</th>
                        <th width="18%">Deposit</th>
                        <th width="18%">Withdraw</th>
                        <th width="18%">Balance</th>
                        <th width="16%">Remark</th>
                        <th width="">From/To</th>
                    </tr>
        
                    </tbody>
                    <tbody id="content">
        {currentPosts.map(function(item,index){
      var obj1;
      var obj2 = "";
      if(item.amount >= 0){
         obj1 = item.amount;
         obj2 = '-';
      }
      if(item.amount < 0){
         obj1 = '-';
         obj2 = item.amount;
      }
       var obj3 = item.balance;
  
      
   return(
     <tr id="tempTr" key = {index}>
     <td id="createDate" class="align-L">{item.time}</td>
     <td id="deposit">
     <span class="green">{obj1 >= 0 ?  Math.abs(obj1).toFixed(2)  : '-'}</span></td>
    <td id="withdraw">
    <span class="red">{obj2 < 0 ? '('+ Math.abs(obj2).toFixed(2) +')' : '-' }</span>
   </td>
   <td id="balance"> {parseFloat(obj3).toFixed(2) }</td>
     <td id="remark"></td>
     <td>
         <spen id="from">{item.fromAgent}</spen>
         <img class="fromto" src={Transparent}/>
         <spen id="to">{item.toAgent}</spen>
     </td>
 </tr>
            )})} 
                  </tbody>
                </table>
        
                
        
           <div>
            <ul style={{display:'none'}}>
                <li id="prev"><a >Prev</a></li>
                <li id="next"><a >Next</a></li>
                <li id="pageNumber"><a ></a></li>
                <li id="more"><a >...</a></li>
                <input type="text" id="goToPageNumber"  maxlength="6" size="4"/>
                <li><a id="goPageBtn">GO</a></li>			
            </ul>
        
            {/* <ul id="pageNumberContent" class="pages"><li id="prev"><a class="disable" style={{pointerEvents:'none'}}>Prev</a></li><li id="pageNumber"><a  class="select" style={{pointerEvents:'none'}}>1</a></li><li id="pageNumber"><a >2</a></li><li id="next"><a >Next</a></li></ul> */}
            <div className="pages">
        <Pagination
        prevPageText='prev'
        pageRangeDisplayed={3}
        activePage={currentPage}
        nextPageText='next'
        totalItemsCount={accountStatement.length}
        onChange={handlePageChange}
        itemsCountPerPage={postsPerPage}
        hideFirstLastPages
      />
      </div>
         </div>
            </div> }
       </div>        
      </React.Fragment>
    )
}
