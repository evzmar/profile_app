import React from 'react';
import style from "./registerPage.module.css";



const RegisterPageComponent = (props) => {
  return (
     <div className={style.registerSection}>
         <div className={style.formBlock}>
             <label className={style.formLabel}>
                 Full name
             </label>
             <input className={style.formTextInput}/>
         </div>
         <div className={style.formBlock}>
             <label className={style.formLabel}>
                 Email
             </label>
             <input className={style.formTextInput}/>
         </div>
         <div className={style.formBlock}>
             <label className={style.formLabel}>
                 Repeat password
             </label>
             <input className={style.formTextInput}/>
         </div>
         <div className={style.formBlock}>
             <label className={style.formLabel}>
                 Full name
             </label>
             <input className={style.formTextInput}/>
         </div>
         <div className={style.formBlock}>
            <button className={style.registerButton}>
                Registration
            </button>
         </div>
     </div>
  )
};

export default RegisterPageComponent;