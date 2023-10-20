import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/Header.module.css";
import { ROUTES } from "../../utils/routes.js";
import { toggleForm } from "../../redux/user/userSlice.js";
import { useGetProductsQuery } from "../../redux/api/apiSlice.js";
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

  // Для поиска товаров:
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useGetProductsQuery({ title: searchValue });
  // console.log(useGetProductsQuery());
  // console.log(useGetProductsQuery({ title: searchValue }));
  // console.log(data);

  const handleClick = () => {
    if (!currentUser) {
      dispatch(toggleForm(true));
    } else {
      navigate(ROUTES.PROFILE);
    }
  };

  // вариант 1 (без деструктуризации):
  // const handleChange = (event) => {
  //   setSearchValue(event.target.value);
  // };
  // вариант 2 (с деструктуризаций):
  const handleChange = ({ target: { value } }) => {
    setSearchValue(value);
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
                value={searchValue}
                onChange={handleChange}
              />
            </div>
            {searchValue && (
              <div className={styles.box}>
                {isLoading
                  ? "Loading"
                  : !data.length
                  ? "No results"
                  : data.map((elem) => {
                      const { title, images, id } = elem;
                      return (
                        <Link key={id} to={`/products/${id}`} onClick={() => setSearchValue("")} className={styles.item}>
                          <div className={styles.image} style={{ backgroundImage: `url(${images[0]})` }} />
                          <div className={styles.title}>{title}</div>
                        </Link>
                      );
                    })}
              </div>
            )}
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
