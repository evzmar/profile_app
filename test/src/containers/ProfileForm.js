import React from 'react';
import style from "../components/ProfilePage/ProfilePage.module.css";
import {Field, reduxForm} from "redux-form";
import connect from "react-redux/es/connect/connect";
import {actions as actionsProfile} from "../redux/modules/profileRedux";



let ProfileForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={style.formBlock}>
                <label className={style.formLabel}>
                    Full name
                </label>
                {props.isEditMode === false ?
                    <span className={style.userInfo}
                          onClick={(e) => {
                              props.onChangeEditMode()}
                          }>
                       {props.userProfileData.fullName ? props.userProfileData.fullName : '---------'}
                    </span> :
                    <Field className={style.formTextInput}
                           name="fullName"
                           component='input'
                           type="text"/>
                }
            </div>
            <div className={style.formBlock}>
                <label className={style.formLabel}>
                    Phone number
                </label>
                {props.isEditMode === false ?
                    <span className={style.userInfo}
                          onClick={props.isNotNullToken && props.onChangeEditMode}>
                       {props.userProfileData.phoneNumber ? props.userProfileData.phoneNumber : '---------'}
                    </span> :
                    <Field className={style.formTextInput}
                           name="phoneNumber"
                           component='input'
                           type="text"/>
                }
            </div>
            <div className={style.formBlock}>
                <label className={style.formLabel}>
                    Address
                </label>
                {props.isEditMode === false ?
                    <span className={style.userInfo}
                          onClick={ props.onChangeEditMode}>
                       {props.userProfileData.address ? props.userProfileData.address : '---------'}
                    </span> :
                    <Field className={style.formTextInput}
                           name="address"
                           component='input'
                           type="text"/>
                }
            </div>
            {props.isNotNullToken ?
                <div className={style.formBlock}>
                    <button className={style.registerButton}
                            type="submit">
                        edit
                    </button>
                </div> : null
            }
        </form>
    )
};


const mapStateToProps = (state) => {
    return {
        isNotNullToken:  state.auth.userAuthData.token !== null,
        isEditMode:     state.profilePage.isEditMode,
        initialValues:  state.profilePage.userProfileData,
        userProfileData: state.profilePage.userProfileData
    }
};



const mapDispatchToProps = (dispatch)  => {
    return {
        onChangeEditMode: () => {
         dispatch(actionsProfile.setEditMode(true))
        }
    }
};


ProfileForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileForm);


export default reduxForm({
    form: 'profileData'
})(ProfileForm);