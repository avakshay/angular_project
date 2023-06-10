import React from 'react'
import Loading from './images/loading40.gif'
import './css/style.css'


export default function BankingModel() {
    return (
        <React.Fragment>

            <div id="bankingModal" class="pop_bg" style={{display:'none'}}>
  <div class="pop_box">
  	{/* <!-- Loading Wrap --> */}
	<div id="bankingModalLoading" class="overlay">
        {/* <!-- add style="display:block" to show loading --> */}
		<div class="loading-wrap" style={{display:'none'}}>
			<ul class="loading">
				<li><img src={Loading} alt='loading'/></li>
				<li>Loading…</li>
			</ul>
		</div>
	</div>
    <a class="close_pop"  onclick="BankingHandler.hideDialog()">close_pop</a>

    <h3>Edit Credit</h3>
    <ul class="tab col2">
      <li><a id="deposit" >Credit IN
      </a></li>
      <li><a id="withdraw" >Credit OUT</a></li>
    </ul>
    <div class="total_box">
      <dl class="total_dl">
        <dt id="bankingTitle"></dt>
        <dd id="displayName"></dd>
      </dl>
      <dl id="bankingBalanceDL" class="total_dl" style={{display:'none'}}>
        <dt>Balance</dt>
        <dd id="bankingBalance"></dd>
      </dl>
      <dl id="bankingCreditPLDL" class="total_dl" style={{display:'none'}}>
        <dt>Balance
        </dt>
        <dd id="bankingCreditPL"></dd>
      </dl>
      <dl id="bankingCreditLimitDL" class="total_dl" style={{display:'none'}}>
        <dt>Credit Limit
        </dt>
        <dd id="editCreditLimit"></dd>
      </dl>
    </div>
    <dl class="form_list">
      <dt>Amount</dt>
      <dd id="allAmountOption" class="radio_enter">
        <input id="allAmount" name="bankingAmount" class="radio" type="radio" value="all"/>
        <label for="allAmount">All</label>
      </dd>
      <dd id="cusAmountOption" class="radio_enter">
        <input id="cusAmount" name="bankingAmount" class="radio" type="radio" value="cus"/>
        <input id="amount" type="text" onclick="location.href='#stake'" placeholder="Enter"/>
        <span id="bankingAmountMust" class="must">＊</span>
      </dd>
      <dt>Password</dt>
      <dd>
        <input id="bankingPassword" type="password" onclick="location.href='#stake'" placeholder="Enter"/>
        <span class="must">＊</span>
      </dd>
      <dt>Remarks</dt>
      <dd>
        <textarea id="remarks" type="text" cols="45" rows="5" placeholder="Enter"></textarea>
      </dd>
      <dd><a id="bankingBtn" class="btn-send" ></a></dd>
    </dl>

  </div>
</div>
        </React.Fragment>
    )
}
