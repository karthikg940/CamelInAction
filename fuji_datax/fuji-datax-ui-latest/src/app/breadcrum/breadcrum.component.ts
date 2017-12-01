import{Component,Input,Output,EventEmitter}from'@angular/core';import{Duration,defaultDuration}from'./breadcrum.model';import{AppState}from'../app.service';

import Moment from'moment';import{BreadCrumService}from'./breadcrum.service'

@Component
({selector:'breadcrum',templateUrl:'./breadcrum.component.html',styleUrls:['breadcrum.component.css']})

export class BreadcrumComponent {

  private initComplete: Boolean = false;

  @Input() title : string;
  @Input() secondtitle : string;
  @Input() icon: string;
  @Output() durationChange: EventEmitter<any> = new EventEmitter();
  @Input() defaultDuration: defaultDuration;

  private loginUserId : number;
  private preferenceValueObj : Object[] =[];
  private prevDaterange : string;
  
  
  constructor(private appState: AppState,private breadCrumService:BreadCrumService){}
  

  ngOnChanges(changes: Object) {
    console.log("BreadcrumComponent ngOnChanges", changes, this.defaultDuration);
    if(changes['defaultDuration']){
      this.getLoginUserId();
    }
  }

	ngAfterViewInit()
  {
    if(!this.initComplete){
      this.getLoginUserId();
    }
  }

	getLoginUserId(){  
	  console.log("inside the getLoginUserId method")	
	  this.appState.getUserName().subscribe(
			    res => {
			      this.loginUserId=res.id;
				  this.getPreference(res.id);
			    },
			    error => console.error(error)  
			  );
	}  
	
	getPreference(userId:number){
		console.log("inside the get preference");
		this.breadCrumService.getPreference(userId).subscribe(
	  			data => {
	  				this.preferenceValueObj=data;
	  				let userPreferenceValue;
	  				data.forEach(function(value,index){
	  					if(value.default){
	  						userPreferenceValue=value.name;					
	  					}	  					
	  				});
	  				this.initDateRange(userPreferenceValue);	  				 	  			  				 
	  			},
	  			error => console.error(error)  
	  		);
	}
	
	initDateRange(userPreferenceValue:number){
		var dateFormat = {};
		dateFormat['Past 24Hrs'] = Moment().subtract(24, 'hours')
		dateFormat['One Week'] = Moment().subtract(6, 'days')
		dateFormat['One Month'] = Moment().subtract(1, 'month')
		dateFormat['Six Months'] = Moment().subtract(6, 'month')
		dateFormat['One Year'] = Moment().subtract(1, 'year')
	    const that = this;
	    let start, end, label;
	    console.log('defaultDuration',that.defaultDuration);
	   
	    if(that.defaultDuration && that.defaultDuration.start && that.defaultDuration.end && that.defaultDuration.label){
	      start = that.defaultDuration.start;
	      end = that.defaultDuration.end;
	      label = that.defaultDuration.label;
	    } else  if(userPreferenceValue){
	 	    start = dateFormat[userPreferenceValue];
	 		end = Moment();
	 		label = userPreferenceValue;
	    }
	    else{
	      start = Moment().subtract(24, 'hours');
	      end = Moment();
	      label = userPreferenceValue;
	    }
	    function cb(start, end, label) {
	      console.log('label',label);
	      if(label == 'Custom Range'){
	        $('#reportrange input').val(start.format('MMM DD,YYYY') + ' to ' + end.format('MMM DD,YYYY'));
	      } else {
	        $('#reportrange input').val(label);
	      }
	      that.durationChange.emit(new Duration(start,end,label));
	    }
	    $('#reportrange').daterangepicker({
	      startDate: start,
	      endDate: end,
	      ranges: {
	        'Past 24Hrs': [Moment().subtract(24, 'hours'), Moment()],
	        'One Week': [Moment().subtract(6, 'days'), Moment()],
	        'One Month': [Moment().subtract(1, 'month'), Moment()],
	        'Six Months': [Moment().subtract(6, 'month'), Moment()],
	        'One Year': [Moment().subtract(1, 'year'), Moment()]
	      },
	      applyClass:"applyBtn",
	      cancelClass:"cancelBtn"
	    }, cb);
	    cb(start, end, label);
	    that.initComplete = true;
	  }

	
	
	updatePreference(){
		let daterange=$('#reportrange input').val();
		if(this.prevDaterange != daterange){
		const that = this;
		this.preferenceValueObj.forEach(function(value,index){ 
			 if(value.name == daterange){
				 	that.prevDaterange=daterange;
					that.breadCrumService.updatePreference(that.loginUserId,value)
					.subscribe(
						response => {
	  					        console.log("successfully updated")
	  					 },
						error => console.error(error)  
						);
				} 
		});
	}	 
}	 
  				 

}
