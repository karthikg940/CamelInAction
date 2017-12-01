import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { Comment }           from '../model/comment';
import {Observable} from 'rxjs/Rx';
import {EndPoint} from './app.endpoints';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  _state: InternalStateType = {};
  private loadPref = false;
  private bearer = null;
  private login_event: Observable<any> = null;

  constructor(private http: Http, @Inject('bearer') bearer: string, private endPoint: EndPoint) {
    this.bearer = bearer;
    this.setHttpAuthorizationToken();
  }

  setHttpAuthorizationToken() {
    if (this.bearer)
      this.http._defaultOptions.headers.set('Authorization', 'Bearer ' + this.bearer);
  }


  loadPreference(): Observable<any> {

    if (this.loadPref)
      return Observable.of(true);

    return this.http.get(this.endPoint.preferenceUrl())
      // ...and calling .json() on the response to return data
      .map((res: Response) => {
        const pref = res.json();
        for (var key in pref) {
          if (pref.hasOwnProperty(key)) {
            this.set("preference." + key, pref[key]);
          }
        }
        this.loadPref = true;
        return true;
      })
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPreference(): Observable<any> {
    return this.http.get(this.endPoint.preferenceUrl())
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  getldapConfigStatus(): Observable<any> {
    return this.http.get(this.endPoint.ldapConfigStatusUrl())
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }


  getUserName(): Observable<any> {
    // ...using get request
    return this.http.get(this.endPoint.displayUsernameUrl())
      // ...and calling .json() on the response to return data
      .map((res: Response) => {

        const userNameJson = res.json();
        this.set("userName", (userNameJson.prefix ? userNameJson.prefix + ". " : "") + userNameJson.firstName + " " + userNameJson.lastName);
        this.set("userId", userNameJson.id);
        this.set("orgId", userNameJson.orgId);
        return userNameJson;
      })
      //...errors if any
      .catch((error: any) => Observable.throw(error || 'Server error'));

  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : null;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }


  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }
}
