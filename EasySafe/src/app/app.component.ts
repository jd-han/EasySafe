import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { CommonService } from '../providers/hideTab-service';

import { TabsPage } from '../pages/tabs/tabs';
import {NoticePage} from "../pages/notice/notice";
import {ContactPage} from "../pages/contact/contact";
import {AboutPage} from "../pages/about/about";
import {CameraPage} from "../pages/camera/camera";
import {ProductDetail} from "../pages/product-detail/product-detail";


@Component({
  templateUrl: `app.html`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private  menu: MenuController,
    private commonService:CommonService
  ) {
    this.initializeApp();
    this.menu = menu;
    this.rootPage = TabsPage;
    this.pages = [
      { title: 'Notice', component: NoticePage },
      { title: 'Contact', component: ContactPage },
      { title: 'About', component: AboutPage },
      { title: 'Camera', component: CameraPage },
      { title: '상품정보(임시)', component: ProductDetail },
    ]
    this.commonService.hideFooter.subscribe(any =>{
      this.hideFooterTab()
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  hideFooterTab(){
    if(document.getElementsByClassName("show-tabbar")[0].classList.contains("hide-tabbar"))
    {
      document.getElementsByClassName("show-tabbar")[0].classList.remove("hide-tabbar");
    }
    else
    {
      document.getElementsByClassName("show-tabbar")[0].classList.add("hide-tabbar");
    }

    /*alert("dkfjlkdsfs");
    if(document.getElementById("footerTab").classList.contains("show-tabbar"))
    {
      document.getElementById("footerTab").classList.remove("show-tabbar");
    }else{
      document.getElementById("footerTab").classList.add("show-tabbar");
    }*/
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    //this.nav.setRoot(page.component);
    this.nav.push(page.component);
  }
}
