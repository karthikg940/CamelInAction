import { Component, ChangeDetectorRef, ViewEncapsulation, HostListener, ViewChild, Input, Output, EventEmitter, OnInit, NgModule, VERSION} from '@angular/core';
import { Observable, Observer, Subject} from 'rxjs/Rx';
import {BrowserModule} from '@angular/platform-browser'
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ObservationsService } from './observations.service';
import { ObservationsTabsComponent } from './observations-tabs.component';
import { ObservationsTabComponent } from './observations-tab.component';
import { StudyListComponent } from '../../studylist/studylist.component';
import { UserGroupService } from '../../createusergroup/createusergroup.service';
import { Name } from '../../createusergroup/createusergroup.interface';
import { StudylistService } from '../../studylist/studylist.service';
import { SelectModule } from 'ng2-select/ng2-select';
import { FormsModule } from '@angular/forms';
import { UserPreferenceService } from '../../userpreference/userpreference.service';

@Component({
  selector: 'observations',
  templateUrl: './observations.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  providers: [StudyListComponent, UserGroupService,UserPreferenceService]
})

export class Observations {

  private wrkshttype: String;
  private examTypeSelect: string;
  private selectedExamType: String;
  private selectedExamTypeId: String;
  private activeExamTypeId: string;
  private selectedTemplateId: String;
  private selectedTemplateName: String;
  private examTypeSelcted: string;
  private changedExamType: String;
  private changedExamTypeId: String;
  private userQaId: String;
  private changedTemplateId: String;
  private changedTemplateName: String;
  private worksheetId: String;
  private signId: String;
  private signId1: String;
  public userNamesItems: Object[] = [];
  public usersNameList: Object[] = [];
  public examTypesList: Object[] = [];
  public listExamTypes: Object[] = [];
  private userNameExists: boolean = true;
  private examTypeExists: boolean = true;
  private studyType: string;
  private userSign: string;
  private signTimestamp: string;
  private userId: String;
  private selectExamType: string;
  private worksheets: Object[] = [];
  private template: Object;
  private data: Object = {};
  private sdata: Object = {};
  private inprogress: boolean = false;
  private isWorksheetOpenCancel: boolean;
  private submitResponse: Object = {};
  private disableQAWorksheet: boolean = true;
  private deactivateGaurdRes: Observer;
  private bufferWithTime: BufferWithTime;
  public items: Object[] = [];
  public nameList: Object[] = [];
  public userGroup: UserGroup = {};
  const autoSave: Subject = new Subject();
  const worksheetCreationEvent = null;
  private enableLoadingIcon: boolean = false;
  private pdfResponse: Object = {};
  private listTags: Object[] = [];
  public tagsList: Object[] = [];
  private activeTagList: Object[] = [];
  assocPopup: boolean;
  private qId: String;
  private studyStat: String;
  private disableSubmitQA: boolean = true;
  private qasign: boolean = false;
  private disableQaSign: boolean = false;
  private pdfWorksheet: any = null;
  private pdfQa: any = null;
  private qaWorksheetId: String;
  private value: any = ['Athens'];
  private _disabledV: string = '0';
  private disabled: boolean = false;
  public isValid:boolean = false;
  private viewmore:boolean;

  private statusMsg:String;
  @Input() studyId: String;
  @Input() examType: String[];
  @Input() status: String[];
  @Input() patientDetails: Object;
  @Input() referringPhysicianId: String;
  @Output() onInprogress: EventEmitter = new EventEmitter();
  @Output() isWorksheetOpen: EventEmitter = new EventEmitter();
  @Input() assignedUser: String;
  @Input() loginUserId: String;
  @Input() workflowStatus: boolean;
  @Input() attendingWorkflowStatus: boolean;
  @Input() qaAttendingWorkflowStatus: boolean;
  @Input() submitOnSignFlag: boolean;
  @Input() attendingUser: String
  @Input() qaUser: String;

  @ViewChild('resetPopup')
  resetPopup: ModalComponent;

  @ViewChild('cancelPopup')
  cancelPopup: ModalComponent;

  @ViewChild('saveSuccessPopup')
  saveSuccessPopup: ModalComponent;

  @ViewChild('submitToEMR')
  submitToEMR: ModalComponent;

  @ViewChild('worksheetChangePopup')
  worksheetChangePopup: ModalComponent;

  @ViewChild('examTypeChangePopup')
  examTypeChangePopup: ModalComponent;

  @ViewChild('saveSignaturePopUp')
  saveSignaturePopUp: ModalComponent;

  @ViewChild('submitWorksheetPopup')
  submitWorksheetPopup: ModalComponent;

  @ViewChild('associateWorksheetPopup')
  associateWorksheetPopup: ModalComponent;

  @ViewChild('worksheetValidationPopup')
  worksheetValidationPopup: ModalComponent;

  @ViewChild('userlistAndGrouplistPopup')
  userlistAndGrouplistPopup: ModalComponent;

  @ViewChild('submitToReviewToast')
  submitToReviewToast: ModalComponent;

  @ViewChild('submitForAttestationToast')
  submitForAttestationToast: ModalComponent;

  @ViewChild('assignstudytoattendingPopup')
  assignstudytoattendingPopup: ModalComponent;

  @ViewChild('examTypeslistPopup')
  examTypeslistPopup: ModalComponent;

  @ViewChild('saveAttestedSignaturePopUp')
  saveAttestedSignaturePopUp: ModalComponent;

  @ViewChild('choosePdfPopup')
  choosePdfPopup: ModalComponent;

  @ViewChild('newAssociationWrksht')
  newAssociationWrksht: ModalComponent;
  private examTypeFlag:boolean;

  @ViewChild('createOrderPopUp')
  createOrderPopUp: ModalComponent;
  @ViewChild('createOrderSuccessToast')
  createOrderSuccessToast: ModalComponent;

  @ViewChild('cancelOrderToast')
  cancelOrderToast: ModalComponent;

  // ***************ng2-select

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value.id);
  }

  public selectedExamTypes(value: any): void {
    this.selectExamType = value.text;
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public refreshValue(value: any): void {
    this.userId = value.id;
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public itemsToString(value: Array<any> = []): string {
    return value
    .map((item: any) => {
    return item.text;
    }).join(',');
  }

  constructor(private observationService: ObservationsService, private studylistComponent: StudyListComponent, private userGroupService: UserGroupService, private userPreferenceService: UserPreferenceService) {
    if (this.attendingWorkflowStatus == 'Y' || this.attendingWorkflowStatus == 'y') {
      this.attendingWorkflowStatus = true;
    }
    else if (this.qaAttendingWorkflowStatus == 'Y' || this.qaAttendingWorkflowStatus == 'y') {
      this.qaAttendingWorkflowStatus == true;
    }
    this.autoSaveAlert = true;
    this.autoSave.bufferTime(5000)
    .subscribe((val) => {
      if (val.length) {
      if (!this.worksheetId) {
        if (this.worksheetCreationEvent) {
          this.autoSave.next();
          return;
        }
      }
      this.enableLoadingIcon = true;
      this.saveWorksheet(false, "Procedural").subscribe(res => {
        this.enableLoadingIcon = false;
      },
      err => {
        this.worksheetCreationEvent = null;
      });
      }
    });
  }


  generateArrayForAllUsers(userOjects) {
    userOjects.results.filter(element => {
      if (element.userStatus == 'Y') {
        this.usersNameList.push(new Name("" + element.userId,element.firstName + " " + element.lastName));
      }
    });
  }

  generateExamTypeArray(examTypeObject) {
    this.listExamTypes = [];
    examTypeObject.results.filter(element => {
      this.listExamTypes.push(new Name("" + element.id,element.name));
    });
  }

  ngOnInit() {
    this.userGroupService.getUserList().subscribe(
    res => {
      this.generateArrayForAllUsers(res);
      this.userNamesItems = this.usersNameList;
    });
  }

  public selected(value: any): void {
    this.userId = value.id;
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public refreshValue(value: any): void {
    this.userId = value ? value.id : value;
  }

  initWorksheet() {
    if (this.examType && this.examType.length > 0 && this.studyId) {
      this.selectedExamType = this.examType[0][0]['examtype'];
      this.selectedExamTypeId = this.examType[0][0]['id'];
      this.tagsForExamType(this.selectedExamTypeId);
      this.tagsForStudy(this.studyId);
      this.loadWorksheetList(this.selectedExamType);
      this.loadWorksheet();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Worksheet ngOnChanges", changes, this.data);
    if (changes['examType'])
      this.initWorksheet();
  }

  clearWorksheet() {
    this.data = {};
    this.sdata = {};
    this.template = null;
    this.worksheetId = null;
    this.worksheetCreationEvent = null;
  }

  loadWorksheet() {
    if ((this.status[0] == "QAAssigned" || this.status[0] == "QAInProgress") && this.workflowStatus == true) {
    return this.observationService.getWorksheet(this.studyId, "Procedural").subscribe(
      res => {
        if (res.result && res.result.template && res.result.content) {
          this.worksheetId = res.result.id;
          this.template = res.result.template.content;
          this.selectedTemplateId = res.result.template.id;
          this.selectedTemplateName = res.result.template.name;
          this.data = res.result.content;
          this.publishInprogressState(false);
          return this.observationService.getSignatureData(this.worksheetId).subscribe(res => {
            this.sdata = res;
            this.signId = res.poc.id;
            this.signId1 = res.attending.id;
            return true;
          });
          return true;
        }
        console.log("worksheet data empty");
        return false;
      },
      error => console.error(error)
    );
    }
    else {
      return this.observationService.getWorksheet(this.studyId, "Procedural").subscribe(
        res => {
          if (res.result && res.result.template && res.result.content) {
          this.worksheetId = res.result.id;
          this.template = res.result.template.content;
          this.selectedTemplateId = res.result.template.id;
          this.selectedTemplateName = res.result.template.name;
          this.data = res.result.content;
          this.publishInprogressState(false);
          return this.observationService.getSignatureData(this.worksheetId).subscribe(res => {
            this.sdata = res;
            this.signId = res.poc.id;
            this.signId1 = res.attending.id;
            return true;
            });
          return true;
          }
          return false;
        },
        error => console.error(error)
      );
    }
  }

  loadWorksheetList(examType:String) {
	  if (examType == 'viewmore') {
          this.isValid = true;
          this.examTypeFlag = false;
      }
      else if (examType == 'Unspecified') {
          this.isValid = true;
          this.viewmore = true;
          this.examTypeFlag = false;
      }
      else if ((this.status[0] == 'Pending' || this.status[0]== 'New' || this.status[0]== 'Assigned') && (examType !== 'Unspecified') && (this.loginUserId == this.assignedUser) ){
      	this.isValid = false;
          this.viewmore = false;
          this.examTypeFlag = true;
      }
      else {
          this.isValid = true;
      }
    this.observationService.getWorksheetList(this.studyId,this.examTypeFlag).subscribe(
      res => {
        this.worksheets = res['results'];
          if (examType == 'viewmore') { var myProgressBar = document.querySelector(".moreClose");
            myProgressBar.classList.add('open');
            }

      },
      error => console.error(error)
    );

  }

  loadWorksheetTemplate() {
    this.observationService.getWorksheetTemplate(this.selectedTemplateId).subscribe(
      res => {
        this.template = res.result.content;
      },
      error => console.error(error)
    );
  }

  deleteWorksheet() {
    if (this.worksheetId)
    this.observationService.deleteWorksheet(this.worksheetId).subscribe(
      res => {
        console.log('deleteWorksheet', res);
      },
      error => console.error(error)
    );
  }

  onWorksheetSelection(id: String, name: String) {
    this.changedTemplateId = id;
    this.changedTemplateName = name;
    this.selectedTemplateId = id;
  }

  onWorksheetChangesModelPopup() {
    this.examTypeChangePopup.open();
    const res = new Observable((obs) => this.deactivateGaurdRes = obs);
    console.log('onWorksheetChangesModelPopup', res);
    return res;
  }

  onExamTypeChangeComplete() {
    this.selectedExamTypeId = this.changedExamTypeId;
    this.selectedExamType = this.changedExamType;
    this.selectedTemplateId = null;
    this.selectedTemplateName = null;
    this.clearWorksheet();
    this.loadWorksheetList(this.selectedExamType);
    this.loadWorksheet();
    this.publishInprogressState(false);
  }

  saveWorksheet(skipSetWorksheetId?: boolean, wrkshttype: String) {
    if (!this.worksheetId) {
      if (this.worksheetCreationEvent)
      return this.worksheetCreationEvent;
      this.worksheetCreationEvent = this.observationService.saveWorksheet(this.studyId, this.referringPhysicianId, this.selectedExamTypeId,
      this.selectedTemplateId, wrkshttype, this.data).map(
        res => {
          if (res && !skipSetWorksheetId)
          this.worksheetId = res;
          this.worksheetCreationEvent = null;
          this.publishInprogressState(false);
          this.autoSaveAlert = true;
        },
        error => console.error(error)
      );
      return this.worksheetCreationEvent;
    }
    else
    return this.observationService.updateWorksheet(this.worksheetId, this.data, this.studyId, this.selectedExamTypeId).map(
      res => {
        this.publishInprogressState(false);
        this.autoSaveAlert = true;
        if ((this.status[0] == "QAAssigned" || this.status[0] == "QAInProgress") && this.workflowStatus == true) {
          this.disableSubmitButton = true;
          this.disableExamApproval = true;
        }
      },
      error => console.error(error)
    );
  }

  displaySaveToast() {
    this.saveSuccessPopup.open();
    var that = this;
    setTimeout(function() { that.saveSuccessPopup.close() }, 2000);
    if (this.deactivateGaurdRes) {
      this.deactivateGaurdRes.next(true);
    }
  }

  displaySubmitToEMRToast() {
    this.submitToEMR.open();
    var that = this;
    setTimeout(function() { that.submitToEMR.close() }, 2000);
    if (this.deactivateGaurdRes) {
      this.deactivateGaurdRes.next(true);
    }
  }

  saveSignature(type, sign, timestamp) {
    if(this.submitOnSignFlag == true){
    return this.observationService.saveSignature(this.worksheetId, type, sign, timestamp, this.studyId).subscribe(
      res => {
        if (res)
        if (type == "poc") {
          this.signId = res;
        }
        else {
          this.signId1 = res;
        }
        var that = this;
        this.autoSaveAlert = true;
        this.publishInprogressState(false);
        this.submitOnSignFlow();
      },
      error => console.error(error)
    );
    }
    else{
      this.saveSignaturePopUp.open();
      return this.observationService.saveSignature(this.worksheetId, type, sign, timestamp, this.studyId).subscribe(
        res => {
          if (res)
          if (type == "poc") {
            this.signId = res;
          }
          else {
            this.signId1 = res;
          }

          var that = this;
          this.autoSaveAlert = true;
          setTimeout(function() { that.saveSignaturePopUp.close() }, 2000);
          this.publishInprogressState(false);
        },
        error => console.error(error)
      );
    }
  }

  submitOnSignFlow(){
    this.observationService.getStudy(this.studyId).subscribe(
      res => {
        this.studyStat = res[0].status[0];
        if(this.workflowStatus == true && this.attendingWorkflowStatus == true){
          if(this.studyStat == 'Signed' || this.studyStat == 'signed'){
            this.submitToReview();
          }
          else if(this.studyStat == 'Attested' || this.studyStat == 'attested'){
            this.submitWorksheet();
          }
        }
        else if(this.workflowStatus == true){
          if(this.studyStat == 'Signed' || this.studyStat == 'signed'){
            this.submitToReview();
          }
          else {
            this.submitWorksheet();
          }
        }
        else if(this.attendingWorkflowStatus == true){
          if(this.studyStat == 'Signed' || this.studyStat == 'signed'){
            this.submitForAttending();
          }
          else if(this.studyStat == 'Attested' || this.studyStat == 'attested'){
            this.submitWorksheet();
          }
        }
        else{
          this.submitWorksheet();
        }
      },
      error => console.error(error)
    );
  }

  saveAttestedSignature(type, sign, timestamp) {
    if(this.submitOnSignFlag == false){
      this.saveAttestedSignaturePopUp.open();
    }
    return this.observationService.saveAttestedSignature(this.worksheetId, type, sign, timestamp, this.studyId).subscribe(
      res => {
        if (res)
        if (type == "poc") {
          this.signId = res;
        }
        else {
          this.signId1 = res;
        }
        this.observationService.submitToAttending(this.studyId).subscribe(
          res => {
            this.submitResponse = { readyForAttestation: false };
            this.submitResponse = res;
            if(this.submitOnSignFlag == true){
            this.submitWorksheet();
            }
          },
          error => console.error(error)
        );
        var that = this;
        this.autoSaveAlert = true;
        setTimeout(function() { that.saveAttestedSignaturePopUp.close() }, 2000);
        this.publishInprogressState(false);
      },
      error => console.error(error));
  }

  saveWorksheetAndSignature(type, sign, timestamp) {
	this.isValid = true;
    this.studyType = type;
    this.userSign = sign;
    this.signTimestamp = timestamp;
    this.type = this.data.wrk1;
    if (this.data.wrk1) {
      if (this.type.hasOwnProperty('examoverview')) {
        if (Object.keys(this.type.examoverview).length === 3) {

          console.log("inside saveWorksheetAndSignature", "type", type + " " + sign + " " + timestamp);
          if (this.attendingWorkflowStatus == true) {
          return this.observationService.getAttendingUser(this.studyId).subscribe(
          res => {
          if (res.status == true) {
          this.saveValidateSignature(this.studyType, this.userSign, this.signTimestamp);
          }
          else if (res.status == false) {
          this.assignstudytoattendingPop();
          }
          },
          error => console.error(error));
          } else {
            this.saveValidateSignature(this.studyType, this.userSign, this.signTimestamp);
          }
        } else {
        	 this.isValid = false;
          this.worksheetValidationPopup.open();
        }
      } else {
    	  this.isValid = false;
        this.worksheetValidationPopup.open();
      }
    } else {
    	 this.isValid = false;
      this.worksheetValidationPopup.open();
    }
  }

  saveValidateSignature(studyType: string, userSign: string, signTimestamp: string) {
    this.observationService.getValidateSignature(this.studyId).subscribe(
      res => {
        if (res.userAttestedStatus == true && this.workflowStatus === false) {
          this.sdata['attending'].sign = this.userSign;
          this.sdata['attending'].timestamp = this.signTimestamp;
          this.sdata['attending'].signed = true;
          this.saveAttestedSignature(this.studyType, this.userSign, this.signTimestamp);
        }
        else {
          this.saveSignature(this.studyType, this.userSign, this.signTimestamp);
        }
      }, error => console.error(error));
  }

  assignstudytoattendingPop() {
    this.assignstudytoattendingPopup.open();
  }

  cancelAssignToAttend() {
	this.isValid = false;
    this.sdata = {};
    this.assignstudytoattendingPopup.close();
  }

  confirmAssignToAttend() {
    if (this.userId) {
      this.userNameExists = true;
      return this.observationService.assignStudyToAttending(this.studyId, this.userId).subscribe(
        res => {
          this.assignstudytoattendingPopup.close();
          this.saveValidateSignature(this.studyType, this.userSign, this.signTimestamp);
        },
        error => console.error(error));
    }
    else {
      this.userNameExists = false;
    }
  }

  deleteSignature(type) {
    if (type == "poc") {
    this.isValid = false;
    this.observationService.getValidateSignature(this.studyId).subscribe(
      res => {
        if (res.userAttestedStatus === true && this.workflowStatus === false) {
        this.observationService.deleteAttestedSignature(this.signId, this.studyId).subscribe(
          res => {
            console.log('deletesignature', res);
          }, error => console.error(error));
        }
        else {
          this.observationService.deleteSignature(this.signId, this.studyId).subscribe(
            res => {
              console.log('deletesignature', res);
            }, error => console.error(error));
        }
      }, error => console.error(error));
    }
    else {
      this.observationService.deleteSignature(this.signId1, this.studyId).subscribe(
        res => {
          console.log('delete Attending signature ', res);
        },
        error => console.error(error)
      );
    }
  }

  submitWorksheetbtn() {

    this.submitWorksheetPopup.open();
  }

  submitWorksheet() {
         this.disableExamApproval = true;
         this.statusMsg = '';
         this.observationService.submitWorksheet(this.studyId).subscribe(
	 res => {
         this.submitResponse = { readyForSubmission: false };
		 this.submitResponse = res;
         this.disableQaSign = true;
         this.statusMsg = 'Study successfully submitted to EMR';
         this.displaySubmitToEMRToast(this.statusMsg);
       },
     error => {
		if(error.status == 412){
        this.cancelOrderToast.open();
		    this.cancelAndCreateOrder();
		}
		else if(error.status == 428){
		this.createOrderPopUp.open();
	}
	console.error(error)
		}
	);
}


  confirmSubmitChange() {
	  this.isValid = true;
    this.submitWorksheetPopup.close();
    this.submitWorksheet();
  }

  cancelSubmitChange() {
    this.submitWorksheetPopup.close();
  }

  cancelWorksheetChange() {
    this.worksheetChangePopup.close();
  }

  confirmWorksheetChange() {
    this.worksheetChangePopup.close();
    this.selectedTemplateId = this.changedTemplateId;
    this.selectedTemplateName = this.changedTemplateName;
    this.deleteWorksheet();
    this.clearWorksheet();
    this.loadWorksheetTemplate();
  }

  cancelWorksheet() {
    this.cancelPopup.open();
  }

  resetWorksheet() {
    this.resetPopup.open();
  }

  confirmReset() {
    this.resetPopup.close();
    this.autoSave.next();
    this.data = {};
  }

  cancelReset() {
    this.resetPopup.close();
  }

  confirmCancel() {
    $(".wrkshtpanelbody").slideUp();
    this.cancelPopup.close();
    if ($(".worksheet").hasClass("active")) {
      this.isWorksheetOpenCancel = true;
      this.isWorksheetOpen.emit(this.isWorksheetOpenCancel);
    }
    this.data = {};
    this.loadWorksheet();
  }

  cancelCancel() {
    this.cancelPopup.close();
  }

  confirmChanges() {
    this.examTypeChangePopup.close();
    this.saveWorksheet(true, "Procedural").subscribe(res => this.displaySaveToast());
    this.onExamTypeChangeComplete();
  }

  cancelChanges() {
    this.examTypeChangePopup.close();
    this.onExamTypeChangeComplete();
    if (this.deactivateGaurdRes) {
      this.deactivateGaurdRes.next(true);
    }
  }

  disableQa(qId: String) {
    if (qId) {
      this.qasign = true;
    }
    else
      this.qasign = false;
  }

  public onWorksheetUpdate(event) {
    if (event.instruction) {
      switch (event.instruction) {
        case 'SAVE': this.saveWorksheet(false, "Procedural").subscribe(res => this.displaySaveToast()); break;
        case 'CANCEL': this.cancelWorksheet(); break;
        case 'RESET': this.resetWorksheet(); break;
        case 'SIGN': this.saveWorksheetAndSignature(event.type, event.sign, event.timestamp); break;
        case 'UNSIGN': this.deleteSignature(event.type); break;
        case 'SAVEQASIGN': this.saveQAAttestedAttendSignature(event.type, event.sign, event.timestamp, ); break;
        // case 'DELETEQASIGN': this.enableQa();break;
        default: break;
      }
    } else {
      this.data[event.id] = event.data;
      this.publishInprogressState(true);
      this.autoSave.next();
    }
  }

  saveQAAttestedAttendSignature(type, sign, timestamp) {
    this.sdata['attending'].sign = sign;
    this.sdata['attending'].timestamp = timestamp;
    this.sdata['attending'].signed = true;
    this.saveWorksheet(false, "Procedural").subscribe(res => this.saveAttendingAttestedSignature(type, sign, timestamp));
  }

  saveAttendingAttestedSignature(type, sign, timestamp) {
    if(this.submitOnSignFlag == false){
    this.saveAttestedSignaturePopUp.open();
    }
    this.observationService.saveAttendingAttestedSignature(this.worksheetId, type, sign, timestamp, this.studyId).subscribe(
      res => {
        if (res)
        if (type == "poc") {
          this.signId = res;
        } else {
          this.signId1 = res;
        }
        var that = this;
        this.autoSaveAlert = true;
        this.observationService.submitToAttending(this.studyId).subscribe(
          res => {
            this.submitResponse = { readyForAttestation: false };
            this.submitResponse = res;
            if(this.submitOnSignFlag == true){
            this.submitWorksheet();
          }
          }, error => console.error(error));
        setTimeout(function() { that.saveAttestedSignaturePopUp.close() }, 2000);
        this.publishInprogressState(false);
      }, error => console.error(error));
  }

  enableQa() {
    this.sdata['attending'] = {};
  }

  publishInprogressState(pendingFlag) {
    this.inprogress = pendingFlag;
    this.onInprogress.emit({
      flag: pendingFlag
    });
  }

  textInAssociateWrkshtPopup() {
	  if(!this.worksheetId){
          this.assocPopup = true;
          this.newAssociationWrksht.open();
	}
	else if (this.worksheetId && (this.selectExamType != this.examType[0][0].examtype)) {
		  this.assocPopup = false;
		  this.associateWorksheetPopup.open();
	}
  }

  selectExamTypesByTemplate() {
    if (!this.selectedTemplateName) {
      this.textInAssociateWrkshtPopup();
    } else
    if (this.selectedTemplateName != this.changedTemplateName) {
      this.textInAssociateWrkshtPopup();
    }
    else {
      console.log("INSIDE NO DROP DOWN DATA");
    }
  }

  onDropDownSelection(name: String) {
    return this.observationService.getExamTypesByTemplate(name).subscribe(
      res => {
      if (res.results.length > 1) {
          this.examTypeslistPopup.open();
          this.generateExamTypeArray(res);
          this.examTypesList = this.listExamTypes;
        }
        else {
          this.examTypeSelcted = res.results[0].name;
          this.selectExamTypesByTemplate();
        }
      },
      error => console.error(error)
    );
  }

  confirmAssociation() {
    this.confirmWorksheetChange();
    if (this.assocPopup == true) {
      this.newAssociationWrksht.close();
    }
    else if (this.assocPopup == false) {
      this.associateWorksheetPopup.close();
    }
    this.examType[0][0].id = this.selectedExamTypeId;
    if (this.selectExamType) {
      this.examTypeSelect = this.selectExamType;
    }
    else {
      this.examTypeSelect = this.examTypeSelcted;
    }
    this.observationService.worksheetAssociation(this.studyId, this.examTypeSelect, "Procedural", this.selectedTemplateName).subscribe(
      res => {
        this.selectExamType = null;
        this.examTypeExists = true;
        if ((this.examType[0][0].examtype != undefined) && res.status == true && (this.examType[0][0].examtype == res.name)) {
          this.tagsForExamType(res.id);
          this.tagsForStudy(this.studyId);
        }
        else {
          this.deleteTagsForStudy(this.studyId);
          this.tagsForExamType(res.id);
          this.activeTagList = [];
          this.tagsList = [];
        }
        this.examType[0][0].examtype = res.name;
         this.loadWorksheetList(res.name);
          this.isValid=false;
        this.saveWorksheet(false, "Procedural").subscribe(console.log("wrksht saved inside save"));
      },
      error => console.error(error)
    );
  }

  cancelAssociation() {
    if (this.assocPopup == true) {
      this.newAssociationWrksht.close();
    }
    else if (this.assocPopup == false) {
      this.associateWorksheetPopup.close();
    }
  }

  validateWorksheet() {
    this.worksheetValidationPopup.close();
    this.sdata = {};
  }

  activeUserslist() {
    return this.observationService.getActiveUserDetails().subscribe(
      res => {
        this.activeUsers = res;
        this.generateArray(this.activeUsers);
      },
      error => console.error(error)
    );
  }

  activeGroupslist() {
    return this.observationService.getUserGroupDetails().subscribe(
      res => {
        this.activeGroups = res;
        if (!(Object.keys(this.activeGroups.results).length === 0)) {
          this.generateArrayofGroup(this.activeGroups);
        }
        var that = this;
        setTimeout(function() { that.items = that.nameList; that.userlistAndGrouplistPopup.open() }, 300);
      },
      error => console.error(error)
    );
  }

  submitforQA() {
    this.submitToReview();
  }

  submitForAttending() {
	this.isValid = true;
    this.disableExamApproval = true;
    this.observationService.submitToAttending(this.studyId).subscribe(
      res => {
        this.submitResponse = { readyForAttestation: false };
        console.log('submit for Attestaion', res);
        this.submitResponse = res;
        if(this.submitOnSignFlag == true){
        this.submitForAttestationToast.open();
      }
      var that = this;
      this.autoSaveAlert = true;
      setTimeout(function() { that.submitForAttestationToast.close() }, 2000);
      },
      error => console.error(error)
    );
  }

  generateArray(userObjects) {
    userObjects.results.filter(element => {
      this.nameList.push(new Name("" + element.userId,element.firstName + " " + element.lastName));
    });
  }

  generateArrayofGroup(groupObjects) {
    groupObjects.results.filter(element => {
      this.nameList.push(new Name("" + element.userGroupId,element.groupName + "   " + "-G"));
    });
  }

  selectUserorGroup() {
    this.userlistAndGrouplistPopup.close();
    this.submitToReview();
  }

  submitToReview() {
	this.isValid = true;
    this.userQaId = '';
    return this.observationService.submitToQA(this.studyId, this.userQaId).subscribe(
      res => {
        this.reviewResponse = { readyForReview: false };
        this.submitToReviewToast.open();
        var that = this;
        this.autoSaveAlert = true;
        setTimeout(function() { that.submitToReviewToast.close() }, 2000);
      },
      error => console.error(error)
      );
  }

  cancelUserorGroup() {
    this.userlistAndGrouplistPopup.close();
  }

  generatePdf() {
    if (this.workflowStatus == true || this.qaAttendingWorkflowStatus == true) {
      this.choosePdfPopup.open();
    }
    else {
      var win = window.open('', '_blank');
      return this.observationService.generatePdfReport(this.worksheetId).subscribe(
        res => {
          var fileURL = URL.createObjectURL(res);
          win.location.href = fileURL;
          win.focus();
        },
        error => console.error(error)
      );
    }
  }
  
   generateSRReport() {
      var win = window.open('', '_blank');
      return this.observationService.generateSRReport(this.studyId).subscribe(
        res => {
          var fileURL = URL.createObjectURL(res);
          win.location.href = fileURL;
          win.focus();
        },
        error => console.error(error)
      );
  }

  confirmExamType() {
    if (this.selectExamType != null) {
      this.changeExamTypesTemplate();
      this.examTypeslistPopup.close();
    } else {
      this.examTypeExists = false;
    }
  }

  changeExamTypesTemplate() {
    if (!this.selectedTemplateName) {
      this.textInAssociateWrkshtPopup();
    }
    else if (this.examType[0][0].examtype != this.selectExamType || this.selectedTemplateName != this.changedTemplateName) {
      this.textInAssociateWrkshtPopup();
    }
  }

  cancelExamType() {
    this.examTypeslistPopup.close();
    this.selectExamType = null;
    this.examTypeExists = true;
  }

  /*Tags*/

  tagsForExamType(id) {
    this.observationService.getTagsForExamType(id).subscribe(
      res => {
        this.generateTagArray(res);
        this.tagsList = this.listTags;
		this.userPreferenceService.getAllPersonalTags(this.loginUserId).subscribe(
          		response => {
          		this.generateTagArray(response);
         		  this.tagsList = this.tagsList.concat(this.listTags);
         		  console.log("<<<<<<<"+JSON.stringify(this.tagsList));
          		},
          		error => console.error(error)
          		);
              },
      error => console.error(error)
    );
  }

  generateTagArray(tagsObject) {
    this.listTags = [];
    for (let len = tagsObject.length, pos = 0; pos < len; pos++) {
      this.listTags.push({ id: tagsObject[pos].id, name: tagsObject[pos].name,type: tagsObject[pos].type })
    }
  }

  tagsForStudy(studyId) {
    this.observationService.getTagsForStudy(studyId).subscribe(
      res => {
        this.generateTagArray(res);
        this.activeTagList = this.listTags;
      },
      error => console.error(error)
    );
  }

  deleteTagsForStudy(studyId) {
    this.observationService.deleteTagsForStudyService(studyId).subscribe(
      res => {
      },
      error => console.error(error)
    );
  }

  /* Pdf Viewer */
  onChangeWorksheetPdf(type, value) {
    if (value) {
      if (type == "qaPdfId") {
        this.pdfWorksheet = null;
        return this.observationService.getQaWorksheetId(this.studyId).subscribe(
        res => {
        this.pdfQa = res.qaId;
        });
      }
      else if (type == "worksheetPdfId") {
        this.pdfQa = null;
        this.pdfWorksheet = this.worksheetId;
      }
    }
  }

  confirmGeneratePDF() {
    this.choosePdfPopup.close();
    var win = window.open('', '_blank');
    if (this.pdfWorksheet && !this.pdfQa) {
      return this.observationService.generatePdfReport(this.pdfWorksheet).subscribe(
        res => {
          var fileURL = URL.createObjectURL(res);
          win.location.href = fileURL;
          win.focus();
        },
        error => console.error(error)
      );
    }
    else if (!this.pdfWorksheet && this.pdfQa) {
      return this.observationService.generatePdfReport(this.pdfQa).subscribe(
        res => {
          var fileURL = URL.createObjectURL(res);
          win.location.href = fileURL;
          win.focus();
        },
        error => console.error(error)
      );
    }
  }

  cancelGeneratePDF() {
    this.choosePdfPopup.close();
  }

  confirmCreateOrder(){
    return this.observationService.createOrderForStudy(this.studyId).subscribe(
      res => {
        this.createOrderPopUp.close();
        this.createOrderSuccessToast.open();
        var that = this;
      setTimeout(function() { that.createOrderSuccessToast.close() }, 2000);
      },
      error => console.error(error));
  }

  cancelCreateOrder(){
    this.createOrderPopUp.close();
  }
  cancelAndCreateOrder(){
    return this.observationService.cancelOrder(this.studyId).subscribe(
      res => {
        var that = this;
      setTimeout(function() { that.cancelOrderToast.close() }, 3000);
      },
      error => {
         this.cancelOrderToast.close()
        console.error(error))
      }
  }

}
