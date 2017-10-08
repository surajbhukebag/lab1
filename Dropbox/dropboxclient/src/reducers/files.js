import {LIST_FILES} from "../actions/files";

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
                        "files" : action.files
                    }
                };

            }
            else {

                return {
                   ...state,                  
                    "files":{
                        "files" :[],
                        "msg" :"No files available"
                    }
                };

            }

            break;   

        
        default :
            return state;

    }
};

export default files;