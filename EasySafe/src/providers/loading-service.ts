import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {LoadingController} from "ionic-angular";

/*
  Generated class for the LoadingService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoadingService {

  loading : any;
  constructor(public loadingCtrl: LoadingController ) {
  }
  loadingPage(flag) {
    if (flag) { this.loading = this.loadingCtrl.create({content: 'Please wait...'}); this.loading.present(); }
    else { this.loading.dismiss() }
  }

}
