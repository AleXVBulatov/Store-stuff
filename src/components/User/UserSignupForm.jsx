import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createUser } from "../../redux/user/userSlice.js";

import styles from "../../styles/User.module.css";

const UserSignupForm = (props) => {
  const { closeForm, toggleCurrentFormType } = props;
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isNotEmpty = Object.values(values).every((value) => value);

    if (!isNotEmpty) return;
    dispatch(createUser(values));
    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Sign Up</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            autoComplete="off"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            autoComplete="off"
            value={values.password}
            onChange={(event) => handleChange(event)}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="off"
            value={values.name}
            onChange={(event) => handleChange(event)}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="avatar"
            name="avatar"
            placeholder="Your avatar"
            autoComplete="off"
            value={values.avatar}
            onChange={(event) => handleChange(event)}
            required
          />
        </div>

        <div className={styles.link} onClick={() => toggleCurrentFormType("login")}>
          I already have an account
        </div>

        <button type="submit" className={styles.submit}>
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserSignupForm;
