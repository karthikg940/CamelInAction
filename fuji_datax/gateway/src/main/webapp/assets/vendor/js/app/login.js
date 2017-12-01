
$(document).ready(function() 
{
	loadLdapPreference();
	 $(window).bind("capsOn", function(event) 
	 {
		 $("#caps").remove(".p-r-1").text('');
	     if ($("#txtPwd:focus").length > 0) 
	     {
	    	 $('#caps').removeClass('hide');
	        $('#caps').addClass('errorDivOrange').append("<i class='fa fa-exclamation-triangle p-a-1'></i>Caps Lock is On ");
	     } 
	 });
	 
	 $(window).bind("capsOff capsUnknown", function(event) 
	 {
		 $("#caps").remove(".p-r-1").text('');
		 $("#caps").addClass('hide').text("");
		 $("#caps").remove('.p-r-1');
     });   	 
	
	 $("#txtPwd").bind("focusin", function(event) 
	 {
		 $("#caps").remove(".p-r-1").text('');
		 if ($(window).capslockstate("state") === true)
	     {
			 $('#caps').removeClass('hide');
	        $("#caps").addClass('errorDivOrange').append("<i class='fa fa-exclamation-triangle p-a-1'></i>Caps Lock is On ");
	     }	        
	 });	    
		    
	 $(window).capslockstate();	 
	 
	 validateFields();
	 
	 logout();	 
});


$(document).keypress(function(event)
{
       var keycode = (event.keyCode ? event.keyCode : event.which);
       if(keycode == '13')
	   {
    	   if($('#btnLogin').is(':visible'))
    	  {
            $('#btnLogin').trigger("click");
            $('#txtUserName').focus();
            event.preventDefault();
          }      
       }
});


function validateFields()
{
	$("#btnLogin").click(function( event ) 
	{	
		 $("#errorDiv").remove(".p-a-1").text('');
		 var username = $("#txtUserName").val();
		 var pwd = $("#txtPwd").val(); 
		 var rememberme = document.getElementById("chkPwd").checked
		 
		   if(username == "" && pwd == "" )
		   {
				$('#errorDiv').removeClass('hide');
		        $('#errorDiv').addClass('errorDivOrange').append("<i class='fa fa-exclamation p-a-1'></i>Please enter your username and password");
		   }
		   else if(username == "")
		   {
		        $('#errorDiv').removeClass('hide');
		        $('#errorDiv').addClass('errorDivOrange').append("<i class='fa fa-exclamation p-a-1'></i>Please enter your username");
		   }
		   else
		   {
		        //$('#errorDiv').removeClass('show');
		        $('#errorDiv').addClass('hide').text("");
		        if(pwd == "")
		        {
		             $('#errorDiv').removeClass('hide');
		             $('#errorDiv').addClass('errorDivOrange').append("<i class='fa fa-exclamation p-a-1'></i>Please enter your password");
		        }
				else
				{
		            // $('#errorDiv').removeClass('show');
		             $('#errorDiv').addClass('hide').text("");
		             rememberme ? rememberMe() : validate(); 
		         }
		    }
		 
		 event.preventDefault();
     });
}

function validateRememberMeCookie()
{
   $.ajax({
		      method : "GET",
			  url : '/auth/login?',
			  xhrFields: 
			  { 
			     withCredentials: true
			  },
			  success : function(resp)
			  { 
				  if(resp != ''){
					  	window.name=resp;
			    	   window.location.href = '/index?token='+resp;	}
			  },
		 });
}

function logout()
{
	$("#logout").click(function()
	{
		$.ajax({
			       method : "GET",
			       url : "/auth/logout"
		      });
	});
}

function loadLdapPreference(){
		$.ajax({
			method : "GET",
		    url : '/auth/passwordpolicy'
		}).done(function( data ) {
		    	console.log("Forget Password Enable/Disable",data);
		    	if(data.ldapConfigEnabled){
		    		$('#forgetPassword').hide();
		    	}else{
		    		$('#forgetPassword').show();
		    	}
		});
}