"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/*
  Generated class for the SearchList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SearchList = (function () {
    function SearchList(navCtrl) {
        this.navCtrl = navCtrl;
    }
    SearchList.prototype.ionViewDidLoad = function () {
        console.log('Hello SearchList Page');
    };
    SearchList = __decorate([
        core_1.Component({
            selector: 'page-search-list',
            templateUrl: 'search-list.html'
        })
    ], SearchList);
    return SearchList;
}());
exports.SearchList = SearchList;
//# sourceMappingURL=search-list.js.map