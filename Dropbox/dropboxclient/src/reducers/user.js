import {USER_SIGNUP, USER_SIGNIN} from "../actions/useractions";

const initialState = {
       
        "user":{
            "signupmsg": "",
            "signinmsg" :""
        }
};

const user = (state = initialState, action) => {


    switch (action.type) {
        case USER_SIGNUP :
            if(action.user) {

                return {
                   ...state,
                   "user":{
                            "basic": {"fname":action.user.fname, "lanme":action.user.lname, "email":action.user.email},
                            "signupmsg" : "Sign Up sucessful. Please Login."
                        }
                };

            }
            else {

                return {
                   ...state,
                   "user":{                            
                            "signupmsg" : action.msg
                        }
                };

            }

            break;   

         case USER_SIGNIN :
                if(action.user) {

                    return {
                       ...state,
                       "user":{
                                "basic": {"fname":action.user.fname, "lanme":action.user.lname, "email":action.user.email},
                                "loggedin" : true                                
                            }
                    };

                }
                else {

                    return {
                       ...state,
                       "user":{                            
                                "loggedin" : false,
                                "signinmsg" : action.msg
                            }
                    };

                }

                break;      
       
        default :
            return state;

    }
};

export default user;