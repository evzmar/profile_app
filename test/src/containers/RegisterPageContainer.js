import React from 'react';
import RegisterPage from "../components/RegisterPage/RegisterPage";
import connect from "react-redux/es/connect/connect";
import {actions as actionsRegister, registerUserAccount} from "../redux/modules/registerRedux";



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
        onChangeEnteringUserAccountName: (userAccountName) => {
            dispatch(actionsRegister.setEnteringUserAccountName(userAccountName))
        },
        onChangeEnteringUserEmail: (userEmail) => {
            dispatch(actionsRegister.setEnteringUserEmail(userEmail))
        },
        onChangeEnteringUserPassword: (userPassword) => {
            dispatch(actionsRegister.setEnteringUserPassword(userPassword))
        },
        onChangeEnteringRepeatedUserPassword: (userPassword) => {
           dispatch(actionsRegister.setEnteringRepeatedPassword(userPassword))
        },
        onRegistrationFinishCommited: () => {
            dispatch(registerUserAccount());
            dispatch(actionsRegister.setEnteringUserAccountName(''));
            dispatch(actionsRegister.setEnteringUserEmail(''));
            dispatch(actionsRegister.setEnteringUserPassword(''));
            dispatch(actionsRegister.setEnteringRepeatedPassword(''))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPageContainer);
