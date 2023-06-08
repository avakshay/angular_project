import React from 'react'

export default function CreditRef(props) {
    return (
        <React.Fragment>
            <div id="creditReferenceModel" class="pop_bg" style={{display: 'block'}}>
	<div class="pop_refer">
		<a class="close_pop" href="javascript: void(0)" onClick={()=>{props.HandlePopup(3,false)}}>close_pop</a>
		<h3>Credit Reference Edit</h3>

		<div class="wrap-refer_edit">
			<dl>
				<dt>Current</dt>
				<dd>
					<a class="btn" id="creditReferenceLog" href="javascript: void(0)">Log</a>
					<strong id="creditReference">0</strong>
				</dd>
			</dl>

			<dl>
				<dt>New</dt>
				<dd><input type="text" id="newCreditReference" onclick="location.href='#stake'" placeholder="Enter"/></dd>
			</dl>

			<dl>
				<dt>Password</dt>
				<dd><input id="changeCreditReferencePassword" type="password" onclick="location.href='#stake'" placeholder="Enter"/></dd>
			</dl>
		</div>
		<ul class="btn-wrap">
			<li><a id="changeCreditReferenceBtn" class="btn-send" href="javascript: void(0)">Submit</a></li>
		</ul>
	</div>
</div>
        </React.Fragment>
    )
}
