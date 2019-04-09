import React from 'react';
import ProfilePage from "../components/ProfilePage/ProfilePage";
import connect from "react-redux/es/connect/connect";
import {actions as actionProfile} from "../redux/modules/profileRedux";


const ProfilePageContainer = (props) => {
    return (
        <ProfilePage {...props} />
    )
};

//---
const mapStateToProps = (state) => {
    return {
        isAuth:               state.auth.userAuthData.token !== null,
        userProfileData:      state.profilePage.userProfileData,
        userAccountName:     state.profilePage.userAccountName,
        creatingPhoneNumber:  state.profilePage.creatingPhoneNumber,
        creatingAddress:      state.profilePage.creatingAddress
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUserFullNameChangeRequest: () => {
          dispatch(actionProfile.copyFullNameToCreatingFullName())
        },
        onUserPhoneNumberChangeRequest: () => {
          dispatch(actionProfile.copyPhoneNumberToCreatingPhoneNumber())
        },
        onUserAddressChangeRequest: () => {
            dispatch(actionProfile.copyAddressToCreatingAddress())
        },

        //---

        onCreatingFullNameChanged: (fullName) => {
            dispatch(actionProfile.setCreatingFullName(fullName))
        },
        onCreatingPhoneNumberChanged: (phoneNumber) => {
            dispatch(actionProfile.setCreatingPhoneNumber(phoneNumber))
        },
        onCreatingAddressChanged: (address) => {
            dispatch(actionProfile.setCreatingAddress(address))
        },
        // onCreatingUserProfileFinishCommitted: () => {
        //
        // }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);
