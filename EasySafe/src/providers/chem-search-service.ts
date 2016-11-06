import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable, BehaviorSubject} from "rxjs";
import {Chem} from "../app/chem";

/*
  Generated class for the ChemSearchService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChemSearchService {
  private baseUrl: string;
  private dataStore:{ chems: Chem[]};
  private _chems: BehaviorSubject<Chem[]>;
  chems: Observable<Chem[]>;

  constructor(public http: Http) {
    console.log('Hello ChemSearchService Provider');
    this.baseUrl = 'http://192.168.0.202:8000/';
    this.dataStore = { chems:[] };
    this._chems = <BehaviorSubject<Chem[]>>new BehaviorSubject([]);
    this.chems = this._chems.asObservable();
  }

  search(term: string)/*: Observable<Chem[]>*/ {
    return this.http
      .get(this.baseUrl + 'searchChem?key='+ term)
      .map(response => response.json())
      .subscribe(data => {
        this.dataStore.chems = data;
        this._chems.next(Object.assign({}, this.dataStore).chems);
      },error => console.log('Could not load chems'));
  }

  chemDetail(term: string) {
    return this.http
      .get(this.baseUrl + 'chemDetail?name=' + term)
      .map(response => response.json())
      .subscribe(data => {
        this.dataStore.chems = data;
        this._chems.next(Object.assign({}, this.dataStore).chems);
      },error => console.log('Could not find chem') );
  }

}
