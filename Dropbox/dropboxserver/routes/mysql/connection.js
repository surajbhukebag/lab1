var mysql = require('mysql');

function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'root',
	    database : 'dropbox',
	    port	 : 3306
	});
	return connection;
}

/*function getConnection() {
    var pool = mysql.createPool({
        connectionLimit: 50,
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'dropbox',
        port: 3306
    });
    return pool;
}*/

exports.getConnection = getConnection;