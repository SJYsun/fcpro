/* 	元数据 */
import { Injectable } from '@angular/core';
import { ParentService, ProvidersService, SysappfieldsService } from 'fccore';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class SysappService extends ParentService {
  constructor(public providers: ProvidersService,public sysappFielsService:SysappfieldsService) {
    super(providers, "SYSAPP");
  }
  modifyAppFieldsName() {
    let ob = this.providers.daoService.getFromApi(this.getResourceUrl("modifyFieldsName"), {});
    ob.subscribe(result => {
      if (result.CODE === '0') {
        this.providers.logService.debug(result);
        (result.DATA[0]);
      } else {
        this.providers.logService.error(result.MSG);
      }
    });
  }
}
