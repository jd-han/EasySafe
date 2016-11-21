import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Chem} from "../../app/chem";
import {ChemDetail} from "../chem-detail/chem-detail";
import {ChemSearchService} from "../../providers/chem-search-service";

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
  chems: Chem[];

  constructor(
    public navCtrl: NavController,
    private chemSearchService: ChemSearchService,
    private navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log('Hello SearchList Page');
  }
  ngOnInit(){
    this.chemSearchService.searchChem(this.navParams.get('name'))
      .subscribe(data =>{
        this.chems = data;
        }, error => {
          console.log('searchList OnInit error' + error);
        },
        () => console.log('home to searchlist complete'))
  }

  searchChem(term: string){
    this.chemSearchService.searchChem(term)
      .subscribe(data =>{
          this.chems = data;
        }, error => {
          console.log('searchList search error' + error);
        },
        () => console.log('searchlist search complete'));
  }

  detail(event, name: string){
    console.log('Detail' + name);
    this.navCtrl.push(ChemDetail, {name: name});
  }

}
