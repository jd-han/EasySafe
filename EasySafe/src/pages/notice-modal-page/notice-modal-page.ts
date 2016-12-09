import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/*
  Generated class for the NoticeModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notice-modal-page',
  templateUrl: 'notice-modal-page.html'
})
export class NoticeModalPage {
  notice;

  constructor(
    public navCtrl : NavController,
    private params : NavParams,
    private viewCtrl : ViewController
  ) {
    this.notice = this.params.get('notice');
    console.log("this.notice");
    console.dir(this.notice);
  }

  ionViewDidLoad() {
    console.log('Hello NoticeModalPage Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
