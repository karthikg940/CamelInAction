import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AbstractService} from '../app.abstract.service';
import {EndPoint} from '../app.endpoints';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RoleListService extends AbstractService {

  constructor(private http: Http, private endPoint: EndPoint) {
    super();
  }

  getRolesList() {
    return this.endPoint.roleUrl();
  }

  getRoles(){
    const url = this.endPoint.roleUrl();
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
      return res.json();
    })
    //...errors if any
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteRole(roleId: String) {
    const url = this.endPoint.roleUrl() + "/" + roleId;
    return this.http.delete(url)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
      return res.status;
    })
    //...errors if any
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  reAllocateRoles(roleId :string,newRoleId:string){
    const url = this.endPoint.roleUrl() + "/" + roleId+"/reallocate" + "?roleId=" + newRoleId;;
    return this.http.put(url)
    // ...and calling .json() on the response to return data
    .map((res: Response) => {
      return res;
    })
    //...errors if any
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
