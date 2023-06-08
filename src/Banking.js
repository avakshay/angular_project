import React from 'react'

export default function Banking(props) {
    return (
        <React.Fragment>
            <div class="full-wrap" style={{height: 'calc(100% - 105px)'}}>
	<h2>Banking</h2>

	<div class="total_all">
		

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


	</div>
	{/* <!-- Report Table --> */}
	<div class="over-wrap" style={{maxHeight: 'calc(100% - 108px)'}}>

		<div class="function-wrap clearfix">
			<dl class="banking-head float-L">
				<dt>Your Balance</dt>
				<dd id="yourBalance"><span>PTH</span>{props.balance}</dd>
			</dl>
			<ul class="input-list float-R" style={{display:'none'}}>
				<li><label>Sort by</label></li>
				<li>
					<select id="sort">
						<option value="userId">UID</option>
						<option value="site">Site</option>
						<option value="currencyType">Currency</option>
					</select>
				</li>
			</ul>
		</div>
		<table style={{display:'none'}}>
			<tbody><tr id="tempTr">
				<td class="td-uid" id="userId"></td>
				<td id="siteCol" style={{display:'none'}}></td>
				<td id="currencyTypeCol" style={{display:'none'}}></td>
				<td id="balance"></td>
				<td id="availableBalance"></td>
				<td id="userExposure"></td>
				<td class="DW-amount">
					<ul class="btn_list-DW">
						<li><a id="dBtn" class="btn" >D</a></li>
						<li><a id="wBtn" class="btn" >W</a></li>
					</ul>
					<input id="amount" name="amount" class="" type="text" placeholder="0" maxlength="18"/>
					<a id="fullBtn" href="javascript:void(0);" class="btn float-L disable">Full</a>
				</td>
				<td class="credit-amount">
					<a href="javascript:void(0);" id="userCreditReference"></a>
					<input id="editCreditReference" name="editCreditReference" class="" type="text" placeholder="0" maxlength="18" style={{display:'none'}}/>
					<a id="editCreditReferenceBtn" href="javascript:void(0);" class="btn">Edit</a>
					<a id="cancelCreditReferenceBtn" href="javascript:void(0);" class="btn" style={{display:'none'}}>Cancel</a>
				</td>
				<td id="userReferencePL"></td>
				<td class="border-l"><input id="remark" class="" type="text" placeholder="Remark"/></td>
				<td class="full-amount">
					<a id="log" class="btn">Log</a>
				</td>
			</tr>
			<tr id="tempBalanceTr" class="expand first expand-balance">
				<td></td>
				<td colspan="8">
					<img class="expand-arrow" src="/images/transparent.gif"/>
					<table>
						<tbody id="tempVendorContent">
						<tr>
							<th width="9%" class="align-L">Game</th>
							<th width="11%">Balance</th>
							<th width="7%"><a id="recallAll"  class="btn-recall">Recall All</a></th>
							<th></th>
						</tr>
						</tbody>
					</table>
				</td>
			</tr>
			<tr id="tempVendorTr">
				<td id="vendorTitle" class="align-L">Houise</td>
				<td id="vendorBalance">200,000,000,000.00</td>
				<td><a id="recall"  class="btn-recall">Recall</a></td>
				<td></td>
			</tr>
			<tr id="noDataTempTr">
				<td class="no-data" colspan="11">
					<p>No Data</p>
				</td>
			</tr>

			<tr id="totalTempTr" class="total">
				<td class="align-L">Total</td>
				<td id="totalSite" style={{display:'none'}}></td>
				<td id="totalCurrencyType" style={{display:'none'}}></td>
				<td id="totalBalance"></td>
				<td id="totalAvailableBalance"></td>
				<td id="totalExposure"></td>
				<td id="totalCreditReference" class="" colspan="2"></td>
				<td id="totalReferencePL"></td>
				<td></td>
				<td></td>
			</tr>
		</tbody></table>

		<table id="table_transfer" class="table01 tab-transfer tab-banking">
			<tbody><tr>
				<th id="userIdTH" width="" class="align-L sort-this">UID</th>
				<th id="siteTH" width="5%" style={{display:'none'}}>Site</th>
				<th id="currencyTypeTH" width="5%" style={{display:'none'}}>Currency</th>
				<th width="9%">Balance</th>
				<th width="7.5%">Available D/W</th>
				<th width="9%">Exposure</th>
				<th width="230" class="align-C border-l">Deposit / Withdraw</th>
				<th width="160" class="border-l">Credit Reference</th>
				<th width="8%" class="">Reference P/L</th>
				<th width="10%" class="border-l">Remark</th>
				<th width="47" class="full-amount">
					<a id="allLog" href="javascript:void(0);" class="btn-send">All Log</a>
				</th>
			</tr>
			</tbody><tbody id="content"><tr id="akshayddl" main_userid="akshayddl">
				<td class="td-uid" id="userId"><span class="order">1.</span>akshayddl</td>
				<td id="siteCol" style={{display:'none'}}>Sky</td>
				<td id="currencyTypeCol" style={{display:'none'}}>PTH</td>
				<td id="balance"> 0.00</td>
				<td id="availableBalance"> 0.00</td>
				<td id="userExposure">0.00</td>
				<td class="DW-amount">
					<ul class="btn_list-DW">
						<li><a id="dBtn" class="btn" >D</a></li>
						<li><a id="wBtn" class="btn" >W</a></li>
					</ul>
					<input id="amount" name="amount" class="" type="text" placeholder="0" maxlength="18"/>
					<a id="fullBtn" href="javascript:void(0);" class="btn float-L disable">Full</a>
				</td>
				<td class="credit-amount">
					<a href="javascript:void(0);" id="userCreditReference"> 0.00</a>
					<input id="editCreditReference" name="editCreditReference" class="" type="text" placeholder="0" maxlength="18" style={{display:'none'}}/>
					<a id="editCreditReferenceBtn" href="javascript:void(0);" class="btn">Edit</a>
					<a id="cancelCreditReferenceBtn" href="javascript:void(0);" class="btn" style={{display:'none'}}>Cancel</a>
				</td>
				<td id="userReferencePL"> 0.00</td>
				<td class="border-l"><input id="remark" class="" type="text" placeholder="Remark"/></td>
				<td class="full-amount">
					<a id="log" class="btn">Log</a>
				</td>
			</tr><tr id="totalTempTr" class="total">
				<td class="align-L">Total</td>
				<td id="totalSite" style={{display:'none'}}></td>
				<td id="totalCurrencyType" style={{display:'none'}}></td>
				<td id="totalBalance"> 47,252.61</td>
				<td id="totalAvailableBalance"> 8,421.02</td>
				<td id="totalExposure"><span class="red">(50.00)</span></td>
				<td id="totalCreditReference" class="" colspan="2"> 0.00</td>
				<td id="totalReferencePL"> 47,252.61</td>
				<td></td>
				<td></td>
			</tr></tbody>
		</table>
	</div>

	<div class="submit-wrap" id="settlementBar">
		<ul>
			<li><a id="clearAllBtn" href="javascript:void(0);" class="btn">Clear All</a></li>
			<li class="submit-payment">
				<input id="paymentPassword" type="password" placeholder="Password"/>
				<a id="submit" href="javascript:void(0);" class="btn-send">Submit <span id="submitCount">0</span> Payment</a>
			</li>
		</ul>
	</div>
</div>
        </React.Fragment>
    )
}
