import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {AbstractService} from '../app.abstract.service';
import {EndPoint} from '../app.endpoints';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CreateExamTypeService extends AbstractService{

  constructor (private http: Http, private endPoint:EndPoint) {
    super();
  }

  saveExamType(data: Object){
    const url = this.endPoint.saveExamTypeUrl();
    return this.http.post(url,data)
    // ...and calling .json() on the response to return data
    .map((res:Response) => {
      const location: string = res.headers.get('Location');
      if(location) {
        const frag:string[] = location.split("/");
        return frag[frag.length-1];
      }
    })
    //...errors if any
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  getCptCodes(){
    const url = this.endPoint.getCptCodes() ;
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res:Response) => {
      return res.json();
    })
    //...errors if any
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  getUniqueExamType(examtypeName:string) : Observable<Response> {
    const url = this.endPoint.getUniqueExamtypeName() +"?name="+examtypeName;
    // ...using get request
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res:Response) => {
      const json = res.json();
      return json;
    })
    // ...errors if any
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getWorksheetTemplate() : Observable<Response> {
    const url = this.endPoint.getExamWorksheetTemplate();
    // ...using get request
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res:Response) => {
      const json = res.json();
      return json;
    })
    // ...errors if any
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getExamTypeDetail(examId:string){
    const url = this.endPoint.getExamtypeDetailsUrl()+"/"+parseInt(examId);
    // ...using get request
    return this.http.get(url)
    // ...and calling .json() on the response to return data
    .map((res:Response) => {
      const json = res.json();
      return json;
    })
    // ...errors if any
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateExamType(examTypeId: string, data: object){
    const url = this.endPoint.getExamtypeDetailsUrl() + "/" + parseInt(examTypeId);
    return this.http.put(url, data)
    // ...and calling .json() on the response to return data
    .map((res:Response) => {
      return res;
    })
    //...errors if any
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}
