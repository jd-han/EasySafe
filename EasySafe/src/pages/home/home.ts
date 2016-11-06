import {Component, OnInit} from '@angular/core';

import { NavController } from 'ionic-angular';
import {Observable, Subject} from "rxjs";
import {Chem} from "../../app/chem";
import {ChemSearchService} from "../../providers/chem-search-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  chems: Observable<Chem[]>;
  private searchTerms = new Subject<string>();

  constructor(
    public navCtrl: NavController,
    private chemSearchService: ChemSearchService
  ) {}

  ngOnInit(){
    this.chems = this.chemSearchService.chems;
  }

/*  ngOnInit(){
    this.chems = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
      ? this.chemSearchService.search(term) : Observable.of<Chem[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Chem[]>([]);
        }

      );
  }*/

  search(term: string){
    /*this.searchTerms.next(term);*/
    this.chemSearchService.search(term);
    console.log('search works!');
  }

  gotoDetail(chem: Chem){
    let link = ['/detail', chem.name];
  }

}
