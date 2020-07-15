function login_profile_nav(){
	//change login button to read profile
	document.getElementById("logintext").href="profile.html"
	document.getElementById("logintext").innerHTML="Profile"
}


function ChangePasswordForCogUser(){
	
	var username = document.getElementById("email").placeholder;
	var oldPassword = document.getElementById("oldPassword").value;
	var newPassword = document.getElementById("newPassword").value;
	var confirmpassword = document.getElementById("confirmPassword").value;
		
	var authenticationData = {
        Username : username,
        Password : oldPassword,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var poolData = {
        UserPoolId : _config.cognito.userPoolId, // Your user pool id here
        ClientId : _config.cognito.clientId, // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username : username,
        Pool : userPool,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);	
		
	cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
			//check if passwords match
			if (newPassword == confirmpassword){
				//call change password method
				cognitoUser.changePassword(oldPassword, confirmpassword, function(err, result) {
					if (err) {
						alert(err);
						return;
					}
					alert('You have succesfully changed your password!');
					
					var changepasswordfields_list = document.getElementsByName(name='changepasswordfields')
					for (var i=0; i<changepasswordfields_list.length; i++){
						changepasswordfields_list[i].style = "display: none;";			
					}
					document.getElementById("changePasswordButton").innerHTML = "Change Password";
					document.getElementById("changePasswordButton").onclick=changePassword;
					});
			} else {
				alert("The new passwords you entered do not match")
			}	

        },

        onFailure: function(err) {
			console.log("There was an error onFailure")
            alert(err.message || JSON.stringify(err));
        },

    });	
	
}


