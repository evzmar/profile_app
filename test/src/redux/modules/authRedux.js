import axios from "../../dal/axios-instance";
import {
    authProcessResults,
    authProcessStatuses
} from "../../consts/consts";


export const types = {
    SET_TOKEN:                             'APP/AUTH_REDUX/SET_TOKEN',
    SET_USER_ACCOUNT_NAME:                 'APP/AUTH_REDUX/SET_USER_ACCOUNT_NAME',
    SET_USER_PASSWORD:                     'APP/AUTH_REDUX/SET_USER_PASSWORD',

    CLEAR_TOKEN:                           'APP/AUTH_REDUX/CLEAR_TOKEN',
    CLEAR_USER_ACCOUNT_NAME:               'APP/AUTH_REDUX/CLEAR_USER_ACCOUNT_NAME',
    CLEAR_USER_PASSWORD:                   'APP/AUTH_REDUX/CLEAR_USER_PASSWORD',

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
    authProcessStatus: authProcessStatuses.READY,
    authProcessError:  authProcessResults.SUCCESS
};
//---- actionCreators--------//
export const actions = {
    setToken:                     (token)               => ({type: types.SET_TOKEN, token}),
    setUserAccountName:           (userAccountName)     => ({type: types.SET_USER_ACCOUNT_NAME, userAccountName}),
    setUserPassword:              (userPassword)        => ({type: types.SET_USER_PASSWORD, userPassword}),

    clearToken:                   ()                    => ({type: types.CLEAR_TOKEN}),
    clearUserAccountName:         ()                    => ({type: types.CLEAR_USER_ACCOUNT_NAME}),
    clearUserPassword:            ()                    => ({type: types.CLEAR_USER_PASSWORD}),

    setAuthProcessStatus:         (authProcessStatus)    => ({type: types.SET_AUTH_PROCESS_STATUS, authProcessStatus}),
    setAuthProcessError:          (authProcessError)     => ({type: types.SET_AUTH_PROCESS_ERROR,  authProcessError})
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
        //----
        case types.CLEAR_TOKEN:
        {
            newState.userAuthData.token = null;
            return newState
        }

        case types.CLEAR_USER_ACCOUNT_NAME:
        {
            newState.userAuthData.userAccountName = '';
            return newState
        }

        case types.CLEAR_USER_PASSWORD:
        {
            newState.userAuthData.userPassword = '';
            return newState
        }
        //----
        case types.SET_AUTH_PROCESS_STATUS:
            return {
                ...state,
                authProcessStatus: action.authProcessStatus
            };

        case types.SET_AUTH_PROCESS_ERROR:
            return {
                ...state,
                authProcessError: action.authProcessError
            };

        default:
            return state;
    }
};

//--- thunkCreator -------//

export const authorizeUser = (authData, onSuccessfulAuthorizationFinalized) => (dispatch, getState) => {
    let accountName = authData.accountName;
    let password = authData.password;

    dispatch(actions.setAuthProcessStatus(authProcessStatuses.IN_PROGRESS));

    axios.post('/api/v1/users/'+ accountName + '/auth-tokens', {
        pass:  password
    })
        .then((res) => {
            if (res.status === 201) {
                dispatch(actions.setToken(res.data.tokenValue));
                dispatch(actions.setUserAccountName(accountName));
                dispatch(actions.setUserPassword(password));

                dispatch(actions.setAuthProcessStatus(authProcessStatuses.READY));
                dispatch(actions.setAuthProcessError(authProcessResults.SUCCESS));

                if(onSuccessfulAuthorizationFinalized){
                    onSuccessfulAuthorizationFinalized();
                };

            } else if (res.status === 400){
                dispatch(actions.setToken(null));

                dispatch(actions.setAuthProcessStatus(authProcessStatuses.READY));
                dispatch(actions.setAuthProcessError(authProcessResults.COMMON_ERROR));

            }
            else{
                console.log('http error status:', res.status);
            };
        })
        .catch((e) => {
            console.log(e);
    })

};



