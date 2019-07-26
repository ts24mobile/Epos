import { Component, OnInit } from '@angular/core';
import { NavControllerService } from 'src/app/services';
import { AlertController, Events } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin = {
    username: "",
    password: ""
  }

  constructor(
    public navCtrl: NavControllerService,
    public alertController: AlertController,
    private ev: Events,
  ) {

  }

  ngOnInit() {
  }

  login() {

    if (this.formLogin.username == "" || this.formLogin.password == "") {

    } else {
      this.presentAlertMultipleButtons();

    }
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      message: 'Vui lòng chọn',
      buttons: [
        {
          text: 'Bán vé',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Bán vé');
            localStorage.setItem("VIEW_TYPE", "1");
            this.goHome(1)
          }
        }, {
          text: 'Soát vé',
          handler: () => {
            console.log('Soát ve');
            localStorage.setItem("VIEW_TYPE", "0");
            this.goHome(0);
          }
        }
      ]
    });

    await alert.present();
  }

  goHome(type) {
    this.navCtrl.setRoot("tabs/home");
    this.ev.publish('TAB_TYPE', type);
  }
}
