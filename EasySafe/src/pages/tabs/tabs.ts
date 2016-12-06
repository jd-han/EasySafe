import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {BarcodeScanner} from "ionic-native";
import {ProductDetail} from "../product-detail/product-detail";
import {ProductSearchService} from "../../providers/product-search-service";
import {Product} from "../../app/product";
import {SearchList} from "../search-list/search-list";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  productList : Array<Product>;
  constructor(
    public navCtrl: NavController,
    private productSearchService : ProductSearchService
  ) {

  }

  upc(){
    BarcodeScanner.scan().then((barcodeData) => {
      this.productSearchService.productListByUPC(barcodeData.text)
        .subscribe(data =>{
           this.productList = data;
            if(this.productList.length==1){
              this.navCtrl.push(ProductDetail, {upc : barcodeData.text});
            }else{
              this.navCtrl.push(SearchList, {name : barcodeData.text})
            }
        });
    }, (err) => {
      console.log(err)
    });
  }

  vuforia(){
    let toto = this.navCtrl;
    let options = {
      databaseXmlFile: 'EasySafeDB.xml',
      targetList: [ '9331275008295'],
      overlayMessage: 'Point your camera at a test image...',
      vuforiaLicense: 'AXhAIjP/////AAAAGbGdAwASJEOlivCYAePV5zU1vuEbKocFm1Lp8bS2AU7bnuDelsR56r3etiS1xxLd8kXt/gzMSCBMcWun6ZpCNwKAE62q0RO4hqBfkPYUXkBBdn1M5f/IzyoDkg8difllrYxDaebJrDonJOLG2KNntuKaJju0GKc9WUWZUtZ/OFzuRKlg7l22dZh8NT8+q0DGV58c3Jb6IsPP+xYuOpdejpRP0jx/TwYupd+z9Zar/tZjbBQvd/moIwARlm5u14uf9DrmIj3dGs8WUWRZwn64H3ZckkBHM+0v2XEcCFKoRoDrBz08NpWINM3c5g9reOIifGHPYUhjk0LjqvOWlrAamBSBWa3BNVo5+AYehv1MZxGs'
    };

    (<any>window).navigator.VuforiaPlugin.startVuforia(
      options,
      function(data) {
        // To see exactly what `data` can return, see 'Success callback `data` API' within the plugin's documentation.
        console.log(data);

        if(data.status.imageFound) {
          //toto.push(ProductDetail, {upc : data.result.imageName});
          this.productSearchService.productListByUPC(data.result.imageName)
            .subscribe(data =>{
              this.productList = data;
              if(this.productList.length==1){
                this.navCtrl.push(ProductDetail, {upc : data.result.imageName});
              }else{
                this.navCtrl.push(SearchList, {name : data.result.imageName})
              }
            });
        }
        else if (data.status.manuallyClosed) {
          alert("User manually closed Vuforia by pressing back!");
        }
      },
      function(data) {
        alert("Error: " + data);
      }
    );
  }
}
