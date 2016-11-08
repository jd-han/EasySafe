import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {

  constructor(
    public navCtrl: NavController,
  ) {
    this.navCtrl = navCtrl;
  }

  ionViewDidLoad() {
    console.log('Hello History Page');
  }

}


