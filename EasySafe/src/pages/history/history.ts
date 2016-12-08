import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {AuthService} from "../../providers/auth-service";
import {UserService} from "../../providers/user-service";
import {SearchList} from "../search-list/search-list";

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {

  user: any;
  history : any;

  constructor(public navCtrl: NavController,
              private authService: AuthService,
              private userService: UserService,
              private alertCtrl: AlertController) {

    this.user = null;
    this.history = null;

    this.navCtrl = navCtrl;
    this.authService.getUserByToken().then(
      data => {
        this.user = data;
        console.log('this.authService.getUserByToken() : ');
        console.dir(data);
        console.dir(this.user);
      });
    this.userService.getSearchLog()
      .subscribe(data =>{
        console.log("get data");
        console.dir(data);
        this.history = data;
        console.log("get data to history");
        console.dir(this.history);
      })
  }

  ionViewDidLoad() {
    console.log('Hello History Page');

    console.log(this.user);
  }

  toSearchList(term:string){
    this.navCtrl.push(SearchList, { name : term});
  }

}


