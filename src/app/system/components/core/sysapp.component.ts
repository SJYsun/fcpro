import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParentComponent } from 'fccomponent';
import { SysappService } from '../../services/sysapp.service';
import { NzModalService } from 'ng-zorro-antd';
import { FCEVENT } from 'fccomponent/fc';
import { environment } from '../../../../environments/environment.prod';
@Component({
  selector: 'sysapp',
  template: `
  <fc-layoutcol fcSpans="2,9" style="height:100%;">
    <fc-layoutgroup fccontent1 fcTitle="请选择产品">
      <fc-list fccontent fcAppid="SYSPRODUCT" [fcOption]="{field:{FIELDCODE:'PNAME'}}" (fcEvent)="listEvent($event)"></fc-list>
    </fc-layoutgroup>
    <fc-layoutgroup style="height:100%;" fccontent2 fcTitle="元数据列表">    
      <fc-tlblist [fcAppid]="appId" (fcEvent)="tlblistEvent($event)"></fc-tlblist>
      <fc-layoutrow fcSpan="40" style="height:90%;" fccontent>
        <fc-searchlist  [fcAppid]="appId" fccontent1 (fcEvent)="searchlistEvent($event)"></fc-searchlist>
          <fc-listdata  fccontent2 style="height:100%;" [fcAppid]="appId" [fcOption]="fcListdataOptions" (fcEvent)="listdataEvent($event)" [fcCondition]="condition"></fc-listdata>
      </fc-layoutrow>
    </fc-layoutgroup>
  </fc-layoutcol>  
  `,
  styles: [`
 :host ::ng-deep .fc-layoutcol {
    height:100%;
  }
  :host ::ng-deep .fc-layoutgroup{
    height: calc(100% - 40px);    
  }
  :host ::ng-deep .fc-layoutgroup .fc-content {
    height:100%;
  }
  :host ::ng-deep .fc-layoutpanel .fc-content {
    height:100%;
  }
  .list-search {
    width:100%;
  }
  .list-search:after{
    content:'';
    display:block;
    clear:both;
  }
  .list-search-every{
    width:24%;
    float:left;
  }
  `]
})
export class SysappComponent extends ParentComponent {
  constructor(public mainService: SysappService,
    public router: Router,
    public activeRoute: ActivatedRoute, private modal: NzModalService) {
    super(mainService, router, activeRoute);
  }
  init(): void {
  }
  addNew(mainObj: any) {
  }
  getDefaultQuery(): any {
    return {};
  }
  beforeSave(): boolean {
    return true;
  }
  afterSave(): void {
  }
  beforeDelete(mainObj: any): boolean {
    return true;
  }
  afterDelete(): void {
  }
  beforeEdit(): boolean {
    return true;
  }
  afterEdit(mainObj: any): void {

  }
  /**
   * 
   */
  listEvent(event: FCEVENT) {
    switch (event.eventName) {
      case "select":
        if (this.searchObj.WHERE && this.searchObj.WHERE.length !== 0) {
          this.searchObj.WHERE += " and appid (select appid from sys_menu where pid='" + event.param.PID + "')";
        }else {
          this.searchObj.WHERE = " and appid (select appid from sys_menu where pid='" + event.param.PID + "')";
        }
        this.search();
        break;
    }
  }
  /**
   * 
   * @param eventName 事件名称
   * @param context 按钮内容
   */
  event(eventName: string, context: any): void {
    switch (eventName) {
      case 'modifyFields'://修改字段的英文名称为中文名称
        this.mainService.modifyAppFieldsName();
    }
  }
}
