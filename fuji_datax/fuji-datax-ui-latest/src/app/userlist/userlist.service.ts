import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AbstractService} from '../app.abstract.service';
import {EndPoint} from '../app.endpoints';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserlistService extends AbstractService{

  constructor (private http: Http, private endPoint:EndPoint) {
    super();
  }

  getUserDetails() {
    return this.endPoint.userUrl();
  }

  getUser()
  {
    const url = this.endPoint.userUrl() ;
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res:Response) => {
      return res.json();
    })
    //...errors if any
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  getActiveStatus(id: string, data: string) : Observable<Response>{
    const url = this.endPoint.getActiveStatusUrl()+ "/" + id + "/changeStatus";
    return this.http.put(url, {status: data})
    // ...and calling .json() on the response to return data
    .map((res:Response) => {
       return res.json();
    })
    //...errors if any
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }
  
  unlockUser(userId:string){
	    const url = "/api/account/" + parseInt(userId) + "/unlock";
	    return this.http.put(url)
	    // ...and calling .json() on the response to return data
	    .map((res:Response) => {
	       return res;
	    })
	    //...errors if any
	    .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}
