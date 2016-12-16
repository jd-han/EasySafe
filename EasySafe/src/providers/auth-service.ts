import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {LoadingService} from "./loading-service";
import {Facebook} from "ionic-native";
import {Observable} from "rxjs";
import {Events} from "ionic-angular";

/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AuthService {

  // url: string = 'http://192.168.0.202:8000/appuser';
  private url: string;
  public isLogin: boolean; //로그인 확인용
  private token: any; // 토큰

  private profile: any = {}; // 정보 저장용 프로파일
  private headers: Headers;
  private options: RequestOptions;

  constructor(
    public http: Http,
    public loadingService: LoadingService,
    public events: Events,
  ) {
    // this.url = 'http://192.168.0.7:8000/appuser';
    this.url = 'http://www.easysafe.info/appuser';

    this.isLogin = false;
    this.token = null;

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    //this.headers.append('Access-Control-Allow-Origin', '*');

    this.options = new RequestOptions({method: "POST", headers: this.headers});
  }


  //로딩 페이지
  loadingPage(flag) {
    if (flag) {
      this.loadingService.loadingPage(true)
    }
    else {
      this.loadingService.loadingPage(false)
    }
  }

  idCheck(uid): Observable<any> {
    let body = JSON.stringify({uid: uid});
    return this.http.post(this.url + "/idCheck.do", body, this.options)
      .map(response => response.json())
  }

  mailCheck(mail): Observable<boolean> {
    let body = JSON.stringify({umail: mail});
    return this.http.post(this.url + "/mailCheck.do", body, this.options)
      .map(response => response.json())
  }


  register(user) {
    user.token = this.token;
    let body = JSON.stringify(user);
    // alert(body)
    return new Promise(resolve => {
      this.http.post(this.url + '/register.do', body, this.options)
        .subscribe(data => {
          if (data.json().token) {
            // alert(data.json().ourToken);
            this.storeUserId(data.json().uid);
            this.storeUserCredentials(data.json().token);
            this.events.publish('user:login');
            resolve(true);
          }
          else
            resolve(false);
        });
    });
  }


  login(user) {
    let body = JSON.stringify(user);
    return new Promise(resolve => {
      this.loadingPage(true);
      this.http.post(this.url + '/ourlogin.do', body, this.options)
        .subscribe(data => {
          console.log(data.json().token);
          if (data.json().token != null) {
            this.storeUserId(data.json().uid);
            this.storeUserCredentials(data.json().token);
            this.events.publish('user:login');
            this.loadingPage(false);
            resolve(true);
          }
          else {
            console.log('fail');
            this.loadingPage(false);
          }
          resolve(false);
        });
    });
  }


  //페이스북 로그인
  fbLogin() {
    return new Promise(resolve => {
      Facebook.login(['email']).then((response) => {
        // alert('Logged in');
        this.isLogin = true;
        this.profile.facebookToken = response.authResponse.accessToken;
        this.profile.facebookId = response.authResponse.userID; // 고유값이 온다.
        this.loadingPage(true);
        this.getFbDetails().then(() => this.register(this.profile)).then(() => {
          this.loadingPage(false);
          resolve(true)
        });
      }, (error) => {
        alert(error);
        this.isLogin = false;
        resolve(false);
      })
    });
  }

  //main / accessToken, userID
  //detail / name, gender, picture.data.url, email
  getFbDetails() {
    return new Promise(resolve => Facebook.getLoginStatus().then((response) => {
        if (response.status == 'connected') {
          Facebook.api('/' + response.authResponse.userID + '?fields=id,name,picture,email', []).then((response) => {
            this.profile.name = response.name;
            this.profile.pictureUrl = response.picture.data.url;
            this.profile.email = response.email;
            resolve(true);
            // this.adduser(this.profile).then(()=>resolve(true));
          }, (error) => {
            alert(error);
            resolve(false);
          })
        }
        else {
          alert('Not Logged in');
        }
      })
    )
  }

  fbLogout() {
    Facebook.logout().then((response) => {
      alert(JSON.stringify(response));
      this.profile = null;
      this.isLogin = false;
    }, (error) => {
      alert(error);
    })
  }

  //email, idToken, displayName, familyName, givenName, imageUrl, userId
  googleLogin() {
    return new Promise(resolve => {
      window['plugins'].googleplus.login(
        {
          'scopes': 'profile email',
          'webClientId': '732598159522-9e3s7r17n46v9k4v5c10fs7glbstmf81.apps.googleusercontent.com',
          'offline': true,
        },
        function (obj) {
          alert(JSON.stringify(this.profile));
          // alert(JSON.stringify(obj)); // do something useful instead of alerting
          this.profile.name = obj.displayName;
          this.profile.pictureUrl = obj.imageUrl;
          this.profile.email = obj.email;
          this.profile.googleToken = obj.idToken;
          this.profile.googleId = obj.userId; // 진짜 아이디가 아니고 숫자가 온다.
          this.isLogin = true;
          this.adduser(this.profile).then(() => resolve());
        },
        function (msg) {
          alert('error: ' + msg);
          this.isLogin = false;
        }
      );
    })
  }

  googleLogout() {
    window['plugins'].googleplus.logout(
      function (msg) {
        alert(msg); // do something useful instead of alerting
        this.isLogin = false;
      }
    );
  }

  storeUserId(uid) {
    window.localStorage.setItem("uid", uid);
  }

  storeUserCredentials(token) {
    window.localStorage.setItem("token", token);
    this.useCredentials(token);
  }

  useCredentials(token) {
    this.isLogin = true;
    this.token = token;
  }

  loadUserCredentials() {
    let token = window.localStorage.getItem("token");
    if (token) this.useCredentials(token);
  }


  destroyUserCredentials() {
    this.isLogin = false;
    this.token = null;
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('uid');
    console.log("window.localStorage.removeItem('uid') : " + window.localStorage.getItem('uid'));
    /*
     console.log("this.isLogin : "+ this.isLogin );
     console.log("this.token : "+ this.token);
     console.log("window.localStorage.getItem('token') : "+ window.localStorage.getItem('token'));

     this.isLogin : false
     this.token : null
     window.localStorage.getItem('token') : null
     */
  }


//토큰으로 로그인하기
  getUserByToken() {
    return new Promise(resolve => {
      this.loadUserCredentials();
      let body = JSON.stringify({token: this.token});
      this.http.post(this.url + '/getUserByToken.do', body, this.options)
        .subscribe(data => {
          if (data.json().token == null)
            resolve(false);
          else {
            resolve(data.json());
          }

        });
    })
  }

  logout() {
    this.destroyUserCredentials();
    this.events.publish('user:logout');
  }


  sendMail(email: string) {
    console.log(JSON.stringify(email));
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    let options = new RequestOptions({headers: headers});
    this.http.post(this.url + "/app/member/findPass", JSON.stringify(email), options)
      .map((res: Response) => res.json()).subscribe(
      data => {
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('접니다')
      });


  }

  authenticated() {
    return this.isLogin
  }


}
