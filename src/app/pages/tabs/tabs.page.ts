import { Component } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  tabTitle: string = "Quét Mã";

  constructor(
    public ev: Events,
  ) {
    this.ev.subscribe('TAB_TYPE', msg => {
      console.log("TAB ::" + msg)
      switch (parseInt(msg)) {
        case 0:
          this.tabTitle = "Quét Mã"
          break;
        case 1:
          this.tabTitle = "Loại vé";
          break;
      }
    });
  }
  ngOnInit(): void {
    let viewType = parseInt(localStorage.getItem("VIEW_TYPE"));
    switch (viewType) {
      case 0:
        this.tabTitle = "Quét Mã";
        break;
      case 1:
        this.tabTitle = "Loại vé";
        break;
    }
  }

  ngAfterViewInit(): void {
    let viewType = parseInt(localStorage.getItem("VIEW_TYPE"));
    switch (viewType) {
      case 0:
        this.tabTitle = "Quét Mã";
        break;
      case 1:
        this.tabTitle = "Loại vé";
        break;
    }
  }

}
