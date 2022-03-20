import { memo } from "react";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.container}>
      &copy; Weather App by Timur Khrustalev 2022. All right reserved
    </footer>
  );
}

export default memo(Footer);
