import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Product} from "../../app/product";
import {ProductSearchService} from "../../providers/product-search-service";
import {ChemSearchService} from "../../providers/chem-search-service";
import {Chem} from "../../app/chem";
import {ChemDetail} from "../chem-detail/chem-detail";

@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html'
})

export class ProductDetail {

  product: Product;
  chem: Chem;
  chems: Array<Chem>;
  chemnames: Array<string>;
  nameUrl: string;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private  productSearchService: ProductSearchService,
              private chemSearchService: ChemSearchService) {
    this.chems = new Array();
    this.chem = new Chem();
  }

  ionViewDidLoad() {
    console.log('Hello ProductDetail Page');
  }

  ngOnInit() {

    if(this.navParams.get('product') != null){
      console.log("this.navParams.get('product') != null");
      this.product = this.navParams.get('product');
      console.dir(this.product);

      this.chemnames = this.product.components.split(" ");

      for (let name in this.chemnames) {

        let temp = new Chem();
        temp.name = this.chemnames[name];
        this.chems.push(temp);

        this.chemSearchService.chemAvg(this.chemnames[name])
          .subscribe(data => {
              this.chem = data;
              this.chems[name] = this.chem;
            }, error => {
              console.log('chemAvg.init err' + error);
            },
            () => console.log('chemAvg Complete'));
      }
    }else{

      this.productSearchService.productUPCDetail(this.navParams.get('upc'))
        .subscribe(data => {
            console.log("get in product detail by upc : after barcode scan and result is only one");
            this.product = data;

            this.chemnames = this.product.components.split(" ");

            for (let name in this.chemnames) {

              let temp = new Chem();
              temp.name = this.chemnames[name];
              this.chems.push(temp);

              this.chemSearchService.chemAvg(this.chemnames[name])
                .subscribe(data => {
                    this.chem = data;
                    this.chems[name] = this.chem;
                  }, error => {
                    console.log('chemAvg.init err' + error);
                  },
                  () => console.log('chemAvg Complete'));
            }

          }, error => {
            console.log('productUPCDetail.init err' + error);
          },
          () => console.log('productUPCDetail Complete'));


    }

    //get in product detail by name : when upc has duplicate
    /* this.productSearchService.productDetail(this.navParams.get('name'))
     .subscribe(data => {
     console.log("get in product detail by name");
     this.product = data;
     this.chemnames = this.product.components.split(" ");

     for (let name in this.chemnames) {

     let temp = new Chem();
     temp.name = this.chemnames[name];
     this.chems.push(temp);

     this.chemSearchService.chemAvg(this.chemnames[name])
     .subscribe(data => {
     this.chem = data;
     this.chems[name] = this.chem;
     }, error => {
     console.log('chemAvg.init err' + error);
     },
     () => console.log('chemAvg Complete'));
     }

     }, error => {
     console.log('productDetail.init err' + error);
     },
     () => console.log('productDetail Complete'));*/

  }


  toChemDetail(event, name: string) {
    console.dir(this.chems);
    this.navCtrl.push(ChemDetail, {name: name})
  }

  toWiki(event, name: string) {
    console.dir(this.chems);
    let url = "https://ko.wikipedia.org/wiki/" + name;
    window.open(url)
  }


}
