import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AbstractService} from '../app.abstract.service';
import {EndPoint} from '../app.endpoints';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class SmtpConfigurationService extends AbstractService {

  constructor(private http: Http, private endPoint: EndPoint) {
    super();
  }

  getSmtpConfiguration(orgId:string){
    const url = this.endPoint.getSmtpConfigurationUrl()+"?orgId="+parseInt(orgId);
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
      const json = res.json();
      return json;
    })
    //...errors if any
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateSmtpConfiguration(configId:string,data:object){
    const url = this.endPoint.saveSmtpConfigurationUrl()+"/"+parseInt(configId);
    return this.http.put(url, data)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
        return res;
      }
    })
    //...errors if any
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }

}
