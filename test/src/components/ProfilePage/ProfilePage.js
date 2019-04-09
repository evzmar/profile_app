import React from 'react';
import style from './ProfilePage.module.css';
import {Redirect} from "react-router-dom";


const ProfilePage = (props) => {
    //---
    // if (!props.isAuth) {
    //     return <Redirect to="/login"/>
    // }
    //---

    return (
        <div className={style.profileSection}>
            <div className={style.formBlock}>
                <label className={style.formLabel}>
                    Full name
                </label>
                {props.userAccountName === null ?
                    <span className={style.userInfo}
                          onClick={props.isAuth && props.onUserFullNameChangeRequest}>
                       {props.userProfileData.fullName ? props.userProfileData.fullName : '---------'}
                    </span> :
                    <input className={style.formTextInput}
                           onChange={(e) => props.onCreatingFullNameChanged(e.currentTarget.value)}/>
                }
            </div>
            <div className={style.formBlock}>
                <label className={style.formLabel}>
                    Phone number
                </label>
                {props.creatingPhoneNumber === null ?
                    <span className={style.userInfo}
                          onClick={props.isAuth && props.onUserPhoneNumberChangeRequest}>
                       {props.userProfileData.phoneNumber ? props.userProfileData.phoneNumber : '---------'}
                    </span> :
                    <input className={style.formTextInput}
                           onChange={(e) => props.onCreatingPhoneNumberChanged(e.currentTarget.value)}/>
                }
            </div>
            <div className={style.formBlock}>
                <label className={style.formLabel}>
                    Address
                </label>
                {props.creatingAddress === null ?
                    <span className={style.userInfo}
                          onClick={props.isAuth && props.onUserAddressChangeRequest}>
                       {props.userProfileData.address ? props.userProfileData.address : '---------'}
                    </span> :
                    <input className={style.formTextInput}
                           onChange={(e) => props.onCreatingAddressChanged(e.currentTarget.value)}/>
                }
            </div>
            {props.isAuth ?
                <div className={style.formBlock}>
                    <button className={style.registerButton}
                            onClick={(e) => props.onCreatingUserProfileFinishCommitted()}>
                        edit
                    </button>
                </div> : null
            }
            <div className={style.logoutBlock}>
               <button className={style.buttonLogout}>
                   logout
               </button>
            </div>
        </div>
    )
};

export default ProfilePage;