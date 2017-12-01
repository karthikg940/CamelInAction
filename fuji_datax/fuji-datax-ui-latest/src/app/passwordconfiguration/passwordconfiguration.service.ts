import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {AbstractService} from '../app.abstract.service';
import {EndPoint} from '../app.endpoints';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PasswordConfigurationService extends AbstractService{

  constructor (private http: Http, private endPoint:EndPoint) {
      super();
  }

  savePasswordConfigPolicy(policyData){
    const url = this.endPoint.savePasswordPolicyUrl();
    return this.http.post(url,policyData)
    // ...and calling .json() on the response to return data
    .map((res:Response) => {
      const location: string = res.headers.get('Location');
      if(location) {
        const frag:string[] = location.split("/");
        return frag[frag.length-1];
      }
    })
    //...errors if any
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  getPasswordConfigPolicy(){
    const url = this.endPoint.savePasswordPolicyUrl();
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
      return res.json();
    })
    //...errors if any
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  updatePasswordConfigPolicy(value,orgLoginPolicyId){
    const url = this.endPoint.updatePwdPolicyUrl()+"/"+parseInt(orgLoginPolicyId)+"/passwordpolicy";
    return this.http.put(url,value)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
      return res;
    })
    //...errors if any
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}
