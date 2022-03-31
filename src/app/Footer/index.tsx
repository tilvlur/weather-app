import { memo } from "react";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.container}>
      <span>&copy;&nbsp;</span>
      <span className={styles.appName}>Weather App&nbsp;</span>
      <span className={styles.name}>by Timur Khrustalev&nbsp;</span>
    </footer>
  );
}

export default memo(Footer);
