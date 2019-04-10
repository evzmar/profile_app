import React from 'react';
import style from "./RegisterPage.module.css";
import Redirect from "react-router-dom/es/Redirect";
import Field from "redux-form/es/Field";
import {NavLink} from "react-router-dom";
import RegisterForm from "../../containers/RegisterForm";



const RegisterPage = (props) => {
    //---------------------------
    const submit = (values) => {
        let registerData = values;
        props.onRegistrationFinishCommited(registerData);
    };
    //---------------------------
    //---
    if (props.isAsRegistered === true) {
        return <Redirect to="/auth"/>
    };
    //---
  return (
     <div className={style.registerSection}>
         <div className={style.authButtonBlock}>
             <NavLink to='/auth' className={style.authButton}>
                     Войти
             </NavLink>
         </div>
         <label className={style.registerSectionLabel}>
             Регистрация
         </label>
         <RegisterForm onSubmit={submit} {...props}/>
     </div>
  )
};

export default RegisterPage;