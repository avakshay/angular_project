import React, { useState,useEffect } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

export default function TotalBox() {
   const [RB,setRB] = useState(0);
   const [TAB,setTAB] = useState(0);
   const [TCB,setTCB] = useState(0);
   const [CE,setCE] = useState(0);
   const [AB,setAB] = useState(0);
   const [LE,setLE] = useState(0);
   

    useEffect(()=>{

      var ssid = cookies.get('sid');
      if(!ssid) return;
      axios.post('http://65.0.111.203:3000/agentDetailInfo',{
			 sid:ssid
			})
			.then(result => {
                if(result.status === 200){
                   
                   let b = result.data.balance ? result.data.balance : 0;
                   let ld = result.data.ldb ? result.data.ldb : 0;
                   let lw = result.data.lwc ? result.data.lwc : 0;
                   let le = result.data.le ? result.data.le : 0;

                   setRB(b);
                   setTAB(ld);
                   setTCB(lw);
                   if(result.data.exposure){
                     setCE(Math.abs(result.data.exposure));
                   }
                                    
                   var avail_balance = parseFloat(b)+parseFloat(ld) + parseFloat(lw);
                   setAB(avail_balance);
                   setLE(le);
                
                        

                }
   	
			   }
			  	 
		   ).catch(e => {
			    //setIsError(true);
		   });
		   
		
     },[]);
    


    return (
        <React.Fragment>
    <div id="totalBox" class="total_box" >

<dl id="creditLimitDL" class="total_dl" style={{display:'none'}}>
    <dt>Credit Limit</dt>
    <dd id="myCreditLimit">PTH 135,290.02</dd>
</dl>
<dl id="creditGivenOutDL" class="total_dl" style={{display:'none'}}>
    <dt>Total Credit Given Out</dt>
    <dd id="totalCreditGivenOut">PTH 131,371.04</dd>
</dl>
<dl id="creditAvailBalDL" class="total_dl" style={{display:'none'}}>
    <dt>Credit Avail Bal</dt>
    <dd id="myCreditAvailBal">PTH 3,918.98</dd>
</dl>
<dl id="totalBalanceDL" class="total_dl" >
    <dt>Remaining Balance</dt>
    <dd id="totalBalance">PTH {parseFloat(RB).toFixed(2)}</dd>
</dl>
<dl id="totalExposureDL" class="total_dl" >
    <dt>Total Agent Balance</dt>
    <dd id="totalExposure">PTH {parseFloat(TAB).toFixed(2)}</dd>
</dl>
<dl id="myCurrentPLDL" class="total_dl" style={{display:'none'}}>
    <dt>Today P/L with Upline
    </dt>
    <dd id="myCurrentPL">PTH 1,209.39</dd>
</dl>
<dl id="availableBalanceDL" class="total_dl" >
    <dt>Total Client Balance</dt>
    <dd id="totalAvailBal">PTH {parseFloat(TCB).toFixed(2)}</dd>
</dl>
<dl id="masterBalanceDL" class="total_dl" >
    <dt>Client Exposure</dt>
    <dd id="mastersBalance">PTH <span class="red">({parseFloat(CE).toFixed(2)})</span></dd>
</dl>
<dl id="masterAvailableBalanceDL" class="total_dl" >
    <dt>Available Balance</dt>
    <dd id="mastersAvailBal">PTH {parseFloat(AB).toFixed(2)}</dd>
</dl>
<dl id="transferablePLWithUplineDL" class="total_dl" >
    <dt>Ledger Exposure
    </dt>
    <dd id="transferablePLWithUpline">PTH <span className={`${(LE >= 0) ? "green": "red"}`}>{LE >= 0 ? parseFloat(Math.abs(LE)).toFixed(2): '('+parseFloat(Math.abs(LE)).toFixed(2)+')' }</span></dd>
</dl>


</div>
    </React.Fragment>
    )
}
