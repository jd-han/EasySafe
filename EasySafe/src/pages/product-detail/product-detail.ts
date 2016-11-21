import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Product} from "../../app/product";
import {ProductSearchService} from "../../providers/product-search-service";
import {ChemSearchService} from "../../providers/chem-search-service";
import {Chem} from "../../app/chem";

@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html'
})

export class ProductDetail {

  /*pros: {name: string, boycott: string, totalSafety: string};
   chems: Array<{KOR: string, ENG: string, safety: string}>;*/

  product: Product;
  chem: Chem;
  chems: Array<string>;
  chemnames: Array<string>;
  chemnames2: Array<string>;


  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private  productSearchService: ProductSearchService,
              private chemSearchService: ChemSearchService) {
    /*    this.pros = {name: "제품이름", boycott: "해당없음", totalSafety: "col_green.png"}
     this.chems = [
     {KOR: "한글명", ENG: "영문명", safety: "col_green.png"},
     {KOR: "한글명1", ENG: "영문명1", safety: "col_red.png"},
     {KOR: "한글명2", ENG: "영문명2", safety: "col_yellow.png"},
     {KOR: "한글명3", ENG: "영문명3", safety: "col_green.png"},
     {KOR: "한글명4", ENG: "영문명4", safety: "col_yellow.png"},
     ]*/
  }

  ionViewDidLoad() {
    console.log('Hello ProductDetail Page');
  }

  ngOnInit() {
    /*this.orderCall11(this.calling12());
    this.calling12();*/

    this.productSearchService.productUPCDetail(this.navParams.get('upc'))
      .subscribe(data => {
          this.product = data;
          this.chemnames = this.product.components.split(", ");

          console.dir(this.chemnames);

          for (let name in this.chemnames) {
            console.log(this.chemnames[name]);
            this.chemSearchService.chemAvg(this.chemnames[name])
              .subscribe(data => {
                  console.log("in sub in sub");
                  this.chem = data;
                  /*console.dir(this.chem);*/
                  this.chem.name = this.chemnames[name];
                console.log('this.chem.name : ' + this.chem.name);
                  this.chemnames2.push(this.chem.name);
                  this.chems.push(this.chem.name);
                  console.log('this.chems dir : ');
                  /*console.dir(this.chems)*/
                  console.log(this.chems[name]);
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

  /*orderCall11(callback) {
    console.log("start message");
    console.log("cherms is : "+this.chemnames);
    this.productSearchService.productUPCDetail(this.navParams.get('upc'))
      .subscribe(data => {
          this.product = data;
          this.chemnames = this.product.components.split(", ");
          console.log("correct sign");
          callback();
        }, error => {
          console.log('productUPCDetail.init err' + error);
        },
        () => console.log('productUPCDetail Complete2'));
    /!*console.log('productUPCDetail Complete2'));
    callback();*!/
  }

  calling12() {
    console.log("calling start");
    console.log("value check : "+this.chemnames[0]);
    for (let name in this.chemnames) {
      this.chemSearchService.chemAvg(this.chemnames[name])
        .subscribe(data => {
            this.chem = data;
            this.chem.name = this.chemnames[name];
            this.chems.push(this.chem);
          }, error => {
            console.log('productUPCDetail.init err' + error);
          },
          () => console.log('productUPCDetail Complete'));
    }
  }*/
}
/*    this.productSearchService.productUPCDetail(this.navParams.get('upc'))
 .subscribe(data => {
 this.product = data;
 this.chemnames = this.product.components.split(", ");
 }, error => {
 console.log('productUPCDetail.init err' + error);
 },
 () => console.log('productUPCDetail Complete'));

 for (let name in this.chemnames) {
 this.chemSearchService.chemAvg(name)
 .subscribe(data => {
 this.chem = data;
 this.chem.name = name;
 this.chems.push(this.chem);
 }, error => {
 console.log('productUPCDetail.init err' + error);
 },
 () => console.log('productUPCDetail Complete'));
 }*/
