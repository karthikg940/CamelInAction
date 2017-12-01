import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AbstractService} from '../app.abstract.service';
import {EndPoint} from '../app.endpoints';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HeaderService extends AbstractService{

    constructor (private http: Http, private endPoint:EndPoint) {
        super();
    }

    getAlert(loginuserid: string){
      const url = this.endPoint.getAlertUrl()+"?datax_receiver="+loginuserid ;
      return this.http.get(url)
        // ...and calling .json() on the response to return data
        .map((res:Response) => {
            return res.json();
        })
        //...errors if any
        .catch((error:any) => Observable.throw(error || 'Server error'));
    }

   updateAlertStatus(data: Object) {
      const url = this.endPoint.getAlertUrl() ;
      return this.http.put(url,data)
        // ...and calling .json() on the response to return data
        .map((res: Response) => {
          return res;
        })
        //...errors if any
        .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}
