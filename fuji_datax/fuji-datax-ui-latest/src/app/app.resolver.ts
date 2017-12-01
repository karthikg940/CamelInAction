import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {AppState} from "./app.service";

@Injectable()
export class PreferenceResolver implements Resolve<any> {
  constructor(private appService:AppState) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.appService.loadPreference();
  }
}

// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
    PreferenceResolver
];
