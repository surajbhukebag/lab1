import * as API from '../api/FilesApi';

export const LIST_FILES = 'LIST_FILES';
export const FILE_UPLOAD = 'FILE_UPLOAD';


export function listfiles(dir, email) {

	let req = {dir:dir, email:email};

	return function(dispatch) {
		return  API.listdir(req)
			    	.then((resData) => {
				        dispatch(updateListFiles(resData)); 
	      		});
	  	};
}

export function updateListFiles(resData) {
	return {
		type: LIST_FILES,
		files : resData.files
	}
	
}

export function fileUpload(data, email) {
	console.log("email : "+email);
	return function(dispatch) {
		return  API.fileupload(data)
			    	.then((resData) => {
				        dispatch(listfiles("/",email)); 
	      		});
	  	};
}


export function createFolder(data) {
	console.log("email "+data.email);
	let req = {email:data.email, path:data.path, folderName:data.foldername};

	return function(dispatch) {
		return  API.createFolder(req)
			    	.then((resData) => {
				        dispatch(listfiles(data.path, data.email)); 
	      		});
	  	};
}