import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav, Events} from 'ionic-angular';
import {StatusBar, Splashscreen, Keyboard} from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import {NoticeListPage} from "../pages/notice-list/notice-list";
import {LoginPage} from "../pages/login/login";
import {HistoryPage} from "../pages/history/history";
import {AuthService} from "../providers/auth-service";
import {RegisterPage} from "../pages/register/register";
import {UserService} from "../providers/user-service";

export interface PageInterface {
  title: string;
  component: any;
  icon?: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: `app.html`
})
export class MyApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  loggedInPages: PageInterface[] = [
    { title: 'Notice', component: NoticeListPage},
    { title: 'History', component: HistoryPage }
  ];

  loggedOutPages: PageInterface[] = [
    { title: 'Notice', component: NoticeListPage },
    { title: 'Signup', component: RegisterPage, icon: 'person-add' }
  ];

  // pages: Array<{title: string, component: any}>;

  constructor(
    public events: Events,
    private platform: Platform,
    private  menu: MenuController,
    private  authService: AuthService,
    private  userService: UserService,
  ) {

    this.initializeApp();
    this.menu = menu;
    this.rootPage = TabsPage;
/*
    this.pages = [
      { title: 'Notice', component: NoticePage },
      { title: 'History', component: HistoryPage },
      { title: 'login', component: LoginPage }
    ];
*/

    platform.ready().then(() => {
      Keyboard.onKeyboardShow().subscribe(() => {
        document.body.classList.add('keyboard-is-open');
      });

      Keyboard.onKeyboardHide().subscribe(() => {
        document.body.classList.remove('keyboard-is-open');
      });
    });

    this.listenToLoginEvents();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }




  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    //this.nav.setRoot(page.component);
    this.nav.push(page.component);
  }

/*

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });

    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }
*/

  toLoginPage() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    //this.nav.setRoot(page.component);
    this.nav.push(LoginPage);
  }

  toLogout(){
    this.menu.close();

    setTimeout(() => {
      this.authService.logout();
    }, 1000);

  }


/*
  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }
  */

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }


}
