import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/Header.module.css";
import { ROUTES } from "../../utils/routes.js";
import { toggleForm } from "../../redux/user/userSlice.js";
import LOGO from "../../images/logo.svg";
import Avatar from "../../images/avatar.jpg";

const Header = () => {
  // Для aythentification:
  const selector = useSelector((state) => {
    return state.user;
  });
  const { currentUser } = selector;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({ name: "Guest", avatar: Avatar });

  const handleClick = () => {
    if (!currentUser) {
      dispatch(toggleForm(true));
    } else {
      navigate(ROUTES.PROFILE);
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>

      <div className={styles.info}>
        <div className={styles.user} onClick={() => handleClick()}>
          <div className={styles.avatar} style={{ backgroundImage: `url(${values.avatar})` }} />
          <div className={styles.username}>{values.name}</div>
        </div>
        <div>
          <form className={styles.form}>
            <div className={styles.icon}>
              <svg className="icon">
                <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`}></use>
              </svg>
            </div>
            <div className={styles.input}>
              <input
                type="search"
                name="search"
                placeholder="Search for anything..."
                autoComplete="off"
                value=""
                onChange={() => {}}
              />
            </div>
            {false && <div className={styles.box}></div>}
          </form>
        </div>

        <div className={styles.account}>
          <Link to={ROUTES.HOME} className={styles.favourites}>
            <svg className={styles["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`}></use>
            </svg>
          </Link>
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`}></use>
            </svg>
            <span className={styles.count}>2</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
