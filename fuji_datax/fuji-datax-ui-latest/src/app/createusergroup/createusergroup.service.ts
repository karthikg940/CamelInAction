import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {AbstractService} from '../app.abstract.service';
import {EndPoint} from '../app.endpoints';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class UserGroupService extends AbstractService {

  constructor(private http: Http, private endPoint: EndPoint) {
    super();
  }

  saveNewUserGroup(data: Object) {
    const url = this.endPoint.saveNewGroupUserUrl();
    return this.http.post(url, data)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
      const location: string = res.headers.get('Location');
      if (location) {
        const frag: string[] = location.split("/");
        return frag[frag.length - 1];
      }
    })
    //...errors if any
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getUniqueGroupName(groupName: string): Observable<Response> {
    const url = this.endPoint.getUniqueUserGroupName() + "?name=" + groupName;
    // ...using get request
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
      const json = res.json();
      console.log("Returnded data", json);
      return json;
    })
    // ...errors if any
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUserDetails() {
    const url = this.endPoint.getUserListUrl();
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
      return res.json();
    })
    //...errors if any
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  
  getUserList() {
    const url = this.endPoint.userUrl();
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
      return res.json();
    })
    //...errors if any
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  

  getUserGroupById(userGroupId: string) {
    const url = this.endPoint.getUserGroupById() + "/" + userGroupId;
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
      return res.json();

    })
    //...errors if any
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateUserGroup(userGroupId: string, data: Object) {
    const url = this.endPoint.getUserGroupById() + "/" + userGroupId;
    return this.http.put(url, data)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
      return res;
    })
    //...errors if any
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getPermissions() {
    const url = this.endPoint.getPermissionsUrl();
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
      return res.json();
    })
    //...errors if any
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getOrganizations() {
    const url = this.endPoint.getOrganizationsUrl();
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
      return res.json();
    })
    //...errors if any
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getRole(){
  const url =  this.endPoint.roleUrl();
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
      return res.json();
    })
    //...errors if any
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
