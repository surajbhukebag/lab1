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
					let user = "";
		       if(isPasswordMatch) {
		       		code = 200;
		        	user = {"fname": result[0].firstname,"lname": result[0].lastname,"email": result[0].email};
		        	req.session.email = result[0].email;
		       }	       	
		       
		       res.send(JSON.stringify({ code: code, loggedIn:isPasswordMatch, user:user}));	       
		       
		   	});
		}
		else {
			res.send(JSON.stringify({ code: 500, loggedIn:false, msg:"Invalid Username"}));	  
		}


		
	},checkUsernameQuery,req);

}

function signout(req, res) {
	req.session.destroy();
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ code: 200, msg:"Logged out"}));	 
}


function userPersonalInfo(req, res) {

	let getUserId = "select * from user where email = ?";
	mysql.checkUsername(function(uniqueUsername, err, result) {

		res.setHeader('Content-Type', 'application/json');
		let uId = result[0].id;
		if(!err) {

			let getPInfoQuery = "select * from personalinfo where userId = ?";
			mysql.checkPinfo(function(r, err){

				if(err) {
					res.send(JSON.stringify({ code: 500, msg:"Unable to access user data.Please try later."}));
				}
				else {
					if(r.length > 0) {

						let userPinfoUpdateQuery = "update personalinfo SET dateOfBirth = ?, contactNumber= ? where userId = ?";
						mysql.userPinfoUpdate(function(reslt, err, userId) {	

						if(err){
							res.send(JSON.stringify({ code: 500, msg:"User Personal Info update failed with : "+err}));
						}
						else {

							res.send(JSON.stringify({ code: 200, pinfo : {userId:userId, contact : req.param("contact"), dob : req.param("dob")}}));						
							
						}}, userPinfoUpdateQuery, req, uId);

					}
					else {

						let userPinfoQuery = "insert into personalinfo (dateOfBirth, contactNumber, userId) values (?,?,?)";
						mysql.userPinfo(function(reslt, err, userId) {	

						if(err){
							res.send(JSON.stringify({ code: 500, msg:"User Personal Info update failed with : "+err}));
						}
						else {

							res.send(JSON.stringify({ code: 200, pinfo : {userId:userId, contact : req.param("contact"), dob : req.param("dob")}}));						
							
						}}, userPinfoQuery, req, uId);

					}

				}

			}, getPInfoQuery, uId);

			

		}
		else {
			res.send(JSON.stringify({ code: 500, msg:"Unable to access user data.Please try later."}));
		}
		
	},getUserId,req);	 
}



function userEduInfo(req, res) {

	let getUserId = "select * from user where email = ?";
	mysql.checkUsername(function(uniqueUsername, err, result) {

		res.setHeader('Content-Type', 'application/json');
		let uId = result[0].id;
		if(!err) {


			let getEduInfoQuery = "select * from education where userId = ?";
			mysql.checkEduinfo(function(r, err){

				if(err) {
					res.send(JSON.stringify({ code: 500, msg:"Unable to access user data.Please try later."}));
				}
				else {
					if(r.length > 0) {

						let userEduInfoUpdateQuery = "update education SET collegeName = ?, startDate = ?, endDate = ?, major = ?, gpa = ? where userId = ?";
						mysql.userEduinfoUpdate(function(reslt, err, userId) {	

						if(err){
							res.send(JSON.stringify({ code: 500, msg:"User Education Info update failed with : "+err}));
						}
						else {

							res.send(JSON.stringify({ code: 200, eduinfo : {userId:userId, college: req.param("college"), major: req.param("major"), sdate: req.param("sdate"), edate: req.param("edate"), gpa: req.param("gpa")}}));						
							
						}}, userEduInfoUpdateQuery, req, uId);

					}
					else {

						let userEduinfoQuery = "insert into education (collegeName, startDate, endDate, major, gpa, userId) values (?,?,?,?,?,?)";
						mysql.userEduinfo(function(reslt, err, userId) {	

						if(err){
							res.send(JSON.stringify({ code: 500, msg:"User Education Info update failed with : "+err}));
						}
						else {

							res.send(JSON.stringify({ code: 200, eduinfo : {userId:userId, college: req.param("college"), major: req.param("major"), 
								sdate: req.param("sdate"), edate: req.param("edate"), gpa: req.param("gpa")}}));						
							
						}}, userEduinfoQuery, req, uId);

					}

				}

			}, getEduInfoQuery, uId);

			

		}
		else {
			res.send(JSON.stringify({ code: 500, msg:"Unable to access user data.Please try later."}));
		}
		
	},getUserId,req);	 
}


exports.signup = signup;
exports.signin = signin;
exports.signout = signout;
exports.userPersonalInfo = userPersonalInfo;
exports.userEduInfo = userEduInfo;