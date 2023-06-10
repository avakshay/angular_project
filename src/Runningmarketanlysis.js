import React from 'react'
import Transparent from './images/transparent.gif'

export default function Runningmarketanlysis() {
    return (
        <React.Fragment>
            <div class="full-wrap">
{/* <!-- Left Column --> */}
<div class="col-left" style={{display:'block', top:'0'}}>
    {/* <!-- Sub Menu and Path --> */}
    <div id="subMenu" class="sub_path" style={{height: 'calc(100% - 0px)'}}>
    </div>
</div>

{/* <!-- index start -->
<!-- Center Column --> */}
<div id="centerColumn" class="col-center markets">

{/* <!-- Loading Wrap --> */}
<div id="loading" class="loading-wrap" style={{display:'none'}}>
<ul class="loading">
<li><img src="/images/loading40.gif"/></li>
<li>Loading...</li>
</ul>
</div>

    <div id="overWrap" class="over-wrap live-match" style={{height: 'calc(100% - 0px)'}}>
        <div id="liveMatchGameHead" class="game-head">            
            <div id="matchTrackerWrap" class="match-tracker-wrap">  
                <ul id="liveMatchTrackerBtn" class="match-btn">
                    <li><a id="liveMultiMarketPin" style={{cursor:'pointer'}} name="gameHeadPin" class="btn-pin" title="Add to Multi Markets" eventtype="4" eventid="30194778" marketid="1.177132011"></a></li>
                    <li><a style={{cursor:'pointer'}} class="btn-refresh"></a></li>
                </ul>
            </div>
            {/* <!-- Game Scroes Event --> */}
            <div id="scoresEvent" class="match-odds">Match Odds<img src={Transparent}/></div>
            
            {/* <!-- Game Information --> */}
            <ul class="game-info" style={{display:'block'}}>
                <li id="gameInfoDate" class=""><img class="icon-time" src={Transparent}/> Tue 22 Dec, 11:30</li>
                <li><span id="lowLiquidityTag" class="game-low_liq" style={{display:'none'}}>Low Liquidity</span></li>
            </ul>
            <dl class="game-matched" style={{display:'block'}}>
                <dt>Matched</dt>
                <dd id="liveGameMatched">PTE 38,293</dd>
            </dl>
            <dl id="minMaxBox" class="fancy-info" >
                <dt id="minMaxDt" style={{display:'none'}}>Min/Max</dt>
                <dt id="maxDt" >Max</dt>
                <dd id="minMaxInfo">20000</dd>
            </dl>
        </div>

        {/* <!-- Game Bets Table --> */}
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
<tbody id="bookMakerMarket_30194778_66628" style={{display: 'table-row-group'}}>
    
    <tr class="bet-all">
        <td colspan="3"></td>
        {/* <!-- <td class="refer-bet"></td> --> */}
        <td>Back</td>
        <td>Lay</td>
        {/* <td class="refer-book" colspan="2"></td> */}
    </tr>
    <tr id="bookMakerSuspend_30194778_66628_197444" class="fancy-suspend-tr"  marketid="66628">
        <th colspan=""></th>
        <td class="fancy-suspend-td" colspan="6">
            {/* <div id="suspendClass" class="fancy-suspend"><span id="info">Suspend</span></div> */}
        </td>
    </tr><tr id="bookMakerSelection_30194778_66628_197444" style={{display: 'table-row'}}>
        <th class="predict">
            <p id="runnerName">New Zealand</p>
        </th>
        <td class="" colspan="3">
            <dl class="back-gradient">
                <dd id="back_1" style={{cursor:'pointer'}} class=""><a></a></dd>
            </dl>
        </td>
        <td class="" colspan="3">
            <dl class="lay-gradient">
                <dd id="lay_1" style={{cursor:'pointer'}} class=""><a></a></dd>
            </dl>
        </td>
    </tr><tr id="bookMakerSuspend_30194778_66628_197445" class="fancy-suspend-tr"  marketid="66628">
        <th colspan=""></th>
        <td class="fancy-suspend-td" colspan="6">
        </td>
    </tr><tr id="bookMakerSelection_30194778_66628_197445" style={{display: 'table-row'}}>
        <th class="predict">
            <p id="runnerName">Pakistan </p>
        </th>
        <td class="" colspan="3">
            <dl class="back-gradient">
                <dd id="back_1" style={{cursor:'pointer'}} class=""><a></a></dd>
            </dl>
        </td>
        <td class="" colspan="3">
            <dl class="lay-gradient">
                <dd id="lay_1" style={{cursor:'pointer'}} class=""><a></a></dd>
            </dl>
        </td>
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
<tbody id="bookMakerMarket_30194778_66628" style={{display: 'table-row-group'}}>
    <tr id="bookMakerSpecialBet" class="special_bet">
        <td colspan="7">
            <h3>
            <a id="multiMarketPin" class="add-pin" title="Add to Multi Markets">Add Pin</a>
            Bookmaker Market
            <p>| Zero Commission</p>
            </h3>
            <dl class="fancy-info">
                <dt><span>Min</span></dt>
                <dd id="min"> 1.00</dd>
                <dt><span>Max</span></dt>
                <dd id="max"> 800.00</dd>
                <dt id="rebateName" style={{display:'none'}}><span>Rebate</span></dt>
                <dd id="rebate" style={{display:'none'}}></dd>
            </dl>
        </td>
    </tr>
    <tr class="bet-all">
        <td colspan="3"></td>
        {/* <!-- <td class="refer-bet"></td> --> */}
        <td>Back</td>
        <td>Lay</td>
        {/* <td class="refer-book" colspan="2"></td> */}
    </tr>
    <tr id="bookMakerSuspend_30194778_66628_197444" class="fancy-suspend-tr"  marketid="66628">
        <th colspan=""></th>
        <td class="fancy-suspend-td" colspan="6">
            {/* <div id="suspendClass" class="fancy-suspend"><span id="info">Suspend</span></div> */}
        </td>
    </tr><tr id="bookMakerSelection_30194778_66628_197444" style={{display: 'table-row'}}>
        <th class="predict">
            <p id="runnerName">New Zealand</p>
        </th>
        <td class="" colspan="3">
            <dl class="back-gradient">
                <dd id="back_1" style={{cursor:'pointer'}} class=""><a></a></dd>
            </dl>
        </td>
        <td class="" colspan="3">
            <dl class="lay-gradient">
                <dd id="lay_1" style={{cursor:'pointer'}} class=""><a></a></dd>
            </dl>
        </td>
    </tr><tr id="bookMakerSuspend_30194778_66628_197445" class="fancy-suspend-tr"  marketid="66628">
        <th colspan=""></th>
        <td class="fancy-suspend-td" colspan="6">
            {/* <div id="suspendClass" class="fancy-suspend"><span id="info">Suspend</span></div> */}
        </td>
    </tr><tr id="bookMakerSelection_30194778_66628_197445" style={{display: 'table-row'}}>
        <th class="predict">
            <p id="runnerName">Pakistan </p>
        </th>
        <td class="" colspan="3">
            <dl class="back-gradient">
                <dd id="back_1" style={{cursor:'pointer'}} class=""><a></a></dd>
            </dl>
        </td>
        <td class="" colspan="3">
            <dl class="lay-gradient">
                <dd id="lay_1" style={{cursor:'pointer'}} class=""><a></a></dd>
            </dl>
        </td>
    </tr></tbody></table>

</div>	
        
        <div id="fancyBetPosition" style={{display:'none'}}></div>
        <div id="fancyBetTable_30194778" class="bets-wrap fancy_bet"  name="multiMarketItem">
<div id="fancyBetHead" class="fancy-head">
    <h4 class="in-play">
        {/* <!-- a id="multiMarketPin" class="add-pin" name="te" style={{cursor:'pointer'}} title="Add to Multi Markets"></a--> */}
        <span id="headerName">Fancy Bet</span>
            <a class="btn-fancybet_rules"></a>  
    </h4>
</div>
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
       <tr class="bet-all"><td colspan="3"></td><td>No</td><td>Yes</td></tr> 
        <tr id="suspendTemplate" class="fancy-suspend-tr" style={{display:'none'}}>
            <th></th>
            <td colspan="2"></td>
            <td class="fancy-suspend-td" colspan="2">
                <div id="suspendClass" class="fancy-suspend"><span id="info">Ball Running</span></div>
            </td>
            <td colspan="2"></td>
        </tr>
        
        <tr id="delayTemplate" class="fancy-suspend-tr" style={{display:'none'}}>
            <th></th>
            <td colspan="2"></td>
            <td class="fancy-suspend-td" colspan="2">
                <div class="fancy-suspend"><span id="info">Delay Betting</span></div>
            </td>
            <td colspan="2"></td>
        </tr>
        
        
    {/* <tr id="suspend_199349" class="fancy-suspend-tr" style={{display:'none'}}>
            <th></th>
            <td colspan="2"></td>
            <td class="fancy-suspend-td" colspan="2">
                <div id="suspendClass" class=""><span id="info">Ball Running</span></div>
            </td>
            <td colspan="2"></td>
        </tr> */}
        <tr id="bookMakerSelection_30194778_66628_197444" style={{display: 'table-row'}}>
        <th class="predict">
            <p id="runnerName">NZ Will Win The Toss Bhav</p>
        </th>
        <td class="" colspan="3">
            <dl class="back-gradient">
                <dd id="back_1" style={{cursor:'pointer'}} class=""><a></a></dd>
            </dl>
        </td>
        <td class="" colspan="3">
            <dl class="lay-gradient">
                <dd id="lay_1" style={{cursor:'pointer'}} class=""><a></a></dd>
            </dl>
        </td>
    </tr><tr id="suspend_199353" class="fancy-suspend-tr" style={{display:'none'}}>
            <th></th>
            <td colspan="2"></td>
            <td class="fancy-suspend-td" colspan="2">
                <div id="suspendClass" class=""><span id="info">Ball Running</span></div>
            </td>
            <td colspan="2"></td>
        </tr></tbody>
</table>
</div>   
        <div id="fullMarketEventLeft" class="event-left" style={{display:'block'}}></div>
        <div id="fullMarketEventRight" class="event-right" style={{display:'block'}}></div>
    </div>
    <div class="one_click-wrap">
<div id="editOneClickBetStakeBox" class="one_click-setting" name="oneClickBetStakeBox" style={{display:'none'}}>
    <h4>Edit One Click Bet Stake</h4>
    <ul class="one_click-stake">
        <li><input type="text" name="editBetStake" index="0" value=""/></li>
        <li><input type="text" name="editBetStake" index="1" value=""/></li>
        <li><input type="text" name="editBetStake" index="2" value=""/></li>
        <li><input type="text" name="editBetStake" index="3" value=""/></li>
    </ul>
    <a id="save" class="btn-send" style={{cursor:'pointer'}}>Save</a>
</div>
</div>
</div>
{/* <!-- Right Column --> */}
<div class="col-right">
<div class="slip-wrap no-open-bet_slip">    
</div>
</div>
</div>
        </React.Fragment>
    )
}
