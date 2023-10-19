import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../../redux/user/userSlice.js";

import styles from "../../styles/Profile.module.css";

const Profile = (props) => {
  const dispatch = useDispatch();

  const selector = useSelector((state) => state.user);
  const { currentUser } = selector;

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isNotEmpty = Object.values(values).every((value) => value);

    if (!isNotEmpty) return;
    dispatch(updateUser(values));
  };

  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <span>You need to login</span>
      ) : (
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
          <button type="submit" className={styles.submit}>
            Update
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;
