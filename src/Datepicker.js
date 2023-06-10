import React, { Component } from 'react'
//import { format } from "date-fns";
//import {startDate} from 'react-dates'
import moment from 'moment';

export default class Datepicker extends Component {
    constructor(props) {
        super(props);
        
      this.state = {
            sDate: "",
            endD: "",
            maxDate: moment().format("YYYY-MM-DD"),
            
          };
        
       
      }



    render() {
       
         
        
        return (
           <React.Fragment>
           <input id="startDate" selected={this.state.sDate} onChange={(e) => {this.props.changeStartDate(e.target.value);this.setState({ sDate: e.target.value })}}  class="cal-input" type="date" placeholder="YYYY-MM-DD"   max={this.state.maxDate}/> 
           <input id="startTime" disabled="true" class="time-input disable" type="text" placeholder="09:00" maxlength="5"/>
                
           <React.Fragment>
           <input id="endDate" selected={this.state.endD}  onChange={(e) => {this.props.changeEndDate(e.target.value);this.setState({ endD: e.target.value })}}  class="cal-input"  type="date" placeholder="YYYY-MM-DD"   max={this.state.maxDate} />
           <input id="endTime" disabled="true" class="time-input disable" type="text" placeholder="08:59" maxlength="5"/>
          </React.Fragment>      
          </React.Fragment>
        )
    }
}
