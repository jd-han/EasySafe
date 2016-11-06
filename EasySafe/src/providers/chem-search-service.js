"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var rxjs_1 = require("rxjs");
/*
  Generated class for the ChemSearchService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var ChemSearchService = (function () {
    function ChemSearchService(http) {
        this.http = http;
        console.log('Hello ChemSearchService Provider');
        this.baseUrl = 'http://192.168.0.202:8000/';
        this.dataStore = { chems: [] };
        this._chems = new rxjs_1.BehaviorSubject([]);
        this.chems = this._chems.asObservable();
    }
    ChemSearchService.prototype.search = function (term) {
        var _this = this;
        return this.http
            .get(this.baseUrl + 'searchChem?key=' + term)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            _this.dataStore.chems = data;
            (_a = _this._chems).next.apply(_a, _this.dataStore).chems;
            var _a;
        });
    };
    ChemSearchService.prototype.log = ;
    ;
    ChemSearchService = __decorate([
        core_1.Injectable()
    ], ChemSearchService);
    return ChemSearchService;
}());
exports.ChemSearchService = ChemSearchService;
//# sourceMappingURL=chem-search-service.js.map