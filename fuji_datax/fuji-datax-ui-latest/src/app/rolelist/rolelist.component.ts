import { Component, Inject, ViewEncapsulation, ViewChild, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RoleListService } from './rolelist.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {AppState} from '../app.service';
import { RoleData, Name} from '../createrole/createrole.interface';
import { RoleService} from '../createrole/createrole.service';
import { SelectModule } from 'ng2-select/ng2-select';
import { IDuration } from '../app.model';
@Component({
  templateUrl: './rolelist.component.html'
})


export class RoleListComponent {

  private selectedRoleId: string;
  private formState: string;
  private roleTable: any = null;
  private roleId: string;
  private bearer: any;
  private roles: object;
  public roleData: RoleData = {};
  public roleList: Object[] = [];
  public rolesList: Object[] = [];
  private reallocatedRoleSelected: boolean = true;
  private newRoleId: string;

  @ViewChild('confirmDelete')
  confirmDelete: ModalComponent;

  @ViewChild('reAllocatePopup')
  reAllocatePopup: ModalComponent;

  @ViewChild('oneRoleDelete')
  oneRoleDelete: ModalComponent;

  constructor(
    private router: Router,
    private rolelistservice: RoleListService,
    private roleService: RoleService,
    private appState: AppState,
    @Inject('bearer') bearer: string
  ) { this.bearer = bearer; }

  public selected(value: any): void {
    console.log('Selected value is: ', value.id);
    this.newRoleId = value.id;
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public refreshValue(value: any): void {
    this.newRoleId = value ? value.id : value;
    if (this.newRoleId) {
      this.reallocatedRoleSelected = true;
  		}
    else {
      this.reallocatedRoleSelected = false;
  		}
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  generateArray(roles) {
    this.roleList = [];
    roles.results.filter(element => {
      if (this.selectedRoleId != element.id) {
        this.roleList.push(new Name(element.id,element.roleName));
      }
    });
  }

  navigateToCreateRole() {
    this.formState = "Add";
    this.router.navigate(['createrole', this.formState]);
  }

  ngOnInit() {
    this.initRoleListDataTable();
  }

  initRoleListDataTable() {
    var url = this.rolelistservice.getRolesList();
    var that = this;
    this.roleTable = $('#tableRoleList').DataTable({
      "sDom": "<'row m-t-15'<'col-xs-12 col-sm-7 m-b-10'f><'col-xs-12 col-sm-5 m-b-10'<'roleListToolBar'>>>" + "<'row m-t-5'<'col-xs-12 bg-white'tr>>" + "<'row m-t-5'<'col-xs-2'l><'col-xs-3'i><'col-xs-6'p>>",
      "rowId": "roleId",
      "asStripeClasses": [],
      "ajax": {
        "url": url,
        "type": "GET",
        "dataSrc": "results",
        "beforeSend": function(request) {
          request.setRequestHeader("Authorization", "Bearer " + that.bearer);
        }
      },
      "columns": [
        { "data": "roleName" },
        { "data": "description" },
        {
          orderable: false,
          "data": "id",
          render: function(data) {
            return '<div class="dropdown table-dropdown p-5 align-center">'
              + '<button class="btn btn-default dropdown-toggle" onclick="" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
              + '<span class="caret"></span>'
              + '</button>'
              + '<ul class="dropdown-menu dropdown-menu-right">'
              + '<li><a href="javascript:void(0)" class="modifybtn" roleId="' + data + '"> View/Modify</a></li>'
              + '<li><a href="javascript:void(0)" class="deleteRole" roleId="' + data + '"> Delete</a></li>'
              + '<li><a href="javascript:void(0)" class="cloneRole" roleId="' + data + '"> Clone</a></li>'
              + '</ul>'
              + '</div>';
          }
        }
      ],
      "aaSorting": [],
      "order": [[0, "asc"]],
      "language": {
        "zeroRecords": "No Role available"
      },

      "fnDrawCallback": function(settings) {
        $('.modifybtn').on('click', function() {
          this.formState = "Modify";
          const roleId = $(this).attr('roleId');
          that.navigateToUpdateRole(roleId, this.formState);
        });
        $('.deleteRole').on('click', function() {
          const roleId = $(this).attr('roleId');
          that.deleteRole(roleId);
        });
        $('.cloneRole').on('click', function() {
          this.formState = "Clone";
          const roleId = $(this).attr('roleId');
          that.navigateToUpdateRole(roleId, this.formState);
        });
      }
    });

    $(".roleListToolBar").html('<div class="btn-toolbar pull-right">' +
      '<div class="btn-group" role="group" aria-label="...">' +
      '<a id="btnCreateRole" href="javascript:void(0)" class="btn btn-default" role="button">Add Role</a>' +
      '</div>' +
      '</div>');

    var that = this;

    $('#btnCreateRole').on('click', function() {
      that.navigateToCreateRole();
    });
  }

  navigateToUpdateRole(roleId, formState) {
    this.router.navigate(['createrole', formState, roleId]);
  }

  roleAllocateList() {
    this.rolelistservice.getRoles().subscribe(
      res => {
        this.roles = res;
        this.generateArray(this.roles);
        this.rolesList = [];
        this.rolesList = this.roleList;
        this.roleService.getRoleById(this.selectedRoleId).subscribe(
          response => {
            if (this.rolesList.length == 0 || response.countStatus == false){
              this.oneRoleDelete.open();
            }
            else {
              this.confirmDelete.open();
            }
          },
          error => console.error(error));
      });
  }

  deleteRole(id) {
    this.selectedRoleId = id;
    this.roleAllocateList();
  }

  noReallocate() {
    this.confirmDeleteRole();
  }

  confirmDeleteRole() {
    this.rolelistservice.deleteRole(this.selectedRoleId).subscribe(
      response => {
        if (response == 204) {
          this.confirmDelete.close();
          this.oneRoleDelete.close();
          var url = this.rolelistservice.getRolesList();
          this.roleTable.ajax.url(url).load().draw('false');
        }
      },
      error => console.error(error));
  }

  reAllocateRole() {
    this.reAllocatePopup.open();
    this.confirmDelete.close();
  }

  confirmReassign() {
    if (this.newRoleId) {
      this.reAllocatePopup.close();
      this.rolelistservice.reAllocateRoles(this.selectedRoleId, this.newRoleId).subscribe(
        res => {
          this.newRoleId = '';
          this.confirmDelete.close();
          var url = this.rolelistservice.getRolesList();
          this.roleTable.ajax.url(url).load().draw('false');
        },
        error => console.error(error)
      );
    }
    else {
      this.reallocatedRoleSelected = false;
    }
  }

  cancelReassign() {
    this.newRoleId = '';
    this.reAllocatePopup.close();
    this.reallocatedRoleSelected = true;
  }

  noDelete() {
    this.oneRoleDelete.close();
  }
}
