import { Component ,Input } from '@angular/core';
import { Router } from '@angular/router';
import {AppState} from '../app.service';

@Component({
  selector: 'leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['leftnav.component.css']
})

export class LeftNavComponent {

  private selectedDuration:Object;
  private ldapConfigEnabled : String;

  constructor(private router: Router, private appState: AppState){}

  ngOnInit(){
    this.appState.getldapConfigStatus().subscribe(
    res => {
      this.ldapConfigEnabled = res.ldapConfigEnabled;
      console.log("ldapConfigEnabled in leftnav", this.ldapConfigEnabled);
    });
  }

  ngAfterViewInit(){
    /*Left nav popover*/
    $('.popover-menu, .popup').hover(function(){
      var iconnumber = $(this).data('icon');
      $('.icon'+iconnumber).show();
    },function(){
      if(!($('.popover-menu:hover').length > 0))
        $('.popover-menu').hide();
    });
    /*Left nav popover Ends*/

    /*Left Nav*/
    $('#leftmenu').click(function(){
      if($('.left-nav').hasClass("slim")){
        $('.left-nav').removeClass("slim");
        $('.popover-menu').removeClass('hide');
        $('.sidebar') .animate({"width":"50px"},400);
        setTimeout(function() {
          $('.left-nav span').addClass("parentli");
          $('.submenu').slideUp(150);
        }, 150);
      }else{
        $('.left-nav').addClass("slim");
        $('.popover-menu').addClass('hide');
        $('.sidebar') .animate({"width":"250px"},400);
        setTimeout(function() {
          $('.submenu').slideDown(200);
          $('.left-nav span').removeClass("parentli");
        }, 200);
      }
    });

    $('#mobile_leftmenu').click(function(){
      $("#mob_sidemenu").toggle();
      $('#mob_sidemenu nav.left-nav').addClass("slim");
      $('#mob_sidemenu nav.sidebar') .animate({"width":"250px"},400);
      $('#mob_sidemenu nav.left-nav span').removeClass("parentli");
    });

    $(".mob_close").click(function(){
      $("#mob_sidemenu").hide();
      $('#mob_sidemenu nav.left-nav').removeClass("slim");
      $('#mob_sidemenu nav.sidebar') .animate({"width":"0px"},400);
      $('#mob_sidemenu nav.left-nav span').addClass("parentli");
    });

    $("#dash_toggle").click(function(){
      $(".dash_submenu").toggle();
    });

    $("#dash_submenu").click(function(){
      $("ul.dash_exp").toggle();
    });
    /*Left Nav Ends*/
  }
}
