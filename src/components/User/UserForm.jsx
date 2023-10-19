import React from "react";
import { useDispatch, useSelector } from "react-redux";

import UserSignupForm from "./UserSignupForm.jsx";
import UserLoginForm from "./UserLoginForm.jsx";

import styles from "../../styles/User.module.css";
import { toggleForm, toggleFormType } from "../../redux/user/userSlice.js";

const UserForm = () => {
  const selector = useSelector((state) => state.user);
  const { showForm, formType } = selector;

  const dispatch = useDispatch();

  const closeForm = () => {
    dispatch(toggleForm(false));
  };

  const toggleCurrentFormType = (type) => {
    dispatch(toggleFormType(type));
  };

  return (
    showForm && (
      <>
        <div className={styles.overlay} onClick={closeForm} />
        {formType === "signup" ? (
          <UserSignupForm toggleCurrentFormType={toggleCurrentFormType} closeForm={closeForm} />
        ) : (
          <UserLoginForm toggleCurrentFormType={toggleCurrentFormType} closeForm={closeForm} />
        )}
      </>
    )
  );
};

export default UserForm;
