import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
/*
  Generated class for the Camera page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Camera Page');
  };

  Test(){
    BarcodeScanner.scan().then((barcodeData) => {
      alert(barcodeData.text + "/n"+
      "Format : " + barcodeData.format);
    }, (err) => {
      console.log(err)
    });
  }
}
