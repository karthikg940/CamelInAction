import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AbstractService} from '../app.abstract.service';
import {EndPoint} from '../app.endpoints';
import { IDuration } from '../app.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class StudylistService extends AbstractService {

  private currentStudy: any;

  private studyUpdateEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private http: Http, private endPoint: EndPoint) {
    super();
  }

  getCurrentStudy(): any {
    return this.currentStudy;
  }

  getStudyUpdateEmitter(): EventEmitter<any> {
    return this.studyUpdateEmitter;
  }

  getListDetails(duration: IDuration, filter: Object,searchData: Object): Observable<Response> {
    const url = this.getStudyListUrl(duration, filter,searchData);
    // ...using get request
    return this.http.put(url,searchData)
      // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getStudyDetails(studyId: string): Observable<Response> {
    const url = this.endPoint.studyDetailUrl() + studyId;
    // ...using get request
    return this.http.get(url)
      // ...and calling .json() on the response to return data
      .map((res: Response) => { this.currentStudy = res.json(); this.studyUpdateEmitter.emit(studyId); return res.json(); })
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  refereshStudyDetails(studyId: string): Observable<Response> {
    this.getStudyDetails(studyId).subscribe(function() {
      console.log("refereshStudyDetails complete");
    });
  }

  updateStatus(studyId: string,type: string) {
    if(type == 'qa'){
        const url = this.endPoint.assignQaUserUrl() + "/" + studyId + "/qaassign";
    }else{
    const url = this.endPoint.changeStatusUrl() + "/" + studyId + "/pocassign";
  }
    return this.http.post(url)
      // ...and calling .json() on the response to return data
      .map((res: Response) => {
        this.refereshStudyDetails(studyId);
        return res.json();
      })
      //...errors if any
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getStudyListUrl(duration: IDuration, filter: Object, searchData: Object) {
    return this.endPoint.studyListUrl() + "?" + this.getDurationString(duration) + this.getFilterString(filter);
  }

  unAssignStudyWorksheet(studyId: string) {
    const url = this.endPoint.deleteWorksheetUrl() + "/study/" + studyId;
    return this.http.delete(url)
      // ...and calling .json() on the response to return data
      .map((res: Response) => {
        this.refereshStudyDetails(studyId);
        return res.json();
      })
      //...errors if any
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  unAssignStudy(studyId: string) {
    const studyUrl = this.endPoint.changeStatusUrl() + "/" + studyId + "/admin/modifystatus";
    return this.http.delete(studyUrl)
      // ...and calling .json() on the response to return data
      .map((res: Response) => {
        this.refereshStudyDetails(studyId);
        return res.json();
      })
      //...errors if any
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateReassignUsername(studyId: string, userId: string) {
    const url = this.endPoint.changeStatusUrl() + "/" + studyId + "/reassignuser/" + userId;
    return this.http.put(url)
      // ...and calling .json() on the response to return data
      .map((res: Response) => {
        this.refereshStudyDetails(studyId);
        return res.json();
      })
      //...errors if any
      .catch((error: any) => Observable.throw(error || 'Server error'));
	 }

  modifyStatus(studyId: string) {
    const url = this.endPoint.unassignStudyUrl() + "/" + studyId + "/modifystatus";
    return this.http.put(url)
      // ...and calling .json() on the response to return data
      .map((res: Response) => {
        this.refereshStudyDetails(studyId);
        return res;
      })
      //...errors if any
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  showDropdown(studyId: string) {
    const url = this.endPoint.changeStatusUrl() + "/" + studyId + "/statuscheck";
    return this.http.get(url)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteStudy(studyId: string) {
    const url = this.endPoint.changeStatusUrl() + "/" + studyId;
    return this.http.delete(url)
      .map((res: Response) => {
        console.log("response", res);
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  assignStudyToAttending(studyId: string, userId: string) {
    const url = this.endPoint.changeStatusUrl() + "/" + studyId + "/assigntoattendUser/" + userId;
    return this.http.put(url)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  assignStudyByAdmin(studyId: string, userId: string) {
    const url = this.endPoint.changeStatusUrl() + "/" + studyId + "/admin/" + userId;
    return this.http.post(url)
      // ...and calling .json() on the response to return data
      .map((res: Response) => {
        this.refereshStudyDetails(studyId);
        return res.json();
      })
      //...errors if any
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getSearchStatus(){
    const url = this.endPoint.studyDetailUrl()+"statusList";
    return this.http.get(url)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getSearchExamType(){
    const url = this.endPoint.getExamtypeDetailsUrl();
    return this.http.get(url)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
