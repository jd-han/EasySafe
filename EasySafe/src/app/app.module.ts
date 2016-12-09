import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {CameraPage} from "../pages/camera/camera";
import {HistoryPage} from "../pages/history/history";
import {NoticeListPage} from "../pages/notice-list/notice-list";
import {SearchList} from "../pages/search-list/search-list";
import {ChemDetail} from "../pages/chem-detail/chem-detail";
import {ProductDetail} from "../pages/product-detail/product-detail";
import {ChemSearchService} from "../providers/chem-search-service";
import {ProductSearchService} from "../providers/product-search-service";
import {AuthService} from "../providers/auth-service";
import {LoadingService} from "../providers/loading-service";
import {RegisterPage} from "../pages/register/register";
import {ControlMessages} from "../providers/control-messages";
import {ValidationService} from "../providers/validation-service";
import {LoginPage} from "../pages/login/login";
import {UserService} from "../providers/user-service";
import {BoardService} from "../providers/board-service";
import {NoticeModalPage} from "../pages/notice-modal-page/notice-modal-page";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    CameraPage,
    HistoryPage,
    NoticeListPage,
    SearchList,
    ChemDetail,
    ProductDetail,
    RegisterPage,
    ControlMessages,
    LoginPage,
    NoticeModalPage
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
    NoticeListPage,
    SearchList,
    ChemDetail,
    ProductDetail,
    RegisterPage,
    ControlMessages,
    LoginPage,
    NoticeModalPage
  ],
  providers: [ChemSearchService, ProductSearchService, AuthService, LoadingService, ControlMessages, ValidationService, UserService, BoardService]
})
export class AppModule {}
