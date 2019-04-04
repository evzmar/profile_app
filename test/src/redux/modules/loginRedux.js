export const types = {
    SET_CREATING_USER_LOGIN:             'NETWORK/LOGIN_PAGE/SET_CREATING_USER_LOGIN',
    SET_CREATING_USER_PASSWORD:          'NETWORK/LOGIN_PAGE/SET_CREATING_USER_PASSWORD',
    SET_LOGGINING_PROCESS_STATUS:        'NETWORK/LOGIN_PAGE/SET_LOGGINING_PROCESS_STATUS',
    SET_LOGGINING_PROCESS_ERROR:         'NETWORK/LOGIN_PAGE/SET_LOGGINING_PROCESS_ERROR',
    SET_LOGGINING_PROCESS_ERROR_MESSAGE: 'NETWORK/LOGIN_PAGE/SET_LOGGINING_PROCESS_ERROR_MESSAGE',
};


//---- actionCreators--------//
export const actions = {
    setCreatingUserLogin:     (creatingUserLogin) => ({type: types.SET_CREATING_USER_LOGIN, creatingUserLogin}),
    setCreatingUserPassword:  (creatingUserPassword) => ({type: types.SET_CREATING_USER_PASSWORD, creatingUserPassword}),
    setLoginingProcessStatus: (logginingStatus) => ({type: types.SET_LOGGINING_PROCESS_STATUS, logginingStatus}),
    setLoginingProcessError:  (logginingError)  => ({type: types.SET_LOGGINING_PROCESS_ERROR, logginingError}),
    setLoginingProcessErrorMessage: (logginingErrorMessage) => ({type: types.SET_LOGGINING_PROCESS_ERROR_MESSAGE, logginingErrorMessage}),

};
//----

const initialState = {
    creatingUserLogin: '', //'17121981mar@gmail.com',
    creatingUserPassword: '',//'13314',
    // logginingStatus: loginingProcessStatuses.READY,
    // logginingError: loginingProcessResults.SUCCESS,
    logginingErrorMessage: ''
};

//----

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case types.SET_CREATING_USER_LOGIN:
            return {
                ...state,
                creatingUserLogin: action.creatingUserLogin
            };

        case types.SET_CREATING_USER_PASSWORD:
            return {
                ...state,
                creatingUserPassword: action.creatingUserPassword
            };

        case types.SET_LOGGINING_PROCESS_STATUS:
            return {
                ...state,
                logginingStatus: action.logginingStatus
            };

        case types.SET_LOGGINING_PROCESS_ERROR:
            return {
                ...state,
                logginingError: action.logginingError
            };

        case types.SET_LOGGINING_PROCESS_ERROR_MESSAGE:
            return {
                ...state,
                logginingErrorMessage: action.logginingErrorMessage
            };

        default:
            return state;
    }
};
