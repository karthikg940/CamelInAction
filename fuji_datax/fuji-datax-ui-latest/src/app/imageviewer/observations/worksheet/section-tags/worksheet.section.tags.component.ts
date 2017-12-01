import { Component, Input} from '@angular/core';
import { ObservationsService } from '../../observations.service';
import { Subject} from 'rxjs/Rx';
declare var $j:any;


@Component({
  selector: 'tags',
  templateUrl: './worksheet.section.tags.component.html',
  styleUrls: []
})

export class TagsSection {

  @Input() id: String;
  @Input() tagList:Object[];
  @Input() studyId : String;
  const autoSave: Subject = new Subject();
  @Input() activeTagList:Object[];
  @Input() loginUserId: String;
  @Input() qaUser: String;
  @Input() assignedUser: String;
  @Input() attendingUser: String;

  public disableTags:boolean;
  public tagsList:object[]=[];
  public errortags:boolean=0;
  
  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  constructor(private observationService: ObservationsService){
  this.autoSave.bufferTime(2000)
  .subscribe((val) => {
    if(val.length){
      this.observationService.saveTags(this.studyId,this.activeTagList).subscribe(res=>{
    	  
      },
      err=>{
      });
    }
  });
  }

  ngOnInit(){
    this.disableTags = this.assignedUser?(this.loginUserId == this.assignedUser):false;
    if(this.disableTags == false)
      this.disableTags = this.qaUser?(this.loginUserId == this.qaUser):false;
    if(this.disableTags == false)
      this.disableTags = this.attendingUser?(this.loginUserId == this.attendingUser):false;
	  for(let i=0;i<this.tagList.length;i++){
    	    	this.tagsList.push({id:this.tagList[i].id,name:this.tagList[i].name,type:this.tagList[i].type});
    	    }
    					let inputTags = $j('#inputTags').tagSuggest({
    						data: this.tagsList,
    						sortOrder: 'name',
    						maxDropHeight: 200,
    						name: 'inputTags'
    					});	
    					 console.log(':::::::::::active tag list '+JSON.stringify(this.activeTagList));
    				        console.log('::::::::::: tag list '+JSON.stringify(this.tagsList));
    					    if(this.activeTagList.length > 0){
    					    	for(let i=0;i<this.activeTagList.length;i++){
    					    		var activetag= this.activeTagList[i].name;
    						    	if(this.activeTagList[i].type == "global")
    						    		{
    						    		document.getElementById('tag-sel-ctn-0').innerHTML+='<div class="tag-sel-item">'+activetag+'<span class="tag-close-btn"></span></div>';
    						    		}
    							    else{
    							    	document.getElementById('tag-sel-ctn-0').innerHTML+='<div class="tag-sel-item tag-sel-personal">'+activetag+'<span class="tag-close-btn"></span></div>';
    							    	}
    						    } 
    						  }
				
  }
  
  ngAfterViewInit(){
						
    var id = this.id;
    $('#'+this.id).click(function(){
      var currentPanel = $(this).next('.wrkshtpanelbody');
      $('.wrkshtpanelbody').each(function(){
        if($(this).attr('id')!="panel-"+id){
          $(this).slideUp();
        }
      });
      currentPanel.slideToggle();
    });
		
				
  }
  saveInputTags(){
	  let saveinputTagsvalue = JSON.parse(document.getElementById('inputTagsHidden').value);
	  if(saveinputTagsvalue.length > 0){
		 this.errortags = 0;
	    this.activeTagList = saveinputTagsvalue;
	    this.autoSave.next();
	  } else {
		  this.errortags = 1;
	  }
  }
  
   
}
