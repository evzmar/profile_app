import axios from "../../dal/axios-instance";
import {registerProcessResults, registerProcessStatuses} from "../../consts/consts";


export const types = {
    SET_REGISTERING_PROCESS_STATUS:        'APP/REGISTER_REDUX/SET_REGISTERING_PROCESS_STATUS',
    SET_REGISTERING_PROCESS_ERROR:         'APP/REGISTER_REDUX/SET_REGISTERING_PROCESS_ERROR',
    SET_REGISTERING_PROCESS_ERROR_MESSAGE: 'APP/REGISTER_REDUX/SET_REGISTERING_PROCESS_ERROR_MESSAGE',

    SET_IS_AS_REGISTERED_FLAG:             'APP/REGISTER_REDUX/SET_IS_AS_REGISTERED_FLAG'
};

//----
const initialState = {
    registerStatus: registerProcessStatuses.READY,
    registerError:  registerProcessResults.SUCCESS,
    registerErrorMessage: '',

    isAsRegistered: false
};
//---- actionCreators--------//
export const actions = {
    setRegisterProcessStatus:           (registerStatus)       => ({type: types.SET_REGISTERING_PROCESS_STATUS,  registerStatus}),
    setRegisterProcessError:            (registerError)        => ({type: types.SET_REGISTERING_PROCESS_ERROR, registerError}),
    setRegisteringProcessErrorMessage:  (registerErrorMessage) => ({type: types.SET_REGISTERING_PROCESS_ERROR_MESSAGE, registerErrorMessage}),

    setIsAsRegisteredFlag:              (flag)   => ({type: types.SET_IS_AS_REGISTERED_FLAG, flag})
};

//----
export const reducer = (state = initialState, action) => {

    let newState = {...state};

    switch (action.type) {

        case types.SET_REGISTERING_PROCESS_STATUS:
        {
            newState.registerStatus = action.registerStatus;
            return newState
        }

        case types.SET_REGISTERING_PROCESS_ERROR:
        {
            newState.registerError = action.registerError;
            return newState
        }

        case types.SET_IS_AS_REGISTERED_FLAG:
        {
            newState.isAsRegistered = action.flag;
            return newState
        }

        case types.SET_REGISTERING_PROCESS_ERROR_MESSAGE:
        {
            newState.registerErrorMessage = action.registerErrorMessage;
            return newState
        }

        default:
            return state;
    }
};

//--- thunkCreator -------//

export const registerUserAccount = (registerData) => (dispatch, getState) => {
    dispatch(actions.setRegisterProcessStatus(registerProcessStatuses.IN_PROGRESS));

    axios.post('/api/v1/users', {
        userAccountName: registerData.userAccountName,
        email:           registerData.userEmail,
        pass:            registerData.userPassword
    })
        .then((res) => {
            if (res.status === 201) {
                dispatch(actions.setRegisterProcessStatus(registerProcessStatuses.READY));
                dispatch(actions.setRegisterProcessError(registerProcessResults.SUCCESS));
                dispatch(actions.setIsAsRegisteredFlag(true));
            } else if (res.status === 400){
                dispatch(actions.setRegisterProcessStatus(registerProcessStatuses.READY));
                dispatch(actions.setRegisterProcessError(registerProcessResults.COMMON_ERROR));
                dispatch(actions.setRegisteringProcessErrorMessage(res.data.error.userMessage[0]))
            }
        }).catch((e) => {
        console.log(e);
    })

};


















