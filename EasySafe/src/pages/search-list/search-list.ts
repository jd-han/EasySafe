import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Chem} from "../../app/chem";
import {ChemDetail} from "../chem-detail/chem-detail";
import {ChemSearchService} from "../../providers/chem-search-service";
import {ProductSearchService} from "../../providers/product-search-service";
import {Product} from "../../app/product";
import {ProductDetail} from "../product-detail/product-detail";
import {UserService} from "../../providers/user-service";


@Component({
  selector: 'page-search-list',
  templateUrl: 'search-list.html'
})
export class SearchList {
  chems: Array<Chem>;
  products: Array<Product>;


  constructor(public navCtrl: NavController,
              private chemSearchService: ChemSearchService,
              private navParams: NavParams,
              private productSearchService: ProductSearchService,
              private userService: UserService,) {
  }

  ionViewDidLoad() {
    console.log('Hello SearchList Page');
  }

  ngOnInit() {

    this.search(this.navParams.get('name'));
  }

  search(term: string) {
    this.chems = new Array<Chem>();
    this.products = new Array<Product>();
    //검색로그 작성
    this.userService.searchLogInput(term);

    this.chemSearchService.searchChem(term)
      .subscribe(data => {
          this.chems = data;
        }, error => {
          console.log('searchList search error' + error);
        },
        () => console.log('searchlist searchChem complete'));

    this.productSearchService.searchProduct(term)
      .subscribe(data => {
          if (data.length == 0) {
            return
          }
          this.products = data;
        }, error => {
          console.log('searchList product error' + error);
        },
        () => console.log('searchlist searchProduct complete'));

    this.productSearchService.productListByUPC(term)
      .subscribe(data => {
          if (data.length == 0) {
            return
          }
          this.products = data;
        }, error => {
          console.log('searchList productListByUPC error' + error);
        },
        () => console.log('searchlist searchto productListByUPC complete'));
  }

  chemdetail(event, name: string) {
    console.log('Detail' + name);
    this.navCtrl.push(ChemDetail, {name: name});
  }

  productdetail(product: Product) {
    this.navCtrl.push(ProductDetail, {product: product});
  }

}
