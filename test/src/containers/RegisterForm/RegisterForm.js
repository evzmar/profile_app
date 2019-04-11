import {Field, reduxForm, SubmissionError} from "redux-form";
import style from './RegisterForm.module.css';
import React from "react";
import connect from "react-redux/es/connect/connect";
import {registerUserAccount} from "../../redux/modules/registerRedux";

//---------------------------
const renderRepeatedUserPasswordField = ({ input, label, type, meta: { touched, error } }) => (

    <div className={style.formBlock}>
        <label className={style.formLabel}>
            Repeated password
        </label>
        <div className={style.userPasswordBlock}>
            <input {...input}
                   className={style.formTextInput}
                   type={type}
                   placeholder="Repeated password"/>
            <div className={style.errorText}>
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    </div>
);
//---------------------------

let RegisterForm = (props) => {

    const submit = (values) => {
        let registerData;
        if(values.userPassword === values.repeatedUserPassword){
            registerData = {
                userAccountName: values.userAccountName,
                userEmail:       values.userEmail,
                userPassword:    values.userPassword
            };
            props.onRegistrationFinishCommited(registerData);
        } else {
            throw new SubmissionError({ repeatedUserPassword: 'Wrong password'})
            // alert('пароли не совпадают, пожалуйста введите еще раз')
        }
    };

//.............................//

    const { error, handleSubmit, pristine, reset, submitting } = props;

    return (
        <form onSubmit={props.handleSubmit(submit)}>
            <div className={style.formBlock}>
                <label className={style.formLabel}>
                    Account name
                </label>
                <Field className={style.formTextInput}
                       name="userAccountName"
                       component='input'
                       type="text"
                       placeholder="Account name"/>
            </div>
            <div className={style.formBlock}>
                <label className={style.formLabel}>
                    Email
                </label>
                <Field className={style.formTextInput}
                       name="userEmail"
                       component='input'
                       type="email"
                       placeholder="Email"/>
            </div>
            <div className={style.formBlock}>
                <label className={style.formLabel}>
                    Password
                </label>
                <Field className={style.formTextInput}
                       name="userPassword"
                       component='input'
                       type="password"
                       placeholder="Password"/>
            </div>

            <Field className={style.formTextInput}
                   name="repeatedUserPassword"
                   component={renderRepeatedUserPasswordField}
                   type="password"
                   placeholder="Repeated password"/>

            <div className={style.formBlock}>
                <button className={style.registerButton} disabled={submitting}
                        type="submit">
                    Registration
                </button>
            </div>
        </form>
    )
};

const mapStateToProps = (state) => {
    return {
    }
};


const mapDispatchToProps = (dispatch)  => {
    return {
        onRegistrationFinishCommited: (registerData) => {
            dispatch(registerUserAccount(registerData))
        }
    }
};


RegisterForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterForm);

export default reduxForm({
    form: 'register'
})(RegisterForm);