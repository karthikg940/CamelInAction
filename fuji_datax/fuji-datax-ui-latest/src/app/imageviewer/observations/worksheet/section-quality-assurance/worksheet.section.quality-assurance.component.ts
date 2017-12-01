import { Component, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { AppState } from '../../../../app.service';
import { ObservationsService } from '../../observations.service';
import { WorksheetData } from '../worksheet.model';
import { QAWorksheetData } from '../worksheet.model';
import { Observable, Observer,Subject} from 'rxjs/Rx';

@Component({
    selector: 'quality-assurance',
    templateUrl: './worksheet.section.quality-assurance.component.html',
    styleUrls: []
})

  export class QualityAssuranceSection {

  private qaWorksheets:Object[] = [];
  private qaWorksheetId: String;
  private qaSelectedTemplateId: String;
  private qaSelectedTemplateName: String;
  private qaTemplate:Object;
  private qaSignId: String;
  public type: String;
  public qId: String;
  public timestamp: String;
  private dummyId:String;
  private qaChangedTemplateId: String;
  private qaChangedTemplateName: String;
  private sqaData:Object = {};
  private sdata:Object = {};
  private qaData:Object = {};
  private qaId:String;
  const autoSave: Subject = new Subject();
  
  @Input() workflowStatus: boolean;
  @Input() disableQAWorksheet: boolean;
  @Input() id: String;
  @Input() studyId : String;
  @Output() onQAUpdate: EventEmitter = new EventEmitter();
  @Output() onUpdate: EventEmitter = new EventEmitter();
  @Input() disableQaSign:boolean;
  @Input() qasign:boolean;
  @Input() attendingWorkflowStatus: boolean;
  @Input() qaAttendingWorkflowStatus: boolean;
  @Input() submitOnSignFlag: boolean;

  assocPopup: boolean ;

  @ViewChild('newQaAssociationWrksht')
  newQaAssociationWrksht: ModalComponent;

  @ViewChild('submitForAttestationToast')
  submitForAttestationToast: ModalComponent;

  @ViewChild('submitToEMR')
  submitToEMR: ModalComponent;

  @ViewChild('associateQaWorksheetPopup')
  associateQaWorksheetPopup: ModalComponent;

  constructor(private observationService: ObservationsService,
  		private appState: AppState){
          if(this.attendingWorkflowStatus == 'Y' || this.attendingWorkflowStatus == 'y'){
      		this.attendingWorkflowStatus = true;
      	}

      	this.autoSave.bufferTime(5000)
              .subscribe((val) => {
              	if(val.length){
              		this.saveQAWorksheet().subscribe(res=>{
             				// display auto save complete message

             			},
             			err=>{

             			});
              	}
              });
      }

  ngOnInit(){
      this.initModel();

  }

  initQaWorksheet(){
    this.loadQaWorksheetList();
    this.loadQaWorksheet();
  }

  initModel(){
      if(!this.qaData){
          this.qaData = {};
      }
      if(!this.sqaData){
          this.sqaData = {};
      }
      if(!this.sqaData['qa']){
          this.sqaData['qa'] = {};
      }
      console.log("sqaData ... 1",this.sqaData['qa']);

  }

  ngOnChanges(changes: SimpleChanges) {
          this.initQaWorksheet();
          if(changes['qaData']){
              this.initModel();
          }
          if(changes['sqaData']){
              this.initModel();
              console.log("dddd",this.sqaData);
          }
  }

  public onQAChildChange(event){
  	 console.log("SECTION QA DATA", event);
     this.qaData[event.qaId] = event.qaData;
     this.autoSave.next();
  }

  public onChildChange(event){
  	this.publishChange();
  }

  publishChange(){
  this.onUpdate.emit({
      instruction: "SAVE",
      wrkshttype: "Procedural"
   });
  }

  loadQaWorksheetList(){
      this.observationService.getQaWorksheetList(this.studyId).subscribe(
           res=> {
              this.qaWorksheets = res['results'];
           },
           error=> console.error(error)
       );
  }

  loadQaWorksheet(){
      return this.observationService.getQaWorksheet(this.studyId,"QA").subscribe(
              res=> {
                    if(res.result && res.result.template && res.result.content){
                      this.qaWorksheetId = res.result.id;
                      this.qaTemplate = res.result.template.content;
                      this.qaSelectedTemplateId = res.result.template.id;
                      this.qaSelectedTemplateName = res.result.template.name;
                      this.qaData = res.result.content;
                      console.log("qadata",this.qaData);
                      console.log("qaworksheetId",this.qaWorksheetId);

                      return this.observationService.getQASignatureData(this.qaWorksheetId).subscribe(res=>{
                       	this.sqaData = res;
                       	this.qaSignId=res.qa.id;
                       	this.sqaData['qa'].signed = this.sqaData['qa'].sign ? true: false;

                       	if(this.sqaData['qa'].signed){
                       		this.disableQAWorksheet=true;
                       	}
                       	console.log("qa Signature Data.......2",this.sqaData);
                       	console.log("qa Sign Id",this.qaSignId);
                       	return true;
                       });
                      return true;
                  }
                    console.log("template id",this.qaSelectedTemplateId);
                  console.log("worksheet data empty");
                  return false;
           },
              error=> console.error(error)
      );
  }

  loadQaWorksheetTemplate(){
      this.observationService.getQaWorksheetTemplate(this.qaSelectedTemplateId).subscribe(
              res=> {
                  this.qaTemplate = res.result.content;
          },
              error=> console.error(error)
      );
  }

  onQaDropDownSelection(name:String){
    if(!this.qaSelectedTemplateName){
      this.textInAssociateQaWrkshtPopup();
    }else
    if(this.qaSelectedTemplateName != this.qaChangedTemplateName){
      this.textInAssociateQaWrkshtPopup();
    }
    else{
      console.log("INSIDE NO DROP DOWN DATA");
    }
  }

  onQaWorksheetSelection(id:String, name:String){
    this.qaChangedTemplateId = id;
      this.qaChangedTemplateName = name;
      this.qaSelectedTemplateId = id;
      console.log(this.qaSelectedTemplateId);
  }

  textInAssociateQaWrkshtPopup(){
  	this.newQaAssociationWrksht.open();
  }

  confirmQaAssociation()
  {
    this.confirmWorksheetChange();
    this.newQaAssociationWrksht.close();
    this.saveQAWorksheet().subscribe(console.log("QA wrksht saveed inside save"));

  }

  saveQAWorksheet(){
  	console.log("this.QAworksheetId",this.qaWorksheetId,this.qaData);
  	if(!this.qaWorksheetId)
  		{
  		console.log("true");
      return this.observationService.saveQaWorksheet(this.studyId,this.qaSelectedTemplateId,"QA", this.qaData).map(
              res=> {

                  this.qaWorksheetId = res;
                  console.log("inside qa worksheet",this.qaWorksheetId);
              },
              error=> console.error(error)
             );
        }
      else
      	{
      	console.log("Updating QA Worksheet",this.qaWorksheetId,this.qaData,this.studyId);
          return this.observationService.updateQAWorksheet(this.qaWorksheetId, this.qaData).map(
                  res=> {
                  	console.log("qaid",this.qaWorksheetId)
              },
                  error=> console.error(error)
          );
      	}
  }

  cancelQaAssociation(){
  	this.newQaAssociationWrksht.close();
  }

  confirmWorksheetChange(){
      this.qaSelectedTemplateId = this.qaChangedTemplateId;
      this.qaSelectedTemplateName = this.qaChangedTemplateName;
      this.loadQaWorksheetTemplate();
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

  onSave(){
  	this.saveQAWorksheet().subscribe(res=>{
      console.log(res);
    });
  	this.publishChange();
  }

  onChange(type,value){
      this.sqaData[type].signed = value;
      console.log("value",value,this.appState.get("userName"));
      if(value){
          this.sqaData[type].sign = this.appState.get("userName");
          this.sqaData[type].timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
          this.saveQASignature(type,this.sqaData[type].sign,this.sqaData[type].timestamp);
      }else{
          delete this.sqaData[type].sign;
          delete this.sqaData[type].timestamp;
          this.deleteQASignature();
      }

  }

  saveQASignature(type:String,sign:String,timestamp:String){
    this.observationService.getValidateSignature(this.studyId).subscribe(
        res => {
         if(res.userAttestedStatus===true) {
              this.observationService.saveQASignature(this.qaWorksheetId, type,sign,timestamp,this.studyId).subscribe(
               res=> {
                 if(res) {
                       this.qaSignId = res;
                       console.log("qasignId",this.qaSignId);
                       this.disableQAWorksheet=true;

                      this.onUpdate.emit({
                         instruction:"SAVEQASIGN",
                             type:"attending",sign:sign,timestamp:timestamp
                       });
                     }
                   }, error=> console.error(error));
        } else {
          this.observationService.saveQASignature(this.qaWorksheetId, type,sign,timestamp,this.studyId).subscribe(
             res=> {
                     this.qaSignId = res;
                     console.log("qasignId",this.qaSignId);
                     this.disableQAWorksheet=true;
                     if(this.submitOnSignFlag == true){
                     this.onSubmitSignFlow();
                     }
                 }, error=> console.error(error));
          }
        }, error => console.error(error));
  	}

  deleteQASignature(){
    console.log("qaSignId",this.qaSignId);
    this.observationService.getValidateSignature(this.studyId).subscribe(
    res => {
      if(res.userAttestedStatus===true) {
        console.log("inside qa attending attestation");
        this.observationService.deleteQAAttestedSignature(this.qaSignId, this.studyId).subscribe(
        res=> {
          console.log('deletesignature',res);
          this.disableQAWorksheet=false;
        }, error=> console.error(error));
      } else {
        this.observationService.deleteQASignature(this.qaSignId).subscribe(
        res=> {
          console.log('deletesignature',res);
          this.disableQAWorksheet=false;
        }, error=> console.error(error));
      }
    });
  }

  onSubmitSignFlow(){
    if(this.workflowStatus == true && this.attendingWorkflowStatus == true){
      this.observationService.submitToAttending(this.studyId).subscribe(
      res=> {
        this.submitForAttestationToast.open();
        var that = this;
        setTimeout(function() { that.submitForAttestationToast.close() }, 2000);
      }, error=> console.error(error));
    }
    else {
      this.observationService.submitWorksheet(this.studyId).subscribe(
      res=> {
      this.submitToEMR.open();
      var that = this;
      setTimeout(function() { that.submitToEMR.close() }, 2000);

      }, error=> console.error(error));
    }
  }
}
