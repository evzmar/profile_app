import axios from "../../dal/axios-instance";

export const types = {
     SET_USER_PROFILE_DATA:                              'APP/PROFILE_REDUX/SET_USER_PROFILE_DATA',

     SET_CREATING_PHONE_NUMBER:                  'APP/PROFILE_REDUX/SET_CREATING_PHONE_NUMBER',
     SET_CREATING_ADDRESS:                       'APP/PROFILE_REDUX/SET_CREATING_ADDRESS',

     COPY_FULL_NAME_TO_CREATING_FULL_NAME:       'APP/PROFILE_REDUX/COPY_FULL_NAME_TO_CREATING_FULL_NAME',
     COPY_PHONE_NUMBER_TO_CREATING_PFONE_NUMBER: 'APP/PROFILE_REDUX/COPY_PHONE_NUMBER_TO_CREATING_PFONE_NUMBER',
     COPY_ADDRESS_CREATING_ADDRESS:              'APP/PROFILE_REDUX/COPY_ADDRESS_CREATING_ADDRESS',

    // SET_REGISTERING_PROCESS_STATUS:        'APP/REGISTER_REDUX/SET_REGISTERING_PROCESS_STATUS',
    // SET_REGISTERING_PROCESS_ERROR:         'APP/REGISTER_REDUX/SET_REGISTERING_PROCESS_ERROR',
};

//----
const initialState = {
    userProfileData: {
        fullName:    '',
        phoneNumber: '',
        address:     ''
    },
    userAccountName:    null,
    creatingPhoneNumber: null,
    creatingAddress:     null
};


//---- actionCreators--------//
export const actions =  {
    setUserProfileData:                   (userProfileData)    => ({type: types.SET_USER_PROFILE_DATA, userProfileData}),
    // setEnteringUserAccountName:     (fullName)    => ({type: types.SET_CREATING_FULL_NAME, fullName}),
    // setCreatingPhoneNumber:  (phoneNumber) => ({type: types.SET_CREATING_PHONE_NUMBER, phoneNumber}),
    // setCreatingAddress:      (address)     => ({type: types.SET_CREATING_ADDRESS, address}),
    //
    // copyFullNameToCreatingFullName:       ()   => ({type: types.COPY_FULL_NAME_TO_CREATING_FULL_NAME}),
    // copyPhoneNumberToCreatingPhoneNumber: ()   => ({type: types.COPY_PHONE_NUMBER_TO_CREATING_PFONE_NUMBER}),
    // copyAddressToCreatingAddress:         ()   => ({type: types.COPY_ADDRESS_CREATING_ADDRESS})
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
            newState.userProfileData = action.userProfileData
        }
        // case types.SET_CREATING_FULL_NAME:
        //     return {
        //         ...state,
        //         userAccountName: action.fullName
        //     };

        case types.SET_CREATING_PHONE_NUMBER:
            return {
              ...state,
                creatingPhoneNumber: action.phoneNumber
            };

        case types.SET_CREATING_ADDRESS:
            return {
              ...state,
                creatingAddress: action.address
            };
        //---
        case types.COPY_FULL_NAME_TO_CREATING_FULL_NAME:
            return {
              ...state,
                userAccountName: state.userProfileData.fullName
            };

        case types.COPY_PHONE_NUMBER_TO_CREATING_PFONE_NUMBER:
            return {
              ...state,
                creatingPhoneNumber: state.userProfileData.phoneNumber
            };

        case types.COPY_ADDRESS_CREATING_ADDRESS:
            return {
              ...state,
                creatingAddress: state.userProfileData.address
            };

        default:
            return state;
    }
};



//--- thunkCreator -------//

export const updateUserDataFromServer = () => (dispatch,getState) => {
    let globalState = getState();
    let accountName = globalState.auth.userAuthData.userAccountName;
    axios.get('/api/v1/users/' + accountName, {

    }).then((res) => {
        if (res.status === 200){
            dispatch(actions.setUserProfileData(res.data.userData));
        } else {

        }
    })
};
