
import { Component, ViewChild, Input, OnInit, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Observer } from 'rxjs/Rx';
import { SelectModule } from 'ng2-select/ng2-select';
import { UserGroup, Name } from './createusergroup.interface';
import { FormsModule } from '@angular/forms';
import { UserGroupService } from './createusergroup.service';

@Component({
  templateUrl: './createusergroup.component.html'
})

export class CreateUserGroupComponent {

  options = [];
  public items: Object[] = [];
  public nameList: Object[] = [];
  public userGroup: UserGroup = {};
  private userdetails: object;
  private formState: string;
  private groupNamenotValid: boolean;
  private groupNameExists: boolean;
  private userGroupId: any;
  private deactivateGaurdRes: Observer<any>;
  private userListChanged: boolean = false;
  private value: any = ['Athens'];
  private _disabledV: string = '0';
  private disabled: boolean = false;
  private allList:Object[] = [];
  private userRoleList:Object[] = [];
  private permissionList:Object[] = [];
  private organizationList:Object[] = [];

  @ViewChild('createUserGroupForm') public createUserGroupForm: NgForm;

  @HostListener('window:beforeunload')

  @ViewChild('cancelUsergroupPopup')
  cancelUsergroupPopup: ModalComponent;

  @ViewChild('userGroupAddedPopup')
  userGroupAddedPopup: ModalComponent;

  @ViewChild('userGroupupdatePopup')
  userGroupupdatePopup: ModalComponent;

  @ViewChild('userGroupModifyPopup')
  userGroupModifyPopup: ModalComponent;

  constructor(private userGroupService: UserGroupService, private router: Router,
   private route: ActivatedRoute) {
   this.groupNamenotValid = true;
 }

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
    this.userListChanged = true;
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
    this.userListChanged = true;
  }

  public refreshValue(value: any): void {
    this.userGroup.users = value;
    this.userListChanged = true;
  }

  public itemsToString(value: Array<any> = []): string {
    return value
    .map((item: any) => {
      return item.text;
    }).join(',');
  }

  generateArray(userOjects) {
    userOjects.results.filter(element => {
      if (element.userStatus == 'Y')
        this.nameList.push(new Name(element.userId,element.firstName + " " + element.lastName));
    });
  }

  navigateToUsergroupList() {
    this.router.navigate(['usergrouplist']);
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.formState = params['formState'];
      if (this.formState == "Modify") {
        this.route.params
        .map(params => params['id'])
        .subscribe((id) => {
          this.userGroupId = id;
          this.userGroupService.getUserGroupById(id).subscribe(
            res => {
              this.userGroup.groupName = res.groupName;
              this.userGroup.description = res.description;
              this.userGroup.users = [];
              for (let len = res.users.length, pos = 0; pos < len; pos++) {
                this.userGroup.users.push({ id: res.users[pos].id, text: res.users[pos].text })
              }
              this.userGroup.roles=[];
              for (let len = res.role.length, pos = 0; pos < len; pos++) {
                this.userGroup.roles.push({ id: res.role[pos].id, text: res.role[pos].roleName})
              }
              this.userGroup.userOrg = [];
              for (let leng = res.userOrg.length, pos = 0; pos < leng; pos++) {
                this.userGroup.userOrg.push({ id: res.userOrg[pos].id, text: res.userOrg[pos].orgName })
              }
              this.userGroup.permissions = [];
              for (let leng = res.permission.length, pos = 0; pos < leng; pos++) {
                this.userGroup.permissions.push({ id: res.permission[pos].id, text: res.permission[pos].permissionName })
              }
            },
            error => console.error(error)
          );
        });
      }
    });

    this.userGroupService.getPermissions().subscribe(
      res => {
        this.generateArrayForPermission(res);
        this.permissionList = this.allList;
    });

    this.userGroupService.getUserList().subscribe(
      res => {
        this.userdetails = res;
        this.generateArray(this.userdetails);
        this.items = this.nameList;
    });

    this.userGroupService.getOrganizations().subscribe(
      res => {
        this.generateArrayForOrganization(res);
        this.organizationList = this.allList;
    });

    this.userGroupService.getRole().subscribe(
      res => {
        this.generateArrayForRole(res);
        this.userRoleList = this.allList;
    });
  }

  generateArrayForPermission(roles) {
    this.allList = [];
    roles.results.filter(element => {
      this.allList.push(new Name(element.id,element.permissionName));
    });
  }

  generateArrayForOrganization(organizations) {
    this.allList = [];
    organizations.results.filter(element => {
      this.allList.push(new Name(element.id,element.orgName));
    });
  }

   generateArrayForRole(role) {
    this.allList = [];
    role.results.filter(element => {
      this.allList.push(new Name(element.id,element.roleName));
    });
  }

  validateAlpha(e) {
    if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode < 123) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 32)
      return true;
    return false;
  }

  doSave(value: UserGroup, isValid: boolean, savePopupFlow: boolean) {
    value.users = this.userGroup.users;
    value.roles = this.userGroup.roles;
    value.permissions = this.userGroup.permissions;
    value.userOrg = this.userGroup.userOrg;
    if ((isValid) && (!this.groupNameExists)) {
      if (this.formState == "Add") {
        return this.userGroupService.saveNewUserGroup(value).subscribe(
        res => {
          this.userGroupId = res;
          this.userGroupAddedPopup.open();
          this.userListChanged = false;
          var that = this;
          setTimeout(function() {
            that.userGroupAddedPopup.close(); that.createUserGroupForm.reset();
            that.navigateToUsergroupList();
          }, 1500);
          console.log("THIS.VALUE---", value);
        },
        error => console.error(error)
        );
      }
      else {
        return this.userGroupService.updateUserGroup(this.userGroupId, value).subscribe(
          res => {
            this.userGroupupdatePopup.open();
            this.userListChanged = false;
            var that = this;
            setTimeout(function() {
              that.userGroupupdatePopup.close();
              if (!savePopupFlow) {
                that.createUserGroupForm.reset(); that.navigateToUsergroupList();
              }
            }, 1500);
            console.log("THIS.VALUE---", value);
          },
          error => console.error(error)
        );
      }
    }
  }

	cancelPopup(value: UserGroup) {
    if (value.groupName == null && value.description == null && this.userGroup.users == null)
      this.navigateToUsergroupList();
    else
      this.cancelUsergroupPopup.open();
  }

	cancelUsergroup() {
    this.cancelUsergroupPopup.close();
  }

	confirmUsergroupCancel() {
    this.cancelUsergroupPopup.close();
    this.userListChanged = false;
    this.createUserGroupForm.reset();
    this.navigateToUsergroupList();
  }

  getUserGroupName(value: string) {
    if (!value) {
      this.groupNameExists = false;
      this.groupNamenotValid = true;
    }
    else {
      this.userGroupService.getUniqueGroupName(value).subscribe(
      userGroupNameData => {
        this.groupNameExists = userGroupNameData.isPresent;
        this.groupNamenotValid = true;
      });
    }
  }

  removeGroupNameError() {
    this.groupNameExists = false;
    this.groupNamenotValid = true;
  }

  isFormInProgress() {
    console.log("Form State In Change", this.createUserGroupForm);
    return this.createUserGroupForm.dirty;
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.isFormInProgress()) {
      this.userGroupModifyPopup.open();
      const res = new Observable((obs) => this.deactivateGaurdRes = obs);
      return res;
    }
    return true;
  }

  updatechanges() {
    this.userGroupModifyPopup.close();
    this.doSave(this.createUserGroupForm.form.value, this.createUserGroupForm.valid, true);
    if (this.deactivateGaurdRes) {
      this.deactivateGaurdRes.next(true);
    }
  }

  cancelchanges() {
    this.userGroupModifyPopup.close();
    if (this.deactivateGaurdRes) {
      this.deactivateGaurdRes.next(true);
    }
  }

  refreshOrgValue(dataEvent){
    this.userGroup.userOrg = dataEvent;
  }

  refreshPermission(dataEvent){
    this.userGroup.permissions = dataEvent;
  }

  refreshRole(dataEvent){
    this.userGroup.roles = dataEvent;
  }
}
