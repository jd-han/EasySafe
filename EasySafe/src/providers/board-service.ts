import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

/*
  Generated class for the BoardService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BoardService {

  private baseUrl: string;

  constructor(public http: Http) {
    console.log('Hello BoardService Provider');
    // this.baseUrl = 'http://192.168.0.7:8000/app';
    this.baseUrl = 'http://www.easysafe.info/app';
  }

  getNoticeBoardList(no) : Observable<any>{
    return this.http
      .get(this.baseUrl + '/list.do?no=' + no)
      .map(response => response.json())
  }

}
