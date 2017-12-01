import { Component, ViewChild, Input, OnInit, HostListener } from '@angular/core';
import { AppComponent } from '../app.component';
import { RoleService } from './createrole.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RoleData, Name} from './createrole.interface';
import { NgForm } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Observable, Observer } from 'rxjs/Rx';
import { SelectModule } from 'ng2-select/ng2-select';
import { FormsModule } from '@angular/forms';

@Component({
  templateUrl: './createrole.component.html'
})

export class CreateRoleComponent {

  public roleData: RoleData = {};
  private formState: string;
  private permissionsChanged: boolean = false;
  public permissionList: Object[] = [];
  public permissionsList: Object[] = [];
  private permissions: object;
  public roleNameExists: boolean;
  public duplicateRoleName: boolean;
  private permissionExists: boolean = true;
  private roleNameValid: boolean;
  private roleNameExceeds: boolean = true;
  private organizations: object;
  public organizationList: Object[] = [];
  public organizationsList: Object[] = [];
  private roleId: string;

  @ViewChild('createRoleForm') public createRoleForm: NgForm;

  @ViewChild('roleAddedPopup')
  roleAddedPopup: ModalComponent;

  @ViewChild('roleUpdatePopup')
  roleUpdatePopup: ModalComponent;

  constructor(
  private router: Router,
  private route: ActivatedRoute,
  private roleService: RoleService) {
    this.roleNameValid = true;
  }

  public selectedPermissions(value: any): void {
    this.permissionsChanged = true;
    this.permissionExists = true;
  }

  public selectedOrganization(value: any): void {
    this.permissionsChanged = true;
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
    this.permissionsChanged = true;
  }

  public removedOrg(value: any): void {
    console.log('Removed value is: ', value);
    this.permissionsChanged = true;
  }

  public refreshValue(value: any): void {
    this.roleData.permission = value;
    this.permissionsChanged = true;
  }

  public refreshOrgValue(value: any): void {
    this.roleData.organization = value;
    this.permissionsChanged = true;
  }

  generateArray(roles) {
    roles.results.filter(element => {
      this.permissionList.push(new Name(element.id,element.permissionName));
    });
  }

  organizationArray(organizations) {
    organizations.results.filter(element => {
      this.organizationList.push(new Name(element.id,element.orgName));
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.formState = params['formState'];
      if (this.formState == "Modify") {
        this.route.params
        .map(params => params['id'])
        .subscribe((id) => {
          this.roleId = id;
          this.roleService.getRoleById(id).subscribe(
          res => {
            this.roleData.roleName = res.roleName;
            this.roleData.description = res.description;
            this.roleData.permission = [];
            for (let len = res.permission.length, pos = 0; pos < len; pos++) {
              this.roleData.permission.push({ id: res.permission[pos].id, text: res.permission[pos].permissionName })
            }
            this.roleData.organization = [];
            for (let leng = res.organization.length, pos = 0; pos < leng; pos++) {
              this.roleData.organization.push({ id: res.organization[pos].id, text: res.organization[pos].orgName })
            }
          },
          error => console.error(error)
          );
        });
      }
      else if (this.formState == "Clone") {
        this.route.params
        .map(params => params['id'])
          .subscribe((id) => {
          this.roleId = id;
          this.roleService.getRoleById(id).subscribe(
          res => {
            this.roleData.roleName = res.roleName + " Copy";
            this.roleData.description = res.description;
            this.roleData.permission = [];
            for (let len = res.permission.length, pos = 0; pos < len; pos++) {
              this.roleData.permission.push({ id: res.permission[pos].id, text: res.permission[pos].permissionName })
            }
            this.roleData.organization = [];
          },
          error => console.error(error)
          );
        });
      }
    });
    this.roleService.getPermissions().subscribe(
    res => {
        this.permissions = res;
        this.generateArray(this.permissions);
        this.permissionsList = this.permissionList;
        console.log("Permission List onInit", this.permissionList);
    });
    this.roleService.getOrganizations().subscribe(
    res => {
      this.organizations = res;
      this.organizationArray(this.organizations);
      this.organizationsList = this.organizationList;
      console.log("Organization List onInit", this.organizationList);
    });
  }

  duplicateRoleNameCheck(value: RoleData, isValid: boolean) {
    this.roleService.getUniqueRoleName(value.roleName).subscribe(
    res => {
      this.roleNameExists = res.isPresent;
      this.roleNameValid = true;
      if (value.roleName.length > 50) {
        this.roleNameExceeds = false;
      }
      else if (value.roleName.length <= 50) {
        this.roleNameExceeds = true;
        this.doSave(value, isValid);
      }
    });
  }

  validateAlpha(e) {
    if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode < 123) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 32)
      return true;
    return false;
  }

  navigateToRoleList() {
    this.router.navigate(['rolelist']);
  }

  doSave(value: RoleData, isValid: boolean) {
    value.permission = this.roleData.permission;
    value.organization = this.roleData.organization;
    if (!value.permission || value.permission.length == 0) {
      this.permissionExists = false;
    }
    if ((isValid) && (!this.roleNameExists) && (this.roleNameValid != false)) {
      if (this.formState == "Add" || this.formState == "Clone") {
        return this.roleService.saveNewRole(value).subscribe(
        res => {
          this.roleId = res;
          this.roleAddedPopup.open();
          var that = this;
          setTimeout(function() {
            that.roleAddedPopup.close(); that.createRoleForm.reset();
            that.navigateToRoleList();
          }, 1500);
        },
        error => console.error(error)
        );
      }
      else {
        return this.roleService.updateRole(this.roleId, value).subscribe(
        res => {
          this.roleUpdatePopup.open();
          this.permissionsChanged = false;
          var that = this;
          setTimeout(function() {
          that.roleUpdatePopup.close();
          that.navigateToRoleList();
          }, 1500);
        },
        error => console.error(error)
      );
      }
    }
  }

  cancelPopup(value: RoleData) {
    this.navigateToRoleList();
  }

  getRoleName(value: string) {
    if (!value) {
      this.roleNameExists = false;
      this.roleNameValid = true;
    } else if (value.trim() == "") {
      this.roleNameValid = false;
    } else {
      this.roleService.getUniqueRoleName(value).subscribe(
      roleNameData => {
        this.roleNameExists = roleNameData.isPresent;
        this.roleNameValid = true;
        if (value.length > 50) {
          this.roleNameExceeds = false;
        }
        else if (value.length <= 50) {
          this.roleNameExceeds = true;
        }
      });
    }
  }

  removeRoleNameError() {
    this.roleNameExists = false;
    this.roleNameValid = true;
  }
}
