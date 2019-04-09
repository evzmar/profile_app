import React from 'react';
import ProfilePage from "../components/ProfilePage/ProfilePage";
import connect from "react-redux/es/connect/connect";
import {updateUserDataFromServer} from "../redux/modules/profileRedux";
import {authorizeUser} from "../redux/modules/authRedux";


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
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDidMount: () => {
            dispatch(updateUserDataFromServer())
        },
        onEditingUserDataEnteringFinishCommited: (userProfileData) => {

        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);
