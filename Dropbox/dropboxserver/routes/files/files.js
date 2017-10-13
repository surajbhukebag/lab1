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

	res.setHeader('Content-Type', 'application/json');
	if(req.session.email === undefined) {
		res.send(JSON.stringify({ code: 502, msg:"Invalid Session. Please login."}));
	}
	else {
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
				mysql.getUserFile(function(r, err) {
					if(!err) {

						let checkLinkQuery = "select * from filelink where fileId = ?";
						mysql.getFileLink(function(rs, err) {

							if(!err) {
								if(rs.length > 0) {
									let responseJson = {code:200, link:"http://localhost:3001/downloadSharedFile/"+rs[0].linkString};
									res.send(JSON.stringify(responseJson));
								}
								else {
										let generateLinkQuery = "insert into filelink(linkString, fileId, dateCreated, createdBy) values (?,?,?,?)";
										mysql.generateLink(function(token, err) {

											if(!err) {
												console.log("link : "+token);
												let responseJson = {code:200, link:"http://localhost:3001/downloadSharedFile/"+token};
												res.send(JSON.stringify(responseJson));
											}
											else {
												console.log("link "+err);
												res.send(JSON.stringify({code:500, msg:"Unable to Generate Link."}));
											}

										}, generateLinkQuery, r[0].id, result[0].id);
								}
							}
							else {

							}
						}, checkLinkQuery, r[0].id);
						
					}
					else {
						console.log("link "+err);
						res.send(JSON.stringify({code:500, msg:"Unable to fetch starred files."}));
					}

				}, userFilesQuery, result[0].id, name, path);			
			}
			else {
				console.log("link "+err);
				res.send(JSON.stringify({code:500, msg:"Link Generation failed"}));
			}

		}, getUserQuery,email);

	}

}

function share(req, res) {

	res.setHeader('Content-Type', 'application/json');
	if(req.session.email === undefined) {
		res.send(JSON.stringify({ code: 502, msg:"Invalid Session. Please login."}));
	}
	else {
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
	let sharedWithList = [];
	let name = p.substring(index+1);
	let shareListString = req.param("sharedWith");
	if(shareListString.includes(',')) {
		let splitArr = shareListString.split(',');
		for(var j = 0; j < splitArr.length; j++) {
			sharedWithList.push(splitArr[j].trim());	
		}
	}
	else {
		sharedWithList.push(shareListString.trim());
	}

	let getUserQuery = "select * from user where email = ?";
	usermysql.getUser(function(uniqueUsername, err, result) {
		if(!err) {
			let uid = result[0].id;
			let fileQuery = "select * from files where createdBy = ? and name = ? and path = ?";
			mysql.getUserFile(function(r, err) {
				if(!err) {
					let fileId = r[0].id;
					let shareFileQuery = "insert into sharedfiles (fileId, sharedBy, sharedWith, dateCreated) values (?, ?, ?, ?)";
					for(var i = 0; i < sharedWithList.length; i++) {
						usermysql.getUser(function(uniqueUsername, err, sharedWith) {
							if(!err) {
								mysql.createSharedFile(function(succ, err) {
									if(!err) {
										res.send(JSON.stringify({code:200, msg:"File/Folder is shared"}));
									}
									else {
										res.send(JSON.stringify({code:500, msg:"Share file/folder failed."}));
									}

								}, shareFileQuery, fileId, uid, sharedWith[0].id);
								
							}
							else {
								res.send(JSON.stringify({code:500, msg:"Share file/folder failed."}));
							}
						}, getUserQuery, sharedWithList[i]);
					}
				}
				else {
					res.send(JSON.stringify({code:500, msg:"Share file/folder failed."}));
				}
			}, fileQuery, uid, name, path);
		}
		else {
			res.send(JSON.stringify({code:500, msg:"Share file/folder failed."}));
		}
	}, getUserQuery, email);

	}
}

function sharedFiles(req, res) {

	res.setHeader('Content-Type', 'application/json');
	if(req.session.email === undefined) {
		res.send(JSON.stringify({ code: 502, msg:"Invalid Session. Please login."}));
	}
	else {
	let email = req.param("email");
	let getUserQuery = "select * from user where email = ?";
	usermysql.getUser(function(uniqueUsername, err, result) {
		if(!err) {

			
			let sharedFilesQuery = "select * from files where id in (select fileId from sharedfiles where sharedBy = ? or sharedWith = ?)";
			mysql.getSharedFiles(function(f, err) {

				if(!err) {

					let files = [], folders = [], links = [];

					for(var i = 0; i < f.length; i++) {

						if(f[i].isDirectory) {
							folders.push({name:f[i].name, path:f[i].path+f[i].name, owner: f[i].createdBy});
						}
						else {
							files.push({name:f[i].name, path:f[i].path+f[i].name, owner: f[i].createdBy});	
						}						

					}
	
					res.send(JSON.stringify({code:200, msg:"Retrieved shared data.", files:files, folders:folders}));
				}
				else {
					res.send(JSON.stringify({code:500, msg:"Unable to Retrieve shared data."}));
				}

			}, sharedFilesQuery, result[0].id);

			}
			else {
				res.send(JSON.stringify({code:500, msg:"Unable to Retrieve shared data."}));
			}

	}, getUserQuery, email);

	}

}

function sharedFileLinks(req, res) {

	let email = req.param("email");

	let getUserQuery = "select * from user where email = ?";
	usermysql.getUser(function(uniqueUsername, err, result) {
		if(!err) {
			let getSharedFileLinksQuery = "SELECT f.name as name, f.path as path , l.linkString as link FROM files f INNER JOIN filelink l on f.id = l.fileId where l.createdBy = ?"
			mysql.getSharedLinkFiles(function(f, err){

				if(!err) {

					let links = [];

					for(var i = 0; i < f.length; i++) {
						
						links.push({name:f[i].name, path:f[i].path+f[i].name,link:f[i].link,owner: result[0].id});											

					}
	
					res.send(JSON.stringify({code:200, msg:"Retrieved shared data.", links:links}));
				}
				else {
					res.send(JSON.stringify({code:500, msg:"Unable to Retrieve shared data."}));
				}


			}, getSharedFileLinksQuery, result[0].id);

		}
		else {
			res.send(JSON.stringify({code:500, msg:"Unable to Retrieve shared link data."}));
		}

	}, getUserQuery, email);


}

exports.listdir = listdir;
exports.createFolder = createFolder;
exports.fileFolderDelete = fileFolderDelete;
exports.starredFiles = starredFiles;
exports.generateLink = generateLink;
exports.share = share;
exports.sharedFiles = sharedFiles;
exports.sharedFileLinks = sharedFileLinks;
