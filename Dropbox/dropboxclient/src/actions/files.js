import * as API from '../api/FilesApi';
import {USER_SIGNOUT} from './useractions';
export const LIST_FILES = 'LIST_FILES';
export const FILE_UPLOAD = 'FILE_UPLOAD';
export const FILE_DELETE = 'FILE_DELETE';
export const FILE_LINK = "FILE_LINK";


export function listfiles(dir, email, msg) {

	let req = {dir:dir, email:email};

	return function(dispatch) {
		return  API.listdir(req)
			    	.then((resData) => {
			    		if(resData.code === 502) {
			    			dispatch(invalidSession()); 
			    		}
			    		else {
			    			dispatch(updateListFiles(resData, dir, msg)); 	
			    		}
				        
	      		});
	  	};
}

function invalidSession() {

		return {
			type: USER_SIGNOUT,
			loggedOut: true
		}

}

export function updateListFiles(resData, dir, msg) {

	return {
		type: LIST_FILES,
		files : resData.files,
		pwd : dir,
		msg : msg
	}
	
}

export function fileUpload(data, email, pwd) {
	
	return function(dispatch) {
		return  API.fileupload(data)
			    	.then((resData) => {
			    		if(resData.code === 502) {
			    			dispatch(invalidSession()); 
			    		}
			    		else {
				        	dispatch(listfiles(pwd,email, resData.msg)); 
				    	}
	      		});
	  	};
}


export function createFolder(data) {
	console.log("email "+data.path);
	let req = {email:data.email, path:data.path, folderName:data.foldername};

	return function(dispatch) {
		return  API.createFolder(req)
			    	.then((resData) => {
			    		if(resData.code === 502) {
			    			dispatch(invalidSession()); 
			    		}
			    		else {
				        	dispatch(listfiles(data.path, data.email, resData.msg)); 
				    	}
	      		});
	  	};
}

export function fileDelete(file, email, pwd) {
	let req = {email:email, path:file.path, isDirectory:file.isDirectory}
	
	return function(dispatch) {
		return  API.fileDelete(req)
			    	.then((resData) => {
			    		if(resData.code === 502) {
			    			dispatch(invalidSession()); 
			    		}
			    		else {
				        	dispatch(listfiles(pwd,email, resData.msg)); 
				    	}
	      		});
	  	};

}

export function generateLink(data, email) {
	let req = {email:email, path:data.path};


	return function(dispatch) {
		return  API.generateLink(req)
			    	.then((resData) => {
			    		if(resData.code === 502) {
			    			dispatch(invalidSession()); 
			    		}
			    		else {
				        	dispatch(getLinkData(resData)); 
				    	}
	      		});
	  	};

}

function getLinkData(resData) {
	if(resData.code === 200) {
		return {
			type: FILE_LINK,
			link: resData.link
		};
	}
	else {
	return {
			type: FILE_LINK
		};	
	}

}