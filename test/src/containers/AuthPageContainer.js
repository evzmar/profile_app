import React from 'react';
import connect from "react-redux/es/connect/connect";
import AuthPage from "../components/AuthPage/AuthPage";
import {authorizeUser} from "../redux/modules/authRedux";


const  AuthPageContainer = (props) => {
  return <AuthPage {...props}/>
};

//---
const mapStateToProps = (state) => {
    return {
     isNotNullToken:  state.auth.userAuthData.token !== null
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthorizationDataEnteringFinishCommited: (authData) => {
            const authUserAccountData = authData;
            dispatch(authorizeUser(authUserAccountData));
            dispatch()
        }
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPageContainer);
