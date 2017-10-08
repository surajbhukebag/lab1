var fs = require('fs');
var multer = require('multer');
var mv = require('mv');

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

	res.contentType('application/json');

	upload(req, res, function(err) {
		if (err) {
			res.send(JSON.stringify({code:500, msg:"File Upload Failed"}));
		}
		else {
			mv("./files/" + req.files[0].filename, "./files/" + req.body.name + "/"
				+ req.files[0].filename, function(err) {

				if (err) {
					res.send(JSON.stringify({code:500, msg:"File Upload Failed"}));
				}
				else {
					let responseJson = {code:200, msg:"File is uploaded at : " + req.body.name + "/"
						+ req.files[0].filename}
					res.send(JSON.stringify(responseJson));
				}				

			});			
		}
	});
}


exports.uploadfile = uploadfile;