import axios from "../../dal/axios-instance";
import {
    authProcessResults,
    authProcessStatuses,
    registerProcessResults,
    registerProcessStatuses
} from "../../consts/consts";
import {actions as actionsProfile, actions as actionProfile} from "./profileRedux";

export const types = {
    SET_TOKEN:                             'APP/AUTH_REDUX/SET_TOKEN',
    SET_USER_ACCOUNT_NAME:                 'APP/AUTH_REDUX/SET_USER_ACCOUNT_NAME',
    SET_USER_PASSWORD:                     'APP/AUTH_REDUX/SET_USER_PASSWORD',

    SET_AUTH_PROCESS_STATUS:               'APP/AUTH_REDUX/SET_AUTH_PROCESS_STATUS',
    SET_AUTH_PROCESS_ERROR:                'APP/AUTH_REDUX/SET_AUTH_PROCESS_ERROR'
};

//----
const initialState = {
    userAuthData: {
        token: null,
        userAccountName: '',
        userPassword: ''
    },
    authStatus: authProcessStatuses.READY,
    authError:  authProcessResults.SUCCESS
};
//---- actionCreators--------//
export const actions = {
    setToken:                     (token)               => ({type: types.SET_TOKEN, token}),
    setUserAccountName:           (userAccountName)     => ({type: types.SET_USER_ACCOUNT_NAME, userAccountName}),
    setUserPassword:              (userPassword)        => ({type: types.SET_USER_PASSWORD, userPassword}),

    setAuthProcessStatus:         (authStatus)          => ({type: types.SET_AUTH_PROCESS_STATUS, authStatus}),
    setAuthProcessError:          (authError)           => ({type: types.SET_AUTH_PROCESS_ERROR, authError})
};

//----
export const reducer = (state = initialState, action) => {

    let newState = {
        ...state,
        userAuthData: {
            ...state.userAuthData
        }
    };

    switch (action.type) {

        case types.SET_TOKEN:
        {
            newState.userAuthData.token = action.token;
            return newState
        }

        case types.SET_USER_ACCOUNT_NAME:
        {
            newState.userAuthData.userAccountName = action.userAccountName;
            return newState
        }

        case types.SET_USER_PASSWORD:
        {
            newState.userAuthData.userPassword = action.userPassword;
            return newState
        }

        case types.SET_AUTH_PROCESS_STATUS:
            return {
                ...state,
                authStatus: action.authStatus
            };

        case types.SET_AUTH_PROCESS_ERROR:
            return {
                ...state,
                authError: action.authError
            };

        default:
            return state;
    }
};

//--- thunkCreator -------//

export const authorizeUser = (authData, onSuccessfulAuthorizationFinalized) => (dispatch, getState) => {
    let accountName = authData.accountName;
    let password = authData.password;


    axios.post('/api/v1/users/'+ accountName + '/auth-tokens', {
        pass:  password
    })
        .then((res) => {
            if (res.status === 201) {
                dispatch(actions.setAuthProcessStatus(registerProcessStatuses.READY));
                dispatch(actions.setAuthProcessError(registerProcessResults.SUCCESS));
                dispatch(actions.setToken(res.data.tokenValue));
                dispatch(actions.setUserAccountName(accountName));
                dispatch(actions.setUserPassword(password));

                if(onSuccessfulAuthorizationFinalized){
                    onSuccessfulAuthorizationFinalized();
                };

            } else if (res.status === 400){
                dispatch(actions.setRegisterProcessStatus(registerProcessStatuses.READY));
                dispatch(actions.setRegisterProcessError(registerProcessResults.COMMON_ERROR))
            }
        }).catch((e) => {
        console.log(e);
    })

};



