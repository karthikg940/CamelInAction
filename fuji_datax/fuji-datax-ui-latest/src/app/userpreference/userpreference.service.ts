import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AbstractService} from '../app.abstract.service';
import {EndPoint} from '../app.endpoints';
//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class UserPreferenceService extends AbstractService{

	constructor (private http: Http, private endPoint:EndPoint) {
		super();
	}
	getAllPersonalTags(loginuserid: string){
		const url = this.endPoint.personalTagsUrl()+"/"+loginuserid+"/tag";
		return this.http.get(url)
		.map((response:Response)=>{
			return response.json();
		})
		.catch((error:any) =>  Observable.throw(error || 'Server error'))
	}

	savePersonalTags(loginUserId: String, data: Object){
		const url = this.endPoint.personalTagsUrl() +"/"+parseInt(loginUserId)+"/tag";
		return this.http.post(url, data)

		.map((res:Response) => {
			return true;
		})
		// ...errors if any
		.catch((error:any) => Observable.throw(error || 'Server error'));
	}

	deleteAllTags(loginuserid: string){
		const url = this.endPoint.personalTagsUrl()+"/"+loginuserid+"/tag";
		return this.http.delete(url)
		.map((resp:Response)=>{
			return resp;
		})
		.catch((error:any) =>  Observable.throw(error || 'Server error'))
	}

}