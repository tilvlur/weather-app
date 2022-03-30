import { memo } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import styles from "./Navigation.module.scss";
import { useAppSelector } from "../../../common/hooks/hooks";
import { selectWeather } from "../../../features/weather/weatherSlice";

function Navigation() {
  const { cityLink } = useAppSelector(selectWeather);

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.link, {
      [styles.link__active]: isActive,
      [styles.link__disabled]: !cityLink,
    });

  return (
    <nav className={styles.container}>
      <NavLink to={`${cityLink}`} end className={linkStyle}>
        Home
      </NavLink>
      <NavLink to={`${cityLink}/today`} className={linkStyle}>
        Today
      </NavLink>
      <NavLink to={`${cityLink}/tomorrow`} className={linkStyle}>
        Tomorrow
      </NavLink>
      <NavLink to={`${cityLink}/week`} className={linkStyle}>
        Week
      </NavLink>
    </nav>
  );
}

export default memo(Navigation);
