import React from 'react';
import style from "./AuthPage.module.css";
import AuthForm from "../../containers/AuthForm";
import Redirect from "react-router-dom/es/Redirect";



const AuthPage = (props) => {
    //---------------------------
    const submit = (values) => {
        let authData = values;
        props.onAuthorizationDataEnteringFinishCommited(authData);
    };
    //---------------------------
    if(props.isNotNullToken){
        return <Redirect to='/profile'/>
    }
            //----
    return (
      <div className={style.authSection}>
          <label className={style.authSectionLabel}>
              Авторизация
          </label>
          <AuthForm onSubmit={submit} {...props}/>
      </div>
  )
};

export default AuthPage;