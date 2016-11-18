import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {CameraPage} from "../pages/camera/camera";
import {HistoryPage} from "../pages/history/history";
import {NoticePage} from "../pages/notice/notice";
import {SearchList} from "../pages/search-list/search-list";
import {ChemDetail} from "../pages/chem-detail/chem-detail";
import {ProductDetail} from "../pages/product-detail/product-detail";
import {ChemSearchService} from "../providers/chem-search-service";
import {ProductSearchService} from "../providers/prod-search-service";
import {CommonService} from "../providers/hideTab-service";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    CameraPage,
    HistoryPage,
    NoticePage,
    SearchList,
    ChemDetail,
    AboutPage,
    ContactPage,
    ProductDetail
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    CameraPage,
    HistoryPage,
    NoticePage,
    SearchList,
    ChemDetail,
    AboutPage,
    ContactPage,
    ProductDetail
  ],
  providers: [ChemSearchService, CommonService, ProductSearchService]
})
export class AppModule {}
