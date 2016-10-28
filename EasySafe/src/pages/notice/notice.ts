import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Notice page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html'
})
export class NoticePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Notice Page');
  }

}
