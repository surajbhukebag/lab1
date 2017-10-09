var fs = require('fs');
var rmrf = require('rimraf');

function listdir(req,res)
{

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
		
		res.contentType('application/json');
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

function createFolder(req,res)
{
	res.contentType('application/json');

	fs.mkdir("./files/" + req.body.email+req.body.path+"/"+req.body.folderName, function(err) {
		if (!err) {
			let responseJson = {code:200, msg:"New folder with name "+req.body.folderName+" created"};
			res.send(JSON.stringify(responseJson));	

		} else {
			res.send(JSON.stringify({code:500, msg:"New folder creation failed"}));
		}
	});

}

function fileFolderDelete(req,res)
{
	res.contentType('application/json');

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
					res.send(JSON.stringify({code:200, msg:"File/Folder Deletion successful"}));	
			    }
			});

		}
}

exports.listdir = listdir;
exports.createFolder = createFolder;
exports.fileFolderDelete = fileFolderDelete;