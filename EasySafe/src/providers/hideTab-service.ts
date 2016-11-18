import {Component, OnInit, Output, EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class CommonService{
  public hideFooter:EventEmitter<any>;
  constructor(){
    this.hideFooter = new EventEmitter();
  }

  callHideTab(){
    this.hideFooter.emit();
  }
}
