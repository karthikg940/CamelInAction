import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { IPasswordConfig } from './passwordconfig.interface';
import { PasswordConfigurationService } from './passwordconfiguration.service';
import {AppState} from '../app.service';

@Component({
    templateUrl: './passwordconfiguration.component.html'
})

export class PasswordConfigurationComponent {

  public pwdConfig: IPasswordConfig ={} ;
  public loginPolicy: IPasswordConfig ={} ;
  public lpChangeVal : IPasswordConfig ={} ;
  public lpDefaultVal : IPasswordConfig ={} ;
  private orgId : string;
  private orgLoginId: string;
  private this.sizeVal : string;
  private emptyNumber:number=1;
  private orgLoginPolicyId:number;
	checkminthree: boolean;

  @ViewChild('pwdConfigForm') public pwdConfigForm: NgForm;
  
  constructor(private pwdConfigService: PasswordConfigurationService,private appState:AppState){

  }

  ngOnInit(){
    this.orgId = this.appState.get("orgId");
    this.pwdConfigService.getPasswordConfigPolicy(this.orgId).subscribe(
      res=> {
        this.sizeVal = res.results.length;
        if(this.sizeVal == '2'){
          this.lpVal = res.results[0].isDefault;
          if(this.lpVal == 'Y'){
            this.lpDefaultVal=res.results[0];
            console.log("this.loginPolicy if yes at First",this.loginPolicy)
            this.lpChangeVal=res.results[1];
            this.orgLoginPolicyId= res.results[1].id;
            console.log("this.lpChangeVal if yes at First",this.lpChangeVal)
            if(this.lpChangeVal.pwdminlen>0)
              this.assignValueToTextBox(this.lpChangeVal);
            else
              this.assignValueToTextBox(this.lpDefaultVal);
          }
          else {
            this.lpDefaultVal=res.results[0];
            console.log("this.lpDefaultVal if yes at Second",this.lpDefaultVal);
            this.lpChangeVal=res.results[1];
            this.orgLoginPolicyId= res.results[1].id;
            console.log("this.loginPolicy if yes at Second",this.lpChangeVal);
            if(this.lpChangeVal.pwdminlen>0)
              this.assignValueToTextBox(this.lpChangeVal);
            else
              this.assignValueToTextBox(this.lpDefaultVal);
          }
        }
        else{
          this.lpDefaultVal=res.results[0];
          console.log("this.emptyValue if yes at Second",this.lpDefaultVal)
          this.assignValueToTextBox(this.lpDefaultVal);
        }
    },
    error=> console.error(error)
    );
  }

  assignValueToTextBox(value:IPasswordConfig){
	this.pwdConfig.isUppercase = value?value.isUppercase:this.isUppercase
	this.pwdConfig.isLowercase = value?value.isLowercase:this.isLowercase
	this.pwdConfig.isNumber = value?value.isNumber:this.isNumber
	this.pwdConfig.isSplChar = value?value.isSplChar:this.isSplChar
	this.pwdConfig.pwdminlen = value?value.pwdminlen:this.pwdminlen;
    this.pwdConfig.sysgenpwd = value?value.sysgenpwd:this.sysgenpwd;
    this.pwdConfig.userdfndpwdexp = value?value.userdfndpwdexp:this.userdfndpwdexp;
    this.pwdConfig.pwdReuseRestriction = value?value.pwdReuseRestriction:this.pwdReuseRestriction;
    this.pwdConfig.accntlockmax = value?value.accntlockmax:this.accntlockmax;
    this.pwdConfig.tmplock = value?value.tmplock:this.tmplock;
  }

  validateNum(e) { 
    if (e.keyCode >= 48 && e.keyCode <= 57)
      return true;
    return false
  }

  savePolicy(value:pwdConfig,isValid: boolean){
    for(var k in value) {
         	var a =0;
             if(value.isUppercase){
             	a =a+1;
               }
             if(value.isLowercase){
             	a =a+1;
             }
             if(value.isNumber){
             	a =a+1;
             }
             if(value.isSplChar){
             	a =a+1;
             }
             if(a <3){
            	this.checkminthree = true;
            	 return;
             }
             else{
            	 this.checkminthree=false;
             } 
      if(value[k] === "0")
        return;
    }
    if(!this.orgLoginPolicyId){
      return this.pwdConfigService.savePasswordConfigPolicy(value).subscribe(
      res=> {
        this.lpChangeVal = value;
        this.orgLoginPolicyId =res;
        console.log("THIS.VALUE AS RESPONSE",res);
        if(res)
        	{
        	alert("saved successfully");
        	}
      },
      error=> console.error(error)
      );
    }
    else{
      this.pwdConfigService.updatePasswordConfigPolicy(value,this.orgLoginPolicyId).subscribe(
      res=> {
        this.lpChangeVal = value;
        console.log("THIS.VALUE AS RESPONSE",res);
        if(res)
        	{
        	alert("updated successfully")
        	}
      },
      error=> console.error(error)
      );
    }
  }

  resetForm(){
	  this.pwdConfig.pwdminlen = this.lpChangeVal?this.lpChangeVal.pwdminlen:this.pwdminlen;
	  this.pwdConfig.isUppercase = this.lpChangeVal?this.lpChangeVal.isUppercase:this.isUppercase;
	  this.pwdConfig.isLowercase = this.lpChangeVal?this.lpChangeVal.isLowercase:this.isLowercase;
	  this.pwdConfig.isNumber = this.lpChangeVal?this.lpChangeVal.isNumber:this.isNumber;
	  this.pwdConfig.isSplChar = this.lpChangeVal?this.lpChangeVal.isSplChar:this.isSplChar;
	  this.pwdConfig.sysgenpwd = this.lpChangeVal?this.lpChangeVal.sysgenpwd:this.sysgenpwd;
	  this.pwdConfig.userdfndpwdexp =  this.lpChangeVal?this.lpChangeVal.userdfndpwdexp:this.userdfndpwdexp;
	  this.pwdConfig.pwdReuseRestriction = this.lpChangeVal?this.lpChangeVal.pwdReuseRestriction:this.pwdReuseRestriction;
	  this.pwdConfig.accntlockmax = this.lpChangeVal?this.lpChangeVal.accntlockmax:this.accntlockmax;
	  this.pwdConfig.tmplock = this.lpChangeVal?this.lpChangeVal.tmplock:this.tmplock;
      this.hideErrorMsg();
  }

  resetDefault(){
	this.pwdConfig.pwdminlen = this.lpDefaultVal?this.lpDefaultVal.pwdminlen:this.pwdminlen;
    this.pwdConfig.sysgenpwd = this.lpDefaultVal?this.lpDefaultVal.sysgenpwd:this.sysgenpwd;
    this.pwdConfig.userdfndpwdexp = this.lpDefaultVal?this.lpDefaultVal.userdfndpwdexp:this.userdfndpwdexp;
    this.pwdConfig.pwdReuseRestriction = this.lpDefaultVal?this.lpDefaultVal.pwdReuseRestriction:this.pwdReuseRestriction;
    this.pwdConfig.accntlockmax = this.lpDefaultVal?this.lpDefaultVal.accntlockmax:this.accntlockmax;
    this.pwdConfig.tmplock = this.lpDefaultVal?this.lpDefaultVal.tmplock:this.tmplock;
    this.pwdConfig.isUppercase = this.lpDefaultVal?this.lpDefaultVal.isUppercase:this.isUppercase;
	this.pwdConfig.isLowercase = this.lpDefaultVal?this.lpDefaultVal.isLowercase:this.isLowercase;
	this.pwdConfig.isNumber = this.lpDefaultVal?this.lpDefaultVal.isNumber:this.isNumber;
	this.pwdConfig.isSplChar = this.lpDefaultVal?this.lpDefaultVal.isSplChar:this.isSplChar;
    this.hideErrorMsg();
  }

  hideErrorMsg(){
    this.errsyspwd=false;
    this.erruserdndpwd=false;
    this.errpwdreuse=false;
    this.errlockmax=false;
    this.errtmplock=false;
    this.errsyspwd=false;
    this.errpwdminlen = false;
    this.checkminthree=false;
  }

  diserrsyspwd(value){
    if(value == 'hide' || !value)
      this.errsyspwd = false;
    else if(value==0)
      this.errsyspwd = true;
  }

  diserruserdndpwd(value){
    if(value == 'hide' || !value)
      this.erruserdndpwd=false;
    else if(value==0)
      this.erruserdndpwd = true;
  }

  diserrpwdreuse(value){
    if(value == 'hide' || !value)
      this.errpwdreuse=false;
    else if(value==0 || value>10)
      this.errpwdreuse = true;
  }

  diserrlockmax(value){
    if(value == 'hide' || !value)
      this.errlockmax=false;
    else if(value==0)
      this.errlockmax = true;
  }

  diserrtmplock(value){
    if(value == 'hide' || !value)
      this.errtmplock=false;
    else if(value==0)
      this.errtmplock = true;
  }

  dispwdminlen(value){
    if(value == 'hide' || !value)
      this.errpwdminlen=false;
    else if(value<8 || value>64)
      this.errpwdminlen = true;
  }
  
}