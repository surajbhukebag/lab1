var mysql = require('./connection');

function storeFileDetails(callback, storeFileQuery, name, path, isDirectory, userId, dateCreated){
	
	var connection=mysql.getConnection();

	connection.query(storeFileQuery, [name, path, isDirectory, userId, dateCreated, 0], function(err, result) {
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

exports.storeFileDetails = storeFileDetails;
exports.getStarredFiles = getStarredFiles;