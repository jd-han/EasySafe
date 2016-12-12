import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs";

/*
  Generated class for the ChemSearchService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChemSearchService {
  private baseUrl: string;
/*  private headers: Headers;*/
  constructor(public http: Http) {
    console.log('Hello ChemSearchService Provider');
    // this.baseUrl = 'http://192.168.0.7:8000/app/';
    this.baseUrl = 'http://www.easysafe.info/app/';
 /*   this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');*/
  }

  searchChem(term: string): Observable<any>{
    return this.http
      .get(this.baseUrl + 'searchChem.do?key='+ term)
      .map(response => response.json())
  }

  chemDetail(term: string): Observable<any>{
    return this.http
      .get(this.baseUrl + 'chemDetail.do?name=' + term)
      .map(response => response.json())
  }

  chemAvg(term: string): Observable<any>{
    return this.http
      .get(this.baseUrl + 'getAvg.do?korkey=' + term)
      .map(response => response.json())
  }

}
