import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {SearchList} from "../search-list/search-list";
import { CommonService } from '../../providers/hideTab-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  notice = ['공지사항', '공지사항2', '공지사항3'];
  issue = ['이슈사건들', '또다른이슈', '전혀다른이슈'];
  experts = ['이달의 전문가', '이제는전문가', '내일은전문가'];

  slideOptions={
    autoplay: 2000,
    direction: 'vertical',
    loop: true,
    speed: 1000
  };

  constructor(public navCtrl: NavController, private commonService:CommonService) {

  }

  homeSearch(event, term:string){
    this.navCtrl.push(SearchList, { name : term});
  }

  hideTab(){
    // 입력창에 터치했을때 키보드 화면이 뜨는 이벤트
    this.commonService.callHideTab()
  }
}
