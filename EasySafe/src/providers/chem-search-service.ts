import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from "rxjs";

/*
  Generated class for the ChemSearchService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChemSearchService {
  private baseUrl: string;
  private headers: Headers;
  constructor(public http: Http) {
    console.log('Hello ChemSearchService Provider');
    this.baseUrl = 'http://192.168.0.202:8000/';
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  searchChem(term: string): Observable<any>{
    return this.http
      .get(this.baseUrl + 'searchChem?key='+ term)
      .map(response => response.json())
  }

  chemDetail(term: string): Observable<any>{
    return this.http
      .get(this.baseUrl + 'chemDetail?name=' + term)
      .map(response => response.json())
  }

}
