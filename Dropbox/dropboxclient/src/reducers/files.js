import {LIST_FILES} from "../actions/files";
import {USER_SIGNOUT} from "../actions/useractions";

const initialState = {
       
        "files":{
            "files":[],
            "msg" :""
        }
};

const files = (state = initialState, action) => {


    switch (action.type) {
        case LIST_FILES :

            if(action.files && action.files.length > 0) {
                return {
                   ...state,
                   "files":{
                        "files" : action.files,
                        "pwd" : action.pwd,
                        "msg" : action.msg
                    }
                };

            }
            else {

                return {
                   ...state,                  
                    "files":{
                        "files" :[],
                        "pwd" : action.pwd,
                        "msg" :"No files available"
                    }
                };

            }

            break;   
         case USER_SIGNOUT :
                if(action.loggedOut) {

                    return {                       
                       "files":{"files":{}, "pwd" :"/"}           
                    };

                }
                else {
                    return {
                        ...state
                    }
                }               

                break;  
        
        default :
            return state;

    }
};

export default files;