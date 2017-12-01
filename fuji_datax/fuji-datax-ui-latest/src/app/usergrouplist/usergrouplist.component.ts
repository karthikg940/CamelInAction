import { Component, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserGrouplistService } from './usergrouplist.service';
import {AppState} from '../app.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  templateUrl: './usergrouplist.component.html'
})

export class UserGroupListComponent {

  private selectedUserGroupId: string;
  private formState: string;
  private userGroupId: string;
  private bearer: string;

  @ViewChild('confirmDelete')
  confirmDelete: ModalComponent;

  constructor(
    private router: Router,
    private usergrouplistservice: UserGrouplistService,
    private appState: AppState,
    @Inject('bearer') bearer: string
  ) { this.bearer = bearer; }

  navigateToCreateUserGroup() {
    this.formState = "Add";
    this.router.navigate(['createusergroup', this.formState]);
  }

  ngOnInit() {
    this.initUserListDataTable();
  }

  deleteUserGroup(id) {
    this.selectedUserGroupId = id;
    this.confirmDelete.open();
  }

  initUserListDataTable() {
    var url = this.usergrouplistservice.getUserGroupDetails();
    var that = this;
    this.usertable = $('#tableUserGroupList').DataTable({
      "sDom": "<'row m-t-15'<'col-xs-12 col-sm-7 m-b-10'f><'col-xs-12 col-sm-5 m-b-10'<'userListToolBar'>>>" + "<'row m-t-5'<'col-xs-12 bg-white'tr>>" + "<'row m-t-5'<'col-xs-2'l><'col-xs-3'i><'col-xs-6'p>>",
      "asStripeClasses": [],
      "rowId": "userGroupId",
      "ajax": {
        "url": url,
        "type": "GET",
        "dataSrc": "results",
        "beforeSend": function(request) {
          request.setRequestHeader("Authorization", "Bearer " + that.bearer);
        }
      },
      "columns": [
        { "data": "groupName" },
        { "data": "description" },

        {
          orderable: false,
          "data": "userGroupId",
          render: function(data) {
            return '<div class="dropdown table-dropdown usergrouplistaction p-5 align-center">'
              + '<button class="btn btn-default dropdown-toggle" onclick="" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
              + '<span class="caret"></span>'
              + '</button>'
              + '<ul class="dropdown-menu dropdown-menu-right">'
              + '<li><a href="javascript:void(0)" class="modifybtn" userGroupId="' + data + '"> View/Modify</a></li>'
              + '<li><a href="javascript:void(0)" class="deleteUserGroup" userGroupId="' + data + '"> Delete</a></li>'
              + '</ul>'
              + '</div>';
          }
        }

      ],

      "aaSorting": [],
      "order": [[0, "asc"]],
      "language": {
        "zeroRecords": "No user group available"
      },
      "fnDrawCallback": function(settings) {
        $('.deleteUserGroup').on('click', function() {
          const userGroupId = $(this).attr('userGroupId');
          that.deleteUserGroup(userGroupId);
        });

        $('.modifybtn').on('click', function() {
          //this.formState = "Modify";
          const userGroupId = $(this).attr('userGroupId');
          that.navigateToUpdateUserGroup(userGroupId);
        });
      }
    });

  $(".userListToolBar").html('<div class="btn-toolbar pull-right">' +
    '<div class="btn-group" role="group" aria-label="...">' +
    '<a id="btnCreateUserGroup" href="javascript:void(0)" class="btn btn-default" role="button">Create New User Group</a>' +
    '</div>' +
    '</div>');

  var that = this;

  $('#btnCreateUserGroup').on('click', function() {
    that.navigateToCreateUserGroup();
  });
  }

  confirmDeleteGroup() {
    console.log("USER ID INSIDE ANOTHER METHOD", this.selectedUserGroupId);
    this.usergrouplistservice.deleteUserGroup(this.selectedUserGroupId).subscribe(
      response => {
        if (response == 204) {
          this.confirmDelete.close();
          if (!this.usertable) {
            this.initUserListDataTable();
          } else {
            var url = this.usergrouplistservice.getUserGroupDetails();
            this.usertable.row('#' + this.selectedUserGroupId).remove().draw('page');
          }
        }
        else { }
      });
  }

  cancelDelete() {
    this.confirmDelete.close();
  }

  navigateToUpdateUserGroup(userId) {
    this.formState = "Modify";
    this.router.navigate(['createusergroup', this.formState, userId]);
  }
}
