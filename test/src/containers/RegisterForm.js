import {Field, reduxForm} from "redux-form";
import style from "../components/RegisterPage/RegisterPage.module.css";
import React from "react";



let RegisterForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
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
                       type="text"
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
            <div className={style.formBlock}>
                <label className={style.formLabel}>
                    Repeated password
                </label>
                <div className={style.userPasswordBlock}>
                    {/*<Field className={style.formTextInput}*/}
                           {/*name="repeatedUserPassword"*/}
                           {/*component='input'*/}
                           {/*type="password"*/}
                           {/*placeholder="Repeated password"/>*/}
                    {/*{ (props.enteringData.repeatedUserPassword !== props.enteringData.userPassword) ?*/}
                        {/*<span className={style.errorMessage}>*/}
                         {/*введите верный верный*/}
                     {/*</span> : null*/}
                    {/*}*/}
                </div>
            </div>
            <div className={style.formBlock}>
                <button className={style.registerButton}
                        type="submit"
                        // disabled = {props.enteringData.repeatedUserPassword !== props.enteringData.userPassword}
                >
                    Registration
                </button>
            </div>
        </form>
    )
};

export default reduxForm({
    form: 'register'
})(RegisterForm);