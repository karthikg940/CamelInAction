import { Component, ViewChild, } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Observable, Observer } from 'rxjs/Rx';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { LdapConfigurationService } from './ldapconfiguration.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LdapData } from './ldapconfiguration.interface';


@Component({
  templateUrl: './ldapconfiguration.component.html'
})

export class LdapConfigurationComponent {

  public ldapData: LdapData = {};
  private selectOption: object[];
  private typeExists: boolean;
  private isValidConn: boolean;
  private ldapConfigId: string;
  private saveTest: boolean = true;

  @ViewChild('saveLdapConfigPopup')
  saveLdapConfigPopup: ModalComponent;

  @ViewChild('testConnPopup')
  testConnPopup: ModalComponent;

  @ViewChild('testConnFailPopup')
  testConnFailPopup: ModalComponent;

  @ViewChild('createldapConfigForm') public createldapConfigForm: NgForm;

  constructor(
  public route: ActivatedRoute,
  private router: Router,
  private ldapConfigurationService: LdapConfigurationService
  ) {

  this.selectOption = [
    {
    value: "Choose DirectoryType"
    },

    {
    value: "Active Directory"
    }
  ];

  this.ldapData.directoryType = this.selectOption[0].value;
  this.typeExists = true;
  }

  ngOnInit() {
    this.getldapConfig();
  }

  onChange(event) {
    this.typeExists = true;
  }

  doSave(value: LdapData) {
    if (this.ldapConfigId) {
      return this.ldapConfigurationService.updateLdapConfig(this.ldapConfigId, value).subscribe(
      res => {
        this.saveLdapConfigPopup.open();
        var that = this;
        setTimeout(function() { that.saveLdapConfigPopup.close() }, 1500);
        this.saveTest=true;
      },
      error => console.error(error)
      );
    }
    else {
      if (value.directoryType != "Choose DirectoryType") {
        this.typeExists = true;
        return this.ldapConfigurationService.saveldapConfig(value).subscribe(
        res => {
          this.saveLdapConfigPopup.open();
          var that = this;
          this.ldapConfigId = res;
          setTimeout(function() { that.saveLdapConfigPopup.close() }, 1500);
          this.saveTest=true;
        },
        error => console.error(error)
        );
      } else {
        this.typeExists = false;
      }
    }
  }

  doValidateConn(value: LdapData) {
    return this.ldapConfigurationService.validateConnection(value).subscribe(
    res => {
      this.isValidConn = res.isValidConn;
      if (this.isValidConn == true) {
        this.testConnPopup.open();
        this.saveTest=false;
      }
      else {
        this.isValidConn = false;
        this.testConnFailPopup.open();
      }
    });
  }

  validateNum(e) {
    if (e.keyCode >= 48 && e.keyCode <= 57)
      return true;
    return false;
  }

  getldapConfig() {
    this.ldapConfigurationService.getLdapConfig().subscribe(
    res => {
      this.ldapConfigId = res.id;
      this.ldapData.directoryType = res.directoryType;
      this.ldapData.remoteServer = res.remoteServer;
      this.ldapData.accessGroup = res.accessGroup;
      this.ldapData.searchRoot = res.searchRoot;
      this.ldapData.ldapPort = res.ldapPort;
      this.ldapData.userDn = res.userDn;
      this.ldapData.manageDn = res.manageDn;
      this.ldapData.managePassword = res.managePassword;
    },
    error => console.error(error)
    );
  }

  cancelPopup() {
    this.createldapConfigForm.reset();
    this.getldapConfig();
    this.saveTest=true;
  }

  successOk(){
    this.testConnPopup.close()
  }

  failTestOk(){
    this.testConnFailPopup.close()
  }

  chengesInForm(e){
    this.saveTest=true;
    if(e.keyCode == 8 || e.keyCode == 46)
      this.saveTest=true;
  }
}
