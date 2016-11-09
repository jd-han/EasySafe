import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import {NoticePage} from "../pages/notice/notice";
import {ContactPage} from "../pages/contact/contact";
import {AboutPage} from "../pages/about/about";


@Component({
  templateUrl: `app.html`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private  menu: MenuController
  ) {
    this.initializeApp();
    this.menu = menu;
    this.rootPage = TabsPage;
    this.pages = [
      { title: 'Notice', component: NoticePage },
      { title: 'Contact', component: ContactPage },
      { title: 'About', component: AboutPage },
    ]

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
