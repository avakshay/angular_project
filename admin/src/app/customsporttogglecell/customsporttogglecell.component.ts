import { Component, OnInit } from '@angular/core';
import { SportDataService } from '../services/sport-data.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-customsporttogglecell',
  templateUrl: './customsporttogglecell.component.html',
  styleUrls: ['./customsporttogglecell.component.css']
})
export class CustomsporttogglecellComponent implements OnInit {
  params: any;
  data: any;
  isActive: boolean;
  disabled: boolean;

  constructor(private SportSettingdata: SportDataService,private notifyService: NotificationService,) { }

  ngOnInit() {
  }

  agInit(params) {
    // console.log(params);
    this.params = params;
    this.data = this.params.data;
    if (this.params.colDef.field == "isActive") {
      if (this.data.isActive == 1) {
        this.isActive = true;
      }
      else {
        this.isActive = false;
      }
    }
  }

  update(){
    if (this.data.sportName) {
      if (this.params.colDef.field == "isActive") {
        this.UpdateSportStatus();
      }
    }
  }

  UpdateSportStatus(){
    if (this.isActive) {
      this.data.isActive = 0;
    }
    else {
      this.data.isActive = 1;
    }
    this.SportSettingdata.UpdateSportsStatus(this.data.betfairId,this.data.isActive).subscribe(data=>{
      if (data.status == "Success") {
        if (this.isActive) {
          this.isActive = false;
        }
        else {
          this.isActive = true;
        }
        this.notifyService.success(data.result);
      }
      else {
        this.notifyService.error(data.result);
      }
    })
  }
}
