import { Component, OnInit } from '@angular/core';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  dateTime = moment;
  readonly SOAT_VE = 0;
  readonly BAN_VE = 1;

  homeTitle: string = '';
  viewType: number = 0
  scannedData: {};
  iShowInfo: boolean = true;
  soldTicket: any = [];
  scanTicket: any = [];

  ticket_control: any = {
    "ticket_id": Math.floor(Math.random() * 20) + 1,
    "ticket_customer": "Nguyễn Văn A",
    "ticket_price": "200000",
    "ticket_type": "Vé người lớn",
    "ticket_state": "Chưa xác nhận",
    "ticket_date": this.dateTime().format("DD-MM-YYYY HH:mm"),
    "ticket_name": "Vé tham quan"
  }

  ticket_info: any = {
    "ticket_id": Math.floor(Math.random() * 20) + 1,
    "ticket_customer": "",
    "ticket_customer_phone": "",
    "ticket_price": "200000",
    "ticket_count": "",
    "ticket_total": "0",
    "ticket_type": "",
    "ticket_section": "",
    "ticket_state": "",
    "ticket_date": this.dateTime().format("DD-MM-YYYY HH:mm")
  }

  constructor(private barcodeScanner: BarcodeScanner) {

  }

  ngOnInit() {
    this.viewType = parseInt(localStorage.getItem("VIEW_TYPE"));
    this.initView(this.viewType);
  }

  initView(type: number) {
    switch (type) {
      case this.SOAT_VE:
        this.homeTitle = "Thông tin vé"
        this.scanCode();
        break
      case this.BAN_VE:
        this.homeTitle = "Danh sách vé bán"
        break
    }
  }

  onConfirm() {
    this.ticket_control.ticket_state = "Xác nhận";
    let list = JSON.parse(localStorage.getItem("SCAN_TICKET"));
    if (list) {
      this.scanTicket = list;
    }

    this.scanTicket.unshift(this.ticket_control);
    localStorage.setItem("SCAN_TICKET", JSON.stringify(this.scanTicket));
  }

  onSave() {
    console.log(this.ticket_info);
    let list = JSON.parse(localStorage.getItem("SOLD_TICKET"));
    if (list) {
      this.soldTicket = list;
    }
    this.soldTicket.unshift(this.ticket_info);
    localStorage.setItem("SOLD_TICKET", JSON.stringify(this.soldTicket));


    this.ticket_info = {
      "ticket_id": Math.floor(Math.random() * 20) + 1,
      "ticket_customer": "",
      "ticket_customer_phone": "",
      "ticket_price": "200000",
      "ticket_count": "",
      "ticket_total": "0",
      "ticket_type": "",
      "ticket_section": "",
      "ticket_state": "",
      "ticket_date": this.dateTime().format("DD-MM-YYYY HH:mm")
    }
  }

  onChangeCount(count) {
    if (!count || count == "") {
      this.ticket_info.ticket_total = "0";
    } else {
      this.ticket_info.ticket_total = (parseInt(count) * parseInt(this.ticket_info.ticket_price)).toString();
    }
  }
  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        // console.log("Barcode data " + JSON.stringify(barcodeData));
        // this.scannedData = barcodeData;
        this.iShowInfo = true;
        console.log(barcodeData);
        let ticket = JSON.parse(barcodeData.text);
        if (ticket) {
          if (ticket.ticket_id) {
            this.ticket_control = ticket;
            this.ticket_control.date = moment(this.ticket_control.ticket_date).format('DD-MM-YYYY');
          }
        }
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
//   changeFormatMoney(e){
//     this.ticket_info.ticket_total = parseInt(e.target.value.toString().replace(/[,\.]/gi, ''));
//     e.target.value = this.formatMoney(this.ticket_info.ticket_total);
//   }

//   formatMoney(number, places?: any, symbol?: any, thousand?: any, decimal?: any) {
//     number = number || 0;
//     if (number == null) number = 0;
//     places = !isNaN(places = Math.abs(places)) ? places : 0;
//     symbol = symbol !== undefined ? symbol : " VND";
//     thousand = thousand || ".";
//     decimal = decimal || ",";
//     var negative = number < 0 ? "-" : "",
//         i: any = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
//         j = (j = i.length) > 3 ? j % 3 : 0;
//     return negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
// }

}
