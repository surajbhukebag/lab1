import * as API from '../api/api';

export const ADD_OPERANDS = 'ADD_OPERANDS';
export const ADD_OPERATOR = 'ADD_OPERATOR';
export const LOAD_RESULT = 'LOAD_RESULT';


export function addOperands(operand) {
    return {
        type : ADD_OPERANDS,
        operand                                // this is same as newItem : newItem in ES6
    }
}

export function addOperators(operator) {
    return {
        type : ADD_OPERATOR,
        operator
    }
}

export function perofrmOperation(expression) {

	 let op1, op2, reqData, result;
     if(expression.includes("+")) {
          op1 = Number(expression.split("+")[0]);
          op2 = Number(expression.split("+")[1]);
          reqData = {operandOne:op1, operandTwo:op2};


      	return function(dispatch) {
	    	return  API.add(reqData)
              .then((resData) => {
                  if (resData.code === 200) {
                  		console.log("Success");
                       dispatch(loadResultData(resData.result));
                  } else  {
                         dispatch(loadResultData(resData.code));
                  }
              });
	  	};


      } 
       else if(expression.includes("-")) {
          op1 = Number(expression.split("-")[0]);
          op2 = Number(expression.split("-")[1]);
          reqData = {operandOne:op1, operandTwo:op2};


      	return function(dispatch) {
	    	return  API.subtract(reqData)
              .then((resData) => {
                  if (resData.code === 200) {
                  		console.log("Success");
                       dispatch(loadResultData(resData.result));
                  } else  {
                         dispatch(loadResultData(resData.code));
                  }
              });
	  	};


      }

      else if(expression.includes("*")) {
          op1 = Number(expression.split("*")[0]);
          op2 = Number(expression.split("*")[1]);
          reqData = {operandOne:op1, operandTwo:op2};


      	return function(dispatch) {
	    	return  API.multiply(reqData)
              .then((resData) => {
                  if (resData.code === 200) {
                  		console.log("Success");
                       dispatch(loadResultData(resData.result));
                  } else  {
                         dispatch(loadResultData(resData.code));
                  }
              });
	  	};


      } 

       else if(expression.includes("/")) {
          op1 = Number(expression.split("/")[0]);
          op2 = Number(expression.split("/")[1]);
          reqData = {operandOne:op1, operandTwo:op2};

      	return function(dispatch) {
	    	return  API.divide(reqData)
              .then((resData) => {
                  if (resData.code === 200) {
                  		console.log("Success");
                       dispatch(loadResultData(resData.result));
                  } else  {
                         dispatch(loadResultData(resData.msg));
                  }
              });
	  	};


      }  
}

export function loadResultData(result) {  
	console.log("Result : "+result);
  return {type: 'LOAD_RESULT', result};
}