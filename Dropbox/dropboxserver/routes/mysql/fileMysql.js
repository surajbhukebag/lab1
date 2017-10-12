var mysql = require('./connection');

function storeFileDetails(callback, storeFileQuery, name, path, isDirectory, userId, dateCreated, token){
	
	var connection=mysql.getConnection();

	connection.query(storeFileQuery, [name, path, isDirectory, userId, dateCreated, 0, token], function(err, result) {
		if(err){
			console.log(err);
			callback(null, err, userId);
		}
		else 
		{								
			callback(result, err, userId);						
		}
	});
	console.log("\nConnection closed..");
	connection.end();

}

function getStarredFiles(callback, starredFilesQuery, createdBy){
	
	var connection=mysql.getConnection();

	connection.query(starredFilesQuery, [createdBy, 1], function(err, result) {
		if(err){
			console.log(err);
			callback(null, err);
		}
		else 
		{								
			callback(result, err);						
		}
	});
	console.log("\nConnection closed..");
	connection.end();

}


function getUserFile(callback, userFilesQuery, createdBy, name, path){
	
	var connection=mysql.getConnection();

	connection.query(userFilesQuery, [createdBy, name, path], function(err, result) {
		if(err){
			console.log(err);
			callback(null, err);
		}
		else 
		{					
			callback(result, err);						
		}
	});
	console.log("\nConnection closed..");
	connection.end();

}


function getFileById(callback, getFilesQuery, id){
	
	var connection=mysql.getConnection();

	connection.query(getFilesQuery, id, function(err, result) {
		if(err){
			console.log(err);
			callback(null, err);
		}
		else 
		{					
			callback(result, err);						
		}
	});
	console.log("\nConnection closed..");
	connection.end();

}

function generateLink(callback, generateLinkQuery, fileId){
	
	var connection=mysql.getConnection();

	require('crypto').randomBytes(20, function(err, buffer) {
		var token = buffer.toString('hex');

		connection.query(generateLinkQuery, [token, fileId], function(err, result) {
			if(err){
				console.log(err);
				callback(null, err);
			}
			else 
			{								
				callback(token, err);						
			}
		});
		console.log("\nConnection closed..");
		connection.end();

	});
	

}


function getFileLink(callback, checkLinkQuery, fileId){
	
	var connection=mysql.getConnection();

	connection.query(checkLinkQuery, fileId, function(err, result) {
		if(err){
			console.log(err);
			callback(null, err);
		}
		else 
		{								
			callback(result, err);						
		}
	});
	console.log("\nConnection closed..");
	connection.end();

}

function createSharedFile(callback, shareFileQuery, fileId, uid, sharedWithId){
	
	var connection=mysql.getConnection();

	connection.query(shareFileQuery, [fileId, uid, sharedWithId], function(err, result) {
		if(err){
			console.log(err);
			callback(null, err);
		}
		else 
		{								
			callback(result, err);						
		}
	});
	console.log("\nConnection closed..");
	connection.end();

}


exports.storeFileDetails = storeFileDetails;
exports.getStarredFiles = getStarredFiles;
exports.getUserFile = getUserFile;
exports.generateLink = generateLink;
exports.getFileLink = getFileLink;
exports.createSharedFile = createSharedFile;