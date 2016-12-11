import { Component } from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {BoardService} from "../../providers/board-service";
import {NoticeModalPage} from "../notice-modal-page/notice-modal-page";
import {Notice} from "../../app/notice";

/*
  Generated class for the Notice page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notice',
  templateUrl: 'notice-list.html'
})
export class NoticeListPage {

  noticeList : Array<Notice>;
  private start:number=0;
  loadready : boolean;

  constructor(
    public navCtrl: NavController,
    private boardService : BoardService,
    private modalCtrl : ModalController
  ) {
    this.loadready = false;
    this.noticeList = new Array<Notice>();
    this.boardService.getNoticeBoardList(this.start)
      .subscribe(data =>{
        this.start +=10 ;
        console.log("in notice-list");
        this.noticeList=data;
        console.dir(this.noticeList);
        this.loadready = true;
      });
  }

  ionViewDidLoad() {
    console.log('Hello Notice Page');
  }

  getNotice(){
    if(this.loadready){
      this.loadready = false;
      this.boardService.getNoticeBoardList(this.start)
        .subscribe(data =>{
          this.start +=10;
          console.log("in notice-list");

          this.noticeList = this.noticeList.concat(data);
          console.dir(data);
          console.log("after concat : this.noticeList");
          console.dir(this.noticeList);
          this.loadready=true;
        })
    }
  }

  openModal(notice){
    let modal = this.modalCtrl.create(NoticeModalPage, {notice:notice});
    modal.present();
  }


  doInfinite(infiniteScroll) {
    console.log('Begin async operation');


    setTimeout(() => {
      this.getNotice();

      console.log('Async operation has ended');
      console.dir(this.noticeList);
      infiniteScroll.complete();
    }, 1000);

  }



}


