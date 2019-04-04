export const types = {
    SET_USER_FULL_NAME:    'PROFILE/AUTH/SET_USER_FULL_NAME',
    SET_USER_LOGIN:        'PROFILE/AUTH/SET_USER_LOGIN',
    SET_USER_PASSWORD:     'PROFILE/AUTH/SET_USER_PASSWORD',
    SET_USER_AVATAR:       'PROFILE/AUTH/SET_USER_AVATAR'
};

//----
const initialState = {
    userAuthData: {
        guidId:       null,
        userFullName: '',
        userEmail:    '',
        userPassword: ''
    },
    avatar: null
};
//---- actionCreators--------//
export const actions = {
    setUserFullName:   (fullName) => ({type: types.SET_USER_FULL_NAME, fullName}),
    setUserLogin:      (login)    => ({type: types.SET_USER_LOGIN, login}),
    setUserPassword:   (password) => ({type: types.SET_USER_PASSWORD, password}),
    setUserAvatar:     (url) => ({type: types.SET_USER_AVATAR, url})
};

//----
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER_FULL_NAME:
            return {
                ...state,
                userFullName: action.fullName
            };

        case types.SET_USER_LOGIN:
            return {
                ...state,
                userEmail: action.login
            };

        case types.SET_USER_PASSWORD:
            return {
                ...state,
                userPassword: action.password
            };

        case types.SET_USER_AVATAR:
            return{
                ...state,
                avatar: action.url
            };

        default:
            return state;
    }
};


export default reducer;
