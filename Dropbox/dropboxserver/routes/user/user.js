var mysql = require('./../mysql/userMysql');
var fs = require('fs');
var bcrypt = require('bcrypt');

function signup(req, res) {

	let checkUsernameQuery = "select * from user where email = ?";
	mysql.checkUsername(function(uniqueUsername, err, result) {

		res.setHeader('Content-Type', 'application/json');
		if(uniqueUsername) {

			let signupQuery = "insert into user (firstname, lastname, email, password) values (?,?,?,?)";
			mysql.userSignUp(function(userId, err) {	

				if(err){
					res.send(JSON.stringify({ code: 500, msg:"User Signup failed with error : "+err}));
				}
				else {

					fs.mkdir("./files/" + req.param("email"), function(err) {
						if (!err) {
							res.send(JSON.stringify({ code: 200, userId:userId}));							
						} else {
							res.send(JSON.stringify({ code: 500, msg:"Signup failed with error : "+err}));	
						}
					});
					
				}
				}, signupQuery, req);

		}
		else {
			res.send(JSON.stringify({ code: 500, msg:"User with given email already registered. Please use different email"}));
		}
		
	},checkUsernameQuery,req);
	
}

function signin(req, res) {

	res.setHeader('Content-Type', 'application/json');
	let checkUsernameQuery = "select * from user where email = ?";
	mysql.checkUsername(function(uniqueUsername, err, result) {

		res.setHeader('Content-Type', 'application/json');
		if(result.length > 0) {
			let enteredPassword = req.param("password");
			bcrypt.compare(enteredPassword, result[0].password, function(err, isPasswordMatch) {   
				let code = 500;
					
		       if(isPasswordMatch) {
		       		code = 200;
		       }

		       let user = {"fname": result[0].firstname,"lname": result[0].lastname,"email": result[0].email}
		       res.send(JSON.stringify({ code: code, loggedIn:isPasswordMatch, user:user}));	       
		       
		   	});
		}
		else {
			res.send(JSON.stringify({ code: 500, loggedIn:false, msg:"Invalid Username"}));	  
		}


		
	},checkUsernameQuery,req);

}

exports.signup=signup;
exports.signin=signin;