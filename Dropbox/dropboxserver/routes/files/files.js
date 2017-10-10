var fs = require('fs');
var rmrf = require('rimraf');
var mysql = require('./../mysql/fileMysql');
var usermysql = require('./../mysql/userMysql');

function listdir(req,res)
{
	res.setHeader('Content-Type', 'application/json');
	if(req.session.email === undefined) {
		res.send(JSON.stringify({ code: 502, msg:"Invalid Session. Please login."}));
	}
	else {
	var response = "";
	let isRoot = true;
	console.log("dir : "+req.param('dir'));
	let dir = req.param('dir');
	if(req.param('dir') != '/') {
		testFolder = "files/"+req.param('email')+dir;
		isRoot = false;	
	}
	else {
		testFolder = "files/"+req.param('email');
	}

	fs.readdir(testFolder, function (err, files) 
	{
		
		if(!err) {
			var result = [];
			for(var i=0;i<files.length;i++)
			{
				let filePath = testFolder+"/"+files[i];
			
				var stats = fs.statSync(filePath);
				if(isRoot) {
					result.push({path: "/"+files[i], isDirectory: stats.isDirectory(), name:files[i]});
				}
				else {
					result.push({path: dir+"/"+files[i], isDirectory: stats.isDirectory(), name:files[i]});
				}
								
				
			}
			
			let responseJson = {code:200, files:result}
			res.send(JSON.stringify(responseJson));			

		}
		else {
			res.send(JSON.stringify({code:500,msg:"Invalid dir or server error "}));	
		}
		
	});
	}
}

function createFolder(req,res)
{
	
	res.setHeader('Content-Type', 'application/json');
	if(req.session.email === undefined) {
		res.send(JSON.stringify({ code: 502, msg:"Invalid Session. Please login."}));
	}
	else {

	fs.mkdir("./files/" + req.body.email+req.body.path+"/"+req.body.folderName, function(err) {
		if (!err) {


			let checkUsernameQuery = "select * from user where email = ?";
			usermysql.checkUsername(function(uniqueUsername, err, result) {
				if(!err) {
					let storeFileQuery = "insert into files (name, path, isDirectory, createdBy, dateCreated, isStarred) values (?,?,?,?,?,?)";
					mysql.storeFileDetails(function(r, err, uId) {
						if(!err) {
							let responseJson = {code:200, msg:"New folder created"};
							res.send(JSON.stringify(responseJson));	
						}
						else {
							res.send(JSON.stringify({code:500, msg:"New folder creation failed"}));
						}

					}, storeFileQuery, req.body.folderName, req.body.path, 1, result[0].id, new Date().getTime());
					
				}
				else {
					res.send(JSON.stringify({code:500, msg:"New folder creation failed"}));
				}

			}, checkUsernameQuery,req);

		} else {
			res.send(JSON.stringify({code:500, msg:"New folder creation failed"}));
		}
	});
	}

}

function fileFolderDelete(req,res)
{
	
	res.setHeader('Content-Type', 'application/json');
	if(req.session.email === undefined) {
		res.send(JSON.stringify({ code: 502, msg:"Invalid Session. Please login."}));
	}
	else {

		let path = req.param("path");
		let email = req.param("email");
		let isDirectory = req.param("isDirectory");

		if(isDirectory) {

			rmrf("./files/" + email+"/"+path, function(err) {
				if (err) {
					console.log(err);
					res.send(JSON.stringify({code:500, msg:"Folder Deletion failed"}));

				} else {
					res.send(JSON.stringify({code:200, msg:"Folder Deletion successful"}));
				}
			});

		}
		else {

			fs.unlink("./files/" + email+"/"+path, function(err) {
			    if (err) {
			    	res.send(JSON.stringify({code:500, msg:"File deletion failed"}));
			    }
			    else {
					res.send(JSON.stringify({code:200, msg:"File Deletion successful"}));	
			    }
			});

		}
	}
}


function starredFiles(req, res) {

	
	res.setHeader('Content-Type', 'application/json');
	if(req.session.email === undefined) {
		res.send(JSON.stringify({ code: 502, msg:"Invalid Session. Please login."}));
	}
	else {
	let email = req.param("email");
	let getUserQuery = "select * from user where email = ?";
	usermysql.getUser(function(uniqueUsername, err, result) {
		if(!err) {
			let starredFilesQuery = "select * from files where createdBy = ? and isStarred = ?";
			mysql.getStarredFiles(function(result, err) {
				if(!err) {
					let re = [];
					for(var i = 0; i < result.length; i++) {
						let p = "";
						if(result[i].path === "/") {
							p = result[i].path+result[i].name
						}
						else {
							p = result[i].path+"/"+result[i].name	
						}

						re.push({path:p , isDirectory: result[i].isDirectory, name:result[i].name});
					}
					let responseJson = {code:200, starred:re};
					res.send(JSON.stringify(responseJson));
				}
				else {
					res.send(JSON.stringify({code:500, msg:"Unable to fetch starred files."}));
				}

			}, starredFilesQuery, result[0].id);			
		}
		else {
			res.send(JSON.stringify({code:500, msg:"File Upload Failed"}));
		}

	}, getUserQuery,email);
	}

}

function generateLink(req, res) {


		let email = req.param("email");
		let p = req.param("path");
		let index = p.lastIndexOf("/");
		let path = "";
		if(index === 0) {
			path = "/";
		}
		else {
			path = p.substring(0, index);
		}
		let name = p.substring(index+1);

		let getUserQuery = "select * from user where email = ?";
		usermysql.getUser(function(uniqueUsername, err, result) {
			if(!err) {

				let userFilesQuery = "select * from files where createdBy = ? and name = ? and path = ?";
				console.log("name : "+name);
				console.log("path : "+path);
				mysql.getUserFile(function(r, err) {
					if(!err) {
						let checkLinkQuery = "select * from filelink where fileId = ?";
						mysql.getFileLink(function(rs, err) {

							if(!err) {
								if(rs.length > 0) {
									let responseJson = {code:200, link:"http://localhost:3001/downloadFile/"+rs[0].linkString};
									res.send(JSON.stringify(responseJson));
								}
								else {
										let generateLinkQuery = "insert into filelink(linkString, fileId) values (?,?)";
										mysql.generateLink(function(token, err) {

											if(!err) {
												let responseJson = {code:200, link:"http://localhost:3001/downloadFile/"+token};
												res.send(JSON.stringify(responseJson));
											}
											else {
												res.send(JSON.stringify({code:500, msg:"Unable to Generate Link."}));
											}

										}, generateLinkQuery, r[0].id);
								}
							}
							else {

							}
						}, checkLinkQuery, r[0].id);
						
					}
					else {
						res.send(JSON.stringify({code:500, msg:"Unable to fetch starred files."}));
					}

				}, userFilesQuery, result[0].id, name, path);			
			}
			else {
				res.send(JSON.stringify({code:500, msg:"Link Generation failed"}));
			}

		}, getUserQuery,email);

	

}

exports.listdir = listdir;
exports.createFolder = createFolder;
exports.fileFolderDelete = fileFolderDelete;
exports.starredFiles = starredFiles;
exports.generateLink = generateLink;