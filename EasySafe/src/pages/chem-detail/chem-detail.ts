import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ChemSearchService} from "../../providers/chem-search-service";
import {Chem} from "../../app/chem";
import {ProductSearchService} from "../../providers/product-search-service";
import {Product} from "../../app/product";
import {ProductDetail} from "../product-detail/product-detail";

@Component({
  selector: 'page-chem-detail',
  templateUrl: 'chem-detail.html'
})

export class ChemDetail {
  chem: Chem;
  casUrl: string;
  nameUrl: string;
  products: Product[];

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private chemSearchService: ChemSearchService,
              private productSearchService: ProductSearchService) {
  }

  ionViewDidLoad() {
    console.log('Hello ChemDetail Page');
  }

  ngOnInit() {
    this.chemSearchService.chemDetail(this.navParams.get('name'))
      .subscribe(data => {
          this.chem = data;
          this.casUrl = "http://www.chemnet.com/cas/supplier.cgi?terms=" + this.chem.cas + "&l=kr&exact=dict&f=plist&mark=&submit.x=0&submit.y=0";
          this.nameUrl = "https://ko.wikipedia.org/wiki/" + this.chem.name;
        }, error => {
          console.log('chemDetail.init err' + error);
        },
        () => console.log('chemDetail Complete'));

    this.productSearchService.ProductWCompo(this.navParams.get('name'))
      .subscribe(data => {
          this.products = data;
        }, error => {
          console.log('ProductWCompo.init err' + error);
        },
        () => console.log('ProductWCompo Complete'));
  }

  toProductDetail(product:Product){
    this.navCtrl.push(ProductDetail, {product: product})
  }
}
