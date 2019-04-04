import React from 'react';
import style from  "./loginPage.module.css";



const LoginPageComponent = (props) => {
  return (
      <div className={style.loginSection}>
          <div className={style.formBlock}>
              <label className={style.formLabel}>
                  email
              </label>
              <input className={style.formTextInput}/>
          </div>
          <div className={style.formBlock}>
              <label className={style.formLabel}>
                 password
              </label>
              <input className={style.formTextInput}/>
          </div>
          <div className={style.formBlock}>
              <button className={style.registerButton}>
                  registration
              </button>
          </div>
      </div>
  )
};

export default LoginPageComponent;