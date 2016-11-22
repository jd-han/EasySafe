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

  /*pros: {name: string, boycott: string, totalSafety: string};
   chems: Array<{KOR: string, ENG: string, safety: string}>;*/

  product: Product;
  chem: Chem;
  chems: Array<Chem>;
  chemnames: Array<string>;


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
    this.chems = new Array();
    this.chem = new Chem();
  }

  ionViewDidLoad() {
    console.log('Hello ProductDetail Page');
  }

  ngOnInit() {

    this.productSearchService.productUPCDetail(this.navParams.get('upc'))
      .subscribe(data => {
          this.product = data;
          this.chemnames = this.product.components.split(", ");

          for (let name in this.chemnames) {

            var temp = new Chem();
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


  toChemDetail(event, name: string){
    this.navCtrl.push(ChemDetail, {name: name})
  }

}
