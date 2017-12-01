import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { Comment }           from '../model/comment';
import {Observable} from 'rxjs/Rx';
import {AbstractService} from '../app.abstract.service';
import {EndPoint} from '../app.endpoints';
import { IDuration } from '../app.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
  export class DashboardService extends AbstractService{

  constructor (private http: Http, private endPoint:EndPoint) {
    super();
  }

  getWidgets(ids:string[], duration:IDuration) : Observable<Response> {
    const url = this.endPoint.dashboardSummaryUrl() +"?"+ this.getDurationString(duration);
    // ...using get request
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res:Response) => res.json())
    //...errors if any
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getWidgetDetails(id:string, duration:IDuration) : Observable<Response> {
    const url = this.endPoint.dashboardDetailUrl() +"?"+ this.getDurationString(duration) + "&type=" + id;
    // ...using get request
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res:Response) => res.json())
    //...errors if any
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
