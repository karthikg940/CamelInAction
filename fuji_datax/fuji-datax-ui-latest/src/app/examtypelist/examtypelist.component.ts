import { Component, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExamtypelistService } from './examtypelist.service';
import {AppState} from '../app.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  templateUrl: './examtypelist.component.html'
})

export class ExamTypeListComponent {

  private examtypeId: string;
  private formState: string;
  private selectedExamtypeId: string;
  private bearer: string;
  private table: any;

  @ViewChild('confirmDelete')
  confirmDelete: ModalComponent;

  @ViewChild('enableExamtypePopup')
  enableExamtypePopup: ModalComponent;

  @ViewChild('disableExamtypePopup')
  disableExamtypePopup: ModalComponent;

  constructor(
    private router: Router,
    private examtypelistService: ExamtypelistService,
    private appState: AppState,
    @Inject('bearer') bearer: string
  ) { this.bearer = bearer; }

  navigateToCreateExamType() {
    this.formState = "Add";
    this.router.navigate(['createexamtype', this.formState]);
  }

  navigateToUpdateExamType(examTypeId) {
    this.formState = "Modify";
    this.router.navigate(['createexamtype', this.formState, examTypeId]);
  }

  ngOnInit() {
    this.initExamTypeListDataTable();
  }

  initExamTypeListDataTable() {
    var url = this.examtypelistService.getExamtypeDetails();
    var that = this;
    this.table = $('#tableExamTypeList').DataTable({
      "sDom": "<'row m-t-15'<'col-xs-12 col-sm-7 m-b-10'f><'col-xs-12 col-sm-5 m-b-10'<'examListToolBar'>>>" + "<'row m-t-5'<'col-xs-12 bg-white'tr>>" + "<'row m-t-5'<'col-xs-2'l><'col-xs-3'i><'col-xs-6'p>>",
      "asStripeClasses": [],
      "rowId": "id",
      "ajax": {
        "url": url,
        "type": "GET",
        "dataSrc": "results",
        "beforeSend": function(request) {
          request.setRequestHeader("Authorization", "Bearer " + that.bearer);
        }
      },
      "columns": [
        { "data": "examTypeDesc" },
        { "data": "examTypeDetailDesc" },
        {
          orderable: false,
          "data": "id",
          render: function(id, data, row) {
            var str = "";
            str = str + '<div class="dropdown table-dropdown usergrouplistaction p-5 align-left">'
              + '<button class="btn btn-default dropdown-toggle" onclick="" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
              + '<span class="caret"></span>'
              + '</button>'
              + '<ul class="dropdown-menu dropdown-menu-right">';

            if (row.isDeleted == 'Y' && row.isEnabled == 'Y') {
              str = str + '<li><a href="javascript:void(0)" class="modifybtn" examtypeId="' + id + '"> View/Modify</a></li>'
                + '<li><a href="javascript:void(0)" class="disableExamtype" examtypeId="' + id + '"> Disable</a></li>'
            }
            else if (row.isDeleted == 'Y' && row.isEnabled == 'N') {
              str = str + '<li><a href="javascript:void(0)" class="modifybtn" examtypeId="' + id + '"> View/Modify</a></li>'
                + '<li><a href="javascript:void(0)" class="enableExamtype" examtypeId="' + id + '"> Enable</a></li>'
            }
            else if (row.isEnabled == 'Y') {
              str = str + '<li><a href="javascript:void(0)" class="modifybtn" examtypeId="' + id + '"> View/Modify</a></li>'
                + '<li><a href="javascript:void(0)" class="deleteExamtype" examtypeId="' + id + '"> Delete</a></li>'
                + '<li><a href="javascript:void(0)" class="disableExamtype" examtypeId="' + id + '"> Disable</a></li>'
            } else if (row.isEnabled == 'N') {
              str = str + '<li><a href="javascript:void(0)" class="modifybtn" examtypeId="' + id + '"> View/Modify</a></li>'
                + '<li><a href="javascript:void(0)" class="deleteExamtype" examtypeId="' + id + '"> Delete</a></li>'
                + '<li><a href="javascript:void(0)" class="enableExamtype" examtypeId="' + id + '"> Enable</a></li>'
            }
            str = str + '</ul>' + '</div>';
            return str;
          }
        }
      ],

      "aaSorting": [],
      "order": [[0, "asc"]],
      "language": {
        "zeroRecords": "No examtype available"
      },
      "fnDrawCallback": function(settings) {

        $('.deleteExamtype').on('click', function() {
          const examtypeId = $(this).attr('examtypeId');
          console.log("examtypeId inside data", examtypeId);
          that.deleteExamType(examtypeId);
        });

        $('.modifybtn').on('click', function() {
          const examtypeId = $(this).attr('examtypeId');
          console.log("examtypeId inside data", examtypeId);
          that.navigateToUpdateExamType(examtypeId);
        });

        $('.disableExamtype').on('click', function() {
          const examtypeId = $(this).attr('examtypeId');
          console.log("examtypeId inside data", examtypeId);
          that.disableExamType(examtypeId);
        });

        $('.enableExamtype').on('click', function() {
          const examtypeId = $(this).attr('examtypeId');
          console.log("examtypeId inside data", examtypeId);
          that.enableExamType(examtypeId);
        });

        /*Action Drop Down for list ends*/
      },
      "fnRowCallback": function(nRow, row) {
        if (row.isEnabled == 'N') {
          $('td', nRow).css('background-color', '#e2e2e2');
        } else if (row.isEnabled == 'Y') {
          $('td', nRow).css('background-color', '#fff');
        }
      }

    });


    $(".examListToolBar").html('<div class="btn-toolbar pull-right">' +
      '<div class="btn-group" role="group" aria-label="...">' +
      '<a id="btnCreateExamType" href="javascript:void(0)" class="btn btn-default" role="button">Add exam type</a>' +
      '</div>' +
      '</div>');

    $('#btnCreateExamType').on('click', function() {
      that.navigateToCreateExamType();
    });
  }

  cancelDelete() {
    this.confirmDelete.close();
  }

  deleteExamType(id) {
    this.selectedExamtypeId = id;
    this.confirmDelete.open();
  }

  confirmDeleteExamType() {
    console.log("inside confirmDeleteExamType", this.selectedExamtypeId);
	   this.confirmDelete.close();
    this.examtypelistService.deleteExamType(this.selectedExamtypeId).subscribe(
      response => {
        this.table.row('#' + this.selectedExamtypeId).remove().draw('page');
      },
      error => console.error(error)
    );
  }

  disableExamType(id) {
    this.selectedExamtypeId = id;
    this.disableExamtypePopup.open();
  }

  confirmDisable() {
    this.disableExamtypePopup.close();
    var changeStatus = false;
    this.examtypelistService.disableandEnableExamtype(this.selectedExamtypeId, changeStatus).subscribe(
      res => {
        this.disableres = res;
        const rowData = this.table.row('#' + this.selectedExamtypeId).data();
        rowData.isEnabled = "N";
        this.table.row('#' + this.selectedExamtypeId).data(rowData).draw('page');
      },
      error => console.error(error)
    );
  }

  cancelDisable() {
    this.disableExamtypePopup.close();
  }

  enableExamType(id) {
    this.selectedExamtypeId = id;
    this.enableExamtypePopup.open();
  }

  confirmEnable() {
    this.enableExamtypePopup.close();
    var changeStatus = true;
    this.examtypelistService.disableandEnableExamtype(this.selectedExamtypeId, changeStatus).subscribe(
      res => {
        this.enableres = res;
        const rowData = this.table.row('#' + this.selectedExamtypeId).data();
        rowData.isEnabled = "Y";
        this.table.row('#' + this.selectedExamtypeId).data(rowData).draw('page');
      },
      error => console.error(error)
    );
  }

  cancelEnable() {
    this.enableExamtypePopup.close();
  }
}
