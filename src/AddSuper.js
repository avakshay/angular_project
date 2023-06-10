import React from 'react'
import Transparent from './images/transparent.gif'

export default function AddSuper(props) {
  
console.log(props.agentStack);
return (
<React.Fragment>
 <div class="total_all">

    {true &&<div class="search-wrap" id="userSearchUl" style={{}}>
            <div>
                <input class="search-input" type="text" name="userId" id="userId" placeholder="Find member..."/>
                <button class="search-but" id="searchUserId">Search</button>
            </div>
        </div>}
        

<div class="agent_path">
<ul id="agentPath" class="agent_path-L">

{props.agentStack.map((item,index)=>{
  var levelname;
  if(item.level == 1){
      levelname = 'SSS';
  }
  else if(item.level == 2){
      levelname = 'SS';
  }
  else if(item.level == 3){
      levelname = 'SUP';
  }
  else if(item.level == 4){
      levelname = 'MA';
  }
  else if(item.level == 5){
      levelname = 'PL';
      
 }
  console.log(levelname,item.level);

  if(props.agentStack.length < 2) return;
  return( 
    <li key = {index} id="path5" className={`${(index == props.agentStack.length-1) ? "last_li": ""}`}>
    <a onClick = {()=>{if(index == props.agentStack.length-1){return;} if(index === 0){props.changeUpdatedStatus();} props.popAgent(index);if(props.view === 2 || props.view === 3){props.changeView(1);}}}>
       <span className={`lv_${item.level !== '5' ? item.level:"0"}`}>
         {levelname}
        </span>
        <strong>{item.userid}</strong>
       </a>
     </li>

    )})}

 <ul class="account_pop" id="accountPop">
    <li id="popTmp" style={{}}>
        <a></a>
    </li>
   </ul>
  </ul>
 </div>



{props.view === 1 && <a id="refresh" class="btn_replay"><img src={Transparent}/></a>}

{props.view === 1 && <a class="add_member"  onClick={()=>{props.HandlePopup(2,true)}}><img src={Transparent}/>Add Player</a>}
{props.userLevel && props.userLevel < 4 && props.view === 1 && <a class="add_member" onClick={()=>{props.HandlePopup(4,true)}}><img src={Transparent}/>Add Agent</a>}


   </div>
  </React.Fragment>
 )
}
