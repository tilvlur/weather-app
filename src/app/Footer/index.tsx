import { memo } from "react";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.appName}>
        <span>Weather&nbsp;</span>
        <span>App</span>
      </div>
      <div className={styles.copyright}>
        <div className={styles.copy}>
          Copyright © 2022 Timur Khrustalyov. All rights reserved.
        </div>
        <div className={styles.contacts}>Contacts: tilvlur@yandex.com</div>
      </div>
    </footer>
  );
}

export default memo(Footer);
