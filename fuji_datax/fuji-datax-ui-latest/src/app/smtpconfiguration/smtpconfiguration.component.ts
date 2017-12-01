import { Component,ViewChild } from '@angular/core';
import {AppState} from '../app.service';
import { Smtp } from './smtpconfig.interface';
import { SmtpConfigurationService } from './smtpconfiguration.service';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: './smtpconfiguration.component.html'
})

export class SmtpConfigurationComponent {

  public smtpConfig: Smtp={};
  private selectOption: object[];
  @ViewChild('smtpConfigForm') public smtpConfigForm: NgForm;
  private userNameError:boolean = true;
  private passwordError:boolean = true;
  private invalidEmail:boolean = true;
  private disableUserName:boolean = false;
  private disablePassword:boolean = false;

  constructor(private appState:AppState,private smtpConfiguration:SmtpConfigurationService){
  }

  ngOnInit(){
    this.selectOption = [
    {
    value: "Select"
    },
    {
    value: "Yes"
    }, {
    value: "No"
    }
    ];
    this.smtpConfig.isSSL = this.selectOption[0].value;
    this.smtpConfig.isAuth = this.selectOption[0].value;
    this.appState.getUserName().subscribe(
    res => {
      this.getSmtpData(res.orgId);
    });
  }

  getSmtpData(orgId){
    this.smtpConfiguration.getSmtpConfiguration(orgId).subscribe(
    res => {
      this.smtpConfig.id = res.id;
      this.smtpConfig.orgId = res.orgId;
      this.smtpConfig.userName = res.userName;
      this.smtpConfig.password = res.password;
      this.smtpConfig.port = res.port;
      this.smtpConfig.server = res.server;
      this.smtpConfig.isAuth = (res.isAuth == true)?'Yes':'No';
      this.smtpConfig.isSSL = (res.isSSL == true)?'Yes':'No';
      this.smtpConfig.defaultEmail = res.defaultEmail;
      if(this.smtpConfig.isAuth == 'No'){
      this.disableUserName = true;
      this.disablePassword = true;
      }
    });
  }

  saveSmtpConfiguration(smtpConfig:Smtp,smtpConfigvalidation:boolean){
    if(smtpConfigvalidation && smtpConfig.defaultEmail!=null && smtpConfig.defaultEmail.trim()!=''){
      this.emailValidation(smtpConfig.defaultEmail);
    }
    if(smtpConfig.isAuth=='Yes'){
      if(smtpConfig.userName == null || smtpConfig.userName ==''){
        this.userNameError  = false;
      }else{this.userNameError  = true;}
      if(smtpConfig.password == null || smtpConfig.password ==''){
        this.passwordError  = false;
      }else{this.passwordError  = true;}
    }
    else{
      this.passwordError  = true;
      this.userNameError  = true;
    }
    if(smtpConfigvalidation && this.passwordError && this.userNameError && this.invalidEmail){
      smtpConfig.isSSL = false;
      smtpConfig.isAuth = (smtpConfig.isAuth=='Yes')?true:false;
      smtpConfig.orgId = this.smtpConfig.orgId;
      smtpConfig.isEnable = true;
      if(this.smtpConfig.id!=null){
        this.smtpConfiguration.updateSmtpConfiguration(this.smtpConfig.id,smtpConfig).subscribe(
        res => {
          console.log("Updated Successfully")
        });
      }
      else{  }
    }
  }

  resetForm(){
    this.smtpConfigForm.reset();
    this.smtpConfig.isAuth = this.selectOption[0].value;
  }

  validateAlpha(e) {
    if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode==46 || e.keyCode==45 ||(e.keyCode >= 97 && e.keyCode < 123) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 32)
      return true;
    return false;
  }

  validateNum(e) {
    if (e.keyCode >= 48 && e.keyCode <= 57)
      return true;
    return false;
  }

  removePasswordError(){
    this.passwordError  = true;
  }

  removeUserNameError(){
    this.userNameError  = true;
  }

  emailValidation(value: string) {
    var EMAIL_REGEXP = /^[a-zA-Z0-9]([\.-_]?[a-zA-Z0-9])*@+[a-zA-Z0-9]([\.-]?[a-zA-Z0-9])*(\.[a-zA-Z0-9]{2,})+$/;
    if (!EMAIL_REGEXP.test(value)) {
      this.invalidEmail = false;
    }
    else {
      var personal_info = value.split("@");
      var domain = personal_info[1];
      if (personal_info[0].length > 64 || domain.length > 35 || (personal_info[0].indexOf('^') >= 0) || (value.lastIndexOf('@') - personal_info[0].length > 0)) {
        this.invalidEmail = false;
      }
      else{
        this.invalidEmail = true;
      }
    }
  }

  removeEmailError(){
    this.invalidEmail = true;
  }

  getText(event){
    if(this.smtpConfig.isAuth == 'Yes'){
      this.disableUserName = false;
      this.disablePassword = false;
    }
    else{
      this.smtpConfig.userName = '';
      this.smtpConfig.password = '';
      this.disableUserName = true;
      this.disablePassword = true;
      this.userNameError = true;
      this.passwordError = true;
    }
    }
}
