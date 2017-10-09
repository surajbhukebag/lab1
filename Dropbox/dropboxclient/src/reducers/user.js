import {USER_SIGNUP, USER_SIGNIN, USER_SIGNOUT, USER_PINFO, USER_EDUINFO} from "../actions/useractions";

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


         case USER_SIGNOUT :
                if(action.loggedOut) {

                    return {
                       ...state,
                       "user":{
                                "loggedin" : false                                
                            }
                       
                    };

                }
                else {
                    return {
                        ...state
                    }
                }               

                break;     

         case USER_PINFO :
                if(action.pinfo) {

                    return {
                       ...state,
                       "user":{
                                "basic":state.user.basic,
                                "loggedin":state.user.loggedin,
                                "eduinfo" : state.user.eduinfo,
                                "pinfo": {"pinfo":action.pinfo, "msg":"User Info Updated"}
                            }
                    };

                }
                else {
                    return {
                        ...state
                    }
                }               

                break;
         case USER_EDUINFO :
                if(action.eduinfo) {

                    return {
                       ...state,
                       "user":{
                                "basic":state.user.basic,
                                "loggedin":state.user.loggedin,
                                "pinfo": state.user.pinfo,
                                "eduinfo" : {"eduinfo":action.eduinfo, "msg":"User Education Info Updated"}
                            }
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

export default user;