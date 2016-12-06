import { Component } from '@angular/core';
import {
  NavController, AlertController, ToastController,
  ViewController
} from 'ionic-angular';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../providers/auth-service";
import {ValidationService} from "../../providers/validation-service";
import {RegisterPage} from "../register/register";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm : FormGroup;

  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController
  ) {
    this.loginForm = new FormGroup({
      uid: new FormControl('', [Validators.maxLength(30), Validators.minLength(6), Validators.pattern('[a-zA-Z ]*'), Validators.required]),
      upw: new FormControl('', [Validators.maxLength(30), Validators.required, ValidationService.passwordValidator]),
    });
  }

  ionViewDidLoad() {
    console.log('Hello Login Page');
  }

  login(fromgroup: FormGroup) {
    let user = {
      uid: fromgroup.controls['uid'].value,
      upw: fromgroup.controls['upw'].value
    };

    this.authService.login(user).then(() => {
        this.navCtrl.popToRoot().then(() => {
            let toast = this.toastCtrl.create({
              message: 'Login complete',
              duration: 2000,
              position: 'middle'
            });
            toast.onDidDismiss(() => {
            });
            toast.present();
          }
        );
      }
    );
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  toRegister() {
    console.log('to registerPage');
    this.navCtrl.push(RegisterPage);
  }

}
