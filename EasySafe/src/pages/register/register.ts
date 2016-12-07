import {Component} from '@angular/core';
import {
  NavController, AlertController, ViewController,
  ToastController
} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {AuthService} from "../../providers/auth-service";
import {ValidationService} from "../../providers/validation-service";

/*
 Generated class for the Register page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  registerForm: FormGroup; // 폼 객체

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public viewCtrl: ViewController) {

    /*this.registerForm = this.formBuilder.group({
     'id': ['', Validators.compose([Validators.maxLength(30), Validators.minLength(6), Validators.pattern('[a-zA-Z]*'), Validators.required])],
     'name': ['', Validators.required],
     'email': ['', Validators.compose([Validators.pattern(''), Validators.required])],
     'userpwd': ['', Validators.compose([Validators.minLength(8), Validators.required, ValidationService.passwordValidator])],
     'userpwdchk': ['', [Validators.required]],
     }, {validator: RegisterPage.passwordsMatch});*/


    this.registerForm = new FormGroup({
      uid: new FormControl('', [Validators.maxLength(30), Validators.minLength(6), Validators.pattern('[a-zA-Z ]*'), Validators.required]),
      uname: new FormControl('', [Validators.maxLength(30), Validators.minLength(6), Validators.required]),
      umail: new FormControl('', [Validators.maxLength(30), Validators.minLength(6), ValidationService.emailValidator, Validators.required]),
      upw: new FormControl('', [Validators.maxLength(30), Validators.required, ValidationService.passwordValidator]),
      upwchk: new FormControl('', [Validators.maxLength(30), Validators.minLength(6), Validators.required])
    }, RegisterPage.passwordsMatch);


    /*    this.registerForm.controls['email'].statusChanges
     .subscribe(
     data => {
     if (data == 'VALID') {
     this.emailValid = true;
     } else {
     this.emailValid = false;
     }
     });
     */
  }


  ionViewDidLoad() {
    console.log('Hello Register Page');
  }

  //벨리데이션용 패스워드 체크
  static passwordsMatch(fg: FormGroup): {[err: string]: any} {
    let pwd1 = fg.controls['upw'];
    let pwd2 = fg.controls['upwchk'];
    let rv: any = {};
    if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
      rv.passwordMismatch = true;
    }

    return rv;
  }


  //true 이면 존재하는 아이디
  idFlag: boolean = false;

  idCheck() {
    this.authService.idCheck(this.registerForm.controls['uid'].value)
      .subscribe(
        data => {
          console.log("register idCheck : " + data);
          console.dir(this.idFlag);
         this.idFlag = data;
          console.log("after this.idFlag = data : this.idFlag is " + this.idFlag);
          console.dir(this.idFlag);
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('idCheck');
          this.showIdAlert();
        })
  }

  //아이디 중복체크 확인창
  showIdAlert() {
    let confirm = this.alertCtrl.create({
      title: '이메일 중복 체크',
      message: this.idFlag ? '존재하는 아이디입니다' : '사용 가능한 아이디입니다.',
      cssClass: 'alertCheck',
      buttons: [
        {
          text: '확인',
          handler: () => {
            console.log(this.idFlag);
          }
        }
      ]
    });
    confirm.present();
  }

  mailFlag : boolean = false;

  mailCheck() {
    this.authService.mailCheck(this.registerForm.controls['umail'].value)
      .subscribe(
        data => {
          console.log("register idCheck : " + data);
          console.dir(this.mailFlag);
          this.mailFlag = data;
          console.log("after this.idFlag = data : this.idFlag is " + this.mailFlag);
          console.dir(this.mailFlag);
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('mailFlag');
          this.showMailAlert();
        })
  }


  showMailAlert() {
    let confirm = this.alertCtrl.create({
      title: '이메일 중복 체크',
      message: this.mailFlag ? '존재하는 메일입니다' : '사용 가능한 메일입니다.',
      cssClass: 'alertCheck',
      buttons: [
        {
          text: '확인',
          handler: () => {
            console.log(this.mailFlag);
          }
        }
      ]
    });
    confirm.present();
  }


  register(fromgroup: FormGroup) {
    let user = {
      uid: fromgroup.controls['uid'].value,
      uname: fromgroup.controls['uname'].value,
      umail: fromgroup.controls['umail'].value,
      upw: fromgroup.controls['upw'].value
    };

    this.authService.register(user).then(() => {
        this.navCtrl.popToRoot().then(() => {
            let toast = this.toastCtrl.create({
              message: 'Thanks to registration. For now , you are able use MyPage and about personal stuff',
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

  //모달 닫는창
  dismiss() {
    this.viewCtrl.dismiss();
  }


}
