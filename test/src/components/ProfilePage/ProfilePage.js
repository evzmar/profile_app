import React from 'react';
import style from './ProfilePage.module.css';
import ProfileForm from "../../containers/ProfileForm/ProfileForm";
import {Redirect} from "react-router-dom";



const ProfilePage = (props) => {
    //---------------------------
    const submit = (values) => {
        let userProfileData = values;
        props.onEditingUserDataEnteringFinishCommited(userProfileData);
    };
    //---------------------------
    // if ( !props.isNotNullToken){
    //     return <Redirect to = '/auth'/>
    // }
    //---

    return (
        <div className={style.profileSection}>
            <label className={style.profileSectionLabel}>
                Профиль
            </label>
            <ProfileForm onSubmit={submit} {...props}/>
            <div className={style.logoutBlock}>
               <button className={style.buttonLogout}
               onClick={(e) => props.onLogout()}>
                   logout
               </button>
            </div>
        </div>
    )
};

export default ProfilePage;