import React from 'react';
import RegisterPage from "../components/RegisterPage/RegisterPage";
import connect from "react-redux/es/connect/connect";
import {registerUserAccount} from "../redux/modules/registerRedux";



const RegisterPageContainer = (props) => {
    return <RegisterPage {...props} />
};

//---
const mapStateToProps = (state) => {
    return {
        isAsRegistered:     state.register.isAsRegistered,
        enteringData:       state.register.enteringData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRegistrationFinishCommited: (registerData) => {
            dispatch(registerUserAccount(registerData))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPageContainer);
