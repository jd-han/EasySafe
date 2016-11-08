import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Chem} from "../../app/chem";
import {ChemSearchService} from "../../providers/chem-search-service";

@Component({
  selector: 'page-chem-detail',
  templateUrl: 'chem-detail.html'
})

export class ChemDetail{
  chem: Chem;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private chemSearchService: ChemSearchService
  ) {
  }

  ionViewDidLoad() {
    console.log('Hello ChemDetail Page');
  }
  ngOnInit(){
    this.chemSearchService.chemDetail(this.navParams.get('name'))
  .subscribe( data => {
      this.chem =  data;
      }, error => {console.log('chemDetail.init err' + error);
      },
        () => console.log('chemDetail Complete'))
  }
}
