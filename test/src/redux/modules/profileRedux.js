import axios from "../../dal/axios-instance";
import {
    profileProcessResults,
    profileProcessStatuses
} from "../../consts/consts";


export const types = {
    SET_USER_PROFILE_DATA: 'APP/PROFILE_REDUX/SET_USER_PROFILE_DATA',
    SET_EDIT_MODE:         'APP/PROFILE_REDUX/SET_EDIT_MODE',

    SET_UPDATE_USER_PROFILE_PROCESS_STATUS:    'APP/PROFILE_REDUX/SET_UPDATE_USER_PROFILE_PROCESS_STATUS',
    SET_UPDATE_USER_PROFILE_PROCESS_ERROR:     'APP/PROFILE_REDUX/SET_UPDATE_USER_PROFILE_PROCESS_ERROR',
};

//----
const initialState = {
    userProfileData: {
        fullName: '',
        phoneNumber: '',
        address: ''
    },
    isEditMode: false,

    profileStatus: profileProcessStatuses.READY,
    profileError:  profileProcessResults.SUCCESS
};


//---- actionCreators--------//
export const actions = {
    setUserProfileData: (userProfileData) => ({type: types.SET_USER_PROFILE_DATA, userProfileData}),
    setEditMode: (editModeFlag) => ({type: types.SET_EDIT_MODE, editModeFlag}),

    setUpdateUserProfileProcessStatus: (profileStatus) => ({type: types.SET_UPDATE_USER_PROFILE_PROCESS_STATUS, profileStatus}),
    setUpdateUserProfileProcessError:  (profileError)  => ({type: types.SET_UPDATE_USER_PROFILE_PROCESS_ERROR, profileError})
};

//----
export const reducer = (state = initialState, action) => {

    let newState = {
        ...state,
        userProfileData: {
            ...state.userProfileData
        }
    };

    switch (action.type) {

        case types.SET_USER_PROFILE_DATA:
        {
            newState.userProfileData = action.userProfileData;
            return newState
        }

        case types.SET_EDIT_MODE:
        {
            newState.isEditMode = action.editModeFlag;
            return newState
        }

        case types.SET_UPDATE_USER_PROFILE_PROCESS_STATUS:
        {
            newState.profileStatus = action.profileStatus;
            return newState
        }

        case types.SET_UPDATE_USER_PROFILE_PROCESS_ERROR:
        {
            newState.profileError = action.profileError;
            return newState
        }

        default:
            return state;
    }
};


//--- thunkCreator -------//

export const updateUserDataFromServer = () => (dispatch, getState) => {
    let globalState = getState();
    let accountName = globalState.auth.userAuthData.userAccountName;
    axios.get('/api/v1/users/' + accountName, {}).then((res) => {
        if (res.status === 200) {
            dispatch(actions.setUserProfileData(res.data.userData));
        } else if(res.status === 400){
            dispatch(actions.setUpdateUserProfileProcessStatus(profileProcessStatuses.READY));
            dispatch(actions.setUpdateUserProfileProcessError(profileProcessResults.COMMON_ERROR))
        }
    })
};
