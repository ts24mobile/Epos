import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  ticket_list: any = [];
  readonly SOAT_VE = 0;
  readonly BAN_VE = 1;
  viewType: number = 0

  constructor() { }
  ngOnInit() {
    this.viewType = parseInt(localStorage.getItem("VIEW_TYPE"));
    this.initView(this.viewType);
  }

  initView(type: number) {
    switch (type) {
      case this.SOAT_VE:
        this.ticket_list = JSON.parse(localStorage.getItem("SCAN_TICKET"));
        break
      case this.BAN_VE:
        this.ticket_list = JSON.parse(localStorage.getItem("SOLD_TICKET"));
        break
    }
    console.log(this.ticket_list);
  }

  onRefresh(refresher) {
    this.initView(this.viewType);
    if (refresher) {
      if (refresher.target.complete)
        return refresher.target.complete();
      else return;
    }
  }

}
