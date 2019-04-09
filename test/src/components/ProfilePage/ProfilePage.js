import React from 'react';
import style from './ProfilePage.module.css';
import {Redirect} from "react-router-dom";
import ProfileForm from "../../containers/ProfileForm";



const ProfilePage = (props) => {
    //---------------------------
    const submit = (values) => {
        let userProfileData = values;
        props.onEditingUserDataEnteringFinishCommited(userProfileData);
    };
    //---------------------------

    //---

    return (
        <div className={style.profileSection}>
            <label className={style.profileSectionLabel}>
                Профиль
            </label>
            <ProfileForm onSubmit={submit} {...props}/>
            <div className={style.logoutBlock}>
               <button className={style.buttonLogout}>
                   logout
               </button>
            </div>
        </div>
    )
};

export default ProfilePage;