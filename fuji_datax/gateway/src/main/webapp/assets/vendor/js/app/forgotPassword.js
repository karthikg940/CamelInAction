
$(document).ready(function() 
{
	//validateUserInfo();
	validateFields();
});


function validateFields(){
	
	$("#btnResetPassword").click(function( event ) 
		{
		 $("#errorDiv").remove(".p-a-1").text('');
		 var username = $("#txtUserName").val();
		 if(username == "")
		   {
		        $('#errorDiv').removeClass('hide');
		        $('#errorDiv').addClass('errorDivOrange').append("<i class='fa fa-exclamation p-a-1'></i>Kindly provide a username");
		   }
		 else {
			 $('#errorDiv').addClass('hide');
			 validateUserInfo();}
		
});
}

$(document).keypress(function(event)
		{
		       var keycode = (event.keyCode ? event.keyCode : event.which);
		       if(keycode == '13')
			   {
		    	   if($('#btnResetPassword').is(':visible'))
		     	  {
		             $('#btnResetPassword').trigger("click");
		             $('#txtUserName').focus();
		             event.preventDefault();
		           }   
		       }
		});


function validateUserInfo(){
	
	var value = $("#txtUserName").val();
	$.ajax({
		method : "GET",
		url : '/auth/login/validate',
		data : {
			value:value
		}
	}).done(function(data, textStatus, jqXHR) {
				console.log("Inside function.....", data, textStatus, jqXHR.status);
				if (jqXHR.status == 200) {
					//$('#errorDiv').removeClass('show');
					$('#errorDiv').addClass('hide');
					console.log("on success perform this");
					if(data.passwordReset == true)
					resetPassword(value);
					else{
						$('#errorDiv').removeClass('hide');
						$('#errorDiv').addClass('errorDivOrange').append("<i class='fa fa-exclamation p-a-1'></i>Username not registered/ not active. Kindly re-try. ");
						 $('#txtUserName').val("");
					}
				}
	});
	
	
}

function resetPassword(value){
	console.log("resetPassword");
	$.ajax({
		method : "POST",
		url : '/auth/login/reset',
		data : {
			value:value
		}
	}).done(function(data, textStatus, jqXHR) {
				console.log("Inside resetPassword.....", data, textStatus, jqXHR.status);
				if (data.passwordReset == true) {
					console.log("resetPassword success");
					$('#errorDiv').removeClass('hide');
					$('#errorDiv').addClass('errorDivOrange').append("<i class='fa fa-info-circle p-a-1'></i>A new password is generated and sent to your registered Email address. Kindly check your mail for details.");
					$('#txtUserName').hide();
					$('#btnResetPassword').hide();
					
				}else{
				//	$('#errorDiv').addClass('hide');
					$('#errorDiv').removeClass('hide');
					$('#errorDiv').addClass('errorDivOrange').append("<i class='fa fa-exclamation p-a-1'></i>Username not registered/ not active. Kindly re-try. ");
					$('#txtUserName').val(""); 
				}
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log("Inside fail call.....", errorThrown, textStatus, jqXHR);
	});
	
}