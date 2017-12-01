
import { Component, ViewChild, Input, OnInit, HostListener } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Observable, Observer } from 'rxjs/Rx';
import { AppComponent } from '../app.component';
import { User,Name } from './createuser.interface';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  templateUrl: './createuser.component.html',
  styleUrls: ['createuser.component.css']
})


export class CreateUserComponent implements OnInit, IGuardDeactivateComponent {

  public user: User = {};
  private userId: string;
  private pattern: string = "[0-9]+";
  private formState: string;
  private sub: any;
  private deactivateGaurdRes: Observer<any>;
  private selectOption: object[];
  private titleExists: boolean;
  private userEmail: string;
  private allList:Object[] = [];
  private userPrivilegeList:Object[] = [];
  private orgList:Object[] = [];
  private userRoleList:object[] = [];
  private userGroupList:object[] = [];
  private selectOptionPrefix: object[];

  @Input() userExists: boolean = false;
  @Input() emailExists: boolean = false;
  @Input() invalidEmail: boolean = false;

  @ViewChild('userAddedPopup')
  userAddedPopup: ModalComponent;

  @ViewChild('cancelUserPopup')
  cancelUserPopup: ModalComponent;

  @ViewChild('userUpdatePopup')
  userUpdatePopup: ModalComponent;

  @ViewChild('userModifyPopup')
  userModifyPopup: ModalComponent;

  @ViewChild('createUserForm') public createUserForm: NgForm;

  @HostListener('window:beforeunload')

  constructor(private userService: UserService, private router: Router, public route: ActivatedRoute) {
    this.selectOption = [
    {
    value: "Select"
    }, {
    value: "Medical student"
    }, {
    value: "Fellow"
    }, {
    value: "Practicing physician"
    }, {
    value: "Physician"
    }, {
    value: "Physician assistant (PA)"
    }, {
    value: "Resident"
    }, {
    value: "Nurse"
    }, {
    value: "Specialist"
    }, {
    value: "Admin"
    }, {
    value: "Technician"
    }, {
    value: "Other"
    }
    ];
    this.selectOptionPrefix = [{
    value: "Select"
    }, {
    value: "Mr"
    }, {
    value: "Dr"
    },
    {
    value: "Ms"
    }]
    this.user.title = this.selectOption[0].value;
    this.user.prefix = this.selectOptionPrefix[0].value;
    this.titleExists = true;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.formState = params['formState'];
      if (this.formState == "Modify") {
        this.route.params
        .map(params => params['id'])
        .subscribe((id) => {
          this.userId = id;
          this.userService.getUser(id).subscribe(
          res => {
            this.user.prefix = res.prefix?res.prefix:'Select';
            this.user.title = res.title;
            this.user.firstName = res.firstName;
            this.user.lastName = res.lastName;
            this.user.userName = res.userName;
            this.user.phoneCountryCode = res.phone.split(" ")[0];
            this.user.phoneStateCode = res.phone.split(" ")[1];
            this.user.phone = res.phone.split(" ")[2];
            this.user.email = res.email;
            this.userEmail = res.email;
            this.user.activePrivilegeList = [];
            for (let len = res.permission.length, pos = 0; pos < len; pos++) {
              this.user.activePrivilegeList.push({ id: res.permission[pos].id, text: res.permission[pos].permissionName})
            }
            this.user.activeOrgList = [];
            for (let leng = res.userOrg.length, pos = 0; pos < leng; pos++) {
              this.user.activeOrgList.push({ id: res.userOrg[pos].id, text: res.userOrg[pos].orgName })
            }
            this.user.activeRoleList = [];
            for (let leng = res.role.length, pos = 0; pos < leng; pos++) {
              this.user.activeRoleList.push({ id: res.role[pos].id, text: res.role[pos].roleName })
            }
            this.user.activeGroupList = [];
            for (let leng = res.userGroup.length, pos = 0; pos < leng; pos++) {
              this.user.activeGroupList.push({ id: res.userGroup[pos].id, text: res.userGroup[pos].groupName })
            }
          },
          error => console.error(error)
          );
        });
      }
      });
    this.userService.getPermissions().subscribe(
    res => {
      this.generateArrayForPermission(res);
      this.userPrivilegeList = this.allList;
    });
    this.userService.getOrganizations().subscribe(
    res => {
      this.generateArrayForOrganization(res);
      this.orgList = this.allList;
    });
    this.userService.getRole().subscribe(
    res => {
      this.generateArrayForRole(res);
      this.userRoleList = this.allList;
    });
    this.userService.getUserGroup().subscribe(
    res => {
      this.generateArrayForGroup(res);
      this.userGroupList = this.allList;
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

  generateArrayForGroup(group) {
    this.allList = [];
    group.results.filter(element => {
      this.allList.push(new Name(element.userGroupId,element.groupName));
    });
  }

  navigateToUserList() {
    this.router.navigate(['userlist']);
  }

  onChange(event) {
    this.titleExists = true;
  }

  validateAlpha(e) {
    if ((e.keyCode < 65 || e.keyCode > 90) && (e.keyCode < 97 || e.keyCode > 123) && e.keyCode != 32)
      return false;
    return true;
  }

  validateNum(e) {
    if (e.keyCode >= 48 && e.keyCode <= 57)
      return true;
    return false;
  }

  doSave(value: User, isValid: boolean, isUpdateChanges: boolean) {
    value.activeRoleList = this.user.activeRoleList;
    value.activePrivilegeList = this.user.activePrivilegeList;
    value.activeGroupList = this.user.activeGroupList;
    value.activeOrgList = this.user.activeOrgList;
    if (value.title != "Select") {
      this.titleExists = true;
    } else {
      this.titleExists = false;
    }
    if(value.prefix == "Select"){
      value.prefix = '';
    }
    if ((isValid) && (!this.userExists) && (!this.emailExists) && (this.titleExists) && (!this.invalidEmail)) {
      if (value.phoneCountryCode == undefined) {
        value.phoneCountryCode = '';
      }
      if (value.phoneStateCode == undefined) {
        value.phoneStateCode = '';
      }
      if (value.phone == undefined) {
        value.phone = '';
      }
      var mobileNumber = value.phoneCountryCode + " " + value.phoneStateCode + " " + value.phone;
      value.phone = mobileNumber;
      if (this.formState == "Add") {
        return this.userService.saveNewUser(value).subscribe(
        res => {
          this.userId = res;
          this.userAddedPopup.open();
          var that = this;
          setTimeout(function() { that.userAddedPopup.close() }, 1500);
          setTimeout(function() { that.navigateToUserList(); }, 1505);
        },
        error => console.error(error)
        );
      }
      else {
        return this.userService.updateUser(this.userId, value).subscribe(
        res => {
          this.userUpdatePopup.open();
          var that = this;
          setTimeout(function() { that.userUpdatePopup.close() }, 1500);
          if (!isUpdateChanges) {
          setTimeout(function() { that.navigateToUserList(); that.createUserForm.reset(); }, 1505);
          }
        },
        error => console.error(error)
        );
      }
    }
  }

  isFormInProgress() {
    return this.createUserForm.dirty;
  }

  getUser(value: string) {
    if (!value) {
      this.userExists = false;
    }
    else {
      this.userService.getUniqueName(value).subscribe(
      userNameData => {
        this.userExists = userNameData.isPresent;
      });
      }
  }

  getEmailCheck(value: string, u: string) {
    if (!value || value == this.userEmail) {
      this.invalidEmail = false;
      this.emailExists = false;
    }
    else {
      var EMAIL_REGEXP = /^[a-zA-Z0-9]([\.-_]?[a-zA-Z0-9])*@+[a-zA-Z0-9]([\.-]?[a-zA-Z0-9])*(\.[a-zA-Z0-9]{2,})+$/;
      if (!EMAIL_REGEXP.test(value)) {
        this.invalidEmail = true;
      }
      else {
        var personal_info = value.split("@");
        var domain = personal_info[1];
        console.log("FIRST CHARATCER FOR PERSONAL", personal_info[0].charAt(0));
        if (personal_info[0].length > 64 || domain.length > 35 || (personal_info[0].indexOf('^') >= 0) || (value.lastIndexOf('@') - personal_info[0].length > 0)) {
          this.invalidEmail = true;
        }
        else {
          this.emailDuplicateCheck(value);
        }
      }
    }
  }

  emailDuplicateCheck(value) {
    this.userService.getEmailUnique(value).subscribe(
    userEmailData => {
      this.invalidEmail = false;
      this.emailExists = userEmailData.isPresent;
    });
  }

  cancelUser() {
    this.cancelUserPopup.close();
  }

  cancelPopup() {
    this.cancelUserPopup.open();
  }

  confirmUserCancel() {
    this.cancelUserPopup.close();
    this.createUserForm.reset();
    this.navigateToUserList();
  }

  removeAlert() {
    this.invalidEmail = false;
    this.emailExists = false;
  }

  updatechanges() {
    this.userModifyPopup.close();
    this.doSave(this.createUserForm.form.value, this.createUserForm.valid, true);
    if (this.deactivateGaurdRes) {
      this.deactivateGaurdRes.next(true);
    }
  }

  cancelchanges() {
    this.userModifyPopup.close();
    if (this.deactivateGaurdRes) {
      this.deactivateGaurdRes.next(true);
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.isFormInProgress()) {
      this.userModifyPopup.open();
      const res = new Observable((obs) => this.deactivateGaurdRes = obs);
      return res;
    }
    return true;
  }

  removeUserNameError() {
    this.userExists = false;
  }

  refreshOrgValue(dataEvent){
    this.user.activeOrgList = dataEvent;
  }

  refreshUserGroup(dataEvent){
    this.user.activeGroupList = dataEvent;
  }

  refreshPrivilege(dataEvent){
    this.user.activePrivilegeList = dataEvent;
  }

  refreshRole(dataEvent){
    this.user.activeRoleList = dataEvent;
  }
}
