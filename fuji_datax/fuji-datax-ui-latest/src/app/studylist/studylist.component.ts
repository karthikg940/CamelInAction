import { Component, ChangeDetectorRef, Inject, EventEmitter, ViewChild, SimpleChanges} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Moment from 'moment';
import {StudylistService} from './studylist.service';
import {IFilter, SearchData} from './studylist.modal';
import {AppState} from '../app.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SelectModule } from 'ng2-select/ng2-select';
import { UserGroupService } from '../createusergroup/createusergroup.service';
import { UserGroup, Name } from '../createusergroup/createusergroup.interface';
import { IDuration } from '../app.model';

@Component({
  templateUrl: './studylist.component.html'
})

export class StudyListComponent {

private studylistTableData: any = {};
private studyDetail: any = null;
private selectedDuration: IDuration;
private userNameData: Object = {};
private selectedStudyId: string;
private defaultDuration: Object = {};
private loginUserId: string = null;
private userNameExists: boolean = true;
public items: Object[] = [];
public nameList: Object[] = [];
public userNamesItems: Object[] = [];
public usersNameList: Object[] = [];
public userGroup: UserGroup = {};
private userId: string;
private table: any = null;
private filter: IFilter = {
type: ""
};
private searchData: SearchData = {};
private token: Object = {};
private Uname: Object = {};
private status: Object = ["Assigned"];
private bearer: any;
private userdetails: object[];
private searchStatuses: object[];
private searchExamtypes: object[];

@ViewChild('assignPopup')
assignPopup: ModalComponent;

@ViewChild('qaassignPopup')
qaassignPopup: ModalComponent;

@ViewChild('reassignPopup')
reassignPopup: ModalComponent;

@ViewChild('reassignToast')
reassignToast: ModalComponent;

@ViewChild('unAssignStudyWorksheetPopUp')
unAssignStudyWorksheetPopUp: ModalComponent;

@ViewChild('unassignPopup')
unassignPopup: ModalComponent;

@ViewChild('deletePopup')
deletePopup: ModalComponent;

@ViewChild('reassignstudytoattendingPopup')
reassignstudytoattendingPopup: ModalComponent;

@ViewChild('assignStudyByAdminPopup')
assignStudyByAdminPopup: ModalComponent;

@ViewChild('assignToast')
assignToast: ModalComponent;

@ViewChild('createAdvancedSearchForm') public createAdvancedSearchForm: NgForm;

constructor(
  private ref: ChangeDetectorRef,
  private route: ActivatedRoute,
  private router: Router,
  private studylistService: StudylistService,
  private userGroupService: UserGroupService,
  private appState: AppState,
  @Inject('bearer') bearer: string) {
  this.bearer = bearer;
}

generateArray(userOjects) {
  userOjects.results.filter(element => {
    if (element.userStatus == 'Y') {
      if (this.loginUserId != element.userId) {
        this.nameList.push(new Name(element.userId,element.firstName + " " + element.lastName));
      }
    }
  });
}

generateArrayForAllUsers(userOjects) {
  userOjects.results.filter(element => {
    if (element.userStatus == 'Y') {
      this.usersNameList.push(new Name(+ element.userId,element.firstName + " " + element.lastName));
    }
  });
}

// ***************ng2-select

private value: any = ['Athens'];
private _disabledV: string = '0';
private disabled: boolean = false;

private get disabledV(): string {
  return this._disabledV;
}

private set disabledV(value: string) {
  this._disabledV = value;
  this.disabled = this._disabledV === '1';
}

public selected(value: any): void {
  console.log('Selected value is: ', value.id);
  this.userId = value.id;
}

public removed(value: any): void {
  console.log('Removed value is: ', value);
}

public refreshValue(value: any): void {
  this.userId = value ? value.id : value;
  if (this.userId) {
    this.userNameExists = true;
  }
  else {
    this.userNameExists = false;
  }
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

ngOnInit() {
  this.loadUsername();

  this.route.queryParams
  .subscribe(params => {
    console.log('queryParams', params);
    if (params.id)
      this.filter.type = params.id;
    else {
      this.filter.type = '';
    }

    if (params.start && params.end && params.label) {
      this.defaultDuration = {
        start: Moment(parseInt(params.start)),
        end: Moment(parseInt(params.end)),
        label: params.label
      };
    } else {
      this.defaultDuration = null;
    }
    this.onDurationChange(this.defaultDuration ? this.defaultDuration : this.selectedDuration);
    });

  this.userGroupService.getUserList().subscribe(
    res => {
      this.userdetails = res;
      this.generateArray(this.userdetails);
      this.items = this.nameList;
      var url = this.studylistService.getStudyListUrl(this.selectedDuration, this.filter,this.searchData);
      this.table.ajax.url(url).load().draw('false');
  });

  this.userGroupService.getUserList().subscribe(
    res => {
      this.userdetails = res;
      this.generateArrayForAllUsers(this.userdetails);
      this.userNamesItems = this.usersNameList;
      var url = this.studylistService.getStudyListUrl(this.selectedDuration, this.filter,this.searchData);
      this.table.ajax.url(url).load().draw('false');
    });
    this.getStatus();
    this.getExamType();
}

loadStudyDetail(studyid: string) {
  console.log('loadStudyDetail', studyid);
  this.studyDetail = null;
  this.studylistService.getStudyDetails(studyid).subscribe(
  studyDetailData => {
    this.studyDetail = studyDetailData[0];
    var that = this;
    this.ref.detectChanges();
    // setTimeout(function(){that.showAccordion(studyid);},0);
  },
  error => console.error(error));
}

onDurationChange(event) {
  console.log("onDurationChange", event);
  this.selectedDuration = event;
  if (!this.table) {
    this.initDataTable();
  } else {
    const oldUrl = this.table.ajax.url();
    const newUrl = this.studylistService.getStudyListUrl(this.selectedDuration, this.filter, this.searchData);
    if (oldUrl !== newUrl) {
      this.table.ajax.url(newUrl).load();
    }
  }
}

onClickClearAll() {
  this.filter = { type: "" };
  this.defaultDuration = {};
  //this.searchData = {};
  this.createAdvancedSearchForm.reset();
}

navigateToStudyList() {
  this.router.navigate(['studylist']);
}

navigateToImageViewer(studyId) {
  this.router.navigate(['imageviewer', studyId]);
}

navigatetoViewer() {
  let that = this;
  $('.imageviewerbtn').on('click', function() {
    const studyId = $(this).attr('studyId');
    that.navigateToImageViewer(studyId);
  });
}

/*
* showAccordion(studyid:String){ var currTr = $('#'+studyid); var tr =
* currTr.closest('tr'); var row = this.table.row( tr ); if(row.length !=
* 0){ // Open this row row.child( $('#accordion').html() ).show();
* row.child().addClass('accordion');
* row.child().attr('id','accordion-'+studyid) tr.addClass('shown');
* tr.hide(); $('div.slider', row.child()).slideDown(); } }
*
* hideAccordion(id: String) { var currTr = $('#'+id);
* console.log("CurreTR",currTr); var tr = currTr.closest('tr');
* console.log("TR",tr); var row = this.table.row( tr );
* console.log('loadAccordion', row); console.log('Length', row.length);
* if(row.length == 0){ if ( $('tr').hasClass('accordion') ) { // This
* row is already open - close it // $('div.slider',
* row.child()).slideUp( function () {
* currTr.prev('tr').removeClass('shown').show(); currTr.hide(); // } ); } } }
*/

initDataTable() {
  var that = this;
  var isGrid = [];
  isGrid[0] = false;
  var url = this.studylistService.getStudyListUrl(this.selectedDuration, this.filter,this.searchData);

  this.table = $('#tableStudyList')
  .on('order.dt', function() { console.log('Order'); })
  .on('search.dt', function() { console.log('Search'); })
  .on('page.dt', function() { console.log('Page'); })
  .DataTable({
  "sDom": "<'row m-t-15'<'col-xs-12 col-sm-7 m-b-10'<'col-xs-12 col-sm-4'f><'col-xs-12 col-sm-8'<'filters'>>><'col-xs-12 col-sm-5 m-b-10'<'toolbar'>>>" + "<'row m-t-5'<'col-xs-12 bg-white'tr>>" + "<'row m-t-5'<'col-xs-2'l><'col-xs-3'i><'col-xs-6'p>>",
  "asStripeClasses": [],
  "rowId": "studyId",
  "bStateSave": true,
  "fnStateSave": function(oSettings, oData) {
    localStorage.setItem('tableStudyList', JSON.stringify(oData));
  },
  "fnStateLoad": function(oSettings) {
    return JSON.parse(localStorage.getItem('tableStudyList'));
  },
  "ajax": {
    "url": url,
    "type": "POST",
    "dataSrc": "results",
    "contentType": "application/json",
    "data": function ( searchData ) {
      return JSON.stringify( that.searchData );
    },
    "beforeSend": function(request) {
      request.setRequestHeader("Authorization", "Bearer " + that.bearer);
    },
  },

  "columns": [
    {
      orderable: false,
      render: function(data, type, row) {
        return '<input type="checkbox">';
      }
    },
    {
      orderable: false,
      render: function(data, type, row) {
        return '<i class="fa fa-fw fa-folder-o fw-35"></i>';
      }
    },
    {
      "data": "studyType",
      render: function(data, type, row) {
        var str;
        if (data == "Educational")
          return '<span class="label color-white bg-gray b-1-gray">' + data + '</span>';
        else
          return '<span class="label color-gray b-1-gray">' + data + '</span>';
      }
    },
    {
      "data": "examType",
      render: function(data) {
        var str = "";
        str = str + '<div class="col-xs-12 p-x-0"><span class="col-xs-12 fw-86p label bg-examtype">'
        + '<span>' + data + '</span>'
        + '</span></div>';
        return str;
      }
    },
    {
      "data": "modality",
      render: function(data) {
        var str = "";
        if (data.length > 1)
          str = str + '<div class="col-xs-12 p-x-0">'
          + '<span class="col-xs-9 p-x-0">' + data[0] + '</span>'
          + '<span class="col-xs-2 badge badgecount m-l-5">' + ((data.length) - 1) + '</span>'
          + '</div>';
        else
          str = str + '<div class="col-xs-12 p-x-0">'
          + '<span class="col-xs-9 p-x-0">' + data[0] + '</span>'
          + '</div>';
        return str;
      }
    },
    { "data": "patient.id" },
    {
      "data": "patient",
      render: function(data) {
        return data.firstName + " " + data.middleName + " " + data.lastName;
      }
    },
    {
      "data": "assignedUser",
      render: function(data) {
        return data[0].prefix + " " + data[0].firstName + " " + data[0].middleName + " " + data[0].lastName;
      }
    },
    {
      "data": "qaUser",
      render: function(data) {
        return data[0].prefix + " " + data[0].firstName + " " + data[0].middleName + " " + data[0].lastName;
      }
    },
    {
      "data": "attendingUser",
      render: function(data) {
        return data[0].prefix + " " + data[0].firstName + " " + data[0].middleName + " " + data[0].lastName;
      }
    },
    { "data": "date" },
    {
      "data": "tags",
      render: function(data) {
        var str = "";
        if (data.length > 1)
          str = str + '<div class="col-xs-12 p-x-0"><span class="col-xs-8">'
          + data[0] + '</span>'
          + '<span class="col-xs-3 badge badgecount m-l-5">' + ((data.length) - 1) + '</span>'
          + '</div>';
        else if(data.length == 0)
          str = str + '<div class="col-xs-12 p-x-0"><span class="col-xs-8"></span></div>';
        else
          str = str + '<div class="col-xs-12 p-x-0"><span class="col-xs-8">'
          + data[0] + '</span></div>';
        return str;
      }
    },
    {
      orderable: false,
      "data": "status",
      render: function(data) {
        var str;
        if (data[0] == "New")
        return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';

        else if (data[0] == "Assigned")
        return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';

        else if (data[0] == "Pending" || data[0] == "In-Progress")
        return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';

        else if (data[0] == "Signed")
        return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';

        else if (data[0] == "QAUnassigned" || data[0] == "qa-unassigned")
        return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qaunassigned" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';

        else if (data[0] == "SubmittedForAttestation" || data[0] == "Submitted-for-Attestation")
        return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qainprogress" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Submitted-for-Attestation" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';

        else if (data[0] == "Attested" || data[0] == "Attested")
        return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qainprogress" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Submitted-for-Attestation" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Attested" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';

        else if (data[0] == "QAAssigned" || data[0] == "qa-assigned")
        return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';

        else if (data[0] == "QAInProgress" || data[0] == "qa-inprogress")
        return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qainprogress" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';

        else if (data[0] == "Submitted" || data[0] == "Submitted-to-EMR")
        return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qainprogress" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Submitted-for-Attestation" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Attested" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Submitted" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';
      }
    },
    {
      orderable: false,
      "data": "studyId",
      render: function(id, data, row) {
        var str = "";
        str = '<div class="dropdown table-dropdown action p-5 align-center b-1-lightgray">'
        + '<a class="va-m imageviewerbtn" studyId="' + id + '"onclick="" href="javascript:void(0)"><i class="fa fa-fw fa-picture-o m-r-5"></i></a>'
        if (row.status == 'Submitted') {
          str = str + '<button class="btn btn-default dropdown-toggle" studyId="' + id + '" onclick="" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" disabled>'
          + '<span class="caret"></span>'
          + '</button>'
        }
        else {
          str = str + '<button class="btn btn-default dropdown-toggle" studyId="' + id + '" onclick="" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
          + '<span class="caret"></span>'
          + '</button>'
          + '<ul class="dropdown-menu dropdown-menu-right">';
          if (row.status == 'New') {
            str = str + '<li><a href="javascript:void(0)" studyId="' + id + '" class="assignbtn">Assign to me</a></li>' + '<li><a href="javascript:void(0)" studyId="' + id + '" class="assignstudybyadminbtn">Assign</a></li>' + '<li><a href="javascript:void(0)" studyId="' + id + '" class="deletebtn">Delete</a></li>';
          }
          else if (row.status == 'Pending') {
            str = str + '<li><a href="javascript:void(0)" studyId="' + id + '" class="unassignAdm">Un-Assign</a></li>';
            if (row.assignedUser[0].id == that.loginUserId) {
              str = str + '<li><a href="javascript:void(0)" studyId="' + id + '" class="reassignbtn">Re-Assign</a></li>' + '<li><a href="javascript:void(0)" studyId="' + id + '" class="reassigntoattendingbtn">Assign/change Attending</a></li>';
            } else {
              str = str + '<li><a studyId="' + id + '" class="disabled">Re-Assign</a></li>';
            }
            str = str + '<li><a href="javascript:void(0)" studyId="' + id + '" class="deletebtn">Delete</a></li>';
          } else if (row.status == 'Assigned') {
            if (row.assignedUser[0].id == that.loginUserId) {
              str = str + '<li><a href="javascript:void(0)" studyId="' + id + '" class="unassignbtn">Un-Assign</a></li>' + '<li><a href="javascript:void(0)" studyId="' + id + '" class="reassignbtn">Re-Assign</a></li>' + '<li><a href="javascript:void(0)" studyId="' + id + '" class="reassigntoattendingbtn">Assign/change Attending</a></li>'
              + '<li><a href="javascript:void(0)" studyId="' + id + '" class="deletebtn">Delete</a></li>';
            } else {
              str = str + '<li><a studyId="' + id + '" class="disabled">Re-Assign</a></li>'
              + '<li><a studyId="' + id + '" class="disabled">Un-Assign</a></li>' + '<li><a href="javascript:void(0)" studyId="' + id + '" class="deletebtn">Delete</a></li>';
            }
          }
          else if (row.status == 'QAUnassigned') {
            str = str + '<li><a href="javascript:void(0)" studyId="' + id + '" class="qaassignbtn">Assign me as QA</a></li>' + '<li><a href="javascript:void(0)" studyId="' + id + '" class="deletebtn">Delete</a></li>';
          }
          else {
            str = str + '<li><a href="javascript:void(0)" studyId="' + id + '" class="deletebtn">Delete</a></li>'
          }
        }
        str = str + '</ul></div>';
        return str;
      }
    },
    {
      orderable: false,
      visible: false,
      render: function(data, type, row, meta) {
        var str = "";

        str = '<div class="col-xs-12">' +
        '<div class="panel panel-default">' +
        '<div class="panel-heading p-y-0">' +
        '<div class="row">' +
        '<div class="col-xs-3 pull-left m-t-5"><i class="fa fa-fw fa-folder-o fa-3x pull-left"></i></div>' +
        '<div class="col-xs-5 fw-18 m-t-10 p-x-0"><span class="m-l-20"></span></div>' +
        '<div class="col-xs-4 pull-right m-t-10">' +
        '<a class="imageviewerbtn" studyId="' + row.studyId + '" href="javascript:void(0)"><i class="fa fa-fw fa-picture-o fa-2x pull-right"></i></a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<!-- START Content -->' +
        '<div class="panel-body p-x-0">' +
        '<div class="col-xs-12 p-x-0">' +
        '<div class="col-xs-5 b-r-1-lightergray"><label>Study Type:</label></div>' +
        '<div class="col-xs-7" >';
        if (row.studyType == "Clinical") {
          str = str + '<span class=" label color-gray b-1-gray">' + row.studyType + '</span></div>';
        }
        else {
          str = str + '<span class="label color-white bg-gray b-1-gray">' + row.studyType + '</span></div>';
        }
        str = str + '</div>' +
        '<div class="col-xs-12 p-x-0">' +
        '<div class="col-xs-5 b-r-1-lightergray"><label>Exam Type:</label></div>' +
        '<div class="col-xs-7">';
        str = str + '<span class="label bg-examtype">' + row.examType;
        str = str + '</div>' +
        '</div>' +
        '<div class="col-xs-12 p-x-0">' +
        '<div class="col-xs-5 b-r-1-lightergray"><label>Device:</label></div>' +
        '<div class="col-xs-7">';
        if (row.modality.length > 1) {
        str = str + '<span>' + row.modality[0] + ' &nbsp&nbsp</span>' +
        '<span class="badge badgecount">' + (row.modality.length - 1) + '</span></span>';
        } else {
        str = str + '<span>' + row.modality[0] + '</span>';
        }
        str = str + '</div>' +
        '</div>' +
        '<div class="col-xs-12 p-x-0">' +
        '<div class="col-xs-5 b-r-1-lightergray"><label>Patient ID:</label></div>' +
        '<div class="col-xs-7"><span>' + row.patient.id + '</span></div>' +
        '</div>' +
        '<div class="col-xs-12 p-x-0">' +
        '<div class="col-xs-5 b-r-1-lightergray"><label>Patient Name:</label></div>' +
        '<div class="col-xs-7"><span>' +
        row.patient.firstName + ' ' +
        row.patient.middleName + ' ' +
        row.patient.lastName + '</span></div>' +
        '</div>' +
        '<div class="col-xs-12 p-x-0">' +
        '<div class="col-xs-5 b-r-1-lightergray"><label>Performing Physician:</label></div>' +
        '<div class="col-xs-7"><span>' + row.assignedUser.prefix + ' ' +
        row.assignedUser.firstName + ' ' +
        row.assignedUser.middleName + ' ' +
        row.assignedUser.lastName + '</span></div>' +
        '</div>' +
        '<div class="col-xs-12 p-x-0">' +
        '<div class="col-xs-5 b-r-1-lightergray"><label>QA Reviewer:</label></div>' +
        '<div class="col-xs-7"><span>' + row.qaUser.prefix + ' ' +
        row.qaUser.firstName + ' ' +
        row.qaUser.middleName + ' ' +
        row.qaUser.lastName + '</span></div>' +
        '</div>' +
        '<div class="col-xs-12 p-x-0">' +
        '<div class="col-xs-5 b-r-1-lightergray"><label>Attending Physician:</label></div>' +
        '<div class="col-xs-7"><span>' + row.attendingUser.prefix + ' ' +
        row.attendingUser.firstName + ' ' +
        row.attendingUser.middleName + ' ' +
        row.attendingUser.lastName + '</span></div>' +
        '</div>' +
        '<div class="col-xs-12 p-x-0">' +
        '<div class="col-xs-5 b-r-1-lightergray"><label>Date:</label></div>' +
        '<div class="col-xs-7"><span>' + row.date + '</span></div>' +
        '</div>' +
        '<div class="col-xs-12 p-x-0">' +
        '<div class="col-xs-5 b-r-1-lightergray"><label>Tags:</label></div>' +
        '<div class="col-xs-7">' +
        '</div>' +
        '<div class="col-xs-12 p-x-0">' +
        '<div class="col-xs-5 b-r-1-lightergray"><label>Study Progress:</label></div>';
        if (row.status == "New") {
          str = str + '<div class="col-xs-7  m-t-5">' +
          '<div class="progress">' +
          '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '</div>' +
          '</div>';
        } else if (row.status == "Assigned") {
          str = str + '<div class="col-xs-7  m-t-5">' +
          '<div class="progress">' +
          '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '</div>' +
          '</div>';
        } else if (row.status == "Pending" || row.status == "In-Progress") {
          str = str + '<div class="col-xs-7  m-t-5">' +
          '<div class="progress">' +
          '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '</div>' +
          '</div>';
        } else if (row.status == "Signed") {
          str = str + '<div class="col-xs-7  m-t-5">' +
          '<div class="progress">' +
          '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '</div>' +
          '</div>';
        } else if (row.status == "QAUnassigned" || row.status == "qa-unassigned") {
          str = str + '<div class="col-xs-7  m-t-5">' +
          '<div class="progress">' +
          '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Qaunassigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '</div>' +
          '</div>';

        } else if (row.status == "QAAssigned" || row.status == "qa-assigned") {
          str = str + '<div class="col-xs-7  m-t-5">' +
          '<div class="progress">' +
          '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '</div>' +
          '</div>';
        }

        else if (row.status == "SubmittedForAttestation" || row.status == "Submitted-for-Attestation") {
          str = str + '<div class="col-xs-7  m-t-5">' +
          '<div class="progress">' +
          '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Qainprogress" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Submitted-for-Attestation" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '</div>' +
          '</div>';
        }
        else if (row.status == "Attested" || row.status == "Attested") {
          str = str + '<div class="col-xs-7  m-t-5">' +
          '<div class="progress">' +
          '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Qainprogress" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Submitted-for-Attestation" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Attested" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '</div>' +
          '</div>';
        }
        else if (row.status == "QAInProgress" || row.status == "qa-inprogress") {
          str = str + '<div class="col-xs-7  m-t-5">' +
          '<div class="progress">' +
          '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Qainprogress" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '</div>' +
          '</div>';
        }
        else if (row.status == "Submitted-to-EMR" || row.status == "Submitted") {
          str = str + '<div class="col-xs-7  m-t-5">' +
          '<div class="progress">' +
          '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Qainprogress" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Submitted-for-Attestation" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Attested" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '<div class="progress-bar bg-Submitted" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
          '</div>' +
          '</div>';
        }
        str = str + '</div>' +
        '</div>' +
        '<!-- Content Ends -->' +
        '</div>' +
        '</div>';
        return str;
      }
    }
  ],
  "aaSorting": [],
  "order": [[10, "desc"]],
  "language": {
  "zeroRecords": "No records found"
  },
  "fnDrawCallback": function(settings) {
    $('.imageviewerbtn').on('click', function() {
      const studyId = $(this).attr('studyId');
      that.navigateToImageViewer(studyId);
    });

    $('.assignbtn').on('click', function() {
      that.selectedStudyId = $(this).attr('studyId');
      that.assignStudy();
    });

    $('.reassignbtn').on('click', function() {
      that.selectedStudyId = $(this).attr('studyId');
      that.reassignStudy();
    });

    $('.unassignAdm').on('click', function() {
      that.selectedStudyId = $(this).attr('studyId');
      that.unAssignPopUp();
    });

    $('.qaassignbtn').on('click', function() {
      that.selectedStudyId = $(this).attr('studyId');
      that.qaassigntomePopup();
    });

    $('.unassignbtn').on('click', function() {
      that.selectedStudyId = $(this).attr('studyId');
      that.unassignStudyPop();
    });

    $('.reassigntoattendingbtn').on('click', function() {
      that.selectedStudyId = $(this).attr('studyId');
      that.reassignstudytoattending();
    });

    $('.deletebtn').on('click', function() {
      that.selectedStudyId = $(this).attr('studyId');
      that.deleteStudyPop();
    });

    $('.assignstudybyadminbtn').on('click', function() {
      that.selectedStudyId = $(this).attr('studyId');
      that.assignStudyByAdminPop();
    });
  }
  });

  var that = this;
  var column = that.table.columns([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
  column.visible(true);
  that.table.column(14).visible(false);

  $('#tableStudyList tbody').on('click', 'tr', function() {
    var id = $(this).attr('id');
    if (event.target.nodeName != "BUTTON" && event.target.nodeName != "A" && event.target.nodeName != "INPUT" &&
    event.target.parentNode.nodeName != "BUTTON" && event.target.parentNode.nodeName != "A" && isGrid[0] != true) {
      if (id.startsWith('accordion')) {
        // that.hideAccordion(id);
        return;
      } else {
        var childrow = $('tr.accordion');
        childrow.prev('tr').removeClass('shown').show();
        childrow.hide();
        that.loadStudyDetail($(this).attr('id'));
      }
    }
  });

  /* Tool Bar */
  $(".toolbar").html(
  '<div class="btn-toolbar pull-right">' +
  '<div class="btn-group" role="group" aria-label="...">' +
  '<a id="btnClearAll" href="javascript:void(0)" class="btn btn-default" role="button">Clear Filters</a>' +
  '</div>' +
  '</div>');

  /* Switching Between Grid and List view */

  $('#studylistbtn').on('click', function() {
    isGrid[0] = false;
    $('#tableStudyList tbody').removeClass('isGrid clearfix');
    var column = that.table.columns([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    column.visible(true);
    that.table.column(14).visible(false);
    /* Navigate To Image Viewer From List */
    that.navigatetoViewer();
  });

  $('#studygridbtn').on('click', function() {
    isGrid[0] = true;
    $('#tableStudyList tbody').addClass('isGrid clearfix');
    // Hide Columns
    var column = that.table.columns([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    column.visible(false);
    that.table.column(14).visible(true);
    // Hide Accordion when moving to Grid
    /*
    * if($('#tableStudyList tr.accordion:visible')){ var
    * accordionid = $('tr.accordion:visible').attr('id');
    * that.hideAccordion(accordionid); }
    */
    if (!that.table.data().count()) {
      if ($('#tableStudyList tbody').hasClass('isGrid clearfix')) {
        $('#tableStudyList tr').css({ 'float': 'none' });
      } else {
        $('#tableStudyList tr').css({ 'float': 'left' });
      }
    }
    /* Navigate To Image Viewer From Grid */
    that.navigatetoViewer();
  });

  /* Functionality of Clear Filters Button */
  $('#btnClearAll').on('click', function() {
    that.onClickClearAll();
  });

  /* ToolBox Make only one button active */
  $('.highlightbtn a').on('click', function() {
    var currentTab = $(this);
    currentTab.addClass('active');
    currentTab.siblings('a').removeClass('active');
  });
}

assignStudy() {
  this.assignPopup.open();
}

reassignStudy() {
  this.reassignPopup.open();
}

loadUsername() {
  this.appState.getUserName().subscribe(
  userNameData => {
    this.Uname = userNameData;
    this.loginUserId = userNameData.id;
    return userNameData;
  },
  error => console.error(error));
}

confirmAssign(type){
  console.log('inside assign popup',this.selectedStudyId);
  if(type=='qa'){
    this.qaassignPopup.close();}
  else{
    this.assignPopup.close();}
  this.loadUsername();
  this.studylistService.updateStatus(this.selectedStudyId,type).subscribe(
  res=> {
    const rowData = this.table.row('#'+this.selectedStudyId).data();
    if(type=='qa')
    {
      rowData.qaUser[0] = res;
      rowData.status=["QAAssigned"];
    }
    else
    {
      rowData.assignedUser[0] = res;
      rowData.status = this.status;
    }
    var url = this.studylistService.getStudyListUrl(this.selectedDuration, this.filter,this.searchData);
    this.table.ajax.url(url).load().draw('false');
  },
  error=> console.error(error)
  );
}

cancelAssign() {
  this.assignPopup.close();
}

unAssignPopUp() {
  this.unAssignStudyWorksheetPopUp.open();
}

qacancelAssign() {
  this.qaassignPopup.close();
}

qaassigntomePopup() {
  this.confirmAssign('qa');
}

cancelUnAssignStudy() {
  this.unAssignStudyWorksheetPopUp.close();
}

confirmUnAssignStudy(){
  console.log('inside unassign component',this.selectedStudyId);
  this.unAssignStudyWorksheetPopUp.close();
  this.studylistService.unAssignStudyWorksheet(this.selectedStudyId).subscribe(
  res=> {
    if(res.status==true) {
      this.studylistService.unAssignStudy(this.selectedStudyId).subscribe(
      response=> {
        var url=this.studylistService.getStudyListUrl(this.selectedDuration, this.filter,this.searchData);
        this.table.ajax.url(url).load().draw('false');
      }, error=> console.error(error));
    }
  },
  error=> console.error(error)
  );
}

confirmReassign() {
  if(this.userId)
  {
    this.reassignPopup.close();
    var that = this;
    setTimeout(function() {
      that.reassignToast.open()
    }, 1000);
    this.studylistService.updateReassignUsername(this.selectedStudyId, this.userId).subscribe(
    res => {
      this.userId='';
      if (res)
      setTimeout(function() {
        that.reassignToast.close()
      }, 3000);
      var url = this.studylistService.getStudyListUrl(this.selectedDuration, this.filter,this.searchData);
      this.table.ajax.url(url).load().draw('false');
    },
    error => console.error(error)
    );
  }
  else
  {
    this.userNameExists = false;
  }
}

cancelReassign()
{
  this.userId='';
  this.userNameExists = true;
  this.reassignPopup.close();
}

unassignStudyPop() {
  this.unassignPopup.open();
}

confirmUnassign(){
  console.log('inside unassign popup',this.selectedStudyId);
  this.unassignPopup.close();
  this.studylistService.modifyStatus(this.selectedStudyId).subscribe(
  res=> {
    var url=this.studylistService.getStudyListUrl(this.selectedDuration, this.filter,this.searchData);
    this.table.ajax.url(url).load().draw('false');
  },
  error=> console.error(error)
  );
}

cancelUnassign() {
  this.unassignPopup.close();
}

deleteStudyPop() {
  this.deletePopup.open();
}

cancelDelete() {
  this.deletePopup.close();
}

confirmDelete() {
  console.log('inside delete popup', this.selectedStudyId);
  this.deletePopup.close();
  this.studylistService.deleteStudy(this.selectedStudyId).subscribe(
  res => {
    this.table.row('#' + this.selectedStudyId).remove().draw('page');
  },
  error => console.error(error)
  );
}

reassignstudytoattending() {
  this.reassignstudytoattendingPopup.open()
}

cancelAssignToAttend(){
  this.userId='';
  this.reassignstudytoattendingPopup.close();
  this.userNameExists=true;
}

confirmAssignToAttend(){
  if(this.userId)
  {
    this.studylistService.assignStudyToAttending(this.selectedStudyId, this.userId).subscribe(
    res => {
      this.userId='';
      this.reassignstudytoattendingPopup.close();
      const rowData = this.table.row('#' + this.selectedStudyId).data();
      rowData.attendingUser[0] = res;
      this.table.row('#' + this.selectedStudyId).data(rowData).draw('page');
    },
    error => console.error(error)
    );
  }
  else
  {
    this.userNameExists = false;
  }
}

assignStudyByAdminPop() {
  this.assignStudyByAdminPopup.open();
}

cancelAssignStudyByAdmin(){
  this.userId='';
  this.assignStudyByAdminPopup.close();
  this.userNameExists=true;
}

confirmAssignStudyByAdmin(){
  if(this.userId){
    this.assignStudyByAdminPopup.close();
    var that = this;
    setTimeout(function() {
      that.assignToast.open()
    }, 1000);

    this.studylistService.assignStudyByAdmin(this.selectedStudyId,this.userId).subscribe(
    res => {
      this.userId='';
      const rowData = this.table.row('#' + this.selectedStudyId).data();
      rowData.assignedUser[0] = res;
      rowData.status = ['Assigned']
      this.table.row('#' + this.selectedStudyId).data(rowData).draw('page');
      var that = this;
      if (res)
      setTimeout(function() {
        that.assignToast.close()
      }, 3000);
    },
    error => console.error(error)
    );
  }else {
    this.userNameExists = false;
  }
}

getStatus(){
  this.studylistService.getSearchStatus().subscribe(
  res=>{
    this.searchStatuses=res;
  });
}

getExamType(){
  this.studylistService.getSearchExamType().subscribe(
  res=>{
    this.searchExamtypes=res.results;
  });
}

searchStudies(value: SearchData){
  value.patientName = this.searchData.patientName;
  value.pocName = this.searchData.pocName;
  value.searchExamType = this.searchData.searchExamType;
  value.searchStatus = this.searchData.searchStatus;
  console.log("Input of search criteria",value,this.searchData);
  var url=this.studylistService.getStudyListUrl(this.selectedDuration, this.filter,this.searchData);
  this.table.ajax.url(url).load().draw('false');
}
}
