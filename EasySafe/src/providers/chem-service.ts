import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Chem} from "../app/chem";

/*
  Generated class for the ChemService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChemService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private chemUrl = 'http://192.168.0.202:8000/';

  constructor(public http: Http) {
    console.log('Hello ChemService Provider');
  }
}
