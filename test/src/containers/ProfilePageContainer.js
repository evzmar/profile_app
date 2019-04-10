import React from 'react';
import ProfilePage from "../components/ProfilePage/ProfilePage";
import connect from "react-redux/es/connect/connect";
import {updateAuthUserProfileFromCreatingUserProfile, updateUserDataFromServer} from "../redux/modules/profileRedux";
import {actions as actionsAuth, authorizeUser} from "../redux/modules/authRedux";


class ProfilePageContainer extends React.Component {
    //---
    componentDidMount() {
        this.props.onDidMount();
    }
    //---
    render() {
        return (
            <ProfilePage {...this.props} />
        )
    }
}



//---
const mapStateToProps = (state) => {
    return {
        isNotNullToken:  state.auth.userAuthData.token !== null
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDidMount: () => {
            dispatch(updateUserDataFromServer())
        },
        onEditingUserDataEnteringFinishCommited: (userProfileData) => {
            dispatch(updateAuthUserProfileFromCreatingUserProfile(userProfileData))
        },
        onLogout: () => {
            dispatch(actionsAuth.clearToken());
            dispatch(actionsAuth.clearUserAccountName());
            dispatch(actionsAuth.clearUserPassword())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);
