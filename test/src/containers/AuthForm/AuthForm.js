import React from 'react';
import style from "./AuthForm.module.css";
import Field from "redux-form/es/Field";
import connect from "react-redux/es/connect/connect";
import {reduxForm} from "redux-form";


let AuthForm = (props) => {
  return (
      <form onSubmit={props.handleSubmit}>
          <div className={style.formBlock}>
              <label className={style.formLabel}>
                  AccountName
              </label>
              <Field className={style.formTextInput}
                     placeholder="AccountName"
                     name="accountName"
                     component='input'
                     type="text"/>
          </div>
          <div className={style.formBlock}>
              <label className={style.formLabel}>
                  Password
              </label>
              <Field className={style.formTextInput}
                     placeholder="Password"
                     name="password"
                     component='input'
                     type="password"/>
          </div>
          <div className={style.formBlock}>
              <button className={style.authButton}
                      type="submit">
                  Authorization
              </button>
          </div>
      </form>
  )
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch)  => ({});

AuthForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthForm);

export default reduxForm({
    form: 'authorization'
})(AuthForm);