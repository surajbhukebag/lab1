var mysql = require('./connection');
var bcrypt = require('bcrypt');

function userSignUp(callback,signupQuery, req){
	
	var connection=mysql.getConnection();


	bcrypt.genSalt(10, function(err, salt) {
	    if (!err) {
		    
		    bcrypt.hash(req.param("password"), salt, function(err, hash) {

		    	if(!err) {

		    		connection.query(signupQuery, [req.param("fname"), req.param("lname"), req.param("email"), hash], function(err, result) {
						if(err){
							callback(null, err);
						}
						else 
						{								
							callback(result.insertId, err);						
						}
					});
					console.log("\nConnection closed..");
					connection.end();
		    	}
		    	else {
		    		callback(null, err);	
		    	}
		      
		    });
	    }
	    else {
	    	callback(null, err);
	    }

	});
	
}


function checkUsername(callback,checkUsernameQuery, req){
	
	var connection=mysql.getConnection();


	connection.query(checkUsernameQuery, req.param("email"), function(err, result) {
			
		if(err){
			callback(false, err, result);
		}
		else 
		{			
			if(result.length == 0) {					
				callback(true, err, result);	
			}	
			else {
				callback(false, err, result);
			}				
		}
		});
		console.log("\nConnection closed..");
		connection.end();

}


exports.userSignUp = userSignUp;
exports.checkUsername = checkUsername;