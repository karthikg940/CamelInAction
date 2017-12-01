import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AbstractService} from '../app.abstract.service';
import {EndPoint} from '../app.endpoints';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BreadCrumService extends AbstractService{
	
	constructor (private http: Http, private endPoint:EndPoint) {
		super();
	}
	
	getPreference(id:number){
		const url = this.endPoint.userPreferenceUrl()+'/'+id+'/preference?type=1';
		console.log("get url",url);
		return this.http.get(url)
				 // ...and calling .json() on the response to return data
				.map((res:Response) => {
					console.log('response from url is'+res:Response)
					return res.json();
				})
			    //...errors if any
				.catch((error:any) => Observable.throw(error || 'Server error'));
			}
	
	updatePreference(id:number,prefObj:any){
		const url = this.endPoint.userPreferenceUrl()+'/'+id+'/preference';
		return this.http.post(url, prefObj)
				 .map((res:Response) => {
					 	console.log('response from post'+res:Response)
					 	const location: string = res.headers.get('Location');
				    }) 
				    //...errors if any
				    .catch((error:any) => Observable.throw(error || 'Server error')); 
	  }  
				 
	
} 