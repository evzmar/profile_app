import {combineReducers} from "redux";
import {reducer as registerRedux} from "./registerRedux";
import {reducer as authRedux} from "./authRedux";
import {reducer as profilePageReducer} from "./profileRedux";
import {reducer as formReducer} from 'redux-form';



const  rootReducer = combineReducers({
    register:           registerRedux,
    auth:               authRedux,
    // loginPage:          loginPageReducer,
    profilePage:        profilePageReducer,
    form:               formReducer
});

export default rootReducer;