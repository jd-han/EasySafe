import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Chem} from "../../app/chem";
import {ChemDetail} from "../chem-detail/chem-detail";
import {ChemSearchService} from "../../providers/chem-search-service";
import {ProductSearchService} from "../../providers/product-search-service";
import {Product} from "../../app/product";
import {ProductDetail} from "../product-detail/product-detail";


@Component({
  selector: 'page-search-list',
  templateUrl: 'search-list.html'
})
export class SearchList {
  chems: Array<Chem>;
  products: Array<Product>;

  constructor(
    public navCtrl: NavController,
    private chemSearchService: ChemSearchService,
    private navParams: NavParams,
    private productSearchService : ProductSearchService
  ) {
    this.chems = new Array<Chem>();
    this.products = new Array<Product>();
  }

  ionViewDidLoad() {
    console.log('Hello SearchList Page');
  }
  ngOnInit(){

    this.chemSearchService.searchChem(this.navParams.get('name'))
      .subscribe(data =>{
        this.chems = data;
        }, error => {
          console.log('searchList chems OnInit error' + error);
        },
        () => console.log('home to chems searchlist complete'));

    this.productSearchService.searchProduct(this.navParams.get('name'))
      .subscribe(data =>{
        this.products = data;
        }, error => {
          console.log('searchList product OnInit error' + error);
        },
        () => console.log('home to product searchlist complete'));

  }

  search(term: string){

    this.chemSearchService.searchChem(term)
      .subscribe(data =>{
          this.chems = data;
        }, error => {
          console.log('searchList search error' + error);
        },
        () => console.log('searchlist search complete'));

    this.productSearchService.searchProduct(term)
      .subscribe(data =>{
          this.products = data;
        }, error => {
          console.log('searchList product OnInit error' + error);
        },
        () => console.log('searchList to product searchlist complete'));

  }

  chemdetail(event, name: string){
    console.log('Detail' + name);
    this.navCtrl.push(ChemDetail, {name: name});
  }
  productdetail(event, upc: string){
    console.log('Detail' + upc);
    this.navCtrl.push(ProductDetail, {upc: upc});
  }

}
