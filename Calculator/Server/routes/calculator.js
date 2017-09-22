
function home(req,res) {

	ejs.renderFile('./views/home.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}

function add(req, res) {

	var a = req.param("operandOne");
	var b = req.param("operandTwo");
	var code, result, msg;
	if(isNaN(a) || isNaN(b)) {
		code = 400; 
		msg = "Operands need to be numbers";
	}
	else {
		code = 200;
		result = a+b;
		msg = "Addition Done";
	}

	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ code: code, msg:msg, result: result }));

}

function subtract(req, res) {

	var a = req.param("operandOne");
	var b = req.param("operandTwo");
	var code, result, msg;
	if(isNaN(a) || isNaN(b)) {
		code = 400; 
		msg = "Operands need to be numbers";
	}
	else {
		code = 200;
		result = a-b;
		msg = "Subtraction Done";
	}

	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ code: code, msg:msg, result: result }));

}

function multiply(req, res) {

	var a = req.param("operandOne");
	var b = req.param("operandTwo");
	var code, result, msg;
	if(isNaN(a) || isNaN(b)) {
		code = 400; 
		msg = "Operands need to be numbers";
	}
	else {
		code = 200;
		result = a*b;
		msg = "Multiplication Done";
	}

	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ code: code, msg:msg, result: result }));

}

function divide(req, res) {

	var a = req.param("operandOne");
	var b = req.param("operandTwo");
	var code, result, msg;
	if(isNaN(a) || isNaN(b)) {
		code = 400; 
		msg = "Operands need to be numbers";
	}
	else if(b == 0) {
		code = 400; 
		msg = "Divider cannot be zero";
	}
	else {
		code = 200;
		result = a/b;
		msg = "Division Done";
	}

	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ code: code, msg:msg, result: result }));

}

exports.home=home
exports.add=add
exports.subtract=subtract
exports.multiply=multiply
exports.divide=divide