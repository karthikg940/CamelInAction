import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AbstractService} from '../app.abstract.service';
import {EndPoint} from '../app.endpoints';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class LdapConfigurationService extends AbstractService {

  constructor(private http: Http, private endPoint: EndPoint) {
    super();
  }

  saveldapConfig(data: Object) {
    const url = this.endPoint.saveLdapConfigDataUrl();
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

  validateConnection(data: Object) {
    const url = this.endPoint.saveLdapConfigDataUrl() + "/validate";
    return this.http.post(url, data)
    .map((res: Response) => {
      return res.json();
    })
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getLdapConfig() {
    const url = this.endPoint.saveLdapConfigDataUrl();
    return this.http.get(url)
    .map((res: Response) => {
      return res.json();
    })
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateLdapConfig(ldapConfigId: string, data: object) {
    const url = this.endPoint.saveLdapConfigDataUrl() + "/" + ldapConfigId;
    return this.http.put(url, data)
    .map((res: Response) => {
      return res;
    })
    .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
