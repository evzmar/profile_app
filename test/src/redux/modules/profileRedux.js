import axios from "../../dal/axios-instance";
import {
    profileProcessResults,
    profileProcessStatuses
} from "../../consts/consts";


export const types = {
    SET_USER_PROFILE_DATA: 'APP/PROFILE_REDUX/SET_USER_PROFILE_DATA',
    SET_EDIT_MODE_FULL_NAME: 'APP/PROFILE_REDUX/SET_EDIT_MODE_FULL_NAME',
    SET_EDIT_MODE_PHONE_NUMBER: 'APP/PROFILE_REDUX/SET_EDIT_MODE_PHONE_NUMBER',
    SET_EDIT_MODE_ADDRESS: 'APP/PROFILE_REDUX/SET_EDIT_MODE_ADDRESS',

    SET_UPDATE_USER_PROFILE_PROCESS_STATUS: 'APP/PROFILE_REDUX/SET_UPDATE_USER_PROFILE_PROCESS_STATUS',
    SET_UPDATE_USER_PROFILE_PROCESS_ERROR: 'APP/PROFILE_REDUX/SET_UPDATE_USER_PROFILE_PROCESS_ERROR',
};

//----
const initialState = {
    userProfileData: {
        fullName: '',
        phoneNumber: '',
        address: ''
    },
    isEditMode: {
        fullName: false,
        phoneNumber: false,
        address: false
    },

    profileStatus: profileProcessStatuses.READY,
    profileError: profileProcessResults.SUCCESS
};


//---- actionCreators--------//
export const actions = {
    setUserProfileData: (userProfileData) => ({type: types.SET_USER_PROFILE_DATA, userProfileData}),
    setEditModeFullName: (editModeFlag) => ({type: types.SET_EDIT_MODE_FULL_NAME, editModeFlag}),
    setEditModePhoneNumber: (editModeFlag) => ({type: types.SET_EDIT_MODE_PHONE_NUMBER, editModeFlag}),
    setEditModeAddress: (editModeFlag) => ({type: types.SET_EDIT_MODE_ADDRESS, editModeFlag}),

    setUpdateUserProfileProcessStatus: (profileStatus) => ({
        type: types.SET_UPDATE_USER_PROFILE_PROCESS_STATUS,
        profileStatus
    }),
    setUpdateUserProfileProcessError: (profileError) => ({
        type: types.SET_UPDATE_USER_PROFILE_PROCESS_ERROR,
        profileError
    })
};

//----
export const reducer = (state = initialState, action) => {

    let newState = {
        ...state,
        userProfileData: {
            ...state.userProfileData
        },
        isEditMode: {
            ...state.isEditMode
        }
    };

    switch (action.type) {

        case types.SET_USER_PROFILE_DATA: {
            newState.userProfileData = action.userProfileData;
            return newState
        }

        case types.SET_EDIT_MODE_FULL_NAME: {
            newState.isEditMode.fullName = action.editModeFlag;
            return newState
        }

        case types.SET_EDIT_MODE_PHONE_NUMBER: {
            newState.isEditMode.phoneNumber = action.editModeFlag;
            return newState
        }

        case types.SET_EDIT_MODE_ADDRESS: {
            newState.isEditMode.address = action.editModeFlag;
            return newState
        }

        case types.SET_UPDATE_USER_PROFILE_PROCESS_STATUS: {
            newState.profileStatus = action.profileStatus;
            return newState
        }

        case types.SET_UPDATE_USER_PROFILE_PROCESS_ERROR: {
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

    dispatch(actions.setUpdateUserProfileProcessStatus(profileProcessStatuses.IN_PROGRESS));
    axios.get('/api/v1/users/' + accountName, {}).then((res) => {
        if (res.status === 200) {
            dispatch(actions.setUserProfileData(res.data.userData));
            dispatch(actions.setUpdateUserProfileProcessStatus(profileProcessStatuses.READY));
            dispatch(actions.setUpdateUserProfileProcessError(profileProcessResults.SUCCESS))
        } else if (res.status === 400) {
            dispatch(actions.setUpdateUserProfileProcessStatus(profileProcessStatuses.READY));
            dispatch(actions.setUpdateUserProfileProcessError(profileProcessResults.COMMON_ERROR))
        }
    })
};


export const updateAuthUserProfileFromCreatingUserProfile = (userProfileData) => (dispatch, getState) => {
    let globalState = getState();
    let accountName = globalState.auth.userAuthData.userAccountName;
    let token = globalState.auth.userAuthData.token;

    dispatch(actions.setUpdateUserProfileProcessStatus(profileProcessStatuses.IN_PROGRESS));
    axios.put('/api/v1/users/' + accountName, {
            fullName: userProfileData.fullName,
            phoneNumber: userProfileData.phoneNumber,
            address: userProfileData.address
        },
        {
            headers: {
                Authorization: token
            }
        }).then((res) => {
        if (res.status === 200) {
            dispatch(actions.setUserProfileData(res.data));
            dispatch(actions.setUpdateUserProfileProcessStatus(profileProcessStatuses.READY));
            dispatch(actions.setUpdateUserProfileProcessError(profileProcessResults.SUCCESS))
        } else if (res.status === 400) {
            dispatch(actions.setUpdateUserProfileProcessStatus(profileProcessStatuses.READY));
            dispatch(actions.setUpdateUserProfileProcessError(profileProcessResults.COMMON_ERROR))
        }
    })
};