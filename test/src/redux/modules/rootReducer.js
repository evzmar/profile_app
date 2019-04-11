import {combineReducers} from "redux";
import {reducer as registerReducer} from "./registerRedux";
import {reducer as authReducer} from "./authRedux";
import {reducer as profilePageReducer} from "./profileRedux";
import {reducer as formReducer} from 'redux-form';




const  rootReducer = combineReducers({
    register:           registerReducer,
    auth:               authReducer,
    profilePage:        profilePageReducer,
    form:               formReducer
});

export default rootReducer;