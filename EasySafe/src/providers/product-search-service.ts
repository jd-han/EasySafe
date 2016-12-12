import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

/*
  Generated class for the ProductSearchService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductSearchService {

  private baseUrl: string;
/*  private headers: Headers;*/

  constructor(public http: Http) {
    console.log('Hello ProductSearchService Provider');
    //this.baseUrl = 'http://192.168.0.202:8000/app/';
    // this.baseUrl = 'http://192.168.0.7:8000/app/';
    this.baseUrl = 'http://www.easysafe.info/app/';
   /* this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');*/
  }

  searchProduct(term: string): Observable<any>{
    return this.http
      .get(this.baseUrl + 'searchProduct.do?key='+term )
      .map(response => response.json())
  }

  productDetail(term: string): Observable<any>{
    return this.http
      .get(this.baseUrl + 'productDetail.do?name=' + term)
      .map(response => response.json())
  }

  productListByUPC(term: string): Observable<any>{
    return this.http
      .get(this.baseUrl + 'productListSelectByUpc.do?upc=' + term)
      .map(response => response.json())
  }
  productUPCDetail(term: string): Observable<any>{
    return this.http
      .get(this.baseUrl + 'productDetailWUpc.do?upc=' + term)
      .map(response => response.json())
  }

  ProductWCompo(term: string): Observable<any>{
    return this.http
      .get(this.baseUrl + 'getProductWCompo.do?compo=' + term)
      .map(response => response.json())
  }
}
