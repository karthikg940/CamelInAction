import { Component, ChangeDetectorRef, ViewEncapsulation, HostListener, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Observations } from './observations/observations.component';
import { ViewerDetailsComponent } from './imageviewer-details/viewer-details.component';
import { ViewerHeaderComponent } from './viewerheader/viewerheader.component';
import { StudylistService } from '../studylist/studylist.service';
import { AppState } from '../app.service';

@Component({
templateUrl: './imageviewer.component.html',
styleUrls:['imageviewer.component.css'],
encapsulation: ViewEncapsulation.None
})

export class ImageViewerComponent {

  private studyId:String;
  private examType:Object[];
  private status:Object[];
  private viewerTableData: any = {};
  private isWorsheetOpen: boolean = false;
  private referringPhysicianId:String;
  public viewerDetail: Object = {};
  private worksheetInprogress:boolean = false;
  private routeBolleanValue:boolean = false;
  private assignedUser:String;
  private qaUser:String;
  private loginUserId:String = null;
  private workflowStatus:boolean;
  private attendingWorkflowStatus:boolean;
  private qaAttendingWorkflowStatus:boolean;
  private submitOnSignFlag:boolean;
  private objectId:any[];
  private studyUid:String;
  private dicomProtocol:boolean;

  @ViewChild(Observations) childcmp:Observations;

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return true;
  }

  constructor(private ref: ChangeDetectorRef, private activatedRoute: ActivatedRoute,
  private studyService:StudylistService,private appState: AppState) { }

  ngOnInit() {
    this.loadUserName();
    this.loadPreference();

    this.viewerDetail = null;
    this.activatedRoute.params
    .map(params => params['id'])
    .subscribe((id) => {
      this.studyId = id;
      this.studyService.getStudyDetails(id).subscribe(
      viewerData => {
        this.viewerDetail = viewerData[0];
        this.examType = this.viewerDetail["examType"];
        this.status = this.viewerDetail["status"];
        this.referringPhysicianId= this.viewerDetail.referringphysician.id;
        this.assignedUser = this.viewerDetail.assignedUser[0].id;
        this.qaUser = this.viewerDetail.qaUser[0]?this.viewerDetail.qaUser[0].id:"13";
        this.attendingUser = this.viewerDetail.attendingUser[0].id;
        this.objectId = this.viewerDetail.objectId;
        this.studyUid = this.viewerDetail.studyUid;
        this.dicomProtocol = this.viewerDetail.dicomProtocol;
        
        console.log("this.seriesUid",this.studyUid,this.objectId);
        console.log("this.qaUser",this.qaUser);
        console.log("referringphysicianid"+this.referringPhysicianId);
        console.log("assignedUser",this.assignedUser);
        console.log('imageViewer',viewerData);
        console.log('imageViewer status',this.status);
      });
    });
  }

  loadUserName() {
    this.appState.getUserName().subscribe(
    userNameData => {
      this.Uname = userNameData;
      this.loginUserId = userNameData.id;
      return userNameData;
    },
    error => console.error(error));
  }

  loadPreference(){
    this.appState.getPreference().subscribe(
    preference => {
      this.workflowPreference = preference;
      this.workflowStatus = preference.qaEnabled;
      this.attendingWorkflowStatus = preference.attestationEnabled;
      this.qaAttendingWorkflowStatus = preference.pocQaAttending;
      this.submitOnSignFlag = preference.submitOnSign;
      console.log('Preference res',preference)
    },
    error =>  console.error(error));
  }

  ngAfterViewInit(){
    var that = this;
    $('document').ready(function(){
      $('.btnWorksheet').click(function(){
      if($(".worksheet").hasClass("active")){
        that.isWorksheetOpen = false;
        $(".worksheet").removeClass("active");
        $(".wrksheetMovableContainer").removeClass('m-l-320');
        that.ref.detectChanges();
      }else{
        that.isWorksheetOpen = true;
        $(".worksheet").addClass("active");
        $(".wrksheetMovableContainer").addClass('m-l-320');
        that.ref.detectChanges();
      }
      });
    })
  }

  public onWorsheetInprogress(event){
    console.log("onWorsheetInprogress", event);
    if(event.flag!=null){
      this.worksheetInprogress = event.flag;
    }
  }

  public isWorksheetInProgress(){
    console.log("isWorksheetInProgress", this.worksheetInprogress);
    return this.worksheetInprogress;
  }

  onNotify(message):void {
    this.isWorksheetOpen = message;
    console.log("Some Value for Close:",this.isWorksheetOpen);
  }

}
