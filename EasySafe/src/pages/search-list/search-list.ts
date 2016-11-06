import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the SearchList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search-list',
  templateUrl: 'search-list.html'
})
export class SearchList {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SearchList Page');
  }

}
