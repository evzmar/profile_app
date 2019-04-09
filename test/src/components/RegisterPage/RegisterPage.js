import React from 'react';
import style from "./RegisterPage.module.css";
import Redirect from "react-router-dom/es/Redirect";



const RegisterPage = (props) => {

    //---
    if (props.isAsRegistered === true) {
        return <Redirect to="/auth"/>
    };
    //---
  return (
     <div className={style.registerSection}>
         <label className={style.registerSectionLabel}>
             Регистрация
         </label>
         <div className={style.formBlock}>
             <label className={style.formLabel}>
                 Account name
             </label>
             <input className={style.formTextInput}
                    placeholder="Account name"
                    value={props.enteringData.userAccountName}
                    onChange={ (e) =>
                        props.onChangeEnteringUserAccountName(e.currentTarget.value)}
                   />
         </div>
         <div className={style.formBlock}>
             <label className={style.formLabel}>
                 Email
             </label>
             <input className={style.formTextInput}
                    placeholder="Email"
                    value={props.enteringData.userEmail}
                    onChange={ (e) =>
                        props.onChangeEnteringUserEmail(e.currentTarget.value)}
                    />
         </div>
         <div className={style.formBlock}>
             <label className={style.formLabel}>
                Password
             </label>
             <input className={style.formTextInput}
                    placeholder="Password"
                    value={props.enteringData.userPassword}
                    onChange={
                        (e) => {
                            props.onChangeEnteringUserPassword(e.currentTarget.value)
                        }
                    }/>
         </div>
         <div className={style.formBlock}>
             <label className={style.formLabel}>
                 Repeated password
             </label>
             <div className={style.userPasswordBlock}>
                 <input className={style.formTextInput}
                        placeholder="Repeated password"
                        value={props.enteringData.repeatedUserPassword}
                        onChange={
                            (e) => {
                                props.onChangeEnteringRepeatedUserPassword(e.currentTarget.value)
                            }
                        }/>
                 { (props.enteringData.repeatedUserPassword !== props.enteringData.userPassword) ?
                     <span className={style.errorMessage}>
                         введите верный верный
                     </span> : null
                 }
             </div>
         </div>
         <div className={style.formBlock}>
            <button className={style.registerButton}
              onClick={ (e) =>
                    props.onRegistrationFinishCommited()}
                    disabled = {props.enteringData.repeatedUserPassword !== props.enteringData.userPassword}>
                Registration
            </button>
         </div>
     </div>
  )
};

export default RegisterPage;