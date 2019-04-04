import {combineReducers} from "redux";
import {reducer as loginPageReducer} from "./loginRedux";
import {reducer as authRedux} from "./authRedux";
import {reducer as profilePageReducer} from "./profileRedux";



const  rootReducer = combineReducers({
    auth:               authRedux,
    loginPage:          loginPageReducer,
    profilePage:        profilePageReducer
    // form:              formReducer
});

export default rootReducer;