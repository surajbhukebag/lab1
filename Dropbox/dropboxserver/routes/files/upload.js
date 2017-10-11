var fs = require('fs');
var multer = require('multer');
var mv = require('mv');
var mysql = require('./../mysql/fileMysql');
var usermysql = require('./../mysql/userMysql');

var storage = multer.diskStorage({
	destination : function(req, file, callback) {
		callback(null, './files');
	},
	filename : function(req, file, callback) {
		callback(null, file.originalname);
	}
});

var upload = multer({
	storage : storage
}).any();



function uploadfile(req,res){

	
	res.setHeader('Content-Type', 'application/json');
	if(req.session.email === undefined) {
		res.send(JSON.stringify({ code: 502, msg:"Invalid Session. Please login."}));
	}
	else {
	
	upload(req, res, function(err) {
		if (err) {
			res.send(JSON.stringify({code:500, msg:"File Upload Failed"}));
		}
		else {
			let name = req.files[0].originalname
			console.log("Name : "+ name);
			mv("./files/" + name, "./files/" + req.body.name + req.body.path +"/"+ name, function(err) {

				if (err) {
					res.send(JSON.stringify({code:500, msg:"File Upload Failed"}));
				}
				else {

						let checkUsernameQuery = "select * from user where email = ?";
						usermysql.getUser(function(uniqueUsername, err, result) {
							if(!err) {
								let storeFileQuery = "insert into files (name, path, isDirectory, createdBy, dateCreated, isStarred) values (?,?,?,?,?,?)";
								mysql.storeFileDetails(function(rss, err, uid) {
									if(!err) {
										let responseJson = {code:200, msg:"File is uploaded"}
										res.send(JSON.stringify(responseJson));
									}
									else {
										console.log(err);
										res.send(JSON.stringify({code:500, msg:"File Upload Failed"}));
									}

								}, storeFileQuery, req.files[0].originalname, req.body.path, 0, result[0].id, new Date().getTime());
								
							}
							else {
								console.log(err);
								res.send(JSON.stringify({code:500, msg:"File Upload Failed"}));
							}

						}, checkUsernameQuery,req.body.name);

					
				}				

			});			
		}
	});
	}
}


exports.uploadfile = uploadfile;