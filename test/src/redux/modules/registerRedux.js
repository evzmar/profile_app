import axios from "../../dal/axios-instance";
import {registerProcessResults, registerProcessStatuses} from "../../consts/consts";


export const types = {
    SET_ENTERING_USER_ACCOUNT_NAME:        'APP/REGISTER_REDUX/SET_ENTERING_USER_ACCOUNT_NAME',
    SET_ENTERING_USER_EMAIL:               'APP/REGISTER_REDUX/SET_ENTERING_USER_EMAIL',
    SET_ENTERING_USER_PASSWORD:            'APP/REGISTER_REDUX/SET_ENTERING_USER_PASSWORD',
    SET_ENTERING_REPEATED_USER_PASSWORD:   'APP/REGISTER_REDUX/SET_ENTERING_REPEATED_USER_PASSWORD',

    SET_REGISTERING_PROCESS_STATUS:        'APP/REGISTER_REDUX/SET_REGISTERING_PROCESS_STATUS',
    SET_REGISTERING_PROCESS_ERROR:         'APP/REGISTER_REDUX/SET_REGISTERING_PROCESS_ERROR',

    SET_IS_AS_REGISTERED_FLAG:             'APP/REGISTER_REDUX/SET_IS_AS_REGISTERED_FLAG'
};

//----
const initialState = {
    enteringData:{
        userAccountName: '',
        userEmail: '',
        userPassword: '',
        repeatedUserPassword: ''
    },
    registerStatus: registerProcessStatuses.READY,
    registerError:  registerProcessResults.SUCCESS,

    isAsRegistered: false
};
//---- actionCreators--------//
export const actions = {
    setEnteringUserAccountName:     (userAccountName)      => ({type: types.SET_ENTERING_USER_ACCOUNT_NAME, userAccountName}),
    setEnteringUserEmail:           (userEmail)            => ({type: types.SET_ENTERING_USER_EMAIL,  userEmail}),
    setEnteringUserPassword:        (userPassword)         => ({type: types.SET_ENTERING_USER_PASSWORD, userPassword}),
    setEnteringRepeatedPassword:    (userPassword)         => ({type: types.SET_ENTERING_REPEATED_USER_PASSWORD, userPassword}),

    setRegisterProcessStatus:       (registerStatus)       => ({type: types.SET_REGISTERING_PROCESS_STATUS,  registerStatus}),
    setRegisterProcessError:        (registerError)        => ({type: types.SET_REGISTERING_PROCESS_ERROR, registerError}),

    setIsAsRegisteredFlag:          (flag)                 => ({type: types.SET_IS_AS_REGISTERED_FLAG, flag})
};

//----
export const reducer = (state = initialState, action) => {

    let newState = {
      ...state,
        enteringData: {
          ...state.enteringData
        }
    };

    switch (action.type) {

        case types.SET_ENTERING_USER_ACCOUNT_NAME:
        {
            newState.enteringData.userAccountName = action.userAccountName;
            return newState
        }

        case types.SET_ENTERING_USER_EMAIL:
        {
            newState.enteringData.userEmail = action.userEmail;
            return newState
        }

        case types.SET_ENTERING_USER_PASSWORD:
        {
            newState.enteringData.userPassword = action.userPassword;
            return newState
        }

        case types.SET_ENTERING_REPEATED_USER_PASSWORD:
        {
            newState.enteringData.repeatedUserPassword = action.userPassword;
            return newState
        }

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

        default:
            return state;
    }
};

//--- thunkCreator -------//

export const registerUserAccount = () => (dispatch, getState) => {
    let globalState = getState();
    let accountName = globalState.register.enteringData.userAccountName;
    let email = globalState.register.enteringData.userEmail;
    let password = globalState.register.enteringData.userPassword;

    axios.post('/api/v1/users', {
        userAccountName: accountName,
        email:           email,
        pass:            password
    })
        .then((res) => {
            if (res.status === 201) {
                dispatch(actions.setRegisterProcessStatus(registerProcessStatuses.READY));
                dispatch(actions.setRegisterProcessError(registerProcessResults.SUCCESS));
                dispatch(actions.setIsAsRegisteredFlag(true));
            } else if (res.status === 400){
                dispatch(actions.setRegisterProcessStatus(registerProcessStatuses.READY));
                dispatch(actions.setRegisterProcessError(registerProcessResults.COMMON_ERROR))
            }
        }).catch((e) => {
        console.log(e);
    })

};


















