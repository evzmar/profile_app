import React from 'react';
import style from "./RegisterPage.module.css";
import Redirect from "react-router-dom/es/Redirect";
import {NavLink} from "react-router-dom";
import RegisterForm from "../../containers/RegisterForm/RegisterForm";
import {registerProcessResults} from "../../consts/consts";
import {SubmissionError} from "redux-form";



const RegisterPage = (props) => {

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
         <RegisterForm />
     </div>
  )
};

export default RegisterPage;

