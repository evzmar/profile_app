import React from 'react';
import style from "./RegisterPage.module.css";
import Redirect from "react-router-dom/es/Redirect";
import {NavLink} from "react-router-dom";
import RegisterForm from "../../containers/RegisterForm";
import {registerProcessResults} from "../../consts/consts";



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
         {props.registerError === registerProcessResults.COMMON_ERROR ?
             <div>
                 ERROR
             </div> : null}
     </div>
  )
};

export default RegisterPage;

