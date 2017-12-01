import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {AbstractService} from '../app.abstract.service';
import {EndPoint} from '../app.endpoints';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ExamtypelistService extends AbstractService {

  constructor(private http: Http, private endPoint: EndPoint) {
    super();
  }

  getExamtypeDetails() {
	   return this.endPoint.getExamtypeDetailsUrl();
  }

  deleteExamType(examid: String) {
    const url = this.endPoint.deleteExamtypeUrl() + "/remove/" + examid;
    return this.http.delete(url)
      // ...and calling .json() on the response to return data
      .map((res: Response) => {
        return res;
      })
      //...errors if any
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  disableandEnableExamtype(examid: string, data: boolean) {
	  const url = this.endPoint.getExamtypeDetailsUrl() + "/" + examid + "/renderexamtype";
    return this.http.put(url, { enable: data })
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
