	import { Injectable, EventEmitter } from '@angular/core';
	import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
	// import { Comment } from '../model/comment';
	import {Observable} from 'rxjs/Rx';
	import {AbstractService} from '../../app.abstract.service';
	import {StudylistService} from '../../studylist/studylist.service';
	import {EndPoint} from '../../app.endpoints';

	// Import RxJs required methods
	import 'rxjs/add/operator/map';
	import 'rxjs/add/operator/catch';


	@Injectable()
	export class ObservationsService extends AbstractService{

	private wrkshtUpdateEmitter : EventEmitter  = new EventEmitter();
	private qaAttestationSignEmitter : EventEmitter  = new EventEmitter();
	private qaAttestationSignId = false;
	private qaSigned = false;

	constructor (private http: Http, private endPoint:EndPoint, private studyService: StudylistService) {
	  super();
	}

	getWrkshtUpdateEmitter(): EventEmitter{
	  return this.wrkshtUpdateEmitter;
	}

	getQaAttestedSignEmitter(): EventEmitter{
		return this.qaAttestationSignEmitter;
	}

	getQaSigned(){
		return this.qaSigned;
	}

	getWorksheet(studyId: String,type: String){
	  const url = this.endPoint.getWorksheetUrl() +"?"+ this.getParamString({studyId: studyId})+"&"+this.getParamString({type: type});
	  return this.http.get(url)
	      // ...and calling .json() on the response to return data
	      .map((res:Response) => {
	          return res.json();
	      })
	      // ...errors if any
	      .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	getWorksheetList(studyId: String,examTypeFlag: boolean) : Observable<Response>{
		  const url = this.endPoint.getWorksheets() +"?studyId=" + studyId + "&examTypeFlag="+examTypeFlag;
		  return this.http.get(url)
		      // ...and calling .json() on the response to return data
		      .map((res:Response) => {
		          return res.json();
		      })
		      // ...errors if any
		      .catch((error:any) => Observable.throw(error || 'Server error'));
		}

	getWorksheetTemplate(id: String) : Observable<Response>{
	  const url = this.endPoint.getWorksheetTemplate() +"/"+ id;
	  return this.http.get(url)
	      // ...and calling .json() on the response to return data
	      .map((res:Response) => {
	          return res.json();
	      })
	      // ...errors if any
	      .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	saveWorksheet(studyId: String,assignToUserId: String, examTypeId: String, templateId: String, type: String, data: Object){
	  const url = this.endPoint.saveWorksheetUrl();
	  return this.http.post(url, {study: {id:parseInt(studyId)},assignToUserId:{id:parseInt(assignToUserId)}, examType: {id:parseInt(examTypeId)}, template: {id:templateId},wrkshtType:{type}, content: data})
	      // ...and calling .json() on the response to return data
	    .map((res:Response) => {
	        const location: String = res.headers.get('Location');
	        if(location) {
	            const frag:String[] = location.split("/");
	            return frag[frag.length-1];
	        }
	        this.studyService.refereshStudyDetails(studyId);
	        console.error("saveWorksheet post response does not have location header");
	        return null;
	      })
	      // ...errors if any
	      .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	updateWorksheet(worksheetId: String, data: Object,studyId: String,examTypeId: String): Observable<Response>{
	  const url = this.endPoint.saveWorksheetUrl() + "/" + worksheetId;
	  return this.http.put(url, {content: data, study :{id:studyId},examId :{id:examTypeId}})
	      // ...and calling .json() on the response to return data
	      .map((res:Response) => {
	          return res;
	      })
	      // ...errors if any
	      .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	deleteWorksheet(worksheetId: String){
	  const url = this.endPoint.deleteWorksheetUrl() +"/"+ worksheetId;
	  return this.http.delete(url)
	      // ...and calling .json() on the response to return data

	      .map((res:Response) => {
	          return res;
	      })
	      // ...errors if any
	      .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	saveSignature(worksheetId: String,type: String,sign: String,timestamp: String, studyId: String) : Observable<Response>{
	  const url = this.endPoint.saveSignatureUrl();
	  return this.http.post(url, {worksheet: {id:parseInt(worksheetId)}, type:type, sign:sign, timestamp:timestamp})
	      // ...and calling .json() on the response to return data
	     .map((res:Response) => {
	 this.studyService.refereshStudyDetails(studyId);
	  	   const location: String = res.headers.get('Location');
	     	if(location) {
	         const frag:String[] = location.split("/");
	         return frag[frag.length-1];
	     }
	     console.log('savesignature',res);
			 return null;
	      })
	      // ...errors if any
	      .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	saveAttendingAttestedSignature(worksheetId: String,type: String,sign: String,timestamp: String, studyId: String) : Observable<Response>{
	  const url = this.endPoint.saveSignatureUrl();
	  return this.http.post(url, {worksheet: {id:parseInt(worksheetId)}, type:type, sign:sign, timestamp:timestamp})
	     .map((res:Response) => {
	  	   const location: String = res.headers.get('Location');
	     	if(location) {
	         const frag:String[] = location.split("/");
	         return frag[frag.length-1];
	     }
	      this.studyService.refereshStudyDetails(studyId);
	          console.log('savesignature',res);
	      }) .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	saveAttestedSignature(worksheetId: String,type:String,sign: String,timestamp: String, studyId: String) : Observable<Response>{
	const url = this.endPoint.saveAttestedSignatureUrl();
	return this.http.post(url, {worksheet: {id:parseInt(worksheetId)}, type:type, sign:sign, timestamp:timestamp, studyId:studyId})
		 .map((res:Response) => {

			 const location: String = res.headers.get('Location');
			if(location) {
				 const frag:String[] = location.split("/");
				 return frag[frag.length-1];
		 }
			this.studyService.refereshStudyDetails(studyId);
					console.log('savesignature',res);
			})
			//...errors if any
			.catch((error:any) => Observable.throw(error || 'Server error'));
	}

	getSignatureData(worksheetId: String) : Observable<Response>{
	  const url = this.endPoint.getSignatureUrl() +"/"+ worksheetId;
	  return this.http.get(url)
	      // ...and calling .json() on the response to return data
	      .map((res:Response) => {
	          return res.json();
	      })
	      // ...errors if any
	      .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	deleteSignature(signId: String, studyId: String){
	  const url = this.endPoint.deleteSignatureUrl() +"/"+ signId;
	  return this.http.delete(url)
	      // ...and calling .json() on the response to return data

	      .map((res:Response) => {
	          this.studyService.refereshStudyDetails(studyId);
	          return res;
	      })
	      // ...errors if any
	      .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	submitWorksheet(studyId: String) : Observable<Response>{
	  const url = this.endPoint.saveToSubmitUrl() +"/"+ studyId +"/complete";
	  return this.http.put(url)
	      // ...and calling .json() on the response to return data
	     .map((res:Response) => {
	          this.studyService.refereshStudyDetails(studyId);
	          return res;
	      })
	      // ...errors if any
	      .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	worksheetAssociation(studyId: String,examTypeName: String,type:String,templateName: String) : Observable<Response>{
	  const url = this.endPoint.associateworksheetUrl() +"/" + studyId +"/exam/" + examTypeName+"/template/"+templateName;
	  return this.http.put(url)
	              // ...and calling .json() on the response to return data
	         .map((res:Response) => {
	              console.log('Worksheet Associated');
	              return res.json();
	          })
	          // ...errors if any
	          .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	getUserGroupDetails() : Observable<Response>{
	 const url = this.endPoint.getUserGroupListUrl();
	  return this.http.get(url)
	              // ...and calling .json() on the response to return data
	         .map((res:Response) => {
	              return res.json();
	          })
	          // ...errors if any
	          .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	getActiveUserDetails() : Observable<Response> {
	  const url = this.endPoint.getActiveUserlistUrl();
	  return this.http.get(url)
	              // ...and calling .json() on the response to return data
	         .map((res:Response) => {
	              return res.json();
	          })
	          // ...errors if any
	          .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	/* QA Worksheet */
	saveQaWorksheet(studyId: String, templateId: String, type: String, data: Object)  : Observable<Response>{
	  const url = this.endPoint.saveWorksheetUrl();
	  return this.http.post(url, {study: {id:parseInt(studyId)}, template: {id:templateId},wrkshtType:{type}, content: data})
	      // ...and calling .json() on the response to return data
	    .map((res:Response) => {
	        const location: String = res.headers.get('Location');
	        if(location) {
	            const frag:String[] = location.split("/");
	            return frag[frag.length-1];
	        }
	        this.studyService.refereshStudyDetails(studyId);
	        console.error("saveQAWorksheet post response does not have location header");
	        return null;
	      })
	      // ...errors if any
	      .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	updateQAWorksheet(worksheetId: String, data: Object): Observable<Response>{
	      const url = this.endPoint.saveWorksheetUrl() + "/" + worksheetId;
	      return this.http.put(url, {content: data})
	          .map((res:Response) => {
	              return res;
	          })
	          .catch((error:any) => Observable.throw(error || 'Server error'));
	  }

	getQaWorksheetList() : Observable<Response>{
	  const url = this.endPoint.getQaWorksheets() ;
	  return this.http.get(url)
	      // ...and calling .json() on the response to return data
	      .map((res:Response) => {
	          return res.json();
	      })
	      // ...errors if any
	      .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	  getQaWorksheet(studyId: String,type: String){
	      const url = this.endPoint.getQaWorksheetUrl() +"?"+ this.getParamString({studyId: studyId})+"&"+this.getParamString({type: type});
	      return this.http.get(url)
	          // ...and calling .json() on the response to return data
	          .map((res:Response) => {
	              return res.json();
	          })
	          // ...errors if any
	          .catch((error:any) => Observable.throw(error || 'Server error'));
	  }

	  getQaWorksheetTemplate(id: String) : Observable<Response>{
	      const url = this.endPoint.getQaWorksheetTemplate() +"/"+ id;
	      return this.http.get(url)
	          // ...and calling .json() on the response to return data
	          .map((res:Response) => {
	              return res.json();
	          })
	          // ...errors if any
	          .catch((error:any) => Observable.throw(error || 'Server error'));
	  }

	  getQASignatureData(worksheetId: String) : Observable<Response>{
	      const url = this.endPoint.getSignatureUrl() +"/"+ worksheetId;
	      return this.http.get(url)
	          // ...and calling .json() on the response to return data
	          .map((res:Response) => {
	              const qasignData = res.json();
	              const signed = qasignData.qa.id > 0;
	              this.qaSigned = signed;
	              this.wrkshtUpdateEmitter.emit({qaSigned:signed});
	              return qasignData;
	          })
	          // ...errors if any
	          .catch((error:any) => Observable.throw(error || 'Server error'));
	  }

	  submitToQA(studyId: String,userId:String) : Observable<Response>{
	  	const url = this.endPoint.submitToReviewUrl()+"/submittoqa";
	      return this.http.put(url, {studyId:parseInt(studyId), userId:parseInt(userId)})
	          // ...and calling .json() on the response to return data
	         .map((res:Response) => {
	              this.studyService.refereshStudyDetails(studyId);
	              return res;
	          })
	          // ...errors if any
	          .catch((error:any) => Observable.throw(error || 'Server error'));
	  }

	submitToAttending(studyId: String) : Observable<Response>{
	  const url = this.endPoint.submitWorksheetUrl() +"/"+ studyId +"/submittoattending";
	  return this.http.put(url)
	      // ...and calling .json() on the response to return data
	     .map((res:Response) => {
	          this.studyService.refereshStudyDetails(studyId);
	          return res;
	      })
	      // ...errors if any
	      .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	  saveQASignature(worksheetId: String,type: String,sign: String,timestamp: String,studyId:String) : Observable<Response>{
	      const url = this.endPoint.saveSignatureUrl();
	      return this.http.post(url, {worksheet: {id:parseInt(worksheetId)}, type:type, sign:sign, timestamp:timestamp, studyId:studyId})
	          // ...and calling .json() on the response to return data
	         .map((res:Response) => {
	      	   const location: String = res.headers.get('Location');
	         	if(location) {
	             const frag:String[] = location.split("/");
	         	   this.qaSigned = true;
	         	   this.wrkshtUpdateEmitter.emit({qaSigned:true});
	             return frag[frag.length-1];
	         }
	         	return null;
	          })
	          // ...errors if any
	          .catch((error:any) => Observable.throw(error || 'Server error'));
	  }

		/*saveQAAttestedSignature(worksheetId: String,type: String,sign: String,timestamp: String,studyId:String) : Observable<Response>{
				const url = this.endPoint.saveAttestedSignatureUrl();
				return this.http.post(url, {worksheet: {id:parseInt(worksheetId)}, type:type, sign:sign, timestamp:timestamp, studyId:studyId})
					 .map((res:Response) => {
						 const location: String = res.headers.get('Location');
						if(location) {
							 const frag:String[] = location.split("/");
							 this.qaSigned = true;
							 this.qaAttestationSignId = true;

							 this.wrkshtUpdateEmitter.emit({qaSigned:true});
							 return frag[frag.length-1];
					 }
						return null;
						})
						.catch((error:any) => Observable.throw(error || 'Server error'));
		}*/

	  deleteQASignature(qasignId: String){
	      const url = this.endPoint.deleteSignatureUrl() +"/"+ qasignId;
	      return this.http.delete(url)
	          // ...and calling .json() on the response to return data

	          .map((res:Response) => {
	          	this.qaSigned = false;
	          	this.wrkshtUpdateEmitter.emit({qaSigned:false});
	              return res;
	          })
	          // ...errors if any
	          .catch((error:any) => Observable.throw(error || 'Server error'));
	  }

		deleteQAAttestedSignature(qasignId: String, studyId: String){
	      const url = this.endPoint.deleteAttestedSignatureUrl() +"/"+ qasignId +"/" + studyId;
	      return this.http.delete(url)
	          // ...and calling .json() on the response to return data

	          .map((res:Response) => {
							this.qaSigned = false;
	                              this.studyService.refereshStudyDetails(studyId);
							this.wrkshtUpdateEmitter.emit({qaSigned:false});
	              return res;
	          })
	          // ...errors if any
	          .catch((error:any) => Observable.throw(error || 'Server error'));
	  }


	  generatePdfReport(wrkshtId: String) : Observable<Response>{
	  	const url = this.endPoint.generatePdfUrl() +"/"+ wrkshtId;
	        return this.http.get(url, { responseType: ResponseContentType.Blob }).map(
	          (res) => {
	              return new Blob([res.blob()], { type: 'application/pdf' });
	          });
	  }
	  
	  generateSRReport(studyId: String) : Observable<Response>{
		const url = this.endPoint.generateSRReportUrl() +"/"+ studyId;
		  return this.http.get(url, { responseType: ResponseContentType.Blob }).map(
			(res) => {
				return new Blob([res.blob()], { type: 'application/pdf' });
			});
	}

	  getAttendingUser(studyId: String){
	      const url = this.endPoint.changeStatusUrl() +"/"+ studyId +"/assignuser";
	      return this.http.get(url)
	      .map((res:Response) => {
	           console.log('assigned user ',res);
	           return res.json();
	       })
	       // ...errors if any
	       .catch((error:any) => Observable.throw(error || 'Server error'));
	  }

	assignStudyToAttending(studyId:String, userId:String){
	const url = this.endPoint.changeStatusUrl() + "/" + studyId +"/assigntoattendUser/" + userId;
	return this.http.put(url)
	.map((res:Response) => {
	    console.log("response",res);
	    return res.json();
	})
	.catch((error:any) => Observable.throw(error || 'Server error'));
	}

	// method to get list of examtypes based on templatename
	getExamTypesByTemplate(templatename :string) : Observable<Response>{
	const url = this.endPoint.associateworksheetUrl() +"/search?templateName=" +templatename;
	return this.http.get(url)
	.map((res:Response) =>{
		return res.json();
	})
	.catch((error:any) => Observable.throw(error || 'Server error'));

	}

	getValidateSignature(studyId: string) : Observable<Response>{
	const url = this.endPoint.validateAttendingQaUserUrl() + "/" + studyId + "/attestation/uservalidate";
	return this.http.get(url)
	        .map((res:Response) => {
						 this.qaAttestationSignId = true;
						 this.qaAttestationSignEmitter.emit({qaAttestationSignId:true});
						 return res.json();
	       })
	      .catch((error:any) => Observable.throw(error || 'Server error'));

	}

	deleteAttestedSignature(signId: String, studyId: String){
	const url = this.endPoint.deleteAttestedSignatureUrl() +"/"+ signId;
	return this.http.delete(url)
	 // ...and calling .json() on the response to return data

	 .map((res:Response) => {
			 this.studyService.refereshStudyDetails(studyId);
			 return res;
	 })
	 //...errors if any
	 .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	/* Tags Services*/

	getTagsForExamType(id: String){
	const url = this.endPoint.getTagsForExamTypeUrl() +"/"+parseInt(id)+"/tags";
	return this.http.get(url)
	 // ...and calling .json() on the response to return data

	 .map((res:Response) => {
			 return res.json();
	 })
	 //...errors if any
	 .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	saveTags(studyId: String, data: Object){
	   const url = this.endPoint.saveTagsUrl() +"/"+parseInt(studyId)+"/tag";
	  return this.http.post(url, data)

	    .map((res:Response) => {
	            return true;
	   })
	      // ...errors if any
	      .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	getTagsForStudy(studyId: String){
		const url = this.endPoint.getTagsForStudyUrl() +"/"+parseInt(studyId)+"/tag";
	  return this.http.get(url)

	    .map((res:Response) => {
	            return res.json();
	   })
	      // ...errors if any
	      .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	deleteTagsForStudyService(studyId: string){
	const url = this.endPoint.deleteTagUrl() +"/"+parseInt(studyId)+"/tag";
	  return this.http.delete(url)

	    .map((res:Response) => {
	            return true;
	   })
	      // ...errors if any
	      .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	getQaWorksheetId(studyId: String) : Observable<Response>{
	  const url = this.endPoint.getQaWorkseetIdUrl() +"/" +parseInt(studyId);
	  return this.http.get(url)
	      // ...and calling .json() on the response to return data
	     .map((res:Response) => {
	          return res.json();
	      })
	      // ...errors if any
	      .catch((error:any) => Observable.throw(error || 'Server error'));
	}

	getStudy(studyId: string): Observable<Response> {
	const url = this.endPoint.studyDetailUrl() + studyId;
	// ...using get request
	return this.http.get(url)
	// ...and calling .json() on the response to return data
		.map((res: Response) => {
		return res.json(); })
		//...errors if any
		.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}
	createOrderForStudy(studyId: string): Observable<Response>{
		const url = this.endPoint.studyDetailUrl()+studyId+"/order";
		return this.http.post(url)
			.map((res:Response) => {
							return true;
		 })
				// ...errors if any
				.catch((error:any) => Observable.throw(error || 'Server error'));
	}
	cancelOrder(studyId:string): Observable<Response>{
    const url = this.endPoint.studyDetailUrl()+studyId+"/order";
		return this.http.delete(url)
		.map((res:Response) =>{
			return true;
		})
		.catch((error:any) => Observable.throw(error || 'Server error'));

	}
}
