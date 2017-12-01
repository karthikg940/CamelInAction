var passwordValidateStatus = false
var currentPasswordStatus = false;
var passwordMatch = false;

function validate() 
{
	var userName = $("#txtUserName").val();
	var password = $("#txtPwd").val();
	var data = {user : userName,pwd : password};
	$.ajax({
		     method : "POST",
		     url : '/auth/login?',
			 data : data,
		  }).done(function(response) 
			{
			  window.name = response.token;
			  if(response.pwdExpiredStatus == 'Y')
			      window.location.href = '/changePassword';
			  else if (response.isPwdSysGenStatus == 'Y') {
				    window.location.href = '/changePassword';
				}
		      else if(response.activeStatus == 'N')
				  showAfterAccountDeactivated();
			  else if(response.lockStatus == 'Y')
				  showAfterAccountLocked();
			  else if(response.activeStatus == 'Y' && response.lockStatus == 'N')
				  window.location.href = '/index?token='+response.token;	

			}).fail(function(jqXHR) 
			{ 
				if (jqXHR.status === 401)
					showWrongCredentialError();
				else if(jqXHR.status === 403)	
					showAfterAccountLocked();
				else if(jqXHR.status === 400)
				     showAfterAccountDeactivated();
				else if(jqXHR.status === 404){
 					 showUserNotFountInDataX();
 				 }
			});
}

function rememberMe() {
	
	var userName = $("#txtUserName").val();
	var rememberme = document.getElementById("chkPwd").checked;
	  document.getElementById("chkPwd").checked = false;
	  if(rememberme)
	  {
		  
		  var dc = document.cookie;
		     if(dc != null && dc.length>0)
		     {
		    	 window.location.href = 'index.html';	
		     }
		     else
		     {
			    $.ajax({
			    	     method : "POST",
			    	     url : '/auth/login?',
					     data:{user:$('#txtUserName').val(),pwd:$('#txtPwd').val(),rememberMe:rememberme},
					     xhrFields: 
					     {
					        withCredentials: true
					     },
					     success : function(response)
					     {
					    	  window.name = response.token;
					    	  if(response.pwdExpiredStatus == 'Y')
							      window.location.href = '/changePassword'
							  else if (response.isPwdSysGenStatus == 'Y') {
								  window.location.href = '/changePassword';
								}
						      else if(response.activeStatus == 'N')
								  showAfterAccountDeactivated();
							  else if(response.lockStatus == 'Y')
								  showAfterAccountLocked();
							  else if(response.activeStatus == 'Y' && response.lockStatus == 'N')
								  window.location.href = '/index?token='+response.token;	
							
					     },
					     error: function(jqXHR, textStatus, errorThrown)
					     {
					    	 console.log("jqXHR",jqXHR);
					    	 console.log("jqXHR.status",jqXHR.status);
					    	 if (jqXHR.status === 401)
									showWrongCredentialError();
							 else if(jqXHR.status === 403)	
									showAfterAccountLocked();
							 else if(jqXHR.status === 400){
							     showAfterAccountDeactivated();
							 }
					     }
			         });
		      } 
	   }
}

function passwordStrengthChecker() {
	$('#passwordStrengthResult').html(checkStrength($('#newPassword').val()))
}
function checkStrength(password) {
	var strength = 0
	if (password.length == 0) {
		return ''
	}
	if (password.length < 8) {
		$('#passwordStrengthResult').removeClass();
		$('#passwordStrengthResult').addClass('short');
	return 'Too short'
	}
	//for length
	if (password.length > 9) strength += 1
	// for numbers
	if (password.match(/([0-9])/)) strength += 1
	// for uppper and lower case
	if (password.match(/([a-z])/) && password.match(/([A-Z])/)) strength += 1
	// for special character
	if (password.match(/([`,~,!,@,#,$,%,^,&,*,-,+,=,|,.,,,:,;,?,<,>,",'])/)) strength += 1
	if (strength <= 2) {
		$('#passwordStrengthResult').removeClass();
		$('#passwordStrengthResult').addClass('weak');
		return 'Weak'
	} else if (strength == 3) {
		$('#passwordStrengthResult').removeClass();
		$('#passwordStrengthResult').addClass('good');
		return 'Good'
	} else {
		$('#passwordStrengthResult').removeClass();
		$('#passwordStrengthResult').addClass('strong');
		return 'Strong'
	}
	}



function showWrongCredentialError(){
	 $('#errorDiv').removeClass('hide');
	 $('#errorDiv').addClass('errorDivOrange').append("<i class='fa fa-exclamation p-a-1'></i>Wrong username or password. Try again.");
	 $('#txtPwd').val(""); 
}

function showAfterAccountLocked(){
	// $('#errorDiv').addClass('hide');
	 $('#errorDiv').removeClass('hide');
     $('#errorDiv').addClass('errorDivOrange').append("<i class=' ra fa fa-exclamation p-a-1'></i>Account temporarily locked. Kindly try after few minutes.");
	 $('#txtUserName').val("");
	 $('#txtPwd').val("");
}

function showAfterAccountDeactivated(){
	 $('#errorDiv').removeClass('hide');
	 $('#errorDiv').addClass('errorDivOrange').append("<i class='fa fa-exclamation p-a-1'></i>Account Deactivated. Please contact Administrator.");
     $("#txtUserName").prop('disabled', true); 
	 $("#txtPwd").prop('disabled', true);
	 $("#chkPwd").prop('disabled', true);
	 $("#btnLogin").addClass('hide');
	 $('#btnLoginDisabled').addClass('show');
	 $('#txtUserName').val("");
	 $('#txtPwd').val("");
}
function showUserNotFountInDataX(){
 	 $('#errorDiv').removeClass('hide');
 	 $('#errorDiv').addClass('errorDivOrange').append("<i class='fa fa-exclamation p-a-1'></i>User is Not Available in DataX.");
 	 $('#txtUserName').val("");
 	 $('#txtPwd').val("");
 }

function changePassword() {
	var currentPassword = $("#currentPassword").val();
	var newPwd = $("#newPassword").val();
	var confirmPassword = $("#confirmPassword").val();
	var currentPwd = checkCurrentPassword();
	console.log("currentPwd",currentPwd);
	$("#warning").remove(".p-r-1").text('');
	$('#changePasswordBtn').attr("disabled", true);
	var newPwd = $("#newPassword").val();
	var confirmPassword = $("#confirmPassword").val();
	var token = window.name;
	setTimeout(function(){
	if (currentPassword && newPwd && confirmPassword && newPwd==confirmPassword && currentPasswordStatus == true && passwordValidateStatus == true) {
		$.ajax({
			method : "PUT",
			url : '/auth/login/changesyspwd',
			data : {
				password : newPwd,
				token:token
				}
		}).done(function(data, textStatus, jqXHR) {
			console.log("Inside changepwd  call.....", data, jqXHR.status);
			if (jqXHR.status == 200){
				displayToast();
				setTimeout(function(){
					
					$.cookie('rememberMe', '', { expires: -1, path: '/auth'});
					window.location.href = 'login.html';	
			    }, 3100);
			}
		}).fail(
				function(jqXHR, textStatus, errorThrown) {
					console.log("Inside fail change password call.....", 
							textStatus, jqXHR);
				});

	} else {
		console.log("pasword not matched or current password is wrong")
	}
    }, 2000);
}

function displayToast(){
	var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){
    x.className = x.className.replace("show", ""); }, 3000);
}

function checkCurrentPassword() {
	$('#passwordStrengthResult').addClass('hide');
	var currentPassword = $("#currentPassword").val();
	var newPwd = $("#newPassword").val();
	var confirmPassword = $("#confirmPassword").val();
	var token = window.name;
	if(currentPassword){
		$.ajax({
				method : "GET",
				url : '/auth/login/currentpasswordvalidate',
				data : {
					password : currentPassword,
					token : token
				}
			}).done(function(data, textStatus, jqXHR) {
				console.log("Inside currentpwd  call.....", data, jqXHR.status);
						if (data == true){
							
							currentPasswordStatus = true;
							if(newPwd && confirmPassword){
								if (newPwd == confirmPassword){
									passwordMatch=true
										$('#changePasswordBtn').attr("disabled", false);

								}
							}
							return true;
						}
						
						else{
							currentPasswordStatus = false;
							showNotCurrentPwdWrng();
							$('#passwordMatch').addClass('hide');
						return false;
			}
					}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log("Inside fail call.....",textStatus, jqXHR);
			});
		
	}
	else if(currentPassword=="") {
		currentPasswordStatus = false
		$('#changePasswordBtn').attr("disabled", true);
	}
	if(currentPasswordStatus == true && passwordValidateStatus == true && passwordMatch==true){
		$('#changePasswordBtn').attr("disabled", false);

	}
}

function showNotCurrentPwdWrng(){
    $("#warning").remove(".p-r-1").text('');
    $('#warning').removeClass('hide');
	$('#warning').addClass('errorDivOrange').append("<i class='fa fa-exclamation p-a-1'></i>This is not your current password. ");
	$('#changePasswordBtn').attr("disabled", true);
}

function validateNewPassword() {
	$("#warning").remove(".p-r-1").text('');
	$('#changePasswordBtn').attr("disabled", true);
	
	var newPwd = $("#newPassword").val();
	var confirmPassword = $("#confirmPassword").val();
	var token = window.name;
	if(newPwd) {
	$.ajax({
		method : "GET",
		url : '/auth/login/newpasswordvalidate',
		data : {
			password : newPwd,
			token : token
		}
	}).done(function(data, textStatus, jqXHR) {
		console.log("Inside newpwd  call.....", data, jqXHR.status);
				if (data == true) {
					passwordValidateStatus = true
					$('#warning').addClass('hide');
					//$('#confirmPassword').prop("disabled", false);
				}
				else{
					$('#warning').removeClass('hide');
					$('#warning').addClass('errorDivOrange').append("<i class='fa fa-exclamation p-a-1'></i>The password does not meet the minimum requirements. Kindly provide another password. ");
					//$('#confirmPassword').prop("disabled", true);
					document.getElementById("confirmPassword").value = "";
					$('#passwordNotMatch').addClass('hide');
					passwordValidateStatus = false;
					$('#passwordMatch').addClass('hide');
					$('#changePasswordBtn').attr("disabled", true);
					}
			}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log("Inside fail call.....", errorThrown, textStatus, jqXHR);
	});
/*	
	if(confirmPassword){
		if (newPwd == confirmPassword){
			passwordMatch=true
			$('#passwordMatch').removeClass('hide');
			$('#passwordNotMatch').addClass('hide');
			if(currentPasswordStatus == true && passwordValidateStatus == true && passwordMatch==true) {
				$('#changePasswordBtn').attr("disabled", false);
			}
		} else {
			$('#passwordNotMatch').removeClass('hide');
			$('#passwordMatch').addClass('hide');
		}
	  }*/
	}
	else{
		document.getElementById("confirmPassword").value = "";
	}
	if(currentPasswordStatus == true && passwordValidateStatus == true && passwordMatch==true){
		$('#changePasswordBtn').attr("disabled", false);

	}

}


function validateReentredPassword() {
	$("#warning").remove(".p-r-1").text('');
	$('#changePasswordBtn').attr("disabled", true);
	var newPwd = $("#newPassword").val();
	var confirmPassword = $("#confirmPassword").val();
	if(newPwd && confirmPassword) {
	if (newPwd == confirmPassword){
		passwordMatch=true
		$('#passwordNotMatch').addClass('hide');
		 if(currentPasswordStatus == true && passwordValidateStatus == false && passwordMatch==true){
			$('#warning').removeClass('hide');
			$('#warning').addClass('errorDivOrange').append("<i class='fa fa-exclamation p-a-1'></i>The password does not meet the minimum requirements. Kindly provide another password. ");
		}
		else if(currentPasswordStatus == true && passwordValidateStatus == true && passwordMatch==true) {
			$('#passwordMatch').removeClass('hide');
			$('#changePasswordBtn').attr("disabled", false);
		}
	} 
   else if (newPwd != confirmPassword &&passwordValidateStatus == false && currentPasswordStatus == true){
	    $('#warning').removeClass('hide');
	    $('#warning').addClass('errorDivOrange').append("<i class='fa fa-exclamation p-a-1'></i>The password does not meet the minimum requirements. Kindly provide another password. ");
	    $('#passwordNotMatch').addClass('hide');
	   $('#passwordMatch').addClass('hide');
	}
	else {
		$('#passwordNotMatch').removeClass('hide');
		$('#passwordMatch').addClass('hide');
	}
	}
}

function hideError(){
	$("#warning").addClass('hide');
	$('#passwordStrengthResult').addClass('hide');
}

function hidePwdMatchError(){
	$('#passwordMatch').addClass('hide');
	$('#passwordNotMatch').addClass('hide');
}

function disableChangePwdBtn(){
	var curr = $('#currentPassword').value;
	if(data == "" || data == undefined){
		$('#changePasswordBtn').attr("disabled", true);
	}	
}

function passwordPolicyOnload() {
	var pwdMinLength = null;
	var regEx = null;
	var pwdReuseRstrctn = null;
	var token = window.name;
	var constraint = "";

	$.ajax({
		method : "GET",
		url : 'api/config/passwordpolicy',
		headers : {
			'Authorization' : 'Bearer ' + token
		}
	}).done(function(data, textStatus, jqXHR) {
		console.log(data);
		$.each(data.results, function(i, value) {
			
				$("#pwdmin").html(value.pwdminlen);
				if (value.isUppercase) {
					constraint = constraint+"  Uppercase(A-Z)";
				}
				if (value.isLowercase) {
					constraint = constraint+" , Lowercase(a-z)";
				}
				if (value.isNumber) {
					constraint = constraint+" , Numbers(0-9)";
				}
				if (value.isSplChar) {
					constraint = constraint+" , Special Characters(`~!@#$%^&*-+=.,:;?<>)";
				}
				$('#splChar').html(constraint);
				constraint = "";
				$("#pwdReuseRestriction").html(value.pwdReuseRestriction);
			
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log("Inside fail call.....", errorThrown, textStatus, jqXHR);
	});
}

