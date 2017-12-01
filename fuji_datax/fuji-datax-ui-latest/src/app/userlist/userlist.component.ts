import { Component, Inject, ViewEncapsulation, ViewChild, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserlistService } from './userlist.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {AppState} from '../app.service';

@Component({
  templateUrl: './userlist.component.html',
  encapsulation: ViewEncapsulation.None
})

export class UserListComponent {

  private userId: string;
  private formState: string;
  private uresp: object;
  private status: string;
  private selectedUserId: string;
  private userTable: any = null;
  private bearer:any;

  @ViewChild('deactivateUserStatus')
  deactivateUserStatus: ModalComponent;

  @ViewChild('activateUserStatus')
  activateUserStatus: ModalComponent;

  @ViewChild('userUnlockToast')
  userUnlockToast:ModalComponent;
  
  constructor(
    private router: Router,
    private userlistservice: UserlistService,
    private appState: AppState,
    @Inject('bearer') bearer: string
  ) { this.bearer = bearer; }

  navigateToCreateUser() {
    this.formState = "Add";
    this.router.navigate(['createuser', this.formState]);
  }

  ngOnInit() {
    this.initUserListDataTable();
  }

  initUserListDataTable() {
    var url = this.userlistservice.getUserDetails();
    var that = this;
    this.userTable = $('#tableUserList').DataTable({
      "sDom": "<'row m-t-15'<'col-xs-12 col-sm-7 m-b-10'f><'col-xs-12 col-sm-5 m-b-10'<'userListToolBar'>>>" + "<'row m-t-5'<'col-xs-12 bg-white'tr>>" + "<'row m-t-5'<'col-xs-2'l><'col-xs-3'i><'col-xs-6'p>>",
      "asStripeClasses": [],
      "rowId": "userId",
      "ajax": {
        "url": url,
        "type": "GET",
        "dataSrc": "results",
        "beforeSend": function(request) {
          request.setRequestHeader("Authorization", "Bearer " + that.bearer);
        }
      },
      "columns": [
        { "data": "title" },
        {
          "data": null,
          render: function(data) {
            return data.firstName + " " + data.lastName;
          }
        },
        { "data": "userName" },
        { "data": "phoneNo" },
        { "data": "email" },
        {
          orderable: false,
          "data": "userId",
          render: function(id, data, row) {
            var str = "";
            str = str + '<div class="dropdown table-dropdown userlistaction p-5 align-center">'
              + '<button class="btn btn-default dropdown-toggle" onclick="" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
              + '<span class="caret"></span>'
              + '</button>'
              + '<ul class="dropdown-menu dropdown-menu-right">';
            if (row.userStatus == 'Y') {
              str = str + '<li><a class="deactive-select" userId="' + id + '" href="javascript:void(0)" > Deactivate</a></li>'
                + '<li><a class="modify-select" userId="' + id + '" href="javascript:void(0)" > View/Modify</a></li>';
            } else if (row.userStatus == 'N') {
              str = str + '<li><a class="active-select" userId="' + id + '" href="javascript:void(0)" > Activate</a></li>';
            }
            if(row.locked == 'Y'){
                str = str + '<li><a class="unlock-user" userId="' + id + '" href="javascript:void(0)" > Unlock</a></li>';
              }
            str = str + '</ul>' + '</div>';
            return str;
          }
        }
      ],
      "aaSorting": [],
      "order": [[2, "asc"]],
      "fnDrawCallback": function(index, settings) {
        $('.active-select').on('click', function() {
          that.selectedUserId = $(this).attr('userId');
          console.log("that. userid",that.selectedUserId);
          that.buttonActive();
        });
        $('.deactive-select').on('click', function() {
          that.selectedUserId = $(this).attr('userId');
          that.butttonDeactive();
        });
        $('.modify-select').on('click', function() {
          //  this.formState = "Modify";
          that.selectedUserId = $(this).attr('userId');
          that.navigateToUpdateUser(that.selectedUserId);
        });
        $('.unlock-user').on('click', function() {
            that.selectedUserId = $(this).attr('userId');
            that.confirmUnLockUser();
          });
        /*Action Drop Down for list ends*/
      },

      "fnRowCallback": function(nRow, row) {
        if (row.userStatus == 'N') {
          $('td', nRow).css('background-color', '#e2e2e2');
        } else if (row.userStatus == 'Y') {
          $('td', nRow).css('background-color', '#fff');
        }
      }
    });

  $(".userListToolBar").html('<div class="btn-toolbar pull-right">' +
    '<div class="btn-group" role="group" aria-label="...">' +
    '<a id="btnCreateUser" href="javascript:void(0)" class="btn btn-default" role="button">Create New User</a>' +
    '</div>' +
    '</div>');

  var that = this;

  $('#btnCreateUser').on('click', function() {
      that.navigateToCreateUser();
    });
  }

  navigateToUpdateUser(userId) {
    this.formState = "Modify";
    this.router.navigate(['createuser', this.formState, userId]);
  }

  buttonActive() {
    this.activateUserStatus.open();
  }

  cancelActivate() {
    this.activateUserStatus.close();
  }

  confirmActivate() {
    this.activateUserStatus.close();
    var changeStatus = "true";
    console.log("user id  ", this.selectedUserId);
    this.userlistservice.getActiveStatus(this.selectedUserId, changeStatus).subscribe(
      res => {
        this.uresp = res;
        const rowData = this.userTable.row('#' + this.selectedUserId).data();
        rowData.userStatus = "Y";
        this.userTable.row('#' + this.selectedUserId).data(rowData).draw('page');
      },
      error => console.error(error)
    );
  }

  butttonDeactive() {
    this.deactivateUserStatus.open();
  }

  cancelDeactivate() {
    this.deactivateUserStatus.close();
  }

  confirmDeactivate() {
    this.deactivateUserStatus.close();
    var changeStatus = "false";
    console.log("user id  ", this.selectedUserId);
    this.userlistservice.getActiveStatus(this.selectedUserId, changeStatus).subscribe(
      res => {
        this.uresp = res;
        const rowData = this.userTable.row('#' + this.selectedUserId).data();
        rowData.userStatus = "N";
        this.userTable.row('#' + this.selectedUserId).data(rowData).draw('page');
      },
      error => console.error(error)
    );
  }
  
  confirmUnLockUser() {
	    this.userlistservice.unlockUser(this.selectedUserId).subscribe(
	      res => {

	        const rowData = this.userTable.row('#' + this.selectedUserId).data();
	        rowData.locked = "N";
	        this.userTable.row('#' + this.selectedUserId).data(rowData).draw('page');
	        this.userUnlockToast.open();
	        var that = this;
	        setTimeout(function() { that.userUnlockToast.close() }, 1500);
	      },
	      error => console.error(error)
	    );
 }

}
