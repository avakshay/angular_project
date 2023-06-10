
import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function BetList() {

   const [betList,setbetList] = useState([]);

   const getBetList = ()=>{
     
      var ssid = cookies.get('sid');
      if(!ssid) return;
      
      axios.post('http://65.0.111.203:3000/getBetList',{
             sid:ssid
  
            })
            .then(result => {
               
                if(result.status === 200){
                   
                  

                }
       
               }
                   
              ).catch(e => {
                //setIsError(true);
            });


         }






return (
  <React.Fragment>
   <div class="full-wrap" style={{height: 'calc(100% - 105px)'}}>
   {/* <!-- Center Column --> */}
   <div class="over-wrap">
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
     
      <h2>Bet List</h2>
      <ul class="input-list">
         <li id="eventRadioBtnList">
            <input type="radio" name="events" id="events_0" value="0"/>All
            <input type="radio" name="events" id="events_4" data-eventtype="4" value="4"/>
            Cricket
            <input type="radio" name="events" id="events_1" data-eventtype="1" value="1"/>
            Soccer
            <input type="radio" name="events" id="events_2" data-eventtype="2" value="2"/>
            Tennis
           
            <input type="radio" name="events" id="events_2378961" data-eventtype="2378961" value="5"/>
            Politics
            <input type="radio" name="events" id="TS_BINARY" data-categorytype="6"/>Binary
          </li>
      </ul>
      
      <div class="function-wrap">
         <ul class="input-list">
            <div id="statusCondition" >
               <li><label>Bet Status:</label></li>
               <li>
                  <select name="betStatus" id="betStatus">
                     <option value="2">Settled</option>
                     <option value="4">Voided</option>
                     
                  </select>
               </li>
            </div>
            <li><label>Period</label></li>
            <li>

          {/*  <React.Fragment>
           <input id="startDate" selected={this.state.sDate} onChange={(e) => {this.props.changeStartDate(e.target.value);this.setState({ sDate: e.target.value })}}  class="cal-input" type="date" placeholder="YYYY-MM-DD" max={this.state.maxDate}/> 
           <input id="startTime" disabled="true" class="time-input disable" type="text" placeholder="09:00" maxlength="5"/>
                
           <React.Fragment>
           <input id="endDate" selected={this.state.endD}  onChange={(e) => {this.props.changeEndDate(e.target.value);this.setState({ endD: e.target.value })}}  class="cal-input"  type="date" placeholder="YYYY-MM-DD"  max={this.state.maxDate} />
           <input id="endTime" disabled="true" class="time-input disable" type="text" placeholder="08:59" maxlength="5"/>
          </React.Fragment>   
          */}

               <input id="startDate" class="" type="date" placeholder="YYYY-MM-DD"  max="2020-12-06" />
               <input id="startTime" class="time-input disable" type="text" placeholder="09:00" maxlength="5"/>
               to
               <input id="endDate" class="" type="date" placeholder="YYYY-MM-DD" max="2020-12-06" />
               <input id="endTime" class="time-input disable" type="text" placeholder="08:59" maxlength="5"/>
              </li>

            <li style={{display:'none'}}>(TimeZone:IST)</li>
         </ul>
         <ul class="input-list">
            <li><a id="today"  class="btn">Just For Today</a></li>
            <li style={{display:'none'}}><a id="yesterday"  class="btn">From Yesterday</a></li>
            <li style={{display:'none'}}><a id="last7days"  class="btn">Last 7 days</a></li>
            <li style={{display:'none'}}><a id="last30days"  class="btn">Last 30 days</a></li>
            <li style={{display:'none'}}><a id="last2months"  class="btn">Last 2 Months</a></li>
            <li style={{display:'none'}}><a id="last3months"  class="btn">Last 3 Months</a></li>
            <li><a id="getPL"  class="btn-send">Get History</a></li>
         </ul>
       </div>
       
      {betList.length === 0 && <div id="noReportMessage">
         <p>Bet List enables you to review the bets you have placed. <br/>Specify the time period during which your bets were placed, the type of markets on which the bets were placed, and the sport.</p>
         <p>Bet List is available online for the past 30 days.</p>
       </div>}
      
      
      <div id="report" style={{}}>
         <a id="downloadFile" class="btn-send middle_with" style={{display:'none'}}>Download</a>
         

         <table id="matchTableTemplate" class="table-s" style={{}}>
            <tbody>
               <tr>
                  <th width="8%" class="align-L">SUP ID</th>
                  <th width="8%" class="align-L">MA ID</th>
                  <th width="8%" class="align-L">PL ID</th>
                  <th width="5%" class="align-L">Bet ID
                  </th>
                  <th id="betTime" width="6%" class="align-L">Bet placed
                  </th>
                  <th width="7%" class="align-L">IP Address</th>
                  <th width="" class="align-L">Market
                  </th>
                  <th width="7%" class="align-L">Selection
                  </th>
                  <th width="4%" class="align-C">Type
                  </th>
                  <th width="4%">Odds req.
                  </th>
                  <th width="8%">Stake
                  </th>
                  <th width="5%">Liability
                  </th>
                  <th width="5%" name="profitOrLossTh">Profit/Loss
                  </th>
                  <th width="3%" id="currencyType_title" style={{display:'none'}}>Currency
                  </th>
                  <th width="5%" id="site_title" style={{display:'none'}}>Site
                  </th>
                  <th width="5%" id="onePT_title" style={{display:'none'}}>Percentage PT</th>
                  <th width="5%" id="afterPT_title" style={{display:'none'}}>PSB After PT</th>
                  <th width="5%" id="afterPTInEUR_title" style={{display:'none'}}>H.PT in EURO</th>
               </tr>
         <tr id="matchRow0" style={{display: "table-row"}}>
			
			  <td id="agentUserId1" class="align-L" style={{display:'none'}}>dublinhkd043</td>
			
			  <td id="agentUserId2" class="align-L" style={{}}>ss20ajeet</td>
			
			  <td id="agentUserId3" class="align-L" style={{}}>jaisv</td>
			
			  <td id="agentUserId4" class="align-L" style={{display: 'none'}}></td>
			
			  <td id="agentUserId5" class="align-L" style={{display: 'none'}}></td>
			
			  <td id="playerId" class="align-L">skyba1</td>
			  <td class="align-L"><a id="betID" >308184995</a></td>
			  <td class="align-L"><span id="betPlaced" class="small-date">2020-12-22 12:53:41</span></td>
			  <td id="ip" class="align-L">47.29.119.242</td>
			  <td id="matchTitle" class="align-L">CRICKET<img class="fromto" src="/images/transparent.gif"/><strong>New Zealand v Pakistan - 3rd T20</strong><img class="fromto" src="/images/transparent.gif"/>Match Odds</td>
			  <td id="matchSelection" class="align-L"><a >New Zealand</a></td>
			
			  <td class="align-C"><span id="matchType" class="back">Back</span></td>
			  <td id="matchOddsReq">1.84</td>
			  <td id="matchStake">100.00</td>
			  <td id="liability">-</td>
			
			  <td><span id="pol" class="small-date">Not Settled</span></td>
			
			  <td id="currencyType" style={{display: 'none'}}>PTH</td>
			  <td id="site" style={{display: 'none'}}>SKYEXCHANGE</td>
			  <td id="onePT" style={{display: 'none'}}>0.25</td>
			  <td id="afterPT" style={{display: 'none'}}>25.00</td>
			  <td id="afterPTInEUR" style={{display: 'none'}}>1.99</td>
		  </tr>
            </tbody>
         </table>
        {betList.length > 0 && <p class="table-other" style={{marginTop:'5px'}}>Bet List is shown net of commission.
         </p>}
        
         {betList.length > 0 &&  <div>
            <ul style={{display:'none'}}>
               <li id="prev"><a>Prev</a></li>
               <li id="next"><a >Next</a></li>
               <li id="pageNumber"><a></a></li>
               <li id="more"><a>...</a></li>
               <input type="text" id="goToPageNumber"  maxlength="6" size="4"/>
               <li><a id="goPageBtn">GO</a></li>
            </ul>
            <ul id="pageNumberContent" class="pages">
            </ul>
         </div>}

        </div>
       </div>
      </div>
        </React.Fragment>
    )
 }
