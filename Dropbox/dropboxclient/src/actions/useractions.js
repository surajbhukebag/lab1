
import * as API from '../api/UserApi';

export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_SIGNIN = 'USER_SIGNIN';


export function userSignup(userDeails) {
   
   console.log("Sign up Request : "+JSON.stringify(userDeails));

   let msg = isValidInput(userDeails);

   if(msg === 'OK') {
	   	return function(dispatch) {
			return  API.signup(userDeails)
				    	.then((resData) => {
					        dispatch(updateUserData(resData, userDeails));				          
		      		});
		  	};
   }
   else {
   	return {
			type: USER_SIGNUP,
			msg: msg
		}
   }

}


export function userSignin(userDeails) {
   
   console.log("Request : "+JSON.stringify(userDeails));

   let msg = isValidLogin(userDeails);

   if(msg === 'OK') {
	   	return function(dispatch) {
			return  API.signin(userDeails)
				    	.then((resData) => {
					        dispatch(updateSigninUserData(resData)); 
		      		});
		  	};
   }
   else {
   	
   	return {
			type: USER_SIGNIN,
			msg: msg
		}
   }

}


export function updateSigninUserData(resData) {
	if(resData.code === 200) {
		return {
			type: USER_SIGNIN,
			user: {"fname":resData.user.fname, "lname":resData.user.lname, "email":resData.user.email}
		}
	}
	else {
		if(resData.msg) {
			return {
				type: USER_SIGNIN,
				msg: resData.msg
			}
		}
		else {
			return {
				type: USER_SIGNIN,
				msg: "Invalid Password"
			}

		}

	}
	
}

export function updateUserData(resData, userDeails) {
	if(resData.code === 200) {
		return {
			type: USER_SIGNUP,
			user: {"fname":userDeails.fname, "lname":userDeails.lname, "email":userDeails.email}
		}
	}
	else {
		return {
			type: USER_SIGNUP,
			msg: resData.msg
		}

	}
	
}

function isValidInput(userDeails) {
	let msg = 'OK';
	msg = isValidLogin(userDeails);
	if(msg === 'OK') {
		if(userDeails.fname === '') {
			msg = "Please enter first name";
		}
		else if(userDeails.lname === '') {
			msg = "Please enter last name";
		}		
	}

	return msg;
}

function isValidLogin(userDeails) {

	let msg = 'OK';
	if(userDeails.email === '') {
		msg = "Please enter email id.";
	}
	else if(userDeails.password === '') {
		msg = "Please Enter password.";
	}
	return msg;
}