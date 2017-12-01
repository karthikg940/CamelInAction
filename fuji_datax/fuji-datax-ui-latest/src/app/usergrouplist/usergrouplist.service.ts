import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AbstractService} from '../app.abstract.service';
import {EndPoint} from '../app.endpoints';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserGrouplistService extends AbstractService {

  constructor(private http: Http, private endPoint: EndPoint) {
    super();
  }

  getUserGroupDetails() {
    return this.endPoint.getUserGroupListUrl();
  }

  deleteUserGroup(groupId: String) {
    const url = this.endPoint.saveNewGroupUserUrl() + "/" + groupId;
    return this.http.delete(url)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
      return res.status;
    })
    //...errors if any
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }

}
