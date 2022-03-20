import { memo } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";
import { PathsType } from "../../types";

function Navigation() {
  const links: Array<{ title: string; pathTo: PathsType }> = [
    { title: "Home", pathTo: "/" },
    { title: "Today", pathTo: "today" },
    { title: "Tomorrow", pathTo: "tomorrow" },
    { title: "Week", pathTo: "week" },
  ];

  return (
    <nav className={styles.container}>
      {links.map((link, i) => (
        <NavLink
          key={i}
          to={link.pathTo}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
}

export default memo(Navigation);
