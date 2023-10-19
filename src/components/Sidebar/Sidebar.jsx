import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../../styles/Sidebar.module.css";

const Sidebar = (props) => {
  const { list } = useSelector((state) => state.categories);
  // console.log(list); // (6) [{…}, {…}, {…}, {…}, {…}, {…}]

  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>CATEGORIES</div>
      <nav>
        <ul className={styles.menu}>
          {list.slice(0, 6).map((item) => {
            const { id, name } = item;
            return (
              <li key={id}>
                <NavLink
                  className={({ isActive }) => {
                    return `${styles.link} ${isActive ? styles.active : ""}`;
                  }}
                  to={`/categories/${id}`}
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.footer}>
        <a href="/help" taghet="_blank" className={styles.link}>
          Help
        </a>
        <a href="/terms" taghet="_blank" className={styles.link} style={{ textDecoration: "underline" }}>
          Terms & Conditions
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
