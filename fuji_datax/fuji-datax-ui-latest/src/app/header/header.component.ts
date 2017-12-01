import { Component, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {AppState} from '../app.service';
import {AppComponent} from '../app.component';
import { HeaderService } from './header.service';
import { UpdateAlert } from './header.interface';
import {Observable} from 'rxjs/Rx';

@Component({
  selector:'header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css']
})

export class HeaderComponent {

  @Input() name:Object;

  private bearer: any;
  private ldapConfigEnabled : String;
  private changedStatus: String;
  private loginUserId: string;
  private unreadAlertCount: number;
  private alert = [];
  private alertId = [];
  private newarrayname = [];
  public updateAlert : UpdateAlert = {};
  public personalTagsList = [];							   

  constructor(private appState: AppState,
    private headerservice: HeaderService,
    @Inject('bearer') bearer: string) {
    this.bearer = bearer;
    Observable.interval(10000).subscribe(x => {
      this.getAlertOnLoad();
    });
  }

  ngOnInit(){
    this.appState.getldapConfigStatus().subscribe(
    res => {
      this.ldapConfigEnabled = res.ldapConfigEnabled;
      console.log("ldapConfigEnabled in header", this.ldapConfigEnabled);
    });
    this.appState.getUserName().subscribe(
    res => {
      this.loginUserId = res.id;
      this.getAlertOnLoad();
    });
  }

  getAlertOnLoad(){
    this.headerservice.getAlert(this.loginUserId).subscribe(
    res => {
      this.unreadAlertCount = res.unreadAlertsCount;
      this.alert = res.results;
      console.log("Res of GetAlert",this.alert);
    });
  }

  updateAlertStatus(alertid,currentStatus){
    this.newarrayname=[];
    this.alert.filter(element => {
      if( currentStatus == "UNREAD"){ this.changedStatus = "READ"; }else { this.changedStatus = "UNREAD"; }
      if(alertid.length>1){
        this.alertId.filter(elementid =>{
        if (element.alertId == elementid){
          this.newarrayname.push(element.alertId);
          this.updateAlert.orgId = element.orgId;
        }
        this.updateAlert.id = this.newarrayname;
        });
      }
      else{
        if (element.alertId == alertid){
          this.newarrayname.push(element.alertId);
          this.updateAlert.orgId = element.orgId;
        }
        this.updateAlert.id = this.newarrayname;
      }
      this.updateAlert.status = this.changedStatus;
      this.updateAlert.dataXUser = element.datax_receiver;
    });
    console.log("On update",this.updateAlert);
    this.headerservice.updateAlertStatus(this.updateAlert).subscribe(
    res=>{
    this.getAlertOnLoad();
    });
  }

  updateStatus(){
    this.alertId=[];
    for (var i=0; i < this.alert.length; i++){
      if(this.alert[i].status == "UNREAD"){
        this.alertId[i] = this.alert[i].alertId;
      }
    }
    console.log("List of alert id",this.alertId);
    this.updateAlertStatus(this.alertId,"UNREAD")
  }


  ngAfterViewInit(){
  var that = this;

  $('.dropdown-menu').on('click', function(e) {
    e.stopPropagation();
  });

  /*Header Alert Menu */
  $("body").click(function(){
    if($("#alertLi").hasClass("open")){
      that.updateStatus();
    }
  });
  /* Header Alert Menu Ends*/

  /* Search  */
  $("#search_bar").click(function(){
    $("#search_bar").hide();
    $("#search_close").show();
    $(".search_box").toggle();
  });

  $("#search_close").click(function(){
    $("#search_close").hide();
    $("#search_bar").show();
    $(".search_box").toggle();
  });
  /* Search Ends */

  /* Mast Head User Dropdown */
  $(".user-dropdown").click(function(){
    $(".user-dropdown ul.dropdown-menu").toggle();
  });

  $('#overlaymenu').click(function(){
    $('ul.mob-dropdown').toggle();
  });

  $('.userDropDownMobile').click(function(){
    $('.userDropDownMobileOptions').slideToggle();
  });
  /* Mast Head User Dropdown Ends */

  $("#logout").click(function()
  {
    $.ajax({
      method : "GET",
      url : "/auth/logout",
      xhrFields:{
        withCredentials: true
      },
      success : function(response){
        window.location.href = 'login.html';
      }
    });
  });

  $("#changePassword").click(function() {
    window.location.href = 'changePassword.html';
  });

  }
}
