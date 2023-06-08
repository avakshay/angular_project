import React, { useState,useEffect } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Link} from "react-router-dom";
import Loading from './images/loading40.gif'
import Transparent from './images/transparent.gif'
import Pagination from 'react-js-pagination';

const cookies = new Cookies();


export default function Accountstatement(props) {

    const [accountStatement, setaccountStatement ] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = accountStatement.slice(indexOfFirstPost, indexOfLastPost);

   

    useEffect(() => {
        var ssid = cookies.get('sid');
        if(!ssid) return;
        axios.post('http://65.0.111.203:3000/myAccountStatement',{
            sid:ssid,
           }).then(result => {
            setaccountStatement(result.data)
            console.log(result.data); 
     }
   ).catch(e => {
     //setIsError(true);
   });   
    }, [])

    // Get current posts
  

  // Change page
  const handlePageChange = ( pageNumber ) => {
      console.log( `active page is ${ pageNumber }` );
      setCurrentPage( pageNumber )
   };


   
    return (
<React.Fragment>
<div class="main_wrap">
<div class="agent_path">
    <ul id="agentPath" class="agent_path-L">
        
        <li id="path6" class="" style={{display:'none'}}>
            <a href="javascript: void(0);">
                <span class="lv_0">
                    COM
                </span>
                <strong></strong>
            </a>
        </li>
        
        <li id="path5" class="last_li">
            <Link to="/agents">
                <span class="lv_1">
                    {props.level}
                </span>
                <strong>{props.user}</strong>
            </Link>
        </li>
        
        <li id="path4" class="" style={{display:'none'}}>
            <a href="!#">
                <span class="lv_2">
                    SUP
                </span>
                <strong></strong>
            </a>
        </li>
        
        <li id="path3" class="" style={{display:'none'}}>
            <a href="javascript: void(0);">
                <span class="lv_3">
                    MA
                </span>
                <strong></strong>
            </a>
        </li>
        
        <li id="path0" class="" style={{display:'none'}}>
            <a href="javascript: void(0);">
                <span class="lv_4">
                    PL
                </span>
                <strong></strong>
            </a>
        </li>
        
        <ul class="account_pop" id="accountPop">
            <li id="popTmp" style={{display:'none'}}>
                <a href=""></a>
            </li>
        </ul>
    </ul>
</div>



<div class="col-left">
{/* <!-- Sub Menu and Path --> */}
<div class="sub_path">
    {/* <!-- Sub Menu --> */}
    <ul class="menu-list">
            <li class="class">Position</li>
            <li><Link to="/myAccount/accountCashStatement" id="accountStatement" class="select">Account Statement</Link></li>
            <li><Link to="/myAccount/accountSummary" id="accountSummary" >Account Summary</Link></li>
            <li><Link to="/myAccount/transferredLog" id="transferredLog" >Transferred Log</Link></li>
            <li class="class">Account Details</li>
            <li><Link to="/myAccount/profile" id="profile" >Profile</Link></li>
            <li><Link to="/myAccount/activityLog" id="activityLog" >Activity Log</Link></li>
    </ul>
</div>
</div>

            <div class="col-center report">
    {/* <!-- Loading Wrap --> */}
    <div id="loading" class="loading-wrap" style={{display:'none'}}>
      <ul class="loading">
        <li><img src={Loading}/></li>
        <li>Loading...</li>
      </ul>
    </div>
    {/* <!-- Message --> */}
    <div id="message" class="message-wrap success">
      <a class="btn-close">Close</a>
      <p></p>
    </div>
        <h2>Account Statement
        </h2>
        <table style={{display:'none'}}>
            <tbody><tr id="tempTr">
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
            {/* <Posts posts={currentPosts} loading={loading} /> */}
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
            <li id="next"><a href="javascript:void(0);">Next</a></li>
            <li id="pageNumber"><a href="javascript:void(0);"></a></li>
            <li id="more"><a href="javascript:void(0);">...</a></li>
            <input type="text" id="goToPageNumber"  maxlength="6" size="4"/>
            <li><a id="goPageBtn">GO</a></li>			
        </ul>
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
    </div>
    </div>
        </React.Fragment>
    )
}
