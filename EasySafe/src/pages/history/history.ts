import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {ChemService} from "../../providers/chem-service";

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


