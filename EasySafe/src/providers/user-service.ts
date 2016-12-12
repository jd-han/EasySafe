import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Events} from "ionic-angular";

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {

  private baseUrl: string ;
  private headers : Headers;
  private options: RequestOptions;

  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public http: Http,
    public events: Events,
  ) {
    // this.url = 'http://192.168.0.7:8000/appuser';
    this.baseUrl = 'http://www.easysafe.info/appuser';

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    this.options  = new RequestOptions({method : "POST", headers: this.headers});

    console.log('Hello UserService Provider');
  }

/*
  검색 키워드를 서버에 보내어 검색로그를 만든다.
  post는 .subscribe를 하지 않으면 신호를 보내지 않는다. 그러므로 함
  그러나 리턴값이 없어 오류가 남.
  */
  searchLogInput(term){
    let uid = window.localStorage.getItem("uid");
    console.log("in UserService this.uid : " + uid);
    let body = JSON.stringify({user: uid, keyword: term});
    this.http.post(this.baseUrl + '/searchLogInput.do', body, this.options)
      .map(response => response.json())
      .subscribe();
    //this.http.get(this.url + '/searchLogInput.do');
  }

/*
* 마이 히스토리에서 자신이 검색한 것들을 가져오기
*
* */
  getSearchLog(): Observable<any>{
    let uid = window.localStorage.getItem("uid");
    console.log("in UserService this.uid : " + uid);
    let body = JSON.stringify({user: uid});
    console.dir(body);
    return this.http.post(this.baseUrl + '/searchLogOutput.do', body, this.options)
      .map(response => response.json())
  }

  checkHasSeenTutorial() {
    return window.localStorage.getItem("HAS_SEEN_TUTORIAL")
  }

}
