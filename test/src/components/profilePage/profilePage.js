import React from 'react';
import style from './profilePage.module.css';



const ProfilePageComponent = (props) => {
  return (
      <div className={style.profileSection}>
          <div className={style.formBlock}>
              <label className={style.formLabel}>
                  Full name
              </label>
              <input className={style.formTextInput}/>
          </div>
          <div className={style.formBlock}>
              <label className={style.formLabel}>
                  Phone number
              </label>
              <input className={style.formTextInput}/>
          </div>
          <div className={style.formBlock}>
              <label className={style.formLabel}>
                  Address
              </label>
              <input className={style.formTextInput}/>
          </div>
          <div className={style.formBlock}>
              <button className={style.registerButton}>
                  edit
              </button>
          </div>
          {/*<div className={style.formBlock}>*/}
              {/*<button className={style.registerButton}>*/}
                  {/*ok*/}
              {/*</button>*/}
          {/*</div>*/}
      </div>
  )
};

export default ProfilePageComponent;