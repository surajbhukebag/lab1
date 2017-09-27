import {ADD_OPERANDS, ADD_OPERATOR, LOAD_RESULT} from "../actions/index";



const initialState = {
        "operands" : "",
        "operator" : "",
        "display" : "",
        "result": ""
};




const calc = (state = initialState, action) => {


    switch (action.type) {
        case ADD_OPERANDS :
              console.log("Operand : "+ state["operands"]);
             if(action.operand == "C") {
        			state = initialState;
        			return {
        				...state
        			}

        		}
        		else {

		              let val = action.operand;
		              if(state["operands"].length > 0) {
		              		action.operand = state["operands"] + ","+val;
		              }
		              else {
		              		action.operand = val;
		              }
		              	let display = "";
		               if(state["display"].length > 0) {
		              		display = state["display"] + val;
		              }
		              else {
		              		display = val;
		              }
		              
		           return {
		               ...state,
		               "display" : display,
		               "operands": action.operand
		           };

        		}
              	break;


        case ADD_OPERATOR :
            
              let v = action.operator;
              if(state["operator"].length > 0) {
              		action.operator = state["operator"] + ","+v;
              }
              else {
              		action.operator = v;
              }
              
              	let disp = "";
               if(state["display"].length > 0) {
              		disp = state["display"] + v;
              }
              else {
              		disp = v;
              }

           return {
               ...state,
               "display" : disp,
               "operator": action.operator
           };
           break;

        case LOAD_RESULT:             

              console.log("result : "+action.result);
               return {
               ...state,
               "display" : action.result
           };
            break;
            
       
        default :
            return state;

    }
};

export default calc;