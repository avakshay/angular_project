import React, { useState,useEffect } from 'react'

import axios from 'axios';
import Cookies from 'universal-cookie';
import Transparent from './images/transparent.gif'
import Pagination from 'react-js-pagination';
import ChangeAgentPassword from './ChangeAgentPassword';
const cookies = new Cookies();


export default function AgentProfile(props) {
    const [view, setview] = useState(1);
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [comm, setcomm] = useState("");
    const [exp, setexp] = useState("");
    const [balance, setbalance] = useState("")
    const [ShowPassModel, setShowPassModel] = useState(false)
    const [accountStatement, setaccountStatement ] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = accountStatement.slice(indexOfFirstPost, indexOfLastPost);

  
    useEffect(()=>{
        //console.log(props.agentStack);
        var ssid = cookies.get('sid');
        if(!ssid) return;
        axios.post('http://65.0.111.203:3000/agentAccountStatement',{
         sid:ssid,
         agentId:props.agentStack[props.agentStack.length-1].userid,
         agentPass:'1212',
         myPass:'8989'

        })
        .then(result => {
          if(result.status === 200){
            // console.log(result);
            setaccountStatement(result.data)
           }
          
         }
         
         ).catch(e => {
            //setIsError(true);
         });

         axios.post("http://65.0.111.203:3000/agentAccountSummary", {
            sid:ssid,
            agentId:props.agentStack[props.agentStack.length-1].userid
          })
          .then((result) => {
            //    console.log(result.data);
              setfirstname(result.data.firstname);
              setlastname(result.data.lastname);
              setcomm(result.data.comm);
              setbalance(result.data.balance);
              setexp(result.data.exp)
          })
          .catch((e) => {
            //setIsError(true);
          });
          
     },[]);

     const handlepassmodel = ()=>{
        setShowPassModel(true)
      }
       const handleClosepassmodel = ()=>{
        setShowPassModel(false)
      }

      // Change page
  const handlePageChange = ( pageNumber ) => {
    // console.log( `active page is ${ pageNumber }` );
    setCurrentPage( pageNumber )
 };

    return (
  <React.Fragment>
     { ShowPassModel &&
          <ChangeAgentPassword agentStack={props.agentStack} handleClosepassmodel={handleClosepassmodel}/>
        }
    <div class="main_wrap">
     <div style={{top:'0px'}} class="col-left">
      <div class="sub_path">
        <ul class="menu-list">
	            <li class="class">Position</li>
	            <li>
	                <a onClick={()=>{setview(1);}} id="accountSummary"  className={`${view === 1 ? "select":""}`}>Account Summary</a>
	            </li>
	            <li class="class">Performance</li>
	            <li>
	                <a onClick={()=>{setview(2);}}  id="transactionHistory" className={`${view === 2 ? "select":""}`} >Transaction&nbsp;History
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
                <td id="currentExposure">0.00</td>
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
					<dd>sky@gmail.com</dd>

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
					<dd id="mainwalletExposureLimit">0
						
                    </dd>
					
					<dt>Commission</dt>
                    <dd>
                        <span id="commission">{comm}.0%</span>
						
						
						
                    </dd>

					
                </dl>
            </div>
			
            <div class="profile-wrap" style={{display:'none'}}>
                <h3>PT</h3>
                <dl class="casinopt-list-wrap">
					
                    <dt>PT Allowed</dt>
					<dd><span id="profile_pt_allowed">0%</span></dd>
					
					
					<dt>PT Setting</dt>
                    <dd>
                    
						<a  class="favor-set">Edit</a>
							
                    </dd>
					
                    <dd class="dl_list">
                        <img class="expand-arrow" src="/images/transparent.gif"/>
                        <dl class="casinopt-list-head">
							<dt></dt>
							
							<dd>Total PT</dd>
							
						</dl>
						
                   		<dl class="casinopt-list">
                         <dt>Soccer</dt>
							
                         <dd id="profile_soccer_PT">0%</dd>
							
                    	</dl>
                        
                   		<dl class="casinopt-list">
                         <dt>Tennis</dt>
							
                         <dd id="profile_tennis_PT">0%</dd>
							
                    	</dl>
                        
                   		<dl class="casinopt-list">
                         <dt>Cricket</dt>
							
                         <dd id="profile_cricket_PT">0%</dd>
							
                    	</dl>
                        
                   		<dl class="casinopt-list">
                         <dt>Rugby Union</dt>
							
                         <dd id="profile_rugby_union_PT">0%</dd>
							
                    	</dl>
                        
                   		<dl class="casinopt-list">
                         <dt>Horse Racing</dt>
							
                         <dd id="profile_horse_racing_PT">0%</dd>
							
                    	</dl>
                        
                   		<dl class="casinopt-list">
                         <dt>Greyhound Racing</dt>
							
                         <dd id="profile_greyhound_racing_PT">0%</dd>
							
                    	</dl>
                        
                   		<dl class="casinopt-list">
                         <dt>American Football</dt>
							
                         <dd id="profile_american_football_PT">0%</dd>
							
                    	</dl>
                        
                   		<dl class="casinopt-list">
                         <dt>Basketball</dt>
							
                         <dd id="profile_basketball_PT">0%</dd>
							
                    	</dl>
                        
                   		<dl class="casinopt-list">
                         <dt>Politics</dt>
							
                         <dd id="profile_politics_PT"></dd>
							
                    	</dl>
                        
                    </dd>
                    <div style={{display:'none'}}>
                        <dt>Binary PT Setting</dt>
                        <dd></dd>
                        <dd class="dl_list">
                            <img class="expand-arrow" src="/images/transparent.gif"/>
                            <dl>
                                <dt>Binary</dt>
                                <dd id="profile_company_binary_PT">0%</dd>
                            </dl>
                        </dd>
                    </div>

   
                </dl>
             </div>

                 
        </div>
      </div> }



     {view === 2 && <div class="col-center report">
		

        
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
      var obj2;
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
         </div>
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
        
            </div> }


     </div>
        </React.Fragment>
    )
}
