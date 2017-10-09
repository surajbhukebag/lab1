
import * as API from '../api/UserApi';

export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_SIGNIN = 'USER_SIGNIN';
export const USER_SIGNOUT = 'USER_SIGNOUT';
export const USER_PINFO = 'USER_PINFO';
export const USER_EDUINFO = 'USER_EDUINFO';


export function userSignup(userDeails) {
   
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

export function signout() {

	return function(dispatch) {
		return  API.signout()
			    	.then((resData) => {
				        dispatch(updateSignoutUserData(resData)); 
	      		});
	  	};

}

function updateSignoutUserData(resData) {
	if(resData.code === 200) {
		return {
			type: USER_SIGNOUT,
			loggedOut: true
		}
	}
}

export function userPersonalInfo(data, email) {
	data.email = email;
	data.dob = new Date(data.dob).getTime();

	return function(dispatch) {
		return  API.userPersonalInfo(data)
			    	.then((resData) => {
				        dispatch(updateUserPersonalData(resData));				          
	      		});
	};
}


export function userEduInfo(data, email) {
	data.email = email;
	data.sdate = new Date(data.sdate).getTime();
	data.edate = new Date(data.edate).getTime();

	return function(dispatch) {
		return  API.userEduInfo(data)
			    	.then((resData) => {
				        dispatch(updateUserEduData(resData));				          
	      		});
	};
	
}

function updateUserEduData(resData) {
	if(resData.code === 200) {
		return {
			type: USER_EDUINFO,
			eduinfo: resData.eduinfo
		}
	}
	else {
		return {
			type: USER_EDUINFO,
			eduinfo: null
		}
	}
}

function updateUserPersonalData(resData) {
	if(resData.code === 200) {
		return {
			type: USER_PINFO,
			pinfo: resData.pinfo
		}
	}
	else {
		return {
			type: USER_PINFO,
			pinfo: null
		}
	}
}