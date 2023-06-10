import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


export default function Reactdatepicker(props) {

    const [rangeStart, setRangeStart] = React.useState("")
    const [rangeEnd, setRangeEnd] = React.useState("")
    
    
    // const selectStartDate = (e) => {
    //   setRangeStart(e.target.value)
    // }
  
    // const selectEndDate = (e) => {
    //   setRangeEnd(e.target.value)
    // }

    console.log();
         
    return (
        <React.Fragment>
              <ul class="input-list" style={{display:'inline-flex'}}>
			     
        

      {/* <h3>date range picker</h3> */}
      <DatePicker
        selectsStart
        selected={rangeStart}
        placeholderText="YYYY-MM-DD"
      
        className="cal-input"
        
        onChange={(date)=>{setRangeStart(date);console.log(date);}}
       />
        <input id="startTime" disabled="true" class="time-input disable" type="text" placeholder="09:00" maxlength="5"/>
        
      <DatePicker
        selectsEnd
       
        placeholderText="YYYY-MM-DD"
        selected={rangeEnd} 
        onChange={(date)=>{setRangeEnd(date)}}
        className="cal-input"
        />
        <input id="endTime" disabled="true" class="time-input disable" type="text" placeholder="08:59" maxlength="5"/>
      
     

        {/*    <input id="endDate" class="cal-input" type="text" placeholder="YYYY-MM-DD" min="2020-08-31" max="2020-09-15" onclick="calendarObj.show(event,'endDate');"/>*/}
            {/* <input id="endTime" disabled="" class="time-input disable" type="text" placeholder="08:59" maxlength="5"/> */}
        
        <li style={{display:'none'}}>(TimeZone:IST)</li>
    </ul>
            
        </React.Fragment>
    )
}
