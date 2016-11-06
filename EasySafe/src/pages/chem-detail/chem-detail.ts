import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {ChemService} from "../../providers/chem-service";

/*
  Generated class for the ChemDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chem-detail',
  templateUrl: 'chem-detail.html'
})
export class ChemDetail{

  constructor(
    public navCtrl: NavController,
    private chemService: ChemService,
    private location: Location
  ) {}

  ionViewDidLoad() {
    console.log('Hello ChemDetail Page');
  }

}
