import React from 'react'
import Loading from "./images/loading40.gif"
import './Fullmarket.css'
import Transparent from './images/transparent.gif'

export default function RunningFullmarket() {
    return (
        <React.Fragment>
            {/* <div id="oneClickLoading" class="loading-wrap" ><ul class="loading"><li><img src={Loading} alt="Place_bet"/></li><li>Loading...</li></ul></div> */}
            <div id="overWrap" class="over-wrap live-match" style={{height: 'calc(100% - 105px)'}}>
        	<div id="liveMatchGameHead" class="game-head">
        	
				
				<div id="matchTrackerWrap" class="match-tracker-wrap">
                   

					<ul id="liveMatchTrackerBtn" class="match-btn">
						<li><a id="liveMultiMarketPin" style={{cursor:'pointer'}} name="gameHeadPin" class="btn-pin" title="Add to Multi Markets" eventtype="4" eventid="30035305" marketid="1.173506114"></a></li>
						<li><a style={{cursor:'pointer'}}  class="btn-refresh">
                            
                            </a></li>
					</ul>
				</div>
	
				{/*<!-- Game Scroes Event -->*/}
				<div id="scoresEvent" class="match-odds">Match Odds<img src={Transparent}/></div>
				

				{/*<dl class="game-matched" style={{display:'block'}}>
					<dt>Matched</dt>
					<dd id="liveGameMatched">PTH 4,577</dd>
				</dl>*/}
				<dl id="minMaxBox" class="fancy-info" >
					<dt id="minMaxDt" style={{display:'none'}}>Min/Max</dt>
					<dt id="maxDt" >Min</dt>
            <dd id="minMaxInfo"></dd>
                    <dt id="maxDt" >Max</dt>
					<dd id="minMaxInfo"></dd>
                    
				</dl>
			</div>

	

 
           {/* <!-- Horse Coming Up End -->*/}





            

         {/*   <!-- Game Bets Table -->*/}
      <div id="fullMarketBetsWrap" class="bets-wrap"  eventtype="4" eventid="30035305" marketid="1.173506114">

                <h3 id="lineMarketName" class="line_market-name" style={{display:'none'}}>
                    <span>1st Innings 10 Over Line</span>
                </h3>

                <span id="selectionCounts" class="refer_only"></span>

                <table id="fullMarketBoard" class="bets disabled">
                    <tbody><tr class="bet-all">
                        <td></td>
                        {/* <td id="backPercent" class="refer-bet" colspan="2">100.9%</td> */}
                        <td><a id="backAll" class="back-all"><img src={Transparent}/><span>Back all</span></a></td>
                        <td><a id="layAll" class="lay-all"><img src={Transparent}/><span>Lay all</span></a></td>
                        {/* <td id="layPercent" class="refer-book" colspan="2">99.4%</td> */}
                    </tr>

                  
                <tr id="fullSelection_448" style={{display:'table-row'}} eventtype="4" eventid="30192278" marketid="1_177012508" selectionid="448" eventname="New Zealand v Pakistan - 2nd T20" status="1" sortpriority="1">
                        <th>
                            
                       
                            
                            <p>
                                {/* <a onclick="window.open('market/marketDepth.jsp?eventId=30192278&amp;marketId=1.177012508&amp;selectionId=448','_blank','resizable=no,width=920,height=600')"><img class="icon-predict" src={Transparent}/></a> */}
                                New Zealand</p>
                         
                        </th>
                     
                        {/* <td id="back_3" class="back-3" side="Back" selectionid="448" runner="New Zealand" marketname="Match Odds" markettype="MATCH_ODDS" fullmarketodds="1.46" inplay="0"><a>1.46<span>3,966</span></a></td>
                        <td id="back_2" class="back-2" side="Back" selectionid="448" runner="New Zealand" marketname="Match Odds" markettype="MATCH_ODDS" fullmarketodds="1.47" inplay="0"><a>1.47<span>31,149</span></a></td> */}
                        <td id="back_1" class="back-1" side="Back" selectionid="448" runner="New Zealand" marketname="Match Odds" markettype="MATCH_ODDS" fullmarketodds="1.48" inplay="0"><a>1.48<span>6,251</span></a></td>
                        <td id="lay_1" class="lay-1" side="Lay" selectionid="448" runner="New Zealand" marketname="Match Odds" markettype="MATCH_ODDS" fullmarketodds="1.49" inplay="0"><a>1.49<span>2,602</span></a></td>
                        {/* <td id="lay_2" class="lay-2" side="Lay" selectionid="448" runner="New Zealand" marketname="Match Odds" markettype="MATCH_ODDS" fullmarketodds="1.5" inplay="0"><a>1.5<span>10,696</span></a></td>
                        <td id="lay_3" class="lay-3" side="Lay" selectionid="448" runner="New Zealand" marketname="Match Odds" markettype="MATCH_ODDS" fullmarketodds="1.51" inplay="0"><a>1.51<span>3,664</span></a></td> */}
                    </tr><tr id="fullSelection_7461" style={{display:'table-row'}} eventtype="4" eventid="30192278" marketid="1_177012508" selectionid="7461" eventname="New Zealand v Pakistan - 2nd T20" status="1" sortpriority="2">
                        <th>
                            
                         
                            
                            <p>
                                {/* <a ><img class="icon-predict" src={Transparent}/></a> */}
                            Pakistan</p>
                           
                          
                        </th>
                      
                        {/* <td id="back_3" class="back-3" side="Back" selectionid="7461" runner="Pakistan" marketname="Match Odds" markettype="MATCH_ODDS" fullmarketodds="2.96" inplay="0"><a>2.96<span>2,164</span></a></td>
                        <td id="back_2" class="back-2" side="Back" selectionid="7461" runner="Pakistan" marketname="Match Odds" markettype="MATCH_ODDS" fullmarketodds="2.98" inplay="0"><a>2.98<span>247</span></a></td> */}
                        <td id="back_1" class="back-1" side="Back" selectionid="7461" runner="Pakistan" marketname="Match Odds" markettype="MATCH_ODDS" fullmarketodds="3" inplay="0"><a>3<span>6,640</span></a></td>
                        <td id="lay_1" class="lay-1" side="Lay" selectionid="7461" runner="Pakistan" marketname="Match Odds" markettype="MATCH_ODDS" fullmarketodds="3.1" inplay="0"><a>3.1<span>3,101</span></a></td>
                        {/* <td id="lay_2" class="lay-2" side="Lay" selectionid="7461" runner="Pakistan" marketname="Match Odds" markettype="MATCH_ODDS" fullmarketodds="3.15" inplay="0"><a>3.15<span>14,483</span></a></td>
                        <td id="lay_3" class="lay-3" side="Lay" selectionid="7461" runner="Pakistan" marketname="Match Odds" markettype="MATCH_ODDS" fullmarketodds="3.2" inplay="0"><a>3.2<span>1,750</span></a></td> */}
                    </tr></tbody></table>

             </div>
<div id="bookMakerWrap" class="bets-wrap  bookmaker_bet" >

<table id="bookMakerMarketList" class="bets bets-bookmaker" >
    <colgroup>
        <col span="1" width="280"/>
        <col span="1" width="70"/>
        <col span="1" width="70"/>
        <col span="1" width="70"/>
        <col span="1" width="70"/>
        <col span="1" width="70"/>
        <col span="1" width="70"/>
    </colgroup>

    
    <tbody id="bookMakerMarket_30035305_37909" style={{display:' table-row-group'}}>

        <tr id="bookMakerSpecialBet" class="special_bet">
            <td colspan="7">
                <h3>
                <a id="multiMarketPin" class="add-pin" title="Add to Multi Markets">Add Pin</a>
                Bookmaker Market
                <p>| Zero Commission</p>
                </h3>
                <dl class="fancy-info">
                    <dt><span>Min</span></dt>
                    <dd id="min"></dd>
                    <dt><span>Max</span></dt>
                    <dd id="max"></dd>
                    <dt id="rebateName" style={{display:'none'}}><span>Rebate</span></dt>
					<dd id="rebate" style={{display:'none'}}></dd>
                </dl>
            </td>
        </tr>

        <tr class="bet-all">
            <td colspan="4"></td>
          {/*  <!-- <td class="refer-bet"></td> --> */}
            <td colspan="1">Back</td>
            <td colspan="2">Lay</td>
            {/* <td class="refer-book" colspan="1"></td> */}
        </tr>

   <tr id="bookMakerSuspend_30035305_37909_111798" class="fancy-suspend-tr"  marketid="37909">
            <th colspan=""></th>
            <td class="fancy-suspend-td" colspan="6">
                {/* <div id="suspendClass" class="fancy-suspend"><span id="info"></span></div> */}
            </td>
                </tr> 
        
        <tr id="bookMakerSelection_30035305_37909_111798" style={{display: 'table-row'}}>
            <th class="predict" colspan="4">
                <p id="runnerName">India</p>
                
           <span id="before"  ></span>
            
           <span id="after"  ></span>


                
            </th>
            <td class="" colspan="1">
                <dl class="back-gradient">
                    {/* <dd id="back_3"  style={{cursor:'pointer'}}><p>21</p></dd>
                    <dd id="back_2"  style={{cursor:'pointer'}}><p>43</p></dd> */}
                    <dd id="back_1"   style={{cursor:'pointer'}}><a>54</a></dd>
                </dl>
            </td>
            <td class="" colspan="1">
                <dl class="lay-gradient">
                    <dd id="lay_1"   style={{cursor:'pointer'}}><a>54</a></dd>
                    {/* <dd id="lay_2"  style={{cursor:'pointer'}}><p>54</p></dd>
                    <dd id="lay_3"  style={{cursor:'pointer'}}><p>65</p></dd> */}
                </dl>
            </td>
        </tr>
        


          <tr id="bookMakerSuspend_30035305_37909_111799" class="fancy-suspend-tr"  marketid="37909">
            <th colspan=""></th>
            <td class="fancy-suspend-td" colspan="6">
                {/* <div id="suspendClass" class="fancy-suspend" ><span id="info"></span></div> */}
            </td>
        </tr> 
        
        <tr id="bookMakerSelection_30035305_37909_111799" style={{display: 'table-row'}}>
            <th class="predict" colspan="4">
                <p id="runnerName">Australia</p>
                
        <span id="before"  ></span>
            
         <span id="after"  ></span>

            </th>
            <td class="" colspan="1">
                <dl class="back-gradient">
                    {/* <dd id="back_3"     style={{cursor:'pointer'}}> <p>11</p></dd>
                    <dd id="back_2"     style={{cursor:'pointer'}}> <p>12</p></dd> */}
                    <dd id="back_1"     style={{cursor:'pointer'}}><a>13</a></dd>
                </dl>
            </td>
            <td class="" colspan="2">
                <dl class="lay-gradient">
                    <dd id="lay_1"   style={{cursor:'pointer'}}><a>14</a></dd>
                    {/* <dd id="lay_2"   style={{cursor:'pointer'}}><p>15</p></dd>
                    <dd id="lay_3"   style={{cursor:'pointer'}}><p>16</p></dd> */}
                </dl>
            </td>
        </tr>
    {/*The Draw */}
  <tr id="bookMakerSelection_30035305_37909_111799" style={{display: 'table-row'}}>
            <th class="predict" colspan="4">
                <p id="runnerName">The Draw</p>
                
                <span id="before" ></span>


              <span id="after"  ></span>

            </th>
            <td class="" colspan="1">
                <dl class="back-gradient">
                    {/* <dd id="back_3"     style={{cursor:'pointer'}}> <p>32</p></dd>
                    <dd id="back_2"     style={{cursor:'pointer'}}> <p>43</p></dd> */}
                    <dd id="back_1"     style={{cursor:'pointer'}}><a>44</a></dd>
                </dl>
            </td>
            <td class="" colspan="2">
                <dl class="lay-gradient">
                    <dd id="lay_1"   style={{cursor:'pointer'}}><a>54</a></dd>
                    {/* <dd id="lay_2"   style={{cursor:'pointer'}}><p>65</p></dd>
                    <dd id="lay_3"   style={{cursor:'pointer'}}><p>66</p></dd> */}
                </dl>
            </td>
        </tr>
        </tbody>
    </table>    
 </div>

 <div id="fancyBetTable_30035305" class="bets-wrap fancy_bet"  name="multiMarketItem">
	<p id="fancyBetNoBet" class="no_bet" style={{display:'none'}}>has no markets</p>

	<table id="fancyBetMarketList" class="bets" >
		<colgroup>
			<col span="1" width="280"/>
			<col span="1" width="70"/>
			<col span="1" width="70"/>
			<col span="1" width="70"/>
			<col span="1" width="70"/>
			<col span="1" width="70"/>
			<col span="1" width="70"/>
		</colgroup>
		<tbody>
		   <tr id="fancyBetSpecialBet" class="special_bet">
	            <td colspan="7">
	                <h3>
	                <a id="multiMarketPin" class="add-pin" title="Add to Multi Markets">Add Pin</a>
	                Fancy Bet
	                </h3>
	            </td>
           </tr>
			<tr class="bet-all">
				<td></td>
				<td class="refer-bet" colspan="2"></td>
				<td colspan="2">No</td>
				<td colspan="2">Yes</td>
				{/* <td class="refer-book" colspan="2"></td> */}
			</tr>
			
			
	
			
			
	
     <React.Fragment>
      <tr id="bookMakerSuspend_30035305_37909_111799" class="fancy-suspend-tr"  marketid="37909">
            <th colspan="3"></th>
            <td class="fancy-suspend-td" colspan="2">
                {/* <div id="suspendClass" class="fancy-suspend" ><span id="info"></span></div> */}
            </td>
      </tr> 

         <tr id="fancyBetMarket_168674" >
			 	<th colspan="3">
					<dl class="fancy-th-layout">
						<dt>
							<p id="marketName"></p>
                         
                        <span id="before" ></span>

						</dt>
						<dd class="dd-tips">
							<ul class="fancy-tips">
								<li id="remarkFirstRow" style={{display:'none'}}></li>
								<li id="remarkSecondRow" style={{display:'none'}}></li>
							</ul>
							<a id="fancyBetBookBtn" class="btn-book" style={{display:'none'}}>Book</a>
						</dd>
					</dl>
				</th>

               
			<td id="lay_1"  className='lay-1' colspan="2">
					<a id="runsInfo"   style={{cursor:'pointer'}}><span></span></a>	
				</td>
				<td id="back_1"  colspan="2" className='back-1' >
             <a id="runsInfo"  style={{cursor:'pointer'}}><span></span></a>	
				</td>
				{/* <td class="td-fancy_merge" colspan="2">
					<dl class="fancy-info">
						<dt>Min/Max</dt>
						<dd id="minMax"> </dd>
					</dl>
					<dl class="fancy-info">
						<dt id="rebateName" style={{display:'none'}}>Rebate</dt>
						<dd id="rebate" style={{display:'none'}}></dd>
					</dl>
				</td> */}
			</tr>
            </React.Fragment>
            </tbody>
	       </table>
    </div> 
            <div id="fullMarketEventLeft" class="event-left" style={{display:'block'}}></div>
            <div id="fullMarketEventRight" class="event-right" style={{display:'block'}}></div>
        </div>
        </React.Fragment>
    )
}
