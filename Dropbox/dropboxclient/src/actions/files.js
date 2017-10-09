import * as API from '../api/FilesApi';

export const LIST_FILES = 'LIST_FILES';
export const FILE_UPLOAD = 'FILE_UPLOAD';
export const FILE_DELETE = 'FILE_DELETE';


export function listfiles(dir, email) {

	let req = {dir:dir, email:email};

	return function(dispatch) {
		return  API.listdir(req)
			    	.then((resData) => {
				        dispatch(updateListFiles(resData, dir)); 
	      		});
	  	};
}

export function updateListFiles(resData, dir) {
	return {
		type: LIST_FILES,
		files : resData.files,
		pwd : dir
	}
	
}

export function fileUpload(data, email, pwd) {
	
	return function(dispatch) {
		return  API.fileupload(data)
			    	.then((resData) => {
				        dispatch(listfiles(pwd,email)); 
	      		});
	  	};
}


export function createFolder(data) {
	console.log("email "+data.path);
	let req = {email:data.email, path:data.path, folderName:data.foldername};

	return function(dispatch) {
		return  API.createFolder(req)
			    	.then((resData) => {
				        dispatch(listfiles(data.path, data.email)); 
	      		});
	  	};
}

export function fileDelete(file, email, pwd) {
	let req = {email:email, path:file.path, isDirectory:file.isDirectory}
	return function(dispatch) {
		return  API.fileDelete(req)
			    	.then((resData) => {
				        dispatch(listfiles(pwd,email)); 
	      		});
	  	};

}