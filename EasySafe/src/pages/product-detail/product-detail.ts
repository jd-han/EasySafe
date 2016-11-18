import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html'
})

export class ProductDetail{

  pros: {name: string, boycott: string, totalSafety: string};
  chems: Array<{KOR: string, ENG: string, safety: string}>;

  constructor(public navCtrl: NavController, ) {
    this.pros = {name: "제품이름", boycott: "해당없음", totalSafety: "col_green.png"}
    this.chems = [
              {KOR: "한글명", ENG: "영문명", safety: "col_green.png"},
              {KOR: "한글명1", ENG: "영문명1", safety: "col_red.png"},
              {KOR: "한글명2", ENG: "영문명2", safety: "col_yellow.png"},
              {KOR: "한글명3", ENG: "영문명3", safety: "col_green.png"},
              {KOR: "한글명4", ENG: "영문명4", safety: "col_yellow.png"},
            ]
  }

  ionViewDidLoad() {
    console.log('Hello ProductDetail Page');
  }
  ngOnInit(){

  }
}
