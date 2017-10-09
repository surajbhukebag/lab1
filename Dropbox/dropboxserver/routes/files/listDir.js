var fs = require('fs');

function listdir(req,res)
{

	var response = "";
	let isRoot = true;
	let dir = "/"+req.param('dir');
	if(req.param('dir') != '/') {
		testFolder = "files/"+req.param('email')+dir;
		isRoot = false;	
	}
	else {
		testFolder = "files/"+req.param('email');
	}

	fs.readdir(testFolder, function (err, files) 
	{
		console.log("lsk");
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
			console.log(responseJson);
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

	fs.mkdir("./files/" + req.body.email+"/"+req.body.folderName, function(err) {
		if (!err) {
			let responseJson = {code:200, msg:"New folder with name "+req.body.folderName+" created"};
			res.send(JSON.stringify(responseJson));	

		} else {
			res.send(JSON.stringify({code:500, msg:"New folder creation failed"}));
		}
	});

}


exports.listdir = listdir;
exports.createFolder = createFolder;